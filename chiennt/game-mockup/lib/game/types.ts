// Domain types cho game module — dùng chung cho mock & backend thật sau này.

export type QuestionType = "mcq" | "truefalse" | "guess";

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  /** Với truefalse: ["Đúng", "Sai"]. Với guess: các output ứng viên. */
  options: string[];
  correctIndex: number;
  timeLimitSec: number;
  /** Fun fact AI hiện sau khi reveal. */
  funFact: string;
  topicTag?: string;
}

export interface Player {
  id: string;
  name: string;
  department: string;
  isBot: boolean;
  /** Độ chính xác giả lập cho bot (0..1). */
  botAccuracy?: number;
  avatar?: string;
}

export interface PlayerScore {
  playerId: string;
  total: number;
  streak: number;
  /** Điểm vừa nhận ở câu gần nhất (cho hiệu ứng +points). */
  lastGain: number;
  lastCorrect: boolean | null;
  correctCount: number;
  /** Tổng thời gian trả lời các câu đúng (ms) — dùng phá hòa. */
  totalCorrectMs: number;
}

/** Một lượt trả lời trong câu hiện tại. */
export interface Answer {
  playerId: string;
  selectedIndex: number;
  responseMs: number;
}

export type GamePhase =
  | "lobby"
  | "question"
  | "reveal"
  | "scoreboard"
  | "gameover";

export interface RankRow {
  rank: number;
  player: Player;
  score: PlayerScore;
  /** Thay đổi hạng so với scoreboard trước (âm = đi lên). */
  delta: number;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  questions: Question[];
  currentIndex: number;
  /** Mốc deadline tuyệt đối (ms epoch) của câu đang chạy. */
  deadlineTs: number | null;
  questionStartTs: number | null;
  scores: Record<string, PlayerScore>;
  /** Câu trả lời của câu hiện tại, theo playerId. */
  currentAnswers: Record<string, Answer>;
  /** Bảng xếp hạng tại scoreboard gần nhất (để tính delta). */
  ranking: RankRow[];
}

export interface ScoringConfig {
  base: number;
  /** Bật/tắt thưởng streak. */
  streakEnabled: boolean;
}

export const DEFAULT_SCORING: ScoringConfig = {
  base: 1000,
  streakEnabled: true,
};
