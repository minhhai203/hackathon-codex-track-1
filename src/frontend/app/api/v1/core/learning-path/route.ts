import { NextRequest, NextResponse } from "next/server";
import { buildLearningPath, parseLearningPathRequest } from "@/lib/learning-path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json(await buildLearningPath(parseLearningPathRequest(body)));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid learning path request" },
      { status: 400 }
    );
  }
}
