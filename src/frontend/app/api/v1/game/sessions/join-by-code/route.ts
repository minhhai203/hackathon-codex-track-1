import { NextRequest, NextResponse } from "next/server";
import { joinGameSessionByCode } from "@/lib/game/store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const result = joinGameSessionByCode(
    String(body.pin_code || ""),
    String(body.display_name || "Nhân viên"),
    String(body.department || "Marketing")
  );

  if (!result) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  if (!result.playerId) {
    return NextResponse.json({ error: "Room already started", session: result.session }, { status: 409 });
  }

  return NextResponse.json({ session: result.session, player_id: result.playerId });
}
