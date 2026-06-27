import { createInitialScores, buildRanking, markMissedAnswer, ranksByPlayer, scoreAnswer } from "./scoring";
import { gameQuestions, GAME_HOST_USER_ID, GAME_ORGANIZATION_ID } from "./seed";
import {
  AnswerResult,
  CreateGameSessionInput,
  CreateGameSessionResult,
  CustomQuestionInput,
  GameActionResult,
  GameAnswer,
  GamePlayer,
  GameQuestion,
  GameSession,
  JoinGameSessionResult,
  LeaderboardRow
} from "./types";

type PrivateGameSession = GameSession & {
  hostToken: string;
};

type GameStore = {
  sessions: Map<string, PrivateGameSession>;
  leaderboard: Map<string, LeaderboardRow>;
};

const globalForGame = globalThis as typeof globalThis & {
  __f09GameStore?: GameStore;
};

const store =
  globalForGame.__f09GameStore ??
  (globalForGame.__f09GameStore = {
    sessions: new Map<string, PrivateGameSession>(),
    leaderboard: new Map<string, LeaderboardRow>()
  });

function makeId(prefix: string) {
  const random = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`;
}

function makePin() {
  let pin = "";
  do {
    pin = String(Math.floor(100000 + Math.random() * 900000));
  } while (Array.from(store.sessions.values()).some((session) => session.pinCode === pin && session.status !== "ended"));
  return pin;
}

function makeAvatar(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean);
  return (parts.slice(0, 2).join("") || "AI").toUpperCase();
}

function currentQuestion(session: GameSession) {
  return session.questions[session.currentIndex];
}

function clonePublicSession(session: PrivateGameSession): GameSession {
  const { hostToken: _hostToken, ...publicSession } = session;
  return structuredClone(publicSession);
}

function readPrivateSession(sessionId: string) {
  return store.sessions.get(sessionId) ?? null;
}

function buildCustomQuestion(input: CustomQuestionInput, index: number): GameQuestion | null {
  const options = input.options.map((option) => option.trim()).filter(Boolean).slice(0, 4);
  const prompt = input.prompt.trim();
  const correctIndex = Number(input.correctIndex);

  if (!prompt || options.length < 2 || correctIndex < 0 || correctIndex >= options.length) return null;

  return {
    id: makeId(`custom-${index}`),
    topic: input.topic?.trim() || "Câu hỏi trưởng phòng",
    type: options.length === 2 ? "truefalse" : "mcq",
    prompt,
    options,
    correctIndex,
    timeLimitSec: 20,
    difficulty: "medium",
    funFact: "Câu hỏi do trưởng phòng thêm cho phiên chơi nội bộ.",
    source: "custom"
  };
}

function pickRandomQuestions(count = 8) {
  return [...gameQuestions]
    .map((question) => ({ question, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, count)
    .map(({ question }) => ({ ...question, source: "bank" as const }));
}

function resolveQuestions(input: CreateGameSessionInput) {
  if (input.questionMode !== "custom") return pickRandomQuestions();

  const selectedIds = new Set(input.selectedQuestionIds ?? []);
  const selectedQuestions = gameQuestions
    .filter((question) => selectedIds.has(question.id))
    .map((question) => ({ ...question, source: "bank" as const }));
  const customQuestions = (input.customQuestions ?? [])
    .map((question, index) => buildCustomQuestion(question, index))
    .filter((question): question is GameQuestion => Boolean(question));

  const questions = [...selectedQuestions, ...customQuestions];
  return questions.length ? questions.slice(0, 15) : pickRandomQuestions();
}

function recomputeRanking(session: GameSession) {
  session.ranking = buildRanking(session.players, session.scores, session.previousRanks);
}

function recordLeaderboard(session: GameSession) {
  for (const row of session.ranking) {
    const key = `${session.organizationId}:${row.player.id}`;
    const existing = store.leaderboard.get(key);
    store.leaderboard.set(key, {
      userId: row.player.id,
      displayName: row.player.displayName,
      department: row.player.department,
      avatar: row.player.avatar,
      totalPoints: (existing?.totalPoints ?? 0) + row.score.total,
      gamesPlayed: (existing?.gamesPlayed ?? 0) + 1,
      rank: 0
    });
  }
}

function withRanks(rows: LeaderboardRow[]) {
  return rows
    .sort((a, b) => b.totalPoints - a.totalPoints || b.gamesPlayed - a.gamesPlayed || a.displayName.localeCompare(b.displayName, "vi"))
    .map((row, index) => ({ ...row, rank: index + 1 }));
}

function addAnswer(session: GameSession, playerId: string, selectedIndex: number, now: number): GameAnswer | null {
  const question = currentQuestion(session);
  if (!question || !session.questionStartTs || session.currentAnswers[playerId]) return null;

  const playerScore = session.scores[playerId];
  if (!playerScore) return null;

  const responseMs = now - session.questionStartTs;
  const result = scoreAnswer({
    playerId,
    question,
    selectedIndex,
    responseMs,
    previousScore: playerScore,
    createdAt: now
  });
  session.currentAnswers[playerId] = result.answer;
  session.scores[playerId] = result.score;
  recomputeRanking(session);
  return result.answer;
}

function markMissingPlayers(session: GameSession) {
  for (const player of session.players) {
    if (!session.currentAnswers[player.id]) {
      session.scores[player.id] = markMissedAnswer(session.scores[player.id]);
    }
  }
  recomputeRanking(session);
}

export function getQuestionBank() {
  return structuredClone(gameQuestions.map((question) => ({ ...question, source: "bank" as const })));
}

export function createGameSession(input: CreateGameSessionInput = {}): CreateGameSessionResult {
  const now = Date.now();
  const questions = resolveQuestions(input);
  const session: PrivateGameSession = {
    id: makeId("game"),
    quizId: input.questionMode === "custom" ? "manager-custom-room" : "random-ai-warmup",
    organizationId: GAME_ORGANIZATION_ID,
    hostUserId: GAME_HOST_USER_ID,
    hostDisplayName: input.hostName?.trim() || "Trưởng phòng",
    hostDepartment: input.hostDepartment?.trim() || "Marketing",
    pinCode: makePin(),
    questionMode: input.questionMode === "custom" ? "custom" : "random",
    status: "lobby",
    phase: "lobby",
    players: [],
    questions,
    currentIndex: 0,
    questionStartTs: null,
    deadlineTs: null,
    currentAnswers: {},
    scores: {},
    ranking: [],
    previousRanks: {},
    createdAt: now,
    startedAt: null,
    endedAt: null,
    hostToken: makeId("host")
  };
  store.sessions.set(session.id, session);
  return { session: clonePublicSession(session), hostToken: session.hostToken };
}

export function getGameSession(sessionId: string) {
  const session = readPrivateSession(sessionId);
  return session ? clonePublicSession(session) : null;
}

export function joinGameSession(sessionId: string, displayName: string, department: string): JoinGameSessionResult | null {
  const session = readPrivateSession(sessionId);
  if (!session) return null;
  if (session.phase !== "lobby") return { session: clonePublicSession(session), playerId: "" };

  const safeName = displayName.trim() || "Nhân viên";
  const safeDepartment = department.trim() || "Marketing";
  const existing = session.players.find(
    (player) => player.displayName.toLocaleLowerCase("vi") === safeName.toLocaleLowerCase("vi") && player.department === safeDepartment
  );
  const player: GamePlayer =
    existing ??
    ({
      id: makeId("player"),
      displayName: safeName,
      department: safeDepartment,
      avatar: makeAvatar(safeName),
      role: "employee",
      isBot: false
    } satisfies GamePlayer);

  if (!existing) {
    session.players.push(player);
    session.scores[player.id] = createInitialScores([player])[player.id];
  }
  recomputeRanking(session);
  return { session: clonePublicSession(session), playerId: player.id };
}

export function joinGameSessionByCode(pinCode: string, displayName: string, department: string): JoinGameSessionResult | null {
  const normalizedPin = pinCode.replace(/\D/g, "");
  const session = Array.from(store.sessions.values()).find((item) => item.pinCode === normalizedPin && item.status !== "ended");
  return session ? joinGameSession(session.id, displayName, department) : null;
}

export function startGameSession(sessionId: string, hostToken: string): GameActionResult {
  const session = readPrivateSession(sessionId);
  if (!session) return { session: null, error: "not-found" };
  if (session.hostToken !== hostToken) return { session: clonePublicSession(session), error: "forbidden" };
  if (session.players.length === 0) return { session: clonePublicSession(session), error: "not-ready" };
  if (session.phase !== "lobby") return { session: clonePublicSession(session), error: "invalid-phase" };

  const now = Date.now();
  const question = currentQuestion(session);
  session.status = "active";
  session.phase = "question";
  session.startedAt = session.startedAt ?? now;
  session.questionStartTs = now;
  session.deadlineTs = now + question.timeLimitSec * 1000;
  session.currentAnswers = {};
  return { session: clonePublicSession(session) };
}

export function submitGameAnswer(sessionId: string, playerId: string, selectedIndex: number): AnswerResult | null {
  const session = readPrivateSession(sessionId);
  if (!session) return null;
  if (session.phase !== "question") return { accepted: false, reason: "invalid-phase", session: clonePublicSession(session) };
  if (session.currentAnswers[playerId]) return { accepted: false, reason: "duplicate", session: clonePublicSession(session) };
  if (session.deadlineTs && Date.now() > session.deadlineTs) {
    return { accepted: false, reason: "deadline", session: clonePublicSession(session) };
  }

  const answer = addAnswer(session, playerId, Number(selectedIndex), Date.now());
  return {
    accepted: Boolean(answer),
    reason: answer ? undefined : "not-found",
    answer: answer ?? undefined,
    session: clonePublicSession(session)
  };
}

export function advanceGameSession(sessionId: string, hostToken: string): GameActionResult {
  const session = readPrivateSession(sessionId);
  if (!session) return { session: null, error: "not-found" };
  if (session.hostToken !== hostToken) return { session: clonePublicSession(session), error: "forbidden" };

  const now = Date.now();

  if (session.phase === "lobby") return startGameSession(sessionId, hostToken);

  if (session.phase === "question") {
    markMissingPlayers(session);
    session.previousRanks = ranksByPlayer(session.ranking);
    session.phase = "reveal";
    return { session: clonePublicSession(session) };
  }

  if (session.phase === "reveal") {
    session.phase = "scoreboard";
    return { session: clonePublicSession(session) };
  }

  if (session.phase === "scoreboard") {
    if (session.currentIndex < session.questions.length - 1) {
      session.currentIndex += 1;
      session.currentAnswers = {};
      session.phase = "question";
      session.questionStartTs = now;
      session.deadlineTs = now + currentQuestion(session).timeLimitSec * 1000;
      return { session: clonePublicSession(session) };
    }
    session.phase = "gameover";
    session.status = "ended";
    session.endedAt = now;
    recordLeaderboard(session);
    return { session: clonePublicSession(session) };
  }

  return { session: clonePublicSession(session) };
}

export function getLeaderboard(department?: string | null) {
  const rows = Array.from(store.leaderboard.values());
  const sourceRows = rows.length
    ? rows
    : [
        { userId: "demo-an", displayName: "An", department: "Marketing", avatar: "AN", totalPoints: 9400, gamesPlayed: 3, rank: 0 },
        { userId: "demo-binh", displayName: "Bình", department: "Kinh doanh", avatar: "BI", totalPoints: 8620, gamesPlayed: 2, rank: 0 },
        { userId: "demo-chi", displayName: "Chi", department: "Kế toán", avatar: "CH", totalPoints: 7900, gamesPlayed: 2, rank: 0 },
        { userId: "demo-ha", displayName: "Hà", department: "Nhân sự", avatar: "HA", totalPoints: 7120, gamesPlayed: 2, rank: 0 }
      ];

  return withRanks(department ? sourceRows.filter((row) => row.department === department) : sourceRows);
}
