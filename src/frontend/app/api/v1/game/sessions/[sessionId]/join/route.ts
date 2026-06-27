import { NextRequest, NextResponse } from "next/server";
import { joinGameSession } from "@/lib/game/store";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ sessionId: string }> | { sessionId: string };
};

async function readSessionId(context: RouteContext) {
  const params = await context.params;
  return params.sessionId;
}

export async function POST(request: NextRequest, context: RouteContext) {
  const body = await request.json().catch(() => ({}));
  const result = joinGameSession(
    await readSessionId(context),
    String(body.display_name || "Nhân viên"),
    String(body.department || "Marketing")
  );

  if (!result) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  if (!result.playerId) {
    return NextResponse.json({ error: "Room already started", session: result.session }, { status: 409 });
  }

  return NextResponse.json({ session: result.session, player_id: result.playerId });
}
