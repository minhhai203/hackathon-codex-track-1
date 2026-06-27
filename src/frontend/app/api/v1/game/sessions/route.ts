import { NextResponse } from "next/server";
import { createGameSession } from "@/lib/game/store";
import { HUMAN_PLAYER_ID } from "@/lib/game/seed";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = createGameSession();
  return NextResponse.json({ session, player_id: HUMAN_PLAYER_ID }, { status: 201 });
}
