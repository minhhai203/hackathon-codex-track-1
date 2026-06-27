import type { FormEvent } from "react";

export type Section = "learn" | "player" | "tutor" | "progress" | "manager";

export type Module = {
  module_id: string;
  title: string;
  role_id: string;
  level: number;
  outcome: string;
  tags: string[];
  starter_kit: string[];
};

export type AssessmentResult = {
  score: number;
  ai_level: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommended_modules: Module[];
};

export type LearningPath = {
  modules: Module[];
  reasons: string[];
  starter_kit: string[];
  confidence: number;
  warnings: string[];
  source?: "supabase" | "demo";
};

export type ManagerSummary = {
  organization_name: string;
  team_size: number;
  average_completion: number;
  total_hours_saved: number;
  top_department: string;
  at_risk_employees: string[];
  department_counts: Record<string, number>;
  last_team_activity: string[];
};

export type ProgressSummary = {
  completion_percent: number;
  completed_modules: string[];
  next_modules: Module[];
  hours_saved: number;
  recent_activity: string[];
};

export type ChatMessage = {
  id: string;
  role: "ai" | "me";
  text: string;
};

export type Department = {
  id: string;
  name: string;
  course: string;
  progress: number;
  seats: number;
  tone: string;
};

export type ApiState = "checking" | "live" | "demo";

export type AssessmentHandler = (event: FormEvent<HTMLFormElement>) => Promise<void>;
export type ChatHandler = (event: FormEvent<HTMLFormElement>) => Promise<void>;
