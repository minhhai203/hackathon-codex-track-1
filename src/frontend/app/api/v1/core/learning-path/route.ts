import { NextRequest, NextResponse } from "next/server";
import { recommendLearningPath } from "@/lib/demo-core";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(recommendLearningPath(body));
}
