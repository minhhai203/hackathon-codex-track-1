import { NextResponse } from "next/server";
import { startGameSession } from "@/lib/game/store";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ sessionId: string }> | { sessionId: string };
};

async function readSessionId(context: RouteContext) {
  const params = await context.params;
  return params.sessionId;
}

function statusForError(error?: string) {
  if (error === "not-found") return 404;
  if (error === "forbidden") return 403;
  if (error === "not-ready" || error === "invalid-phase") return 409;
  return 200;
}

export async function POST(request: Request, context: RouteContext) {
  const body = await request.json().catch(() => ({}));
  const result = startGameSession(await readSessionId(context), String(body.host_token || ""));
  if (result.error) {
    return NextResponse.json({ error: result.error, session: result.session }, { status: statusForError(result.error) });
  }
  return NextResponse.json({ session: result.session });
}
