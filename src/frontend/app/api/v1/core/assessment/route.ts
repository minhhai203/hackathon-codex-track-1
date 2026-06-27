import { NextRequest, NextResponse } from "next/server";
import { scoreAssessment } from "@/lib/demo-core";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(scoreAssessment(body));
}
