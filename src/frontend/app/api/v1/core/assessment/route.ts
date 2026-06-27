import { NextRequest, NextResponse } from "next/server";
import { scoreAssessment, type AssessmentRequest } from "@/lib/demo-core";

const scoreFields = ["ai_tool_experience", "prompt_confidence", "safety_awareness"] as const;

type ScoreField = (typeof scoreFields)[number];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(body: Record<string, unknown>, field: "role_id" | "employee_name" | "current_work") {
  const value = body[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

function optionalString(body: Record<string, unknown>, field: "department") {
  const value = body[field];
  if (value == null || value === "") return null;
  if (typeof value !== "string") {
    throw new Error(`${field} must be a string`);
  }
  return value.trim();
}

function stringArray(body: Record<string, unknown>, field: "daily_tasks" | "goals") {
  const value = body[field];
  if (value == null) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${field} must be an array of strings`);
  }
  return value.map((item) => item.trim()).filter(Boolean);
}

function scoreValue(body: Record<string, unknown>, field: ScoreField) {
  const value = body[field] ?? 0;
  const numberValue = typeof value === "string" && value.trim() ? Number(value) : value;
  if (typeof numberValue !== "number" || !Number.isInteger(numberValue) || numberValue < 0 || numberValue > 5) {
    throw new Error(`${field} must be an integer from 0 to 5`);
  }
  return numberValue;
}

function preferredAddress(body: Record<string, unknown>): AssessmentRequest["preferred_address"] {
  const value = body.preferred_address ?? "neutral";
  if (value !== "anh" && value !== "chi" && value !== "neutral") {
    throw new Error("preferred_address must be anh, chi, or neutral");
  }
  return value;
}

function parseAssessmentRequest(body: unknown): AssessmentRequest {
  if (!isRecord(body)) {
    throw new Error("Body must be a JSON object");
  }

  return {
    role_id: requiredString(body, "role_id"),
    department: optionalString(body, "department"),
    employee_name: requiredString(body, "employee_name"),
    current_work: requiredString(body, "current_work"),
    ai_tool_experience: scoreValue(body, "ai_tool_experience"),
    prompt_confidence: scoreValue(body, "prompt_confidence"),
    safety_awareness: scoreValue(body, "safety_awareness"),
    daily_tasks: stringArray(body, "daily_tasks"),
    goals: stringArray(body, "goals"),
    preferred_address: preferredAddress(body)
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json(scoreAssessment(parseAssessmentRequest(body)));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid assessment request" },
      { status: 400 }
    );
  }
}
