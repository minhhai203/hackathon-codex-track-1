"use client";

import { useGame } from "@/lib/game/useGame";
import { Lobby } from "@/components/game/Lobby";
import { QuestionView } from "@/components/game/QuestionView";
import { Reveal } from "@/components/game/Reveal";
import { Scoreboard } from "@/components/game/Scoreboard";
import { WinnerPodium } from "@/components/game/WinnerPodium";

export default function GamePage() {
  const { state, actions, humanId } = useGame();

  function replay() {
    // Đơn giản cho mock: tải lại trang để tạo phiên mới.
    if (typeof window !== "undefined") window.location.reload();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-black">🤖 AI Quiz Battle</h1>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
          {labelForPhase(state.phase)}
        </span>
      </header>

      {state.phase === "lobby" && <Lobby state={state} onStart={actions.start} />}
      {state.phase === "question" && (
        <QuestionView state={state} humanId={humanId} onAnswer={actions.answer} />
      )}
      {state.phase === "reveal" && (
        <Reveal state={state} humanId={humanId} onNext={actions.next} />
      )}
      {state.phase === "scoreboard" && (
        <Scoreboard state={state} humanId={humanId} onNext={actions.next} />
      )}
      {state.phase === "gameover" && (
        <WinnerPodium state={state} humanId={humanId} onReplay={replay} />
      )}
    </main>
  );
}

function labelForPhase(phase: string): string {
  const map: Record<string, string> = {
    lobby: "Phòng chờ",
    question: "Đang thi đấu",
    reveal: "Lộ đáp án",
    scoreboard: "Xếp hạng",
    gameover: "Kết thúc",
  };
  return map[phase] ?? phase;
}
