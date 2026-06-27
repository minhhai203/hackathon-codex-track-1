import type { LearningPath } from "@/lib/workspace-types";

const LEARNING_PATH_TOKENS = ["lộ trình", "lo trinh", "path", "module", "khóa", "khoa", "học gì", "hoc gi"];

export function compactTitle(title: string) {
  return title.replace(/^AI For /, "AI cho ").replace(/^Prompt Basics For /, "Prompt căn bản cho ");
}

export function isLearningPathQuestion(text: string) {
  const normalized = text.toLowerCase();
  return LEARNING_PATH_TOKENS.some((token) => normalized.includes(token));
}

export function describeLearningPath(path: LearningPath, departmentName: string) {
  const modules = path.modules
    .slice(0, 4)
    .map((module, index) => `${index + 1}. ${compactTitle(module.title)}: ${module.outcome}`)
    .join(" ");
  const source = path.source === "supabase" ? "Supabase learning_modules" : "catalog fallback";
  return `Em đã tạo lộ trình ${departmentName} từ ${source}: ${modules}`;
}
