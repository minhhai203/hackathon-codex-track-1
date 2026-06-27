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

export async function POST(_request: Request, context: RouteContext) {
  const session = startGameSession(await readSessionId(context));
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  return NextResponse.json({ session });
}
