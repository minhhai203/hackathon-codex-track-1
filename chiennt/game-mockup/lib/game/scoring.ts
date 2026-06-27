// Cơ chế tính điểm thuần (tất định) — bám sát design-note 02-game-rules-scoring.md.
// Không phụ thuộc React/UI, có thể bê thẳng sang backend Python/Node sau này.

import { DEFAULT_SCORING, ScoringConfig } from "./types";

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

/** Hệ số tốc độ trong [0.5, 1.0] dựa trên thời gian còn lại. */
export function speedFactor(responseMs: number, timeLimitMs: number): number {
  if (timeLimitMs <= 0) return 0.5;
  const ratio = clamp((timeLimitMs - responseMs) / timeLimitMs, 0, 1);
  return 0.5 + 0.5 * ratio;
}

/** Thưởng theo chuỗi đúng liên tiếp (streak ĐÃ cập nhật của câu này). */
export function streakBonus(newStreak: number): number {
  if (newStreak >= 5) return 500;
  if (newStreak === 4) return 300;
  if (newStreak === 3) return 200;
  if (newStreak === 2) return 100;
  return 0;
}

export interface ScoreResult {
  points: number;
  newStreak: number;
  speedPart: number;
  bonusPart: number;
}

/**
 * Tính điểm cho một câu trả lời.
 * @param correct  trả lời đúng?
 * @param responseMs thời gian phản hồi (ms) tính theo server.
 * @param timeLimitMs giới hạn thời gian câu (ms).
 * @param prevStreak streak trước câu này.
 */
export function scoreAnswer(
  correct: boolean,
  responseMs: number,
  timeLimitMs: number,
  prevStreak: number,
  config: ScoringConfig = DEFAULT_SCORING
): ScoreResult {
  if (!correct) {
    return { points: 0, newStreak: 0, speedPart: 0, bonusPart: 0 };
  }
  const newStreak = prevStreak + 1;
  const speedPart = Math.round(config.base * speedFactor(responseMs, timeLimitMs));
  const bonusPart = config.streakEnabled ? streakBonus(newStreak) : 0;
  return {
    points: speedPart + bonusPart,
    newStreak,
    speedPart,
    bonusPart,
  };
}
