import { NextRequest, NextResponse } from "next/server";
import { summarizeManager } from "@/lib/demo-core";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(summarizeManager(body));
}
