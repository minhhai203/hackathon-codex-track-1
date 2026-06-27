"use client";

import { GameState } from "@/lib/game/types";
import { currentQuestion } from "@/lib/game/engine";
import { optionStyle } from "./optionStyles";

export function Reveal({
  state,
  humanId,
  onNext,
}: {
  state: GameState;
  humanId: string;
  onNext: () => void;
}) {
  const q = currentQuestion(state);
  if (!q) return null;

  const myScore = state.scores[humanId];
  const myAnswer = state.currentAnswers[humanId];
  const correct = myScore?.lastCorrect === true;
  const noAnswer = !myAnswer;

  // Phân bố lựa chọn của cả phòng.
  const counts = q.options.map(
    (_, i) =>
      Object.values(state.currentAnswers).filter((a) => a.selectedIndex === i)
        .length
  );
  const maxCount = Math.max(1, ...counts);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <div
        className={`w-full animate-pop rounded-3xl px-6 py-6 text-3xl font-black ${
          correct
            ? "bg-emerald-500/20 text-emerald-300"
            : "bg-red-500/20 text-red-300"
        } ${!correct ? "animate-shake" : ""}`}
      >
        {correct ? "🎉 Chính xác!" : noAnswer ? "⏰ Hết giờ!" : "❌ Chưa đúng"}
        {correct && (
          <div className="mt-1 text-xl font-extrabold text-amber-300">
            +{myScore.lastGain} điểm
            {myScore.streak >= 2 && <span className="ml-2">🔥 x{myScore.streak}</span>}
          </div>
        )}
      </div>

      <div className="w-full space-y-3">
        {q.options.map((opt, i) => {
          const st = optionStyle(i);
          const isCorrect = i === q.correctIndex;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold ${
                st.bg
              } ${isCorrect ? "ring-4 ring-white" : "opacity-50"}`}
            >
              <span className="text-xl">{st.shape}</span>
              <span className="flex-1">{opt}</span>
              {isCorrect && <span>✓</span>}
              <span className="rounded-full bg-black/30 px-2 py-0.5 text-sm">
                {counts[i]}
              </span>
              <div className="hidden h-2 w-24 overflow-hidden rounded bg-black/20 sm:block">
                <div
                  className="h-full bg-white/70"
                  style={{ width: `${(counts[i] / maxCount) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Fun fact AI — vui + học */}
      <div className="w-full rounded-2xl border border-amber-300/30 bg-amber-300/10 px-5 py-4 text-left">
        <p className="mb-1 text-sm font-bold uppercase tracking-wide text-amber-300">
          💡 Fun fact AI
        </p>
        <p className="text-white/90">{q.funFact}</p>
      </div>

      <button
        onClick={onNext}
        className="rounded-2xl bg-white px-8 py-3 text-lg font-black text-slate-900 transition hover:scale-105"
      >
        Xem bảng xếp hạng →
      </button>
    </div>
  );
}
