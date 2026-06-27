import { NextRequest, NextResponse } from "next/server";
import { submitGameAnswer } from "@/lib/game/store";
import { HUMAN_PLAYER_ID } from "@/lib/game/seed";

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
  const result = submitGameAnswer(
    await readSessionId(context),
    String(body.player_id || HUMAN_PLAYER_ID),
    Number(body.selected_index)
  );

  if (!result) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: result.accepted ? 200 : 409 });
}
