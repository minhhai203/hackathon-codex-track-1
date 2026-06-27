"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { GameQuestion, GameQuestionMode, GameSession, LeaderboardRow } from "@/lib/game/types";

type Actor = "manager" | "employee";

type SessionResponse = {
  session: GameSession;
  player_id?: string;
  host_token?: string;
  error?: string;
};

type AnswerResponse = {
  accepted: boolean;
  reason?: string;
  session: GameSession;
};

type CustomQuestionDraft = {
  prompt: string;
  options: string[];
  correctIndex: number;
  topic: string;
};

const optionMeta = [
  { label: "A", shape: "▲", tone: "red" },
  { label: "B", shape: "◆", tone: "blue" },
  { label: "C", shape: "●", tone: "amber" },
  { label: "D", shape: "■", tone: "brand" }
] as const;

const emptyDraft: CustomQuestionDraft = {
  prompt: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  topic: "Câu hỏi nội bộ"
};

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  const body = (await response.json()) as T;
  if (!response.ok) {
    const message = body && typeof body === "object" && "error" in body ? String((body as { error?: string }).error) : `HTTP ${response.status}`;
    throw new Error(message);
  }
  return body;
}

export function GameScreen() {
  const [actor, setActor] = useState<Actor>("manager");
  const [session, setSession] = useState<GameSession | null>(null);
  const [hostToken, setHostToken] = useState("");
  const [employeePlayerId, setEmployeePlayerId] = useState("");
  const [questionBank, setQuestionBank] = useState<GameQuestion[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState("Tất cả");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [hostName, setHostName] = useState("Chị Lan");
  const [hostDepartment, setHostDepartment] = useState("Marketing");
  const [questionMode, setQuestionMode] = useState<GameQuestionMode>("random");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestionDraft[]>([]);
  const [draft, setDraft] = useState<CustomQuestionDraft>(emptyDraft);

  const [joinPin, setJoinPin] = useState("");
  const [employeeName, setEmployeeName] = useState("Bạn");
  const [employeeDepartment, setEmployeeDepartment] = useState("Marketing");

  useEffect(() => {
    void refreshQuestionBank();
    void refreshLeaderboard("Tất cả");
  }, []);

  const currentQuestion = session?.questions[session.currentIndex] ?? null;
  const myAnswer = employeePlayerId ? session?.currentAnswers[employeePlayerId] : undefined;
  const myScore = employeePlayerId ? session?.scores[employeePlayerId] : undefined;
  const departments = useMemo(() => {
    const values = new Set([
      employeeDepartment,
      hostDepartment,
      ...(session?.players.map((player) => player.department) ?? []),
      ...leaderboard.map((row) => row.department)
    ]);
    return ["Tất cả", ...Array.from(values).filter(Boolean)];
  }, [employeeDepartment, hostDepartment, leaderboard, session]);

  async function refreshQuestionBank() {
    const result = await apiJson<{ questions: GameQuestion[] }>("/api/v1/game/questions");
    setQuestionBank(result.questions);
    setSelectedQuestionIds((current) => (current.length ? current : result.questions.slice(0, 6).map((question) => question.id)));
  }

  async function refreshSession() {
    if (!session) return;
    const result = await apiJson<SessionResponse>(`/api/v1/game/sessions/${session.id}`);
    setSession(result.session);
  }

  async function refreshLeaderboard(departmentFilter = selectedDepartment) {
    const query = departmentFilter === "Tất cả" ? "" : `?department=${encodeURIComponent(departmentFilter)}`;
    const result = await apiJson<{ leaderboard: LeaderboardRow[] }>(`/api/v1/game/leaderboard${query}`);
    setLeaderboard(result.leaderboard);
  }

  async function runAction(action: () => Promise<void>) {
    if (isBusy) return;
    setIsBusy(true);
    setError(null);
    try {
      await action();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "request-failed";
      setError(readableError(message));
    } finally {
      setIsBusy(false);
    }
  }

  async function createRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runAction(async () => {
      const result = await apiJson<SessionResponse>("/api/v1/game/sessions", {
        method: "POST",
        body: JSON.stringify({
          host_name: hostName,
          host_department: hostDepartment,
          question_mode: questionMode,
          selected_question_ids: questionMode === "custom" ? selectedQuestionIds : [],
          custom_questions: questionMode === "custom" ? customQuestions : []
        })
      });
      setSession(result.session);
      setHostToken(result.host_token ?? "");
      setJoinPin(result.session.pinCode);
      setActor("manager");
    });
  }

  async function joinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runAction(async () => {
      const result = await apiJson<SessionResponse>("/api/v1/game/sessions/join-by-code", {
        method: "POST",
        body: JSON.stringify({
          pin_code: joinPin,
          display_name: employeeName,
          department: employeeDepartment
        })
      });
      setSession(result.session);
      setEmployeePlayerId(result.player_id ?? "");
      setActor("employee");
    });
  }

  async function startRoom() {
    if (!session) return;
    await runAction(async () => {
      const result = await apiJson<SessionResponse>(`/api/v1/game/sessions/${session.id}/start`, {
        method: "POST",
        body: JSON.stringify({ host_token: hostToken })
      });
      setSession(result.session);
    });
  }

  async function advanceRoom() {
    if (!session) return;
    await runAction(async () => {
      const result = await apiJson<SessionResponse>(`/api/v1/game/sessions/${session.id}/next`, {
        method: "POST",
        body: JSON.stringify({ host_token: hostToken })
      });
      setSession(result.session);
      if (result.session.phase === "gameover") await refreshLeaderboard();
    });
  }

  async function submitAnswer(selectedIndex: number) {
    if (!session || !employeePlayerId || myAnswer) return;
    await runAction(async () => {
      const result = await apiJson<AnswerResponse>(`/api/v1/game/sessions/${session.id}/answer`, {
        method: "POST",
        body: JSON.stringify({ player_id: employeePlayerId, selected_index: selectedIndex })
      });
      setSession(result.session);
    });
  }

  function toggleQuestion(questionId: string) {
    setSelectedQuestionIds((current) => (current.includes(questionId) ? current.filter((id) => id !== questionId) : [...current, questionId]));
  }

  function addCustomQuestion() {
    const options = draft.options.map((option) => option.trim()).filter(Boolean);
    if (!draft.prompt.trim() || options.length < 2 || draft.correctIndex >= options.length) {
      setError("Câu hỏi tự tạo cần có nội dung, ít nhất 2 đáp án và đáp án đúng hợp lệ.");
      return;
    }
    setCustomQuestions((current) => [...current, { ...draft, options }]);
    setDraft(emptyDraft);
    setError(null);
  }

  async function filterLeaderboard(nextDepartment: string) {
    setSelectedDepartment(nextDepartment);
    await refreshLeaderboard(nextDepartment);
  }

  return (
    <div className="gameStack">
      <section className="gameHero panel">
        <div>
          <p className="eyebrow">F09 Engagement Game</p>
          <h2>Phòng quiz AI cho đội nhóm</h2>
          <p>
            Trưởng phòng tạo phòng và chọn nguồn câu hỏi. Nhân viên chỉ cần mã phòng để vào chơi, trả lời và xem bảng điểm.
          </p>
        </div>
        <div className="gameHeroMetrics">
          <Metric label="Vai trò" value={actor === "manager" ? "Trưởng phòng" : "Nhân viên"} />
          <Metric label="Mã phòng" value={session?.pinCode ?? "Chưa tạo"} />
          <Metric label="Nhân viên" value={String(session?.players.length ?? 0)} />
        </div>
      </section>

      <div className="gameRoleTabs departmentPicker" aria-label="Chọn vai trò game">
        <button className={actor === "manager" ? "selected" : ""} onClick={() => setActor("manager")} type="button">
          Trưởng phòng
        </button>
        <button className={actor === "employee" ? "selected" : ""} onClick={() => setActor("employee")} type="button">
          Nhân viên
        </button>
        {session && (
          <button onClick={refreshSession} type="button">
            Làm mới phòng
          </button>
        )}
      </div>

      {error && <div className="resultStrip gameError">{error}</div>}

      {!session && (
        <div className="twoColumn gameSetupGrid">
          {actor === "manager" ? (
            <ManagerCreatePanel
              customQuestions={customQuestions}
              draft={draft}
              hostDepartment={hostDepartment}
              hostName={hostName}
              isBusy={isBusy}
              onAddCustom={addCustomQuestion}
              onCreate={createRoom}
              onDraft={setDraft}
              onHostDepartment={setHostDepartment}
              onHostName={setHostName}
              onQuestionMode={setQuestionMode}
              onToggleQuestion={toggleQuestion}
              questionBank={questionBank}
              questionMode={questionMode}
              selectedQuestionIds={selectedQuestionIds}
            />
          ) : (
            <EmployeeJoinPanel
              employeeDepartment={employeeDepartment}
              employeeName={employeeName}
              isBusy={isBusy}
              joinPin={joinPin}
              onDepartment={setEmployeeDepartment}
              onJoin={joinRoom}
              onName={setEmployeeName}
              onPin={setJoinPin}
            />
          )}
          <QuestionSourcePanel customQuestions={customQuestions} questionBank={questionBank} selectedQuestionIds={selectedQuestionIds} />
        </div>
      )}

      {session && session.phase === "lobby" && (
        <LobbyPanel
          actor={actor}
          employeeDepartment={employeeDepartment}
          employeeName={employeeName}
          hostToken={hostToken}
          isBusy={isBusy}
          joinPin={joinPin}
          onDepartment={setEmployeeDepartment}
          onJoin={joinRoom}
          onName={setEmployeeName}
          onPin={setJoinPin}
          onStart={startRoom}
          session={session}
        />
      )}

      {session && session.phase === "question" && currentQuestion && (
        <>
          {actor === "employee" ? (
            <QuestionPanel
              currentQuestion={currentQuestion}
              isBusy={isBusy}
              myAnswer={myAnswer}
              myScore={myScore}
              onAnswer={submitAnswer}
              playerId={employeePlayerId}
              session={session}
            />
          ) : (
            <HostQuestionPanel currentQuestion={currentQuestion} isBusy={isBusy} onAdvance={advanceRoom} session={session} />
          )}
        </>
      )}

      {session && session.phase === "reveal" && currentQuestion && (
        <RevealPanel
          actor={actor}
          currentQuestion={currentQuestion}
          myAnswer={myAnswer}
          myScore={myScore}
          onAdvance={advanceRoom}
          session={session}
        />
      )}

      {session && session.phase === "scoreboard" && (
        <ScoreboardPanel actor={actor} isBusy={isBusy} onAdvance={advanceRoom} playerId={employeePlayerId} session={session} />
      )}

      {session && session.phase === "gameover" && (
        <WinnerPanel
          actor={actor}
          departments={departments}
          leaderboard={leaderboard}
          onDepartment={filterLeaderboard}
          onReplay={() => {
            setSession(null);
            setHostToken("");
            setEmployeePlayerId("");
            setActor("manager");
          }}
          playerId={employeePlayerId}
          selectedDepartment={selectedDepartment}
          session={session}
        />
      )}
    </div>
  );
}

function readableError(message: string) {
  if (message === "forbidden") return "Chỉ trưởng phòng tạo phòng mới có quyền điều khiển phiên chơi.";
  if (message === "not-ready") return "Cần ít nhất 1 nhân viên join phòng trước khi bắt đầu.";
  if (message === "Room not found") return "Không tìm thấy phòng với mã này.";
  if (message === "Room already started") return "Phòng đã bắt đầu, nhân viên mới không thể join.";
  if (message.toLowerCase().includes("fetch")) return "Không kết nối được Next API. Kiểm tra dev server real app ở localhost:3000.";
  if (message.includes("Failed to fetch")) return "Không kết nối được Next API. Kiểm tra dev server real app ở localhost:3000.";
  return "Game API đang bận. Thử lại một nhịp nữa nhé.";
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="gameMetric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ManagerCreatePanel({
  customQuestions,
  draft,
  hostDepartment,
  hostName,
  isBusy,
  onAddCustom,
  onCreate,
  onDraft,
  onHostDepartment,
  onHostName,
  onQuestionMode,
  onToggleQuestion,
  questionBank,
  questionMode,
  selectedQuestionIds
}: {
  customQuestions: CustomQuestionDraft[];
  draft: CustomQuestionDraft;
  hostDepartment: string;
  hostName: string;
  isBusy: boolean;
  onAddCustom: () => void;
  onCreate: (event: FormEvent<HTMLFormElement>) => void;
  onDraft: (draft: CustomQuestionDraft) => void;
  onHostDepartment: (value: string) => void;
  onHostName: (value: string) => void;
  onQuestionMode: (value: GameQuestionMode) => void;
  onToggleQuestion: (questionId: string) => void;
  questionBank: GameQuestion[];
  questionMode: GameQuestionMode;
  selectedQuestionIds: string[];
}) {
  return (
    <section className="panel">
      <p className="eyebrow">Trưởng phòng</p>
      <h2>Tạo phòng và chọn nguồn câu hỏi</h2>
      <form className="assessmentForm" onSubmit={onCreate}>
        <label>
          Tên trưởng phòng
          <input value={hostName} onChange={(event) => onHostName(event.target.value)} />
        </label>
        <label>
          Phòng ban
          <input value={hostDepartment} onChange={(event) => onHostDepartment(event.target.value)} />
        </label>
        <div className="gameModePicker departmentPicker" aria-label="Chọn nguồn câu hỏi">
          <button className={questionMode === "random" ? "selected" : ""} onClick={() => onQuestionMode("random")} type="button">
            Random từ nguồn
          </button>
          <button className={questionMode === "custom" ? "selected" : ""} onClick={() => onQuestionMode("custom")} type="button">
            Tự chọn / tạo mới
          </button>
        </div>
        {questionMode === "custom" && (
          <>
            <div className="gameQuestionBank">
              {questionBank.slice(0, 12).map((question) => (
                <button
                  className={selectedQuestionIds.includes(question.id) ? "selected" : ""}
                  key={question.id}
                  onClick={() => onToggleQuestion(question.id)}
                  type="button"
                >
                  <strong>{question.topic}</strong>
                  <span>{question.prompt}</span>
                </button>
              ))}
            </div>
            <div className="gameCustomBuilder">
              <label>
                Câu hỏi mới
                <textarea value={draft.prompt} onChange={(event) => onDraft({ ...draft, prompt: event.target.value })} rows={3} />
              </label>
              <div className="fieldGrid">
                {draft.options.map((option, index) => (
                  <label key={index}>
                    Đáp án {index + 1}
                    <input
                      value={option}
                      onChange={(event) => {
                        const nextOptions = [...draft.options];
                        nextOptions[index] = event.target.value;
                        onDraft({ ...draft, options: nextOptions });
                      }}
                    />
                  </label>
                ))}
              </div>
              <label>
                Đáp án đúng
                <select value={draft.correctIndex} onChange={(event) => onDraft({ ...draft, correctIndex: Number(event.target.value) })}>
                  {draft.options.map((_, index) => (
                    <option key={index} value={index}>
                      Đáp án {index + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button className="secondaryButton" onClick={onAddCustom} type="button">
                Thêm câu hỏi
              </button>
              {customQuestions.length > 0 && <span className="scoreBadge">{customQuestions.length} câu tự tạo</span>}
            </div>
          </>
        )}
        <button className="primaryButton full" disabled={isBusy} type="submit">
          {isBusy ? "Đang tạo phòng..." : "Tạo phòng"}
        </button>
      </form>
    </section>
  );
}

function EmployeeJoinPanel({
  employeeDepartment,
  employeeName,
  isBusy,
  joinPin,
  onDepartment,
  onJoin,
  onName,
  onPin
}: {
  employeeDepartment: string;
  employeeName: string;
  isBusy: boolean;
  joinPin: string;
  onDepartment: (value: string) => void;
  onJoin: (event: FormEvent<HTMLFormElement>) => void;
  onName: (value: string) => void;
  onPin: (value: string) => void;
}) {
  return (
    <section className="panel">
      <p className="eyebrow">Nhân viên</p>
      <h2>Join phòng bằng mã được share</h2>
      <form className="assessmentForm" onSubmit={onJoin}>
        <label>
          Mã phòng
          <input inputMode="numeric" maxLength={6} value={joinPin} onChange={(event) => onPin(event.target.value.replace(/\D/g, ""))} />
        </label>
        <label>
          Tên hiển thị
          <input value={employeeName} onChange={(event) => onName(event.target.value)} />
        </label>
        <label>
          Phòng ban
          <input value={employeeDepartment} onChange={(event) => onDepartment(event.target.value)} />
        </label>
        <button className="primaryButton full" disabled={isBusy || joinPin.length < 6} type="submit">
          {isBusy ? "Đang join..." : "Join phòng"}
        </button>
      </form>
    </section>
  );
}

function QuestionSourcePanel({
  customQuestions,
  questionBank,
  selectedQuestionIds
}: {
  customQuestions: CustomQuestionDraft[];
  questionBank: GameQuestion[];
  selectedQuestionIds: string[];
}) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Nguồn câu hỏi</p>
          <h2>{questionBank.length} câu AI có sẵn</h2>
        </div>
        <span className="scoreBadge">{selectedQuestionIds.length + customQuestions.length} đã chọn</span>
      </div>
      <div className="miniList">
        {questionBank.slice(0, 6).map((question) => (
          <div key={question.id}>
            <strong>{question.topic}</strong>
            <span>{question.prompt}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function LobbyPanel({
  actor,
  employeeDepartment,
  employeeName,
  hostToken,
  isBusy,
  joinPin,
  onDepartment,
  onJoin,
  onName,
  onPin,
  onStart,
  session
}: {
  actor: Actor;
  employeeDepartment: string;
  employeeName: string;
  hostToken: string;
  isBusy: boolean;
  joinPin: string;
  onDepartment: (value: string) => void;
  onJoin: (event: FormEvent<HTMLFormElement>) => void;
  onName: (value: string) => void;
  onPin: (value: string) => void;
  onStart: () => void;
  session: GameSession;
}) {
  return (
    <div className="twoColumn gameLobby">
      <section className="panel">
        <p className="eyebrow">{actor === "manager" ? "Điều khiển phòng" : "Join phòng"}</p>
        <h2>Mã phòng {session.pinCode}</h2>
        <div className="gameRoomCode">{session.pinCode}</div>
        <div className="gameHostMeta">
          <span>Host: {session.hostDisplayName}</span>
          <span>{session.questionMode === "random" ? "Random từ nguồn" : "Tự chọn / tạo mới"}</span>
          <span>{session.questions.length} câu</span>
        </div>
        {actor === "manager" ? (
          <button className="primaryButton full" disabled={!hostToken || session.players.length === 0 || isBusy} onClick={onStart} type="button">
            {isBusy ? "Đang bắt đầu..." : "Bắt đầu phiên chơi"}
          </button>
        ) : (
          <form className="assessmentForm" onSubmit={onJoin}>
            <label>
              Mã phòng
              <input inputMode="numeric" maxLength={6} value={joinPin} onChange={(event) => onPin(event.target.value.replace(/\D/g, ""))} />
            </label>
            <label>
              Tên hiển thị
              <input value={employeeName} onChange={(event) => onName(event.target.value)} />
            </label>
            <label>
              Phòng ban
              <input value={employeeDepartment} onChange={(event) => onDepartment(event.target.value)} />
            </label>
            <button className="primaryButton full" disabled={isBusy || joinPin.length < 6} type="submit">
              {isBusy ? "Đang join..." : "Join phòng"}
            </button>
          </form>
        )}
      </section>
      <section className="panel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Nhân viên trong phòng</p>
            <h2>{session.players.length} người đã join</h2>
          </div>
          <span className="scoreBadge">Host-only start</span>
        </div>
        <div className="gamePlayerGrid">
          {session.players.map((player, index) => (
            <div className="gamePlayerChip" key={player.id} style={{ animationDelay: `${index * 55}ms` }}>
              <span>{player.avatar}</span>
              <strong>{player.displayName}</strong>
              <small>{player.department}</small>
            </div>
          ))}
          {session.players.length === 0 && <p className="lessonLead">Chờ nhân viên nhập mã phòng để tham gia.</p>}
        </div>
      </section>
    </div>
  );
}

function HostQuestionPanel({
  currentQuestion,
  isBusy,
  onAdvance,
  session
}: {
  currentQuestion: GameSession["questions"][number];
  isBusy: boolean;
  onAdvance: () => void;
  session: GameSession;
}) {
  const answeredCount = Object.keys(session.currentAnswers).length;

  return (
    <section className="panel gameQuestionPanel">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Trưởng phòng điều khiển</p>
          <h2>
            <AnimatedWords text={currentQuestion.prompt} />
          </h2>
        </div>
        <Countdown deadlineTs={session.deadlineTs} timeLimitSec={currentQuestion.timeLimitSec} />
      </div>
      <div className="gameTopicRow">
        <span className="scoreBadge">{currentQuestion.topic}</span>
        <span>
          {answeredCount}/{session.players.length} nhân viên đã trả lời
        </span>
      </div>
      <div className="gameHostOptions">
        {currentQuestion.options.map((option, index) => (
          <div key={option}>
            <span>{optionMeta[index % optionMeta.length].label}</span>
            <strong>{option}</strong>
          </div>
        ))}
      </div>
      <div className="buttonRow right">
        <button className="secondaryButton" disabled={isBusy} onClick={onAdvance} type="button">
          Reveal đáp án
        </button>
      </div>
    </section>
  );
}

function QuestionPanel({
  currentQuestion,
  isBusy,
  myAnswer,
  myScore,
  onAnswer,
  playerId,
  session
}: {
  currentQuestion: GameSession["questions"][number];
  isBusy: boolean;
  myAnswer: GameSession["currentAnswers"][string] | undefined;
  myScore: GameSession["scores"][string] | undefined;
  onAnswer: (index: number) => void;
  playerId: string;
  session: GameSession;
}) {
  const answeredCount = Object.keys(session.currentAnswers).length;

  return (
    <section className="panel gameQuestionPanel">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">
            Câu {session.currentIndex + 1} / {session.questions.length}
          </p>
          <h2>
            <AnimatedWords text={currentQuestion.prompt} />
          </h2>
        </div>
        <Countdown deadlineTs={session.deadlineTs} timeLimitSec={currentQuestion.timeLimitSec} />
      </div>
      <div className="gameTopicRow">
        <span className="scoreBadge">{currentQuestion.topic}</span>
        <span>
          {answeredCount}/{session.players.length} đã trả lời
        </span>
        {myAnswer && <span className="gameSent">Đã gửi +{myScore?.lastGain ?? 0}</span>}
        {!playerId && <span className="gameSent">Join phòng để trả lời</span>}
      </div>
      <div className={currentQuestion.type === "truefalse" ? "gameAnswerGrid two" : "gameAnswerGrid"}>
        {currentQuestion.options.map((option, index) => {
          const meta = optionMeta[index % optionMeta.length];
          const selected = myAnswer?.selectedIndex === index;
          const locked = Boolean(myAnswer) || !playerId;
          return (
            <button
              className={`gameAnswerTile ${meta.tone} ${selected ? "selected" : ""}`}
              disabled={locked || isBusy}
              key={option}
              onClick={() => onAnswer(index)}
              type="button"
            >
              <span className="gameAnswerShape">{meta.shape}</span>
              <strong>{option}</strong>
              <small>{meta.label}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function RevealPanel({
  actor,
  currentQuestion,
  myAnswer,
  myScore,
  onAdvance,
  session
}: {
  actor: Actor;
  currentQuestion: GameSession["questions"][number];
  myAnswer: GameSession["currentAnswers"][string] | undefined;
  myScore: GameSession["scores"][string] | undefined;
  onAdvance: () => void;
  session: GameSession;
}) {
  const correct = myAnswer?.isCorrect === true;
  const counts = currentQuestion.options.map((_, index) =>
    Object.values(session.currentAnswers).filter((answer) => answer.selectedIndex === index).length
  );
  const maxCount = Math.max(1, ...counts);

  return (
    <div className="twoColumn gameReveal">
      <section className={`panel gameResultPanel ${correct ? "correct" : "wrong"}`}>
        <p className="eyebrow">Kết quả</p>
        <h2>{actor === "manager" ? "Đáp án đã reveal" : correct ? "Chính xác" : myAnswer ? "Chưa đúng" : "Hết giờ"}</h2>
        <p>
          {actor === "manager"
            ? "Trưởng phòng có thể chuyển qua bảng điểm sau khi cả đội cùng xem đáp án."
            : correct
              ? "Trả lời đúng và nhanh sẽ được cộng điểm tốc độ."
              : "Đáp án đúng đã được highlight để cả đội cùng học."}
        </p>
        {correct && <div className="gameScoreFloat">+{myScore?.lastGain ?? 0}</div>}
        {myScore && myScore.streak >= 2 && <span className="scoreBadge">Streak x{myScore.streak}</span>}
      </section>
      <section className="panel">
        <p className="eyebrow">Phân bố lựa chọn</p>
        <div className="gameRevealList">
          {currentQuestion.options.map((option, index) => {
            const meta = optionMeta[index % optionMeta.length];
            const isCorrect = index === currentQuestion.correctIndex;
            return (
              <div className={`gameRevealRow ${isCorrect ? "correct" : ""}`} key={option}>
                <span className={`gameAnswerShape ${meta.tone}`}>{meta.shape}</span>
                <strong>{option}</strong>
                <small>{counts[index]}</small>
                <span className="gameRevealBar">
                  <span style={{ width: `${(counts[index] / maxCount) * 100}%` }} />
                </span>
              </div>
            );
          })}
        </div>
        <div className="resultStrip gameFunFact">
          <strong>Ghi nhớ</strong>
          <span>{currentQuestion.funFact}</span>
        </div>
        {actor === "manager" && (
          <div className="buttonRow right">
            <button className="primaryButton" onClick={onAdvance} type="button">
              Xem bảng xếp hạng
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function ScoreboardPanel({
  actor,
  isBusy,
  onAdvance,
  playerId,
  session
}: {
  actor: Actor;
  isBusy: boolean;
  onAdvance: () => void;
  playerId: string;
  session: GameSession;
}) {
  const more = session.currentIndex < session.questions.length - 1;

  return (
    <section className="panel">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Scoreboard</p>
          <h2>Thứ hạng sau câu {session.currentIndex + 1}</h2>
        </div>
        {actor === "manager" && (
          <button className="primaryButton" disabled={isBusy} onClick={onAdvance} type="button">
            {more ? "Câu tiếp theo" : "Xem người chiến thắng"}
          </button>
        )}
      </div>
      <RankingList playerId={playerId} ranking={session.ranking} />
    </section>
  );
}

function WinnerPanel({
  actor,
  departments,
  leaderboard,
  onDepartment,
  onReplay,
  playerId,
  selectedDepartment,
  session
}: {
  actor: Actor;
  departments: string[];
  leaderboard: LeaderboardRow[];
  onDepartment: (department: string) => void;
  onReplay: () => void;
  playerId: string;
  selectedDepartment: string;
  session: GameSession;
}) {
  const winner = session.ranking[0];
  const podium = [session.ranking[1], session.ranking[0], session.ranking[2]].filter(Boolean);

  return (
    <div className="twoColumn gameWinner">
      <section className="panel">
        <p className="eyebrow">Winner ceremony</p>
        <h2>{winner?.player.displayName ?? "Cả đội"} thắng phiên này</h2>
        <p className="lessonLead">
          {winner?.score.total ?? 0} điểm - {winner?.player.department ?? session.hostDepartment}
        </p>
        <div className="gamePodium">
          {podium.map((row, index) => (
            <div className={`gamePodiumItem place${index + 1}`} key={row.player.id}>
              <span>{row.player.avatar}</span>
              <strong>{row.player.displayName}</strong>
              <div>{row.rank}</div>
            </div>
          ))}
        </div>
        {actor === "manager" && (
          <button className="secondaryButton full" onClick={onReplay} type="button">
            Tạo phòng mới
          </button>
        )}
      </section>
      <section className="panel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Leaderboard tổng</p>
            <h2>Lọc theo phòng ban</h2>
          </div>
        </div>
        <div className="departmentPicker gameFilter" aria-label="Lọc leaderboard game">
          {departments.map((item) => (
            <button className={selectedDepartment === item ? "selected" : ""} key={item} onClick={() => onDepartment(item)} type="button">
              {item}
            </button>
          ))}
        </div>
        {leaderboard.length ? <LeaderboardList leaderboard={leaderboard} playerId={playerId} /> : <RankingList playerId={playerId} ranking={session.ranking} />}
      </section>
    </div>
  );
}

function RankingList({ playerId, ranking }: { playerId: string; ranking: GameSession["ranking"] }) {
  return (
    <div className="gameRanking">
      {ranking.map((row, index) => (
        <div className={row.player.id === playerId ? "gameRankRow me" : "gameRankRow"} key={row.player.id} style={{ animationDelay: `${index * 45}ms` }}>
          <span>{row.rank}</span>
          <strong>{row.player.avatar}</strong>
          <div>
            <b>{row.player.displayName}</b>
            <small>{row.player.department}</small>
          </div>
          {row.delta < 0 && <em className="up">▲ {-row.delta}</em>}
          {row.delta > 0 && <em className="down">▼ {row.delta}</em>}
          <strong>{row.score.total}</strong>
        </div>
      ))}
    </div>
  );
}

function LeaderboardList({ leaderboard, playerId }: { leaderboard: LeaderboardRow[]; playerId: string }) {
  return (
    <div className="gameRanking">
      {leaderboard.map((row, index) => (
        <div className={row.userId === playerId ? "gameRankRow me" : "gameRankRow"} key={row.userId} style={{ animationDelay: `${index * 45}ms` }}>
          <span>{row.rank}</span>
          <strong>{row.avatar}</strong>
          <div>
            <b>{row.displayName}</b>
            <small>
              {row.department} - {row.gamesPlayed} phiên
            </small>
          </div>
          <strong>{row.totalPoints}</strong>
        </div>
      ))}
    </div>
  );
}

function Countdown({ deadlineTs, timeLimitSec }: { deadlineTs: number | null; timeLimitSec: number }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setNow(Date.now());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const remainingMs = Math.max(0, (deadlineTs ?? now) - now);
  const remainingSec = Math.ceil(remainingMs / 1000);
  const ratio = Math.max(0, Math.min(1, remainingMs / (timeLimitSec * 1000)));
  const urgent = remainingSec <= 3;

  return (
    <div className={urgent ? "gameCountdown urgent" : "gameCountdown"}>
      <strong>{remainingSec}</strong>
      <span>
        <span style={{ width: `${ratio * 100}%` }} />
      </span>
    </div>
  );
}

function AnimatedWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span className="gameWord" key={`${word}-${index}`} style={{ animationDelay: `${index * 35}ms` }}>
          {word}{" "}
        </span>
      ))}
    </>
  );
}
