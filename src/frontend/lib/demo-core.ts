export type LearningModule = {
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

export type AssessmentRequest = {
  role_id: string;
  department?: string | null;
  employee_name: string;
  current_work: string;
  ai_tool_experience?: number;
  prompt_confidence?: number;
  safety_awareness?: number;
  daily_tasks?: string[];
  goals?: string[];
  preferred_address?: "anh" | "chi" | "neutral";
};

export type LearningPathRequest = {
  role_id: string;
  ai_level?: number;
  goals?: string[];
  completed_modules?: string[];
};

export type ProgressSummaryRequest = {
  employee_name: string;
  role_id: string;
  completed_modules?: string[];
  hours_saved?: number;
  recent_activity?: string[];
};

export type TeamMemberSnapshot = {
  name: string;
  role_id: string;
  department: string;
  ai_level: number;
  completed_modules: string[];
  quiz_pass_rate: number;
  hours_saved: number;
  last_activity: string;
};

export type ManagerSummaryRequest = {
  organization_name: string;
  risk_threshold?: number;
  team?: TeamMemberSnapshot[];
};

const commonModules: LearningModule[] = [
  {
    module_id: "foundation-ai-safety",
    title: "AI Safety And Data Boundaries",
    role_id: "common",
    tier: 1,
    level: 1,
    tags: ["safety", "governance", "company-data"],
    outcome: "Learner can identify what data should not be pasted into AI tools.",
    starter_kit: ["Check data sensitivity before prompting.", "Redact private fields before using AI."],
    prerequisite_ids: []
  },
  {
    module_id: "foundation-prompt-basics",
    title: "Prompt Basics For Daily Work",
    role_id: "common",
    tier: 1,
    level: 1,
    tags: ["prompting", "workflow", "productivity"],
    outcome: "Learner can turn a daily task into a clear AI prompt.",
    starter_kit: ["Ask for output format first.", "Give role, context, and constraints."],
    prerequisite_ids: ["foundation-ai-safety"]
  },
  {
    module_id: "foundation-tool-selection",
    title: "Choose The Right AI Tool",
    role_id: "common",
    tier: 2,
    level: 2,
    tags: ["tooling", "workflow", "decision"],
    outcome: "Learner can decide when to use chat, search, summarization, or automation.",
    starter_kit: ["Match the tool to the job.", "Prefer the simplest workflow first."],
    prerequisite_ids: ["foundation-prompt-basics"]
  },
  {
    module_id: "foundation-rag-basics",
    title: "Search, Retrieve, And Ground Answers",
    role_id: "common",
    tier: 3,
    level: 3,
    tags: ["rag", "retrieval", "grounding"],
    outcome: "Learner can understand why retrieval matters and how to verify an answer.",
    starter_kit: ["Ask the source before trusting the answer.", "Use snippets, not memory only."],
    prerequisite_ids: ["foundation-tool-selection"]
  }
];

const roleModules: LearningModule[] = [
  {
    module_id: "sales-discovery-ai",
    title: "AI For Sales Discovery",
    role_id: "kinh-doanh",
    tier: 2,
    level: 2,
    tags: ["sales", "customer", "discovery"],
    outcome: "Learner can use AI to prepare discovery questions and account notes.",
    starter_kit: ["Draft discovery questions.", "Summarize call notes into next steps."],
    prerequisite_ids: ["foundation-prompt-basics"]
  },
  {
    module_id: "sales-proposal-ai",
    title: "AI For Proposals And Follow-ups",
    role_id: "kinh-doanh",
    tier: 3,
    level: 3,
    tags: ["sales", "proposal", "follow-up"],
    outcome: "Learner can generate a polished proposal draft and follow-up plan.",
    starter_kit: ["Turn call notes into a proposal outline.", "Ask for objection handling ideas."],
    prerequisite_ids: ["sales-discovery-ai"]
  },
  {
    module_id: "accounting-report-automation",
    title: "Accounting Reporting Automation",
    role_id: "ke-toan",
    tier: 2,
    level: 2,
    tags: ["accounting", "reporting", "automation"],
    outcome: "Learner can reduce manual reporting work with structured prompts.",
    starter_kit: ["Ask for report templates.", "Summarize monthly variance explanations."],
    prerequisite_ids: ["foundation-prompt-basics"]
  },
  {
    module_id: "marketing-content-planning",
    title: "AI For Content Planning",
    role_id: "marketing",
    tier: 2,
    level: 2,
    tags: ["marketing", "content", "planning"],
    outcome: "Learner can plan content themes and production briefs with AI.",
    starter_kit: ["Turn campaign goals into weekly themes.", "Ask for content angles."],
    prerequisite_ids: ["foundation-prompt-basics"]
  },
  {
    module_id: "marketing-campaign-briefs",
    title: "AI For Campaign Briefs",
    role_id: "marketing",
    tier: 3,
    level: 3,
    tags: ["marketing", "campaign", "brief"],
    outcome: "Learner can draft campaign briefs and iterate them quickly.",
    starter_kit: ["Draft a campaign brief.", "Ask for audience and CTA variants."],
    prerequisite_ids: ["marketing-content-planning"]
  },
  {
    module_id: "operations-workflow-automation",
    title: "AI For Operations Workflow Automation",
    role_id: "van-hanh",
    tier: 2,
    level: 2,
    tags: ["operations", "workflow", "automation"],
    outcome: "Learner can speed up recurring ops work with AI templates.",
    starter_kit: ["List repetitive tasks.", "Draft a workflow SOP."],
    prerequisite_ids: ["foundation-prompt-basics"]
  },
  {
    module_id: "general-productivity-notes",
    title: "AI For Notes And Meetings",
    role_id: "khac",
    tier: 2,
    level: 2,
    tags: ["general", "notes", "meetings"],
    outcome: "Learner can turn meetings into structured next actions.",
    starter_kit: ["Summarize meeting notes.", "Extract action items and owners."],
    prerequisite_ids: ["foundation-prompt-basics"]
  }
];

const demoTeam: TeamMemberSnapshot[] = [
  {
    name: "An",
    role_id: "marketing",
    department: "Marketing",
    ai_level: 3,
    completed_modules: ["foundation-ai-safety", "foundation-prompt-basics", "marketing-content-planning"],
    quiz_pass_rate: 82,
    hours_saved: 11.5,
    last_activity: "Completed a campaign brief draft"
  },
  {
    name: "Binh",
    role_id: "kinh-doanh",
    department: "Sales",
    ai_level: 2,
    completed_modules: ["foundation-ai-safety", "foundation-prompt-basics", "sales-discovery-ai"],
    quiz_pass_rate: 76,
    hours_saved: 8,
    last_activity: "Used AI to summarize discovery calls"
  },
  {
    name: "Chi",
    role_id: "ke-toan",
    department: "Finance",
    ai_level: 2,
    completed_modules: ["foundation-ai-safety", "foundation-prompt-basics", "accounting-report-automation"],
    quiz_pass_rate: 88,
    hours_saved: 14,
    last_activity: "Automated monthly variance notes"
  }
];

const knowledgeBase = [
  "Use safe prompting, then ground answers in curriculum or company data.",
  "A learner should get a path that starts with foundation modules and then role-specific modules.",
  "A manager needs evidence, not just a summary paragraph.",
  "A strong RAG system must show retrieved context and admit missing evidence.",
  "Practice grading should store rubric version and confidence."
];

function normalize(text: string) {
  return text.toLowerCase().split(/\s+/).filter(Boolean).join(" ");
}

function scoreKeywords(text: string, keywords: string[]) {
  const normalized = normalize(text);
  return keywords.filter((keyword) => normalized.includes(keyword)).length;
}

function getModules() {
  return [...commonModules, ...roleModules];
}

function getRoleModules(roleId: string) {
  return roleModules.filter((module) => module.role_id === roleId);
}

export function getCapabilities() {
  return {
    features: [
      "Assessment scoring",
      "Learning path recommendation",
      "Knowledge search",
      "Progress summary",
      "Manager summary",
      "Chat planning assistant"
    ],
    data_sources: ["Next.js route handlers", "Static learning catalog", "Demo team snapshots"]
  };
}

export function scoreAssessment(request: AssessmentRequest) {
  const base = 20;
  const toolScore = Math.min(request.ai_tool_experience ?? 0, 5) * 8;
  const confidenceScore = Math.min(request.prompt_confidence ?? 0, 5) * 6;
  const safetyScore = Math.min(request.safety_awareness ?? 0, 5) * 6;
  const specificityScore = Math.min(request.daily_tasks?.length ?? 0, 5) * 4 + Math.min(request.goals?.length ?? 0, 5) * 3;
  const roleBonus = request.role_id !== "khac" ? 8 : 4;
  const score = Math.min(base + toolScore + confidenceScore + safetyScore + specificityScore + roleBonus, 100);
  const thresholds = [25, 40, 55, 70, 85];
  const ai_level = thresholds.reduce((level, threshold, index) => (score >= threshold ? index + 1 : level), 0);

  const strengths = [
    ...(Number(request.ai_tool_experience) >= 3 ? ["Has hands-on AI tool exposure"] : []),
    ...(Number(request.prompt_confidence) >= 3 ? ["Can already phrase useful prompts"] : []),
    ...(Number(request.safety_awareness) >= 3 ? ["Understands data sensitivity"] : [])
  ];

  const gaps = [
    ...(Number(request.ai_tool_experience) < 3 ? ["Needs practice turning work tasks into prompts"] : []),
    ...(Number(request.prompt_confidence) < 3 ? ["Needs stronger output framing"] : []),
    ...(Number(request.safety_awareness) < 3 ? ["Needs better data handling habits"] : [])
  ];

  const path = recommendLearningPath({
    role_id: request.role_id,
    ai_level,
    goals: request.goals ?? [],
    completed_modules: []
  });

  return {
    score,
    ai_level,
    role_id: request.role_id,
    summary: `AI level ${ai_level} for role ${request.role_id}. Focus the next step on ${request.department || "the learner role"} workflows, starting with safe prompting and one real task.`,
    strengths: strengths.length ? strengths : ["Has a clear baseline to start from"],
    gaps: gaps.length ? gaps : ["Can move beyond basics into role-specific workflows"],
    recommended_modules: path.modules.slice(0, 4)
  };
}

export function recommendLearningPath(request: LearningPathRequest) {
  const completed = new Set(request.completed_modules ?? []);
  const aiLevel = request.ai_level ?? 0;
  const common = commonModules.filter((module) => !completed.has(module.module_id));
  const roleSpecific = getRoleModules(request.role_id).filter((module) => !completed.has(module.module_id));
  const goalsText = (request.goals ?? []).join(" ").toLowerCase();
  const goalKeywords: Record<string, string[]> = {
    sales: ["sale", "customer", "deal", "proposal"],
    "kinh-doanh": ["sale", "customer", "deal", "proposal"],
    marketing: ["marketing", "content", "campaign", "brand"],
    "ke-toan": ["account", "report", "finance", "invoice"],
    "van-hanh": ["ops", "workflow", "sop", "process"]
  };
  const roleHits = scoreKeywords(goalsText, goalKeywords[request.role_id] ?? []);
  const modules: LearningModule[] = [];
  const reasons: string[] = [];

  for (const module of common) {
    if (module.level <= Math.max(1, aiLevel || 1)) {
      modules.push(module);
      reasons.push(`Common foundation: ${module.outcome}`);
    }
  }

  for (const module of roleSpecific) {
    if (module.level <= Math.max(2, aiLevel + 1)) {
      modules.push(module);
      reasons.push(roleHits ? `Matches goal wording: ${module.title}` : `Role-specific practice for ${request.role_id}`);
    }
  }

  if (!modules.length) {
    modules.push(...(common.slice(0, 2).length ? common.slice(0, 2) : getModules().slice(0, 2)));
    reasons.push("Fallback to baseline foundation modules");
  }

  const selected = modules.slice(0, 6);
  return {
    role_id: request.role_id,
    ai_level: aiLevel,
    modules: selected,
    reasons: reasons.slice(0, selected.length),
    starter_kit: selected.flatMap((module) => module.starter_kit.slice(0, 1)).slice(0, 6),
    confidence: Math.min(55 + Math.min(aiLevel * 5, 20) + Math.min(roleHits * 4, 12), 95),
    warnings: [
      ...(aiLevel < 2 ? ["Start with foundation modules before advanced ones."] : []),
      ...(selected.length >= 6 ? ["Keep the first sprint to a small, demoable subset."] : [])
    ]
  };
}

export function summarizeProgress(request: ProgressSummaryRequest) {
  const completed = new Set(request.completed_modules ?? []);
  const scopedModules = getModules().filter((module) => ["common", request.role_id].includes(module.role_id));
  const completion_percent = Math.round((completed.size / Math.max(scopedModules.length, 1)) * 100);

  return {
    employee_name: request.employee_name,
    role_id: request.role_id,
    completion_percent,
    completed_modules: [...completed],
    next_modules: scopedModules.filter((module) => !completed.has(module.module_id)).slice(0, 4),
    hours_saved: request.hours_saved ?? 0,
    recent_activity: (request.recent_activity ?? []).slice(-5)
  };
}

export function summarizeManager(request: ManagerSummaryRequest) {
  const team = request.team?.length ? request.team : demoTeam;
  const riskThreshold = request.risk_threshold ?? 70;
  const department_counts = team.reduce<Record<string, number>>((counts, member) => {
    counts[member.department] = (counts[member.department] ?? 0) + 1;
    return counts;
  }, {});
  const average_completion = Math.round((team.reduce((sum, member) => sum + member.quiz_pass_rate, 0) / team.length) * 10) / 10;
  const total_hours_saved = Math.round(team.reduce((sum, member) => sum + member.hours_saved, 0) * 10) / 10;
  const top_department = Object.entries(department_counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? request.organization_name;

  return {
    organization_name: request.organization_name,
    team_size: team.length,
    average_completion,
    total_hours_saved,
    top_department,
    at_risk_employees: team.filter((member) => member.quiz_pass_rate < riskThreshold || member.ai_level < 2).map((member) => member.name),
    department_counts,
    last_team_activity: team.slice(0, 5).map((member) => member.last_activity)
  };
}

export function searchKnowledge(query: string) {
  const normalized = normalize(query);
  const matches = knowledgeBase
    .map((snippet) => ({
      snippet,
      score: normalized.split(" ").filter((word) => word && snippet.toLowerCase().includes(word)).length
    }))
    .filter((match) => match.score > 0)
    .slice(0, 3);

  return {
    query,
    matches: matches.length ? matches : [{ snippet: knowledgeBase[0], score: 0 }]
  };
}

export function chat(message: string, context = "") {
  const route = classifyRequest(message, context);
  const responseByRoute: Record<string, string> = {
    assessment: "Use the onboarding assessment to score AI maturity before assigning modules.",
    learning_path: "Start with safe prompting, then add role-specific modules and explain every recommendation.",
    progress: "Progress should combine completed modules, practice evidence, and hours saved.",
    manager: "Manager analytics should show evidence by department and flag learners who need support.",
    knowledge: "Ground tutor answers in retrieved curriculum or admit when context is missing.",
    general: "For the hackathon demo, keep one clear user workflow: assessment, path, tutor, progress, manager view."
  };

  return {
    response: responseByRoute[route],
    intent: route,
    action_items: recommendNextEndpoints(route),
    analysis: `Next.js API classified the message as ${route}.`
  };
}

function classifyRequest(text: string, context = "") {
  const normalized = `${text}\n${context}`.toLowerCase();
  if (["assessment", "level", "score", "onboarding"].some((token) => normalized.includes(token))) return "assessment";
  if (["path", "module", "lộ trình", "roadmap", "tier"].some((token) => normalized.includes(token))) return "learning_path";
  if (["progress", "completed", "hours saved", "tiến bộ"].some((token) => normalized.includes(token))) return "progress";
  if (["manager", "team", "department", "leadership", "dashboard"].some((token) => normalized.includes(token))) return "manager";
  if (["search", "knowledge", "docs", "source", "retrieve"].some((token) => normalized.includes(token))) return "knowledge";
  return "general";
}

function recommendNextEndpoints(route: string) {
  const suggestions: Record<string, string[]> = {
    assessment: ["POST /api/v1/core/assessment", "POST /api/v1/core/learning-path"],
    learning_path: ["POST /api/v1/core/learning-path"],
    progress: ["POST /api/v1/core/progress"],
    manager: ["POST /api/v1/core/manager"],
    knowledge: ["GET /api/v1/core/knowledge"],
    general: ["POST /api/v1/chat", "GET /api/v1/core/capabilities"]
  };
  return suggestions[route] ?? suggestions.general;
}
