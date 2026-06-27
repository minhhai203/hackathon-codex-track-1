import { GameAnswer, GamePlayer, GameQuestion, GameScore, RankRow } from "./types";

const BASE_POINTS = 1000;

function streakBonus(streak: number) {
  if (streak >= 5) return 500;
  if (streak === 4) return 300;
  if (streak === 3) return 200;
  if (streak === 2) return 100;
  return 0;
}

export function createInitialScores(players: GamePlayer[]): Record<string, GameScore> {
  return Object.fromEntries(
    players.map((player) => [
      player.id,
      {
        playerId: player.id,
        total: 0,
        streak: 0,
        lastGain: 0,
        lastCorrect: null,
        correctCount: 0,
        totalCorrectMs: 0
      }
    ])
  );
}

export function scoreAnswer({
  playerId,
  question,
  selectedIndex,
  responseMs,
  previousScore,
  createdAt
}: {
  playerId: string;
  question: GameQuestion;
  selectedIndex: number;
  responseMs: number;
  previousScore: GameScore;
  createdAt: number;
}): { answer: GameAnswer; score: GameScore } {
  const isCorrect = selectedIndex === question.correctIndex;
  const boundedResponseMs = Math.max(0, Math.min(responseMs, question.timeLimitSec * 1000));
  const speedRatio = Math.max(0, (question.timeLimitSec * 1000 - boundedResponseMs) / (question.timeLimitSec * 1000));
  const speedFactor = 0.5 + 0.5 * speedRatio;
  const nextStreak = isCorrect ? previousScore.streak + 1 : 0;
  const points = isCorrect ? Math.round(BASE_POINTS * speedFactor) + streakBonus(nextStreak) : 0;
  const score: GameScore = {
    ...previousScore,
    total: previousScore.total + points,
    streak: nextStreak,
    lastGain: points,
    lastCorrect: isCorrect,
    correctCount: previousScore.correctCount + (isCorrect ? 1 : 0),
    totalCorrectMs: previousScore.totalCorrectMs + (isCorrect ? boundedResponseMs : 0)
  };

  return {
    answer: {
      playerId,
      questionId: question.id,
      selectedIndex,
      responseMs: boundedResponseMs,
      isCorrect,
      points,
      createdAt
    },
    score
  };
}

export function markMissedAnswer(score: GameScore): GameScore {
  return {
    ...score,
    streak: 0,
    lastGain: 0,
    lastCorrect: false
  };
}

export function buildRanking(
  players: GamePlayer[],
  scores: Record<string, GameScore>,
  previousRanks: Record<string, number>
): RankRow[] {
  const sorted = [...players].sort((a, b) => {
    const aScore = scores[a.id];
    const bScore = scores[b.id];
    if (bScore.total !== aScore.total) return bScore.total - aScore.total;
    if (bScore.correctCount !== aScore.correctCount) return bScore.correctCount - aScore.correctCount;
    if (aScore.totalCorrectMs !== bScore.totalCorrectMs) return aScore.totalCorrectMs - bScore.totalCorrectMs;
    return a.displayName.localeCompare(b.displayName, "vi");
  });

  return sorted.map((player, index) => {
    const rank = index + 1;
    return {
      rank,
      player,
      score: scores[player.id],
      delta: previousRanks[player.id] ? rank - previousRanks[player.id] : 0
    };
  });
}

export function ranksByPlayer(rows: RankRow[]) {
  return Object.fromEntries(rows.map((row) => [row.player.id, row.rank]));
}
