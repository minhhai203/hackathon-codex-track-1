"use client";

import { GameState } from "@/lib/game/types";
import { hasNextQuestion } from "@/lib/game/engine";
import { AutoAdvanceHint } from "./AutoAdvanceHint";

export function Scoreboard({
  state,
  humanId,
  onNext,
}: {
  state: GameState;
  humanId: string;
  onNext: () => void;
}) {
  const more = hasNextQuestion(state);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <h2 className="text-center text-2xl font-black">🏆 Bảng xếp hạng</h2>

      <div className="space-y-2">
        {state.ranking.map((row) => {
          const isMe = row.player.id === humanId;
          const up = row.delta < 0;
          const down = row.delta > 0;
          return (
            <div
              key={row.player.id}
              className={`flex animate-pop items-center gap-3 rounded-xl px-4 py-3 transition ${
                isMe ? "bg-indigo-500/30 ring-2 ring-indigo-300" : "bg-white/10"
              }`}
            >
              <span className="w-8 text-center text-xl font-black text-amber-300">
                {row.rank}
              </span>
              <span className="text-2xl">{row.player.avatar ?? "🙂"}</span>
              <div className="flex-1">
                <p className="font-bold">
                  {row.player.name} {isMe && "(bạn)"}
                </p>
                <p className="text-xs text-white/50">{row.player.department}</p>
              </div>
              {up && <span className="text-emerald-400">▲{-row.delta}</span>}
              {down && <span className="text-red-400">▼{row.delta}</span>}
              <span className="w-20 text-right text-lg font-black">
                {row.score.total}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="mx-auto rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-8 py-3 text-lg font-black transition hover:scale-105"
      >
        {more ? "Câu tiếp theo →" : "Xem người chiến thắng 🎊"}
      </button>
      <div className="text-center">
        <AutoAdvanceHint />
      </div>
    </div>
  );
}
