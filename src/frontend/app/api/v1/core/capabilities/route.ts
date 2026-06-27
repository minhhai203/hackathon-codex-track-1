import { NextResponse } from "next/server";
import { getCapabilities } from "@/lib/demo-core";

export async function GET() {
  return NextResponse.json(getCapabilities());
}
