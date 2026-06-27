"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  LearnerScreen,
  ManagerScreen,
  PlayerScreen,
  ProgressScreen,
  TutorScreen,
  WorkspaceOverview
} from "@/components/workspace-screens";
import { getJson, postJson } from "@/lib/http";
import {
  departments,
  fallbackManager,
  fallbackModules,
  fallbackPath,
  fallbackProgress,
  initialMessages,
  sectionIds,
  sectionLinks,
  sectionMeta
} from "@/lib/workspace-data";
import { describeLearningPath, isLearningPathQuestion } from "@/lib/workspace-display";
import type { ApiState, AssessmentResult, ChatMessage, LearningPath, ManagerSummary, ProgressSummary, Section } from "@/lib/workspace-types";

function getFormString(form: FormData, name: string, fallback = "") {
  const value = form.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getFormNumber(form: FormData, name: string, fallback: number) {
  const value = Number(form.get(name) || fallback);
  return Number.isFinite(value) ? value : fallback;
}

function getGoals(form: FormData) {
  return getFormString(form, "goals")
    .split(",")
    .map((goal) => goal.trim())
    .filter(Boolean);
}

export default function Home() {
  const [section, setSection] = useState<Section>("learn");
  const [selectedDepartment, setSelectedDepartment] = useState("marketing");
  const [path, setPath] = useState<LearningPath>(fallbackPath);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [manager, setManager] = useState<ManagerSummary>(fallbackManager);
  const [progress, setProgress] = useState<ProgressSummary>(fallbackProgress);
  const [apiState, setApiState] = useState<ApiState>("checking");
  const [isAssessing, setIsAssessing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const activeDepartment = useMemo(
    () => departments.find((department) => department.id === selectedDepartment) ?? departments[2],
    [selectedDepartment]
  );

  useSectionHash(section, setSection);
  useInitialData(setPath, setManager, setProgress, setApiState);

  async function runAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAssessing(true);

    const form = new FormData(event.currentTarget);
    const goals = getGoals(form);

    try {
      const result = await requestAssessment(form, selectedDepartment, activeDepartment.name, goals);
      const nextPath = await requestLearningPath(selectedDepartment, result.ai_level, goals, progress.completed_modules);
      setAssessment(result);
      setPath(nextPath.modules.length ? nextPath : fallbackPathFromAssessment(result, path));
      setApiState("live");
    } catch {
      setAssessment(fallbackAssessment(activeDepartment.name));
      setApiState("demo");
    } finally {
      setIsAssessing(false);
    }
  }

  async function sendChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = chatInput.trim();
    if (!text || isChatting) return;

    appendUserMessage(text);
    setChatInput("");
    setIsChatting(true);

    try {
      if (isLearningPathQuestion(text)) {
        await answerWithLearningPath(text);
      } else {
        await answerWithTutor(text);
      }
      setApiState("live");
    } catch {
      appendAssistantMessage(
        "Em sẽ trả lời theo bản demo: hãy xác định dữ liệu nhạy cảm, nêu mục tiêu đầu ra, đưa tiêu chí chấm, rồi yêu cầu AI trả về bảng có lý do và mức tự tin."
      );
      setApiState("demo");
    } finally {
      setIsChatting(false);
    }
  }

  function appendUserMessage(text: string) {
    setMessages((current) => [...current, { id: `me-${Date.now()}`, role: "me", text }]);
  }

  function appendAssistantMessage(text: string) {
    setMessages((current) => [...current, { id: `ai-${Date.now()}`, role: "ai", text }]);
  }

  async function answerWithLearningPath(text: string) {
    const nextPath = await requestLearningPath(selectedDepartment, assessment?.ai_level ?? 2, [text], progress.completed_modules);
    setPath(nextPath);
    appendAssistantMessage(describeLearningPath(nextPath, activeDepartment.name));
  }

  async function answerWithTutor(text: string) {
    const result = await postJson<{ response: string }>("/api/v1/chat", {
      message: text,
      context: `Learner department: ${activeDepartment.name}. Current modules: ${path.modules.map((module) => module.title).join(", ")}`
    });
    appendAssistantMessage(result.response);
  }

  return (
    <main className="appShell">
      <a className="skipLink" href="#workspace">
        Bỏ qua điều hướng
      </a>
      <aside className="sidebar" aria-label="Điều hướng workspace">
        <a className="brand sidebarBrand" href="#top" aria-label="AI Trợ Lý Doanh Nghiệp">
          <span className="brandMark" translate="no">AI</span>
          <span>AI Trợ Lý Doanh Nghiệp</span>
        </a>
        <div className="workspaceAccount">
          <span>Nội thất Mộc An</span>
          <strong>{manager.team_size} học viên demo</strong>
        </div>
        <nav className="sidebarNav" aria-label="Màn hình chính">
          {sectionLinks.map(([id, label]) => (
            <button
              aria-current={section === id ? "page" : undefined}
              className={section === id ? "navButton active" : "navButton"}
              key={id}
              onClick={() => setSection(id)}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>
        <DataState apiState={apiState} path={path} />
      </aside>

      <section className="workspaceArea">
        <header className="workspaceHeader" id="top">
          <div className="headerCopy">
            <p className="eyebrow">Workspace đào tạo</p>
            <h1>{sectionMeta[section].title}</h1>
            <p>{sectionMeta[section].description}</p>
          </div>
          <div className="headerActions">
            <button className="secondaryButton" onClick={() => setSection("manager")} type="button">
              Mở quản lý
            </button>
            <button className="primaryButton" onClick={() => setSection("learn")} type="button">
              Chấm học viên
            </button>
          </div>
        </header>

        <WorkspaceOverview
          apiState={apiState}
          departments={departments}
          manager={manager}
          path={path}
          progress={progress}
          setSection={setSection}
        />

        <section className="screen" id="workspace" tabIndex={-1}>
          {section === "learn" && (
            <LearnerScreen
              activeDepartment={activeDepartment}
              assessment={assessment}
              departments={departments}
              isAssessing={isAssessing}
              path={path}
              runAssessment={runAssessment}
              selectedDepartment={selectedDepartment}
              setSection={setSection}
              setSelectedDepartment={setSelectedDepartment}
            />
          )}
          {section === "player" && <PlayerScreen modules={path.modules} setSection={setSection} />}
          {section === "tutor" && (
            <TutorScreen
              chatInput={chatInput}
              isChatting={isChatting}
              messages={messages}
              path={path}
              sendChat={sendChat}
              setChatInput={setChatInput}
            />
          )}
          {section === "progress" && <ProgressScreen progress={progress} />}
          {section === "manager" && <ManagerScreen manager={manager} />}
        </section>
      </section>
    </main>
  );
}

function useSectionHash(section: Section, setSection: (section: Section) => void) {
  useEffect(() => {
    function readHash() {
      const hash = window.location.hash.replace("#", "");
      if (sectionIds.includes(hash as Section)) {
        setSection(hash as Section);
      }
    }

    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [setSection]);

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash !== section) {
      window.history.replaceState(null, "", `#${section}`);
    }
  }, [section]);
}

function useInitialData(
  setPath: (path: LearningPath) => void,
  setManager: (manager: ManagerSummary) => void,
  setProgress: (progress: ProgressSummary) => void,
  setApiState: (apiState: ApiState) => void
) {
  useEffect(() => {
    let active = true;

    hydrateInitialData().then(
      ({ path, manager, progress }) => {
        if (!active) return;
        setPath(path);
        setManager(manager);
        setProgress(progress);
        setApiState("live");
      },
      () => {
        if (active) setApiState("demo");
      }
    );

    return () => {
      active = false;
    };
  }, [setApiState, setManager, setPath, setProgress]);
}

async function hydrateInitialData() {
  const capabilities = await getJson<{ features?: string[] }>("/api/v1/core/capabilities");
  if (!capabilities.features?.length) {
    throw new Error("Backend unavailable");
  }

  const [path, manager, progress] = await Promise.all([
    requestLearningPath("marketing", 2, ["plan content", "build campaign briefs"], ["foundation-ai-safety"]),
    postJson<ManagerSummary>("/api/v1/core/manager", {
      organization_name: "Nội thất Mộc An",
      risk_threshold: 70,
      team: []
    }),
    postJson<ProgressSummary>("/api/v1/core/progress", {
      employee_name: "An",
      role_id: "marketing",
      completed_modules: ["foundation-ai-safety", "foundation-prompt-basics"],
      hours_saved: 12.5,
      recent_activity: ["Completed prompt basics", "Submitted safety practice"]
    })
  ]);

  return { path, manager, progress };
}

function requestAssessment(form: FormData, roleId: string, department: string, goals: string[]) {
  return postJson<AssessmentResult>("/api/v1/core/assessment", {
    role_id: roleId,
    department,
    employee_name: getFormString(form, "employee_name", "An"),
    current_work: getFormString(form, "current_work", "Planning campaign briefs"),
    ai_tool_experience: getFormNumber(form, "ai_tool_experience", 2),
    prompt_confidence: getFormNumber(form, "prompt_confidence", 2),
    safety_awareness: getFormNumber(form, "safety_awareness", 2),
    daily_tasks: ["Viết brief", "Tổng hợp phản hồi", "Lên kế hoạch tuần"],
    goals,
    preferred_address: "chi"
  });
}

function requestLearningPath(roleId: string, aiLevel: number, goals: string[], completedModules: string[]) {
  return postJson<LearningPath>("/api/v1/core/learning-path", {
    role_id: roleId,
    ai_level: aiLevel,
    goals,
    completed_modules: completedModules
  });
}

function fallbackPathFromAssessment(result: AssessmentResult, currentPath: LearningPath) {
  return {
    ...currentPath,
    modules: result.recommended_modules.length ? result.recommended_modules : currentPath.modules
  };
}

function fallbackAssessment(departmentName: string): AssessmentResult {
  return {
    score: 68,
    ai_level: 3,
    summary: `AI level 3 cho ${departmentName}. Nên bắt đầu bằng an toàn dữ liệu, prompt căn bản và một workflow ${departmentName} thật.`,
    strengths: ["Có mục tiêu công việc rõ", "Có thể chuyển nhanh sang bài thực hành"],
    gaps: ["Cần chuẩn hóa output", "Cần thói quen kiểm tra dữ liệu nhạy cảm"],
    recommended_modules: fallbackModules
  };
}

function DataState({ apiState, path }: { apiState: ApiState; path: LearningPath }) {
  const label = path.source === "supabase" ? "Supabase data" : apiState === "live" ? "Route API" : apiState === "demo" ? "Fallback data" : "Checking…";
  const description =
    path.source === "supabase"
      ? "Lộ trình học đang đọc từ bảng learning_modules trong Supabase."
      : "Một số màn vẫn dùng snapshot demo khi Supabase chưa sẵn sàng.";

  return (
    <div className="demoState">
      <span className={`status ${apiState}`}>{label}</span>
      <p>{description}</p>
    </div>
  );
}
