import { recommendLearningPath, type LearningPathRequest } from "@/lib/demo-core";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type ModuleContent = {
  tags?: unknown;
  starter_kit?: unknown;
  prerequisite_ids?: unknown;
};

type LearningModuleRow = {
  id: string;
  role_id: string;
  tier: number;
  level: number;
  title: string;
  outcome: string;
  content: ModuleContent | null;
};

type LearningModule = {
  module_id: string;
  title: string;
  role_id: string;
  tier: number;
  level: number;
  tags: string[];
  outcome: string;
  starter_kit: string[];
  prerequisite_ids: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(body: Record<string, unknown>, field: "role_id") {
  const value = body[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

function optionalInteger(body: Record<string, unknown>, field: "ai_level") {
  const value = body[field] ?? 0;
  const numberValue = typeof value === "string" && value.trim() ? Number(value) : value;
  if (typeof numberValue !== "number" || !Number.isInteger(numberValue) || numberValue < 0 || numberValue > 5) {
    throw new Error(`${field} must be an integer from 0 to 5`);
  }
  return numberValue;
}

function stringArray(body: Record<string, unknown>, field: "goals" | "completed_modules") {
  const value = body[field];
  if (value == null) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${field} must be an array of strings`);
  }
  return value.map((item) => item.trim()).filter(Boolean);
}

function contentArray(content: ModuleContent | null | undefined, field: keyof ModuleContent) {
  const value = content?.[field];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function toLearningModule(row: LearningModuleRow): LearningModule {
  return {
    module_id: row.id,
    title: row.title,
    role_id: row.role_id,
    tier: row.tier,
    level: row.level,
    tags: contentArray(row.content, "tags"),
    outcome: row.outcome,
    starter_kit: contentArray(row.content, "starter_kit"),
    prerequisite_ids: contentArray(row.content, "prerequisite_ids")
  };
}

function countKeywordHits(text: string, keywords: string[]) {
  const normalized = text.toLowerCase();
  return keywords.filter((keyword) => normalized.includes(keyword)).length;
}

function recommendFromCatalog(request: LearningPathRequest, catalog: LearningModule[]) {
  const completed = new Set(request.completed_modules ?? []);
  const aiLevel = request.ai_level ?? 0;
  const goalsText = (request.goals ?? []).join(" ");
  const roleKeywords: Record<string, string[]> = {
    "kinh-doanh": ["sale", "sales", "customer", "deal", "proposal", "khach hang"],
    marketing: ["marketing", "content", "campaign", "brand", "noi dung"],
    "ke-toan": ["account", "report", "finance", "invoice", "bao cao"],
    "van-hanh": ["ops", "workflow", "sop", "process", "quy trinh"],
    khac: ["notes", "meeting", "research", "summary", "dao tao"]
  };
  const roleHits = countKeywordHits(goalsText, roleKeywords[request.role_id] ?? []);
  const common = catalog.filter((module) => module.role_id === "common" && !completed.has(module.module_id));
  const roleSpecific = catalog.filter((module) => module.role_id === request.role_id && !completed.has(module.module_id));
  const selected: LearningModule[] = [];
  const reasons: string[] = [];

  for (const module of common) {
    if (module.level <= Math.max(1, aiLevel || 1)) {
      selected.push(module);
      reasons.push(`Nen tang chung tu Supabase: ${module.outcome}`);
    }
  }

  for (const module of roleSpecific) {
    if (module.level <= Math.max(2, aiLevel + 1)) {
      selected.push(module);
      reasons.push(roleHits ? `Khop muc tieu cong viec: ${module.title}` : `Module theo vai tro ${request.role_id}: ${module.outcome}`);
    }
  }

  const modules = selected.length ? selected.slice(0, 6) : catalog.filter((module) => !completed.has(module.module_id)).slice(0, 6);

  return {
    role_id: request.role_id,
    ai_level: aiLevel,
    modules,
    reasons: reasons.length ? reasons.slice(0, modules.length) : modules.map((module) => `Lay tu learning_modules: ${module.title}`),
    starter_kit: modules.flatMap((module) => module.starter_kit.slice(0, 1)).slice(0, 6),
    confidence: Math.min(68 + Math.min(aiLevel * 5, 20) + Math.min(roleHits * 4, 12), 96),
    warnings: modules.length ? [] : ["Khong tim thay module phu hop trong Supabase catalog."],
    source: "supabase"
  };
}

async function getSupabaseLearningPath(request: LearningPathRequest) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("learning_modules")
    .select("id, role_id, tier, level, title, outcome, content")
    .eq("active", true)
    .in("role_id", ["common", request.role_id])
    .order("tier", { ascending: true })
    .order("level", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data?.length) {
    return null;
  }

  return recommendFromCatalog(request, (data as LearningModuleRow[]).map(toLearningModule));
}

export function parseLearningPathRequest(body: unknown): LearningPathRequest {
  if (!isRecord(body)) {
    throw new Error("Body must be a JSON object");
  }

  return {
    role_id: requiredString(body, "role_id"),
    ai_level: optionalInteger(body, "ai_level"),
    goals: stringArray(body, "goals"),
    completed_modules: stringArray(body, "completed_modules")
  };
}

export async function buildLearningPath(request: LearningPathRequest) {
  const supabasePath = await getSupabaseLearningPath(request);

  if (supabasePath) {
    return supabasePath;
  }

  return {
    ...recommendLearningPath(request),
    source: "demo",
    warnings: ["Supabase catalog chua san sang, dang dung fallback catalog trong app."]
  };
}
