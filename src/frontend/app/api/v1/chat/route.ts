import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/demo-core";
import { buildLearningPath } from "@/lib/learning-path";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function inferRoleId(text: string) {
  const normalized = text.toLowerCase();
  if (normalized.includes("kinh doanh") || normalized.includes("sales")) return "kinh-doanh";
  if (normalized.includes("kế toán") || normalized.includes("ke toan") || normalized.includes("finance")) return "ke-toan";
  if (normalized.includes("vận hành") || normalized.includes("van hanh") || normalized.includes("ops")) return "van-hanh";
  if (normalized.includes("nhân sự") || normalized.includes("nhan su") || normalized.includes("hr")) return "khac";
  return "marketing";
}

function summarizePath(path: Awaited<ReturnType<typeof buildLearningPath>>) {
  const source = path.source === "supabase" ? "Supabase learning_modules" : "fallback catalog";
  const modules = path.modules
    .slice(0, 4)
    .map((module, index) => `${index + 1}. ${module.title}`)
    .join("; ");
  return `Đã tạo lộ trình từ ${source}: ${modules}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const message = String(body.message ?? "");
  const context = String(body.context ?? "");
  const result = chat(message, context);

  if (result.intent === "learning_path") {
    const path = await buildLearningPath({
      role_id: typeof body.role_id === "string" ? body.role_id : inferRoleId(`${message}\n${context}`),
      ai_level: typeof body.ai_level === "number" ? body.ai_level : 2,
      goals: [message].filter(Boolean),
      completed_modules: Array.isArray(body.completed_modules) ? body.completed_modules.filter(isString) : []
    });

    return NextResponse.json({
      ...result,
      response: summarizePath(path),
      action_items: [],
      analysis: `${result.analysis} Loaded ${path.modules.length} modules from ${path.source}.`,
      path
    });
  }

  return NextResponse.json(result);
}
