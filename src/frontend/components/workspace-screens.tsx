"use client";

import type {
  ApiState,
  AssessmentHandler,
  AssessmentResult,
  ChatHandler,
  ChatMessage,
  Department,
  LearningPath,
  ManagerSummary,
  Module,
  ProgressSummary,
  Section
} from "@/lib/workspace-types";
import { Metric, Progress } from "@/components/ui-primitives";
import { departments, fallbackModules, learners, workQueue } from "@/lib/workspace-data";
import { compactTitle } from "@/lib/workspace-display";

type SetSection = (section: Section) => void;

export function WorkspaceOverview({
  apiState,
  departments,
  manager,
  path,
  progress,
  setSection
}: {
  apiState: ApiState;
  departments: Department[];
  manager: ManagerSummary;
  path: LearningPath;
  progress: ProgressSummary;
  setSection: SetSection;
}) {
  return (
    <section className="overviewBoard" aria-label="Tổng quan vận hành">
      <div className="metricGrid summaryGrid">
        <Metric label="Học viên" value={String(manager.team_size)} />
        <Metric label="Hoàn thành TB" value={`${manager.average_completion}%`} />
        <Metric label="Giờ tiết kiệm" value={`${manager.total_hours_saved}h`} />
        <Metric label="Cần hỗ trợ" value={String(manager.at_risk_employees.length)} />
      </div>

      <div className="opsGrid">
        <TodayQueue setSection={setSection} />
        <DataHealth apiState={apiState} manager={manager} path={path} progress={progress} />
        <DepartmentSnapshot departments={departments} />
      </div>
    </section>
  );
}

function TodayQueue({ setSection }: { setSection: SetSection }) {
  return (
    <section className="panel compactPanel">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Hàng việc hôm nay</p>
          <h2>Việc cần xử lý</h2>
        </div>
        <button className="textButton" onClick={() => setSection("manager")} type="button">
          Xem tất cả
        </button>
      </div>
      <div className="actionList">
        {workQueue.map(([task, owner, due]) => (
          <div key={`${task}-${owner}`}>
            <strong>{task}</strong>
            <span>{owner}</span>
            <small>{due}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function DataHealth({
  apiState,
  manager,
  path,
  progress
}: {
  apiState: ApiState;
  manager: ManagerSummary;
  path: LearningPath;
  progress: ProgressSummary;
}) {
  const title = apiState === "checking" ? "Đang kiểm tra" : path.source === "supabase" ? "Catalog thật" : "Demo snapshot";
  const source = path.source === "supabase" ? "Supabase learning_modules" : apiState === "live" ? "Next.js route handlers" : "Fallback in-browser";

  return (
    <section className="panel compactPanel">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Tín hiệu dữ liệu</p>
          <h2>{title}</h2>
        </div>
        <span className="scoreBadge">{path.modules.length} module</span>
      </div>
      <div className="dataHealth">
        <div>
          <span>Source</span>
          <strong>{source}</strong>
        </div>
        <div>
          <span>Học viên mẫu</span>
          <strong>{progress.completion_percent}% hoàn thành</strong>
        </div>
        <div>
          <span>Phòng ban nổi bật</span>
          <strong>{manager.top_department}</strong>
        </div>
      </div>
    </section>
  );
}

function DepartmentSnapshot({ departments }: { departments: Department[] }) {
  return (
    <section className="panel compactPanel departmentSnapshot">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Phòng ban</p>
          <h2>Tiến độ theo nhóm</h2>
        </div>
      </div>
      <div className="snapshotList">
        {departments.slice(0, 4).map((department) => (
          <div className="snapshotRow" key={department.id}>
            <span aria-hidden="true" className={`deptDot ${department.tone}`} />
            <strong>{department.name}</strong>
            <Progress value={department.progress} />
            <span>{department.progress}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LearnerScreen({
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
  runAssessment: AssessmentHandler;
  selectedDepartment: string;
  setSection: SetSection;
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
          <AssessmentScoreFields />
          <label>
            Mục tiêu
            <input autoComplete="off" name="goals" defaultValue="build campaign briefs, reduce manual reporting" />
          </label>
          <DepartmentPicker departments={departments} selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} />
          <button className="primaryButton full" disabled={isAssessing} type="submit">
            {isAssessing ? "Đang chấm…" : `Chấm level cho ${activeDepartment.name}`}
          </button>
        </form>
      </section>

      <LearningPathPanel activeDepartment={activeDepartment} assessment={assessment} path={path} setSection={setSection} />
    </div>
  );
}

function AssessmentScoreFields() {
  return (
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
  );
}

function DepartmentPicker({
  departments,
  selectedDepartment,
  setSelectedDepartment
}: {
  departments: Department[];
  selectedDepartment: string;
  setSelectedDepartment: (department: string) => void;
}) {
  return (
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
  );
}

function LearningPathPanel({
  activeDepartment,
  assessment,
  path,
  setSection
}: {
  activeDepartment: Department;
  assessment: AssessmentResult | null;
  path: LearningPath;
  setSection: SetSection;
}) {
  return (
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
          <CourseCard index={index} module={module} key={module.module_id} />
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
  );
}

function CourseCard({ index, module }: { index: number; module: Module }) {
  return (
    <article className="courseCard">
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
  );
}

export function PlayerScreen({ modules, setSection }: { modules: Module[]; setSection: SetSection }) {
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
      <LessonBody lesson={lesson} moduleCount={modules.length} />
    </div>
  );
}

function LessonBody({ lesson, moduleCount }: { lesson: Module; moduleCount: number }) {
  return (
    <section className="lessonBody">
      <div className="lessonTopline">
        <span className="scoreBadge">Bài 2 / {Math.max(moduleCount, 4)}</span>
        <span>38% hoàn thành</span>
      </div>
      <h2>{compactTitle(lesson.title)}</h2>
      <div className="videoFrame">
        <button aria-label="Phát video bài học" className="playButton" type="button">
          ▶
        </button>
      </div>
      <p className="lessonLead">{lesson.outcome}</p>
      <PracticePanel />
    </section>
  );
}

function PracticePanel() {
  return (
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
  );
}

export function TutorScreen({
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
  sendChat: ChatHandler;
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
      <LearningContext path={path} />
    </div>
  );
}

function LearningContext({ path }: { path: LearningPath }) {
  return (
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
  );
}

export function ProgressScreen({ progress }: { progress: ProgressSummary }) {
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
        <ChapterProgress />
      </section>
      <NextModules progress={progress} />
    </div>
  );
}

function ChapterProgress() {
  return (
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
  );
}

function NextModules({ progress }: { progress: ProgressSummary }) {
  return (
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
  );
}

export function ManagerScreen({ manager }: { manager: ManagerSummary }) {
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
        <DepartmentTable />
      </section>
      <LearnerTable />
    </div>
  );
}

function DepartmentTable() {
  return (
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
  );
}

function LearnerTable() {
  return (
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
  );
}
