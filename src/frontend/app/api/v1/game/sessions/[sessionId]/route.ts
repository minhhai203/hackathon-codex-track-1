import { NextResponse } from "next/server";
import { getGameSession } from "@/lib/game/store";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ sessionId: string }> | { sessionId: string };
};

async function readSessionId(context: RouteContext) {
  const params = await context.params;
  return params.sessionId;
}

export async function GET(_request: Request, context: RouteContext) {
  const session = getGameSession(await readSessionId(context));
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  return NextResponse.json({ session });
}
