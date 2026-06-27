export type GameQuestionType = "mcq" | "truefalse" | "guess";

export type GamePhase = "lobby" | "question" | "reveal" | "scoreboard" | "gameover";

export type GameQuestion = {
  id: string;
  topic: string;
  type: GameQuestionType;
  prompt: string;
  options: string[];
  correctIndex: number;
  timeLimitSec: number;
  difficulty: "easy" | "medium" | "hard";
  funFact: string;
};

export type GamePlayer = {
  id: string;
  displayName: string;
  department: string;
  avatar: string;
  isBot: boolean;
  botAccuracy?: number;
};

export type GameAnswer = {
  playerId: string;
  questionId: string;
  selectedIndex: number;
  responseMs: number;
  isCorrect: boolean;
  points: number;
  createdAt: number;
};

export type GameScore = {
  playerId: string;
  total: number;
  streak: number;
  lastGain: number;
  lastCorrect: boolean | null;
  correctCount: number;
  totalCorrectMs: number;
};

export type RankRow = {
  rank: number;
  player: GamePlayer;
  score: GameScore;
  delta: number;
};

export type GameSession = {
  id: string;
  quizId: string;
  organizationId: string;
  hostUserId: string;
  pinCode: string;
  status: "lobby" | "active" | "ended";
  phase: GamePhase;
  players: GamePlayer[];
  questions: GameQuestion[];
  currentIndex: number;
  questionStartTs: number | null;
  deadlineTs: number | null;
  currentAnswers: Record<string, GameAnswer>;
  scores: Record<string, GameScore>;
  ranking: RankRow[];
  previousRanks: Record<string, number>;
  createdAt: number;
  startedAt: number | null;
  endedAt: number | null;
};

export type LeaderboardRow = {
  userId: string;
  displayName: string;
  department: string;
  avatar: string;
  totalPoints: number;
  gamesPlayed: number;
  rank: number;
};

export type AnswerResult = {
  accepted: boolean;
  reason?: "duplicate" | "deadline" | "invalid-phase" | "not-found";
  session: GameSession;
  answer?: GameAnswer;
};
