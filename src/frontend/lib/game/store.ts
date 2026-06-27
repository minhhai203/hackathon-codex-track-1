import { createInitialScores, buildRanking, markMissedAnswer, ranksByPlayer, scoreAnswer } from "./scoring";
import { demoPlayers, gameQuestions, GAME_HOST_USER_ID, GAME_ORGANIZATION_ID, HUMAN_PLAYER_ID } from "./seed";
import { AnswerResult, GameAnswer, GamePlayer, GameSession, LeaderboardRow } from "./types";

type GameStore = {
  sessions: Map<string, GameSession>;
  leaderboard: Map<string, LeaderboardRow>;
};

const globalForGame = globalThis as typeof globalThis & {
  __f09GameStore?: GameStore;
};

const store =
  globalForGame.__f09GameStore ??
  (globalForGame.__f09GameStore = {
    sessions: new Map<string, GameSession>(),
    leaderboard: new Map<string, LeaderboardRow>()
  });

function makeId(prefix: string) {
  const random = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`;
}

function makePin() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function currentQuestion(session: GameSession) {
  return session.questions[session.currentIndex];
}

function cloneSession(session: GameSession): GameSession {
  return structuredClone(session);
}

function hashText(text: string) {
  return [...text].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);
}

function chooseBotAnswer(player: GamePlayer, questionIndex: number, questionOptions: number, correctIndex: number) {
  const hash = hashText(`${player.id}-${questionIndex}`);
  const threshold = Math.round((player.botAccuracy ?? 0.6) * 100);
  if (hash % 100 < threshold) return correctIndex;
  return (correctIndex + 1 + (hash % Math.max(1, questionOptions - 1))) % questionOptions;
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

function fillBotAnswers(session: GameSession, now: number) {
  const question = currentQuestion(session);
  if (!question || !session.questionStartTs) return;

  for (const player of session.players) {
    if (!player.isBot || session.currentAnswers[player.id]) continue;
    const selectedIndex = chooseBotAnswer(player, session.currentIndex, question.options.length, question.correctIndex);
    const hash = hashText(`${session.id}-${player.id}-${question.id}`);
    const botNow = session.questionStartTs + 1200 + (hash % Math.max(1200, question.timeLimitSec * 750));
    addAnswer(session, player.id, selectedIndex, Math.min(botNow, now));
  }
}

function markMissingPlayers(session: GameSession) {
  for (const player of session.players) {
    if (!session.currentAnswers[player.id]) {
      session.scores[player.id] = markMissedAnswer(session.scores[player.id]);
    }
  }
  recomputeRanking(session);
}

export function createGameSession() {
  const now = Date.now();
  const players = structuredClone(demoPlayers);
  const scores = createInitialScores(players);
  const session: GameSession = {
    id: makeId("game"),
    quizId: "monday-ai-warmup",
    organizationId: GAME_ORGANIZATION_ID,
    hostUserId: GAME_HOST_USER_ID,
    pinCode: makePin(),
    status: "lobby",
    phase: "lobby",
    players,
    questions: gameQuestions.slice(0, 12),
    currentIndex: 0,
    questionStartTs: null,
    deadlineTs: null,
    currentAnswers: {},
    scores,
    ranking: buildRanking(players, scores, {}),
    previousRanks: {},
    createdAt: now,
    startedAt: null,
    endedAt: null
  };
  store.sessions.set(session.id, session);
  return cloneSession(session);
}

export function getGameSession(sessionId: string) {
  const session = store.sessions.get(sessionId);
  return session ? cloneSession(session) : null;
}

export function joinGameSession(sessionId: string, displayName: string, department: string) {
  const session = store.sessions.get(sessionId);
  if (!session) return null;
  if (session.phase !== "lobby") return cloneSession(session);
  const existing = session.players.find((player) => player.id === HUMAN_PLAYER_ID);
  if (existing) {
    existing.displayName = displayName || existing.displayName;
    existing.department = department || existing.department;
  } else {
    session.players.unshift({ id: HUMAN_PLAYER_ID, displayName, department, avatar: "AI", isBot: false });
    session.scores = createInitialScores(session.players);
  }
  recomputeRanking(session);
  return cloneSession(session);
}

export function startGameSession(sessionId: string) {
  const session = store.sessions.get(sessionId);
  if (!session) return null;
  const now = Date.now();
  const question = currentQuestion(session);
  session.status = "active";
  session.phase = "question";
  session.startedAt = session.startedAt ?? now;
  session.questionStartTs = now;
  session.deadlineTs = now + question.timeLimitSec * 1000;
  session.currentAnswers = {};
  return cloneSession(session);
}

export function submitGameAnswer(sessionId: string, playerId: string, selectedIndex: number): AnswerResult | null {
  const session = store.sessions.get(sessionId);
  if (!session) return null;
  if (session.phase !== "question") return { accepted: false, reason: "invalid-phase", session: cloneSession(session) };
  if (session.currentAnswers[playerId]) return { accepted: false, reason: "duplicate", session: cloneSession(session) };
  if (session.deadlineTs && Date.now() > session.deadlineTs) {
    return { accepted: false, reason: "deadline", session: cloneSession(session) };
  }

  const answer = addAnswer(session, playerId, Number(selectedIndex), Date.now());
  return {
    accepted: Boolean(answer),
    reason: answer ? undefined : "not-found",
    answer: answer ?? undefined,
    session: cloneSession(session)
  };
}

export function advanceGameSession(sessionId: string) {
  const session = store.sessions.get(sessionId);
  if (!session) return null;
  const now = Date.now();

  if (session.phase === "lobby") return startGameSession(sessionId);

  if (session.phase === "question") {
    fillBotAnswers(session, now);
    markMissingPlayers(session);
    session.previousRanks = ranksByPlayer(session.ranking);
    session.phase = "reveal";
    return cloneSession(session);
  }

  if (session.phase === "reveal") {
    session.phase = "scoreboard";
    return cloneSession(session);
  }

  if (session.phase === "scoreboard") {
    if (session.currentIndex < session.questions.length - 1) {
      session.currentIndex += 1;
      session.currentAnswers = {};
      session.phase = "question";
      session.questionStartTs = now;
      session.deadlineTs = now + currentQuestion(session).timeLimitSec * 1000;
      return cloneSession(session);
    }
    session.phase = "gameover";
    session.status = "ended";
    session.endedAt = now;
    recordLeaderboard(session);
    return cloneSession(session);
  }

  return cloneSession(session);
}

export function getLeaderboard(department?: string | null) {
  const rows = Array.from(store.leaderboard.values());
  const sourceRows = rows.length
    ? rows
    : demoPlayers.map((player, index) => ({
        userId: player.id,
        displayName: player.displayName,
        department: player.department,
        avatar: player.avatar,
        totalPoints: Math.max(0, 9400 - index * 780),
        gamesPlayed: 2 + (index % 3),
        rank: 0
      }));

  return withRanks(department ? sourceRows.filter((row) => row.department === department) : sourceRows);
}
