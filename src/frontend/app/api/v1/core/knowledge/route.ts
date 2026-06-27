import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "@/lib/demo-core";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? "";
  return NextResponse.json(searchKnowledge(query));
}
