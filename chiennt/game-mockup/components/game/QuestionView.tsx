"use client";

import { GameState } from "@/lib/game/types";
import { currentQuestion } from "@/lib/game/engine";
import { Countdown } from "./Countdown";
import { optionStyle } from "./optionStyles";

const TYPE_LABEL: Record<string, string> = {
  mcq: "Trắc nghiệm",
  truefalse: "Đúng / Sai",
  guess: "Đoán output AI",
};

export function QuestionView({
  state,
  humanId,
  onAnswer,
}: {
  state: GameState;
  humanId: string;
  onAnswer: (index: number) => void;
}) {
  const q = currentQuestion(state);
  if (!q || state.deadlineTs === null) return null;

  const myAnswer = state.currentAnswers[humanId];
  const answeredCount = Object.keys(state.currentAnswers).length;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between text-sm text-white/60">
        <span className="rounded-full bg-white/10 px-3 py-1 font-semibold">
          Câu {state.currentIndex + 1}/{state.questions.length} •{" "}
          {TYPE_LABEL[q.type]}
        </span>
        <span>
          {answeredCount}/{state.players.length} đã trả lời
        </span>
      </div>

      <Countdown deadlineTs={state.deadlineTs} timeLimitSec={q.timeLimitSec} />

      <h2 className="rounded-3xl bg-white/10 px-6 py-8 text-center text-2xl font-bold sm:text-3xl">
        {q.prompt}
      </h2>

      <div
        className={`grid gap-4 ${
          q.type === "truefalse" ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {q.options.map((opt, i) => {
          const st = optionStyle(i);
          const picked = myAnswer?.selectedIndex === i;
          const locked = !!myAnswer;
          return (
            <button
              key={i}
              disabled={locked}
              onClick={() => onAnswer(i)}
              className={`flex items-center gap-4 rounded-2xl px-6 py-5 text-left text-lg font-bold text-white shadow-lg transition ${
                st.bg
              } ${picked ? "scale-[1.02] ring-4 ring-white" : ""} ${
                locked && !picked ? "opacity-40" : "hover:scale-[1.02]"
              }`}
            >
              <span className="text-2xl">{st.shape}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {myAnswer && (
        <p className="animate-pop text-center text-lg font-semibold text-emerald-300">
          ✓ Đã gửi! Chờ mọi người...
        </p>
      )}
    </div>
  );
}
