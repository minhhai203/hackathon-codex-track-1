"use client";

import { useMemo, useState } from "react";
import { GameState } from "@/lib/game/types";

export function WinnerPodium({
  state,
  humanId,
  onReplay,
}: {
  state: GameState;
  humanId: string;
  onReplay: () => void;
}) {
  const ranking = state.ranking;
  const winner = ranking[0];
  const podium = ranking.slice(0, 3);

  // Bộ lọc phòng ban cho leaderboard tổng.
  const departments = useMemo(
    () => ["Tất cả", ...Array.from(new Set(state.players.map((p) => p.department)))],
    [state.players]
  );
  const [dept, setDept] = useState("Tất cả");
  const filtered =
    dept === "Tất cả"
      ? ranking
      : ranking.filter((r) => r.player.department === dept);

  const podiumOrder = [podium[1], podium[0], podium[2]].filter(Boolean);
  const heights = ["h-28", "h-40", "h-20"];
  const medals = ["🥈", "🥇", "🥉"];

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
      {/* Popup vinh danh */}
      <div className="animate-pop text-center">
        <p className="text-lg uppercase tracking-widest text-white/60">
          Nhà vô địch
        </p>
        <p className="text-6xl">{winner?.player.avatar ?? "👑"}</p>
        <p className="text-4xl font-black text-amber-300">
          {winner?.player.name}
        </p>
        <p className="text-white/70">
          {winner?.score.total} điểm • {winner?.player.department}
        </p>
      </div>

      {/* Podium top 3 */}
      <div className="flex items-end justify-center gap-3">
        {podiumOrder.map((row, i) => (
          <div key={row.player.id} className="flex w-24 flex-col items-center gap-1">
            <span className="text-3xl">{row.player.avatar ?? "🙂"}</span>
            <span className="text-sm font-bold">{row.player.name}</span>
            <div
              className={`flex w-full ${heights[i]} items-start justify-center rounded-t-xl bg-gradient-to-t from-indigo-600 to-fuchsia-500 pt-2 text-2xl`}
            >
              {medals[i]}
            </div>
            <span className="text-sm font-black text-amber-300">
              {row.score.total}
            </span>
          </div>
        ))}
      </div>

      {/* Leaderboard tổng + lọc phòng ban */}
      <div className="w-full rounded-2xl bg-white/5 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-bold">Bảng xếp hạng — lọc phòng ban</h3>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="rounded-lg bg-slate-800 px-3 py-1 text-sm"
          >
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          {filtered.map((row, i) => (
            <div
              key={row.player.id}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                row.player.id === humanId ? "bg-indigo-500/30" : "bg-white/5"
              }`}
            >
              <span className="w-6 text-center font-bold text-white/50">
                {i + 1}
              </span>
              <span>{row.player.avatar}</span>
              <span className="flex-1 font-semibold">{row.player.name}</span>
              <span className="text-xs text-white/40">{row.player.department}</span>
              <span className="font-black">{row.score.total}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReplay}
        className="rounded-2xl bg-white px-8 py-3 text-lg font-black text-slate-900 transition hover:scale-105"
      >
        Chơi lại 🔁
      </button>
      <p className="text-sm text-white/40">Hẹn gặp lại sáng thứ 2 tuần sau! 👋</p>
    </div>
  );
}
