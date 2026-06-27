import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/demo-core";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(chat(String(body.message ?? ""), String(body.context ?? "")));
}
