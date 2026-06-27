// Game engine thuần (Model trong MVC) — state machine + áp dụng điểm.
// Hoàn toàn tất định, không timer, không I/O. Controller (mock/WS) sẽ điều phối thời gian.

import { scoreAnswer } from "./scoring";
import {
  Answer,
  GameState,
  Player,
  PlayerScore,
  Question,
  RankRow,
  ScoringConfig,
  DEFAULT_SCORING,
} from "./types";

export function initScore(playerId: string): PlayerScore {
  return {
    playerId,
    total: 0,
    streak: 0,
    lastGain: 0,
    lastCorrect: null,
    correctCount: 0,
    totalCorrectMs: 0,
  };
}

export function createGame(
  players: Player[],
  questions: Question[]
): GameState {
  const scores: Record<string, PlayerScore> = {};
  for (const p of players) scores[p.id] = initScore(p.id);
  return {
    phase: "lobby",
    players,
    questions,
    currentIndex: -1,
    deadlineTs: null,
    questionStartTs: null,
    scores,
    currentAnswers: {},
    ranking: [],
  };
}

export function currentQuestion(state: GameState): Question | null {
  if (state.currentIndex < 0 || state.currentIndex >= state.questions.length) {
    return null;
  }
  return state.questions[state.currentIndex];
}

/** Bắt đầu câu hỏi tại index, đặt mốc thời gian. */
export function beginQuestion(
  state: GameState,
  index: number,
  now: number
): GameState {
  const q = state.questions[index];
  return {
    ...state,
    phase: "question",
    currentIndex: index,
    questionStartTs: now,
    deadlineTs: now + q.timeLimitSec * 1000,
    currentAnswers: {},
  };
}

/** Ghi nhận một câu trả lời (bỏ qua nếu trùng hoặc quá hạn). */
export function submitAnswer(
  state: GameState,
  playerId: string,
  selectedIndex: number,
  now: number
): GameState {
  if (state.phase !== "question") return state;
  if (state.currentAnswers[playerId]) return state; // một lần / câu
  if (state.deadlineTs !== null && now > state.deadlineTs) return state; // quá hạn
  const start = state.questionStartTs ?? now;
  const answer: Answer = {
    playerId,
    selectedIndex,
    responseMs: Math.max(0, now - start),
  };
  return {
    ...state,
    currentAnswers: { ...state.currentAnswers, [playerId]: answer },
  };
}

/** Tất cả người chơi đã trả lời? (để kết thúc câu sớm). */
export function allAnswered(state: GameState): boolean {
  return state.players.every((p) => !!state.currentAnswers[p.id]);
}

/** Kết thúc câu: chấm điểm cho mọi người chơi, chuyển sang reveal. */
export function endQuestion(
  state: GameState,
  config: ScoringConfig = DEFAULT_SCORING
): GameState {
  const q = state.questions[state.currentIndex];
  const timeLimitMs = q.timeLimitSec * 1000;
  const scores: Record<string, PlayerScore> = {};

  for (const p of state.players) {
    const prev = state.scores[p.id] ?? initScore(p.id);
    const ans = state.currentAnswers[p.id];
    const correct = !!ans && ans.selectedIndex === q.correctIndex;
    const responseMs = ans ? ans.responseMs : timeLimitMs;
    const result = scoreAnswer(correct, responseMs, timeLimitMs, prev.streak, config);
    scores[p.id] = {
      ...prev,
      total: prev.total + result.points,
      streak: result.newStreak,
      lastGain: result.points,
      lastCorrect: ans ? correct : null,
      correctCount: prev.correctCount + (correct ? 1 : 0),
      totalCorrectMs: prev.totalCorrectMs + (correct ? responseMs : 0),
    };
  }

  return { ...state, phase: "reveal", scores };
}

/** Sắp xếp bảng xếp hạng theo luật phá hòa của design-note 02. */
export function computeRanking(state: GameState): RankRow[] {
  const prevRankByPlayer: Record<string, number> = {};
  for (const row of state.ranking) prevRankByPlayer[row.player.id] = row.rank;

  const sorted = [...state.players].sort((a, b) => {
    const sa = state.scores[a.id];
    const sb = state.scores[b.id];
    if (sb.total !== sa.total) return sb.total - sa.total;
    if (sb.correctCount !== sa.correctCount)
      return sb.correctCount - sa.correctCount;
    return sa.totalCorrectMs - sb.totalCorrectMs;
  });

  return sorted.map((player, i) => {
    const rank = i + 1;
    const prev = prevRankByPlayer[player.id] ?? rank;
    return {
      rank,
      player,
      score: state.scores[player.id],
      delta: rank - prev, // âm = đi lên
    };
  });
}

/** Chuyển reveal -> scoreboard (tính ranking + delta). */
export function toScoreboard(state: GameState): GameState {
  const ranking = computeRanking(state);
  return { ...state, phase: "scoreboard", ranking };
}

export function hasNextQuestion(state: GameState): boolean {
  return state.currentIndex + 1 < state.questions.length;
}

/** Sang câu tiếp theo, hoặc kết thúc game. */
export function advance(state: GameState, now: number): GameState {
  if (hasNextQuestion(state)) {
    return beginQuestion(state, state.currentIndex + 1, now);
  }
  return { ...state, phase: "gameover", ranking: computeRanking(state) };
}
