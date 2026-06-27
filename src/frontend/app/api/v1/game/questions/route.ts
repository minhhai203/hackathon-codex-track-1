import { NextResponse } from "next/server";
import { getQuestionBank } from "@/lib/game/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ questions: getQuestionBank() });
}
