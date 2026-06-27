import { NextRequest, NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/game/store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const department = request.nextUrl.searchParams.get("department");
  return NextResponse.json({ leaderboard: getLeaderboard(department) });
}
