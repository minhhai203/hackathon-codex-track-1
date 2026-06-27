// Lớp transport trừu tượng — SEAM để sau này thay mock bằng backend thật.
//
// UI chỉ phụ thuộc vào interface `GameController`. Hiện tại dùng `MockGameController`
// (chạy local bằng bots + timer). Khi có backend, viết `WebSocketGameController`
// cùng interface này là UI chạy nguyên, không sửa.

import {
  advance,
  allAnswered,
  beginQuestion,
  createGame,
  endQuestion,
  submitAnswer,
  toScoreboard,
} from "./engine";
import { GameState, Player, Question, ScoringConfig, DEFAULT_SCORING } from "./types";

export type Unsubscribe = () => void;

/** Thời gian tự động chuyển tiếp ở màn reveal/scoreboard (ms). */
export const AUTO_ADVANCE_MS = 8000;

export interface GameController {
  /** Trạng thái hiện tại (snapshot). */
  getState(): GameState;
  /** Lắng nghe mọi thay đổi state. Trả hàm hủy đăng ký. */
  subscribe(listener: (state: GameState) => void): Unsubscribe;
  /** Host bắt đầu phiên. */
  startGame(): void;
  /** Người chơi (con người) gửi đáp án câu hiện tại. */
  submitAnswer(playerId: string, selectedIndex: number): void;
  /** Host bấm tiếp: reveal -> scoreboard -> câu kế / kết thúc. */
  next(): void;
  /** Dọn dẹp timer. */
  dispose(): void;
}

interface MockOptions {
  humanPlayerId: string;
  scoring?: ScoringConfig;
  /** Khoảng delay trả lời của bot (ms). */
  botDelayRange?: [number, number];
}

/**
 * Controller chạy local: mô phỏng multiplayer bằng bots + timer.
 * Tự động kết thúc câu khi hết giờ; tự cho bot trả lời ngẫu nhiên.
 */
export class MockGameController implements GameController {
  private state: GameState;
  private listeners = new Set<(s: GameState) => void>();
  private timers: ReturnType<typeof setTimeout>[] = [];
  private autoTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly opts: Required<MockOptions>;

  constructor(players: Player[], questions: Question[], opts: MockOptions) {
    this.state = createGame(players, questions);
    this.opts = {
      scoring: DEFAULT_SCORING,
      botDelayRange: [800, 6000],
      ...opts,
    };
  }

  getState() {
    return this.state;
  }

  subscribe(listener: (s: GameState) => void): Unsubscribe {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private set(next: GameState) {
    this.state = next;
    this.listeners.forEach((l) => l(next));
  }

  private clearTimers() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  private clearAuto() {
    if (this.autoTimer) clearTimeout(this.autoTimer);
    this.autoTimer = null;
  }

  /** Lên lịch tự động bấm next sau AUTO_ADVANCE_MS. */
  private scheduleAuto() {
    this.clearAuto();
    this.autoTimer = setTimeout(() => this.next(), AUTO_ADVANCE_MS);
  }

  startGame() {
    if (this.state.phase !== "lobby") return;
    this.beginQuestionAt(0);
  }

  private beginQuestionAt(index: number) {
    this.clearTimers();
    const now = Date.now();
    const next = beginQuestion(this.state, index, now);
    this.set(next);

    const q = next.questions[index];
    const limitMs = q.timeLimitSec * 1000;

    // Lên lịch cho từng bot trả lời.
    for (const p of next.players) {
      if (!p.isBot) continue;
      const [lo, hi] = this.opts.botDelayRange;
      const delay = Math.min(limitMs - 200, lo + Math.random() * (hi - lo));
      this.timers.push(
        setTimeout(() => this.botAnswer(p.id), Math.max(300, delay))
      );
    }

    // Hết giờ -> kết thúc câu.
    this.timers.push(setTimeout(() => this.finishQuestion(), limitMs + 150));
  }

  private botAnswer(botId: string) {
    if (this.state.phase !== "question") return;
    const q = this.state.questions[this.state.currentIndex];
    const player = this.state.players.find((p) => p.id === botId);
    const acc = player?.botAccuracy ?? 0.6;
    const correct = Math.random() < acc;
    let pick = q.correctIndex;
    if (!correct) {
      const wrong = q.options
        .map((_, i) => i)
        .filter((i) => i !== q.correctIndex);
      pick = wrong[Math.floor(Math.random() * wrong.length)];
    }
    this.set(submitAnswer(this.state, botId, pick, Date.now()));
    if (allAnswered(this.state)) this.finishQuestion();
  }

  private finishQuestion() {
    if (this.state.phase !== "question") return;
    this.clearTimers();
    this.set(endQuestion(this.state, this.opts.scoring));
    // Hết giờ -> tự động sang scoreboard sau 8s (người chơi vẫn bấm next được).
    this.scheduleAuto();
  }

  submitAnswer(playerId: string, selectedIndex: number) {
    if (this.state.phase !== "question") return;
    this.set(submitAnswer(this.state, playerId, selectedIndex, Date.now()));
    if (allAnswered(this.state)) this.finishQuestion();
  }

  next() {
    // Bấm tay hoặc auto đều đi qua đây: hủy auto-timer đang chờ.
    this.clearAuto();
    if (this.state.phase === "reveal") {
      this.set(toScoreboard(this.state));
      // Tự động sang câu kế / kết thúc sau 8s.
      this.scheduleAuto();
      return;
    }
    if (this.state.phase === "scoreboard") {
      const next = advance(this.state, Date.now());
      this.set(next);
      // Nếu sang câu mới thì lên lịch bot + timer.
      if (next.phase === "question") {
        this.scheduleForCurrent();
      }
      return;
    }
  }

  private scheduleForCurrent() {
    const idx = this.state.currentIndex;
    const q = this.state.questions[idx];
    const limitMs = q.timeLimitSec * 1000;
    this.clearTimers();
    for (const p of this.state.players) {
      if (!p.isBot) continue;
      const [lo, hi] = this.opts.botDelayRange;
      const delay = Math.min(limitMs - 200, lo + Math.random() * (hi - lo));
      this.timers.push(
        setTimeout(() => this.botAnswer(p.id), Math.max(300, delay))
      );
    }
    this.timers.push(setTimeout(() => this.finishQuestion(), limitMs + 150));
  }

  dispose() {
    this.clearTimers();
    this.clearAuto();
    this.listeners.clear();
  }
}
