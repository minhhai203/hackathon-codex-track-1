// React hook nối UI với GameController. UI không biết là mock hay backend.
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MockGameController, GameController } from "./transport";
import { MOCK_PLAYERS, MOCK_QUESTIONS, HUMAN_PLAYER_ID } from "./mockData";
import { GameState } from "./types";

export function useGame() {
  // Khởi tạo controller một lần. Đổi sang WebSocketGameController khi có backend.
  const controllerRef = useRef<GameController | null>(null);
  if (controllerRef.current === null) {
    controllerRef.current = new MockGameController(
      MOCK_PLAYERS,
      MOCK_QUESTIONS,
      { humanPlayerId: HUMAN_PLAYER_ID }
    );
  }
  const controller = controllerRef.current;

  const [state, setState] = useState<GameState>(controller.getState());

  useEffect(() => {
    const unsub = controller.subscribe(setState);
    return () => {
      unsub();
      controller.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions = useMemo(
    () => ({
      start: () => controller.startGame(),
      answer: (optionIndex: number) =>
        controller.submitAnswer(HUMAN_PLAYER_ID, optionIndex),
      next: () => controller.next(),
    }),
    [controller]
  );

  return { state, actions, humanId: HUMAN_PLAYER_ID };
}
