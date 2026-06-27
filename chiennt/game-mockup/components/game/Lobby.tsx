"use client";

import { GameState } from "@/lib/game/types";

export function Lobby({
  state,
  onStart,
}: {
  state: GameState;
  onStart: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
      <div className="rounded-3xl bg-white/10 px-8 py-6">
        <p className="text-sm uppercase tracking-widest text-white/50">
          Mã phòng
        </p>
        <p className="text-5xl font-black tracking-[0.3em] text-amber-300">
          AI-247
        </p>
      </div>

      <p className="text-lg text-white/70">
        {state.players.length} người chơi đã sẵn sàng • {state.questions.length}{" "}
        câu hỏi chủ đề AI
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {state.players.map((p) => (
          <div
            key={p.id}
            className="flex animate-pop items-center gap-2 rounded-full bg-white/10 px-4 py-2"
          >
            <span className="text-xl">{p.avatar ?? "🙂"}</span>
            <span className="font-semibold">{p.name}</span>
            <span className="text-xs text-white/40">{p.department}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-10 py-4 text-2xl font-black text-slate-900 shadow-xl transition hover:scale-105"
      >
        Bắt đầu ▶
      </button>
    </div>
  );
}
