import { NextResponse } from "next/server";
import { createGameSession } from "@/lib/game/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const result = createGameSession({
    hostName: String(body.host_name || ""),
    hostDepartment: String(body.host_department || ""),
    questionMode: body.question_mode === "custom" ? "custom" : "random",
    selectedQuestionIds: Array.isArray(body.selected_question_ids) ? body.selected_question_ids.map(String) : [],
    customQuestions: Array.isArray(body.custom_questions) ? body.custom_questions : []
  });
  return NextResponse.json({ session: result.session, host_token: result.hostToken }, { status: 201 });
}
