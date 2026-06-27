"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Section = "learn" | "player" | "tutor" | "progress" | "manager";

type Module = {
  module_id: string;
  title: string;
  role_id: string;
  level: number;
  outcome: string;
  tags: string[];
  starter_kit: string[];
};

type AssessmentResult = {
  score: number;
  ai_level: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommended_modules: Module[];
};

type LearningPath = {
  modules: Module[];
  reasons: string[];
  starter_kit: string[];
  confidence: number;
  warnings: string[];
};

type ManagerSummary = {
  organization_name: string;
  team_size: number;
  average_completion: number;
  total_hours_saved: number;
  top_department: string;
  at_risk_employees: string[];
  department_counts: Record<string, number>;
  last_team_activity: string[];
};

type ProgressSummary = {
  completion_percent: number;
  completed_modules: string[];
  next_modules: Module[];
  hours_saved: number;
  recent_activity: string[];
};

type ChatMessage = {
  id: string;
  role: "ai" | "me";
  text: string;
};

type Department = {
  id: string;
  name: string;
  course: string;
  progress: number;
  seats: number;
  tone: string;
};

const apiBase = "";

const sectionLinks: Array<[Section, string]> = [
  ["learn", "Học viên"],
  ["player", "Bài học"],
  ["tutor", "Trợ lý"],
  ["progress", "Tiến bộ"],
  ["manager", "Quản lý"]
];

const sectionIds = sectionLinks.map(([id]) => id);

const fallbackModules: Module[] = [
  {
    module_id: "foundation-ai-safety",
    title: "AI Safety And Data Boundaries",
    role_id: "common",
    level: 1,
    outcome: "Nhận biết dữ liệu không nên đưa vào công cụ AI.",
    tags: ["safety", "governance"],
    starter_kit: ["Redact dữ liệu cá nhân", "Kiểm tra độ nhạy trước khi prompt"]
  },
  {
    module_id: "foundation-prompt-basics",
    title: "Prompt Basics For Daily Work",
    role_id: "common",
    level: 1,
    outcome: "Biến công việc hằng ngày thành prompt rõ vai trò, bối cảnh và đầu ra.",
    tags: ["prompting", "workflow"],
    starter_kit: ["Nêu định dạng đầu ra", "Thêm vai trò và ràng buộc"]
  },
  {
    module_id: "marketing-content-planning",
    title: "AI For Content Planning",
    role_id: "marketing",
    level: 2,
    outcome: "Lập theme nội dung và brief sản xuất bằng AI.",
    tags: ["marketing", "content"],
    starter_kit: ["Lập theme theo tuần", "Tạo góc nội dung"]
  },
  {
    module_id: "sales-discovery-ai",
    title: "AI For Sales Discovery",
    role_id: "kinh-doanh",
    level: 2,
    outcome: "Chuẩn bị câu hỏi discovery và ghi chú khách hàng.",
    tags: ["sales", "customer"],
    starter_kit: ["Soạn câu hỏi discovery", "Tóm tắt call notes"]
  }
];

const fallbackPath: LearningPath = {
  modules: fallbackModules,
  reasons: [
    "Bắt đầu bằng an toàn dữ liệu trước khi dùng AI cho công việc thật.",
    "Prompt căn bản là nền cho mọi phòng ban.",
    "Module role-specific giúp demo tác động theo công việc.",
    "Giữ sprint đầu nhỏ và dễ chứng minh."
  ],
  starter_kit: [
    "Redact private fields before prompting.",
    "Ask for output format first.",
    "Turn campaign goals into weekly themes.",
    "Draft discovery questions."
  ],
  confidence: 82,
    warnings: ["Next.js API đang dùng dữ liệu demo cục bộ cho đến khi Supabase được kết nối."]
};

const fallbackManager: ManagerSummary = {
  organization_name: "Nội thất Mộc An",
  team_size: 39,
  average_completion: 41,
  total_hours_saved: 84.5,
  top_department: "Marketing",
  at_risk_employees: ["Phạm Thu Hà", "Vũ Thị Lan"],
  department_counts: {
    "Nhân sự": 12,
    "Kinh doanh": 8,
    Marketing: 6,
    "Kế toán": 4,
    "Vận hành": 6,
    "Ban giám đốc": 3
  },
  last_team_activity: [
    "Marketing hoàn thành campaign brief draft",
    "Kinh doanh dùng AI tóm tắt discovery calls",
    "Kế toán tự động hóa variance notes"
  ]
};

const fallbackProgress: ProgressSummary = {
  completion_percent: 38,
  completed_modules: ["foundation-ai-safety", "foundation-prompt-basics"],
  next_modules: fallbackModules.slice(2),
  hours_saved: 12.5,
  recent_activity: ["Hoàn thành Prompt Basics", "Nộp bài thực hành dữ liệu an toàn"]
};

const departments: Department[] = [
  { id: "nhan-su", name: "Nhân sự", course: "AI cho Nhân sự", progress: 58, seats: 12, tone: "teal" },
  { id: "kinh-doanh", name: "Kinh doanh", course: "AI cho Sales", progress: 33, seats: 8, tone: "blue" },
  { id: "marketing", name: "Marketing", course: "AI cho Marketing", progress: 40, seats: 6, tone: "violet" },
  { id: "ke-toan", name: "Kế toán", course: "AI cho Kế toán", progress: 25, seats: 4, tone: "amber" },
  { id: "van-hanh", name: "Vận hành", course: "AI cho Vận hành", progress: 0, seats: 6, tone: "olive" },
  { id: "cskh", name: "CSKH", course: "AI cho CSKH", progress: 18, seats: 6, tone: "rose" }
];

const learners = [
  ["Trần Thị Mai", "Nhân sự", "AI cho HR", "Cấp 3", 62, "Hôm nay", "Đang học"],
  ["Nguyễn Thị An", "Nhân sự", "AI cho HR", "Cấp 4", 80, "Hôm nay", "Đang học"],
  ["Đỗ Minh Quân", "Ban giám đốc", "AI cho Chủ DN", "Cấp 5", 95, "Hôm nay", "Sắp xong"],
  ["Lê Văn Hùng", "Kinh doanh", "AI cho Sales", "Cấp 2", 45, "Hôm qua", "Đang học"],
  ["Phạm Thu Hà", "Kinh doanh", "AI cho Sales", "Cấp 1", 20, "3 ngày trước", "Chậm tiến độ"],
  ["Vũ Thị Lan", "Vận hành", "Chưa gán", "-", 0, "-", "Chưa bắt đầu"]
] as const;

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function compactTitle(title: string) {
  return title.replace(/^AI For /, "AI cho ").replace(/^Prompt Basics For /, "Prompt căn bản cho ");
}

export default function Home() {
  const [section, setSection] = useState<Section>("learn");
  const [selectedDepartment, setSelectedDepartment] = useState("marketing");
  const [path, setPath] = useState<LearningPath>(fallbackPath);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [manager, setManager] = useState<ManagerSummary>(fallbackManager);
  const [progress, setProgress] = useState<ProgressSummary>(fallbackProgress);
  const [apiState, setApiState] = useState<"checking" | "live" | "demo">("checking");
  const [isAssessing, setIsAssessing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "hello",
      role: "ai",
      text: "Chào chị An. Em đang nạp lộ trình, bài học và bối cảnh công việc để trả lời trong phạm vi khóa học."
    },
    {
      id: "starter",
      role: "me",
      text: "Soạn prompt để Claude chấm 5 CV theo JD Nhân viên tuyển dụng."
    },
    {
      id: "starter-response",
      role: "ai",
      text: "Hãy dùng cấu trúc: vai trò người chấm, JD rút gọn, tiêu chí điểm, định dạng bảng. Nhớ ẩn dữ liệu cá nhân trước khi dán CV."
    }
  ]);

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
  }, []);

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash !== section) {
      window.history.replaceState(null, "", `#${section}`);
    }
  }, [section]);

  useEffect(() => {
    let active = true;

    async function hydrate() {
      try {
        const capabilities = await getJson<{ features?: string[] }>("/api/v1/core/capabilities");
        if (!capabilities.features?.length) {
          throw new Error("Backend unavailable");
        }

        const [pathResult, managerResult, progressResult] = await Promise.all([
          postJson<LearningPath>("/api/v1/core/learning-path", {
            role_id: "marketing",
            ai_level: 2,
            goals: ["plan content", "build campaign briefs"],
            completed_modules: ["foundation-ai-safety"]
          }),
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

        if (!active) return;
        setPath(pathResult);
        setManager(managerResult);
        setProgress(progressResult);
        setApiState("live");
      } catch {
        if (active) setApiState("demo");
      }
    }

    hydrate();
    return () => {
      active = false;
    };
  }, []);

  const activeDepartment = useMemo(
    () => departments.find((department) => department.id === selectedDepartment) ?? departments[2],
    [selectedDepartment]
  );

  async function runAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAssessing(true);

    const form = new FormData(event.currentTarget);
    const goals = String(form.get("goals") || "")
      .split(",")
      .map((goal) => goal.trim())
      .filter(Boolean);

    try {
      const result = await postJson<AssessmentResult>("/api/v1/core/assessment", {
        role_id: selectedDepartment,
        department: activeDepartment.name,
        employee_name: form.get("employee_name") || "An",
        current_work: form.get("current_work") || "Planning campaign briefs",
        ai_tool_experience: Number(form.get("ai_tool_experience") || 2),
        prompt_confidence: Number(form.get("prompt_confidence") || 2),
        safety_awareness: Number(form.get("safety_awareness") || 2),
        daily_tasks: ["Viết brief", "Tổng hợp phản hồi", "Lên kế hoạch tuần"],
        goals,
        preferred_address: "chi"
      });
      setAssessment(result);
      setPath({
        ...path,
        modules: result.recommended_modules.length ? result.recommended_modules : path.modules
      });
      setApiState("live");
    } catch {
      setAssessment({
        score: 68,
        ai_level: 3,
        summary: `AI level 3 cho ${activeDepartment.name}. Nên bắt đầu bằng an toàn dữ liệu, prompt căn bản và một workflow ${activeDepartment.name} thật.`,
        strengths: ["Có mục tiêu công việc rõ", "Có thể chuyển nhanh sang bài thực hành"],
        gaps: ["Cần chuẩn hóa output", "Cần thói quen kiểm tra dữ liệu nhạy cảm"],
        recommended_modules: fallbackModules
      });
      setApiState("demo");
    } finally {
      setIsAssessing(false);
    }
  }

  async function sendChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = chatInput.trim();
    if (!text || isChatting) return;

    const userMessage: ChatMessage = { id: `me-${Date.now()}`, role: "me", text };
    setMessages((current) => [...current, userMessage]);
    setChatInput("");
    setIsChatting(true);

    try {
      const result = await postJson<{ response: string; action_items: string[] }>("/api/v1/chat", {
        message: text,
        context: `Learner department: ${activeDepartment.name}. Current modules: ${path.modules
          .map((module) => module.title)
          .join(", ")}`
      });

      setMessages((current) => [
        ...current,
        {
          id: `ai-${Date.now()}`,
          role: "ai",
          text: result.action_items.length ? `${result.response} ${result.action_items.join(" ")}` : result.response
        }
      ]);
      setApiState("live");
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `ai-${Date.now()}`,
          role: "ai",
            text: "Em sẽ trả lời theo bản demo: hãy xác định dữ liệu nhạy cảm, nêu mục tiêu đầu ra, đưa tiêu chí chấm, rồi yêu cầu AI trả về bảng có lý do và mức tự tin."
        }
      ]);
      setApiState("demo");
    } finally {
      setIsChatting(false);
    }
  }

  return (
    <main>
      <a className="skipLink" href="#workspace">
        Bỏ qua điều hướng
      </a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AI Trợ Lý Doanh Nghiệp">
          <span className="brandMark">AI</span>
          <span>AI Trợ Lý Doanh Nghiệp</span>
        </a>
        <nav aria-label="Màn hình chính">
          {sectionLinks.map(([id, label]) => (
            <button
              className={section === id ? "active" : ""}
              key={id}
              onClick={() => setSection(id)}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>
        <span className={`status ${apiState}`}>{apiState === "live" ? "API live" : apiState === "demo" ? "Demo data" : "Checking"}</span>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Đào tạo AI cho doanh nghiệp SME</p>
          <h1>Học viện AI nội bộ cho từng phòng ban</h1>
          <p>
            Nhân sự, kinh doanh, marketing, kế toán và vận hành học theo lộ trình riêng, có assessment,
            trợ lý AI, tiến độ và dashboard quản lý trong một workspace.
          </p>
          <div className="heroActions">
            <button className="primaryButton" onClick={() => setSection("learn")} type="button">
              Bắt đầu assessment
            </button>
            <button className="secondaryButton" onClick={() => setSection("manager")} type="button">
              Xem dashboard DN
            </button>
          </div>
        </div>
        <div className="workspacePreview" aria-label="Tổng quan sản phẩm">
          <div className="previewHeader">
            <span>Nội thất Mộc An</span>
            <strong>{manager.team_size} học viên</strong>
          </div>
          <div className="previewGrid">
            <div>
              <small>Hoàn thành TB</small>
              <strong>{manager.average_completion}%</strong>
            </div>
            <div>
              <small>Giờ tiết kiệm</small>
              <strong>{manager.total_hours_saved}h</strong>
            </div>
          </div>
          {departments.slice(0, 4).map((department) => (
            <div className="previewRow" key={department.id}>
              <span>{department.name}</span>
              <Progress value={department.progress} />
            </div>
          ))}
        </div>
      </section>

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
    </main>
  );
}

function LearnerScreen({
  activeDepartment,
  assessment,
  departments,
  isAssessing,
  path,
  runAssessment,
  selectedDepartment,
  setSection,
  setSelectedDepartment
}: {
  activeDepartment: Department;
  assessment: AssessmentResult | null;
  departments: Department[];
  isAssessing: boolean;
  path: LearningPath;
  runAssessment: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  selectedDepartment: string;
  setSection: (section: Section) => void;
  setSelectedDepartment: (department: string) => void;
}) {
  return (
    <div className="twoColumn">
      <section className="panel">
        <p className="eyebrow">Onboarding assessment</p>
        <h2>Gán đúng khóa ngay từ công việc thật</h2>
        <form className="assessmentForm" onSubmit={runAssessment}>
          <label>
            Họ và tên
            <input autoComplete="name" name="employee_name" defaultValue="Nguyễn Thị An" />
          </label>
          <label>
            Công việc hiện tại
            <textarea
              autoComplete="off"
              name="current_work"
              defaultValue="Lập kế hoạch nội dung, viết brief chiến dịch, tổng hợp phản hồi khách hàng"
            />
          </label>
          <div className="fieldGrid">
            <label>
              Kinh nghiệm AI
              <input autoComplete="off" inputMode="numeric" max="5" min="0" name="ai_tool_experience" type="number" defaultValue="3" />
            </label>
            <label>
              Tự tin prompt
              <input autoComplete="off" inputMode="numeric" max="5" min="0" name="prompt_confidence" type="number" defaultValue="2" />
            </label>
            <label>
              An toàn dữ liệu
              <input autoComplete="off" inputMode="numeric" max="5" min="0" name="safety_awareness" type="number" defaultValue="2" />
            </label>
          </div>
          <label>
            Mục tiêu
            <input autoComplete="off" name="goals" defaultValue="build campaign briefs, reduce manual reporting" />
          </label>
          <div className="departmentPicker" aria-label="Chọn phòng ban">
            {departments.map((department) => (
              <button
                className={selectedDepartment === department.id ? "selected" : ""}
                key={department.id}
                onClick={() => setSelectedDepartment(department.id)}
                type="button"
              >
                {department.name}
              </button>
            ))}
          </div>
          <button className="primaryButton full" disabled={isAssessing} type="submit">
            {isAssessing ? "Đang chấm…" : `Chấm level cho ${activeDepartment.name}`}
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Lộ trình cá nhân</p>
            <h2>{activeDepartment.course}</h2>
          </div>
          <span className="scoreBadge">Tin cậy {path.confidence}%</span>
        </div>
        {assessment && (
          <div className="resultStrip">
            <strong>Level {assessment.ai_level}</strong>
            <span>{assessment.summary}</span>
          </div>
        )}
        <div className="courseList">
          {path.modules.slice(0, 4).map((module, index) => (
            <article className="courseCard" key={module.module_id}>
              <span className="moduleNumber">m{index + 1}</span>
              <div>
                <h3>{compactTitle(module.title)}</h3>
                <p>{module.outcome}</p>
                <div className="tagRow">
                  <span>L{module.level}</span>
                  {module.tags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="buttonRow">
          <button className="secondaryButton" onClick={() => setSection("player")} type="button">
            Vào bài học
          </button>
          <button className="primaryButton" onClick={() => setSection("tutor")} type="button">
            Hỏi trợ lý
          </button>
        </div>
      </section>
    </div>
  );
}

function PlayerScreen({ modules, setSection }: { modules: Module[]; setSection: (section: Section) => void }) {
  const lesson = modules[1] ?? fallbackModules[1];

  return (
    <div className="playerShell">
      <aside className="curriculum">
        <button className="textButton" onClick={() => setSection("learn")} type="button">
          Quay lại khóa của tôi
        </button>
        <h2>Nội dung khóa</h2>
        {modules.slice(0, 6).map((module, index) => (
          <button className={index === 1 ? "lesson active" : "lesson"} key={module.module_id} type="button">
            <span>{index < 1 ? "✓" : index === 1 ? "▶" : "○"}</span>
            <span>{compactTitle(module.title)}</span>
          </button>
        ))}
      </aside>
      <section className="lessonBody">
        <div className="lessonTopline">
          <span className="scoreBadge">Bài 2 / {Math.max(modules.length, 4)}</span>
          <span>38% hoàn thành</span>
        </div>
        <h2>{compactTitle(lesson.title)}</h2>
        <div className="videoFrame">
          <button aria-label="Phát video bài học" className="playButton" type="button">
            ▶
          </button>
        </div>
        <p className="lessonLead">{lesson.outcome}</p>
        <div className="practicePanel">
          <h3>Bài thực hành</h3>
          <p>Viết một prompt 4 phần cho công việc của phòng ban bạn, sau đó nộp output để AI chấm theo rubric.</p>
          <textarea aria-label="Bài thực hành" placeholder="Dán prompt hoặc kết quả thực hành tại đây…" />
          <div className="buttonRow right">
            <button className="secondaryButton" type="button">
              Lưu nháp
            </button>
            <button className="primaryButton" type="button">
              Nộp và chấm
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function TutorScreen({
  chatInput,
  isChatting,
  messages,
  path,
  sendChat,
  setChatInput
}: {
  chatInput: string;
  isChatting: boolean;
  messages: ChatMessage[];
  path: LearningPath;
  sendChat: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  setChatInput: (value: string) => void;
}) {
  return (
    <div className="twoColumn tutorLayout">
      <section className="panel chatPanel">
        <p className="eyebrow">AI tutor</p>
        <h2>Trợ lý theo lộ trình đang học</h2>
        <div className="messageList" aria-live="polite">
          {messages.map((message) => (
            <div className={`message ${message.role}`} key={message.id}>
              {message.text}
            </div>
          ))}
          {isChatting && <div className="message ai">Đang soạn câu trả lời…</div>}
        </div>
        <form className="chatForm" onSubmit={sendChat}>
          <input
            aria-label="Nhập câu hỏi cho trợ lý"
            autoComplete="off"
            onChange={(event) => setChatInput(event.target.value)}
            placeholder="Nhập câu hỏi cho trợ lý…"
            value={chatInput}
          />
          <button className="primaryButton" disabled={isChatting} type="submit">
            Gửi
          </button>
        </form>
      </section>
      <aside className="panel contextPanel">
        <p className="eyebrow">Context đang nạp</p>
        <h2>Module và starter kit</h2>
        <div className="miniList">
          {path.modules.slice(0, 4).map((module) => (
            <div key={module.module_id}>
              <strong>{compactTitle(module.title)}</strong>
              <span>{module.starter_kit[0] ?? module.outcome}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function ProgressScreen({ progress }: { progress: ProgressSummary }) {
  return (
    <div className="progressGrid">
      <section className="panel">
        <p className="eyebrow">Tiến bộ học viên</p>
        <h2>Nguyễn Thị An</h2>
        <div className="metricGrid">
          <Metric label="Hoàn thành" value={`${progress.completion_percent}%`} />
          <Metric label="Giờ tiết kiệm" value={`${progress.hours_saved}h`} />
          <Metric label="Module xong" value={String(progress.completed_modules.length)} />
          <Metric label="Level" value="3 / 5" />
        </div>
        <div className="chapterList">
          {[
            ["Cấp 1 · Nhập môn", 100],
            ["Cấp 2 · Trung cấp", 45],
            ["Cấp 3 · Nâng cao", 10]
          ].map(([label, value]) => (
            <div key={label}>
              <div className="progressLabel">
                <span>{label}</span>
                <span>{value}%</span>
              </div>
              <Progress value={Number(value)} />
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <p className="eyebrow">Tiếp theo</p>
        <h2>Module nên học</h2>
        <div className="miniList">
          {progress.next_modules.slice(0, 4).map((module) => (
            <div key={module.module_id}>
              <strong>{compactTitle(module.title)}</strong>
              <span>{module.outcome}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ManagerScreen({ manager }: { manager: ManagerSummary }) {
  return (
    <div className="managerStack">
      <section className="panel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Học viện AI nội bộ</p>
            <h2>Tổng quan đào tạo</h2>
          </div>
          <span className="scoreBadge">{manager.organization_name}</span>
        </div>
        <div className="metricGrid">
          <Metric label="Học viên" value={String(manager.team_size)} />
          <Metric label="Hoàn thành TB" value={`${manager.average_completion}%`} />
          <Metric label="Giờ tiết kiệm" value={`${manager.total_hours_saved}h`} />
          <Metric label="Cần hỗ trợ" value={String(manager.at_risk_employees.length)} />
        </div>
        <div className="departmentTable">
          {departments.map((department) => (
            <div className="departmentRow" key={department.id}>
              <span aria-hidden="true" className={`deptDot ${department.tone}`} />
              <strong>{department.name}</strong>
              <span>{department.course}</span>
              <span>{department.seats} người</span>
              <Progress value={department.progress} />
              <span>{department.progress}%</span>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Học viên</p>
            <h2>Danh sách theo dõi</h2>
          </div>
          <button className="secondaryButton" type="button">
            Mời học viên
          </button>
        </div>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Phòng ban</th>
                <th>Khóa</th>
                <th>Cấp độ</th>
                <th>Tiến độ</th>
                <th>Hoạt động</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {learners.map((learner) => (
                <tr key={learner[0]}>
                  <td>{learner[0]}</td>
                  <td>{learner[1]}</td>
                  <td>{learner[2]}</td>
                  <td>{learner[3]}</td>
                  <td>
                    <div className="tableProgress">
                      <Progress value={learner[4]} />
                      <span>{learner[4]}%</span>
                    </div>
                  </td>
                  <td>{learner[5]}</td>
                  <td>
                    <span className={learner[6].includes("Chậm") ? "badge warn" : "badge"}>{learner[6]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div
      aria-label={`${value}%`}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.max(0, Math.min(value, 100))}
      className="progressBar"
      role="progressbar"
    >
      <span style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
    </div>
  );
}
