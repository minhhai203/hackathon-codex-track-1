"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { GameSession, LeaderboardRow } from "@/lib/game/types";

type SessionResponse = {
  session: GameSession;
  player_id?: string;
};

type AnswerResponse = {
  accepted: boolean;
  reason?: string;
  session: GameSession;
};

const optionMeta = [
  { label: "A", shape: "▲", tone: "red" },
  { label: "B", shape: "◆", tone: "blue" },
  { label: "C", shape: "●", tone: "amber" },
  { label: "D", shape: "■", tone: "brand" }
] as const;

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok && response.status !== 409) {
    throw new Error(`Game API failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function GameScreen() {
  const [session, setSession] = useState<GameSession | null>(null);
  const [playerId, setPlayerId] = useState("human-player");
  const [displayName, setDisplayName] = useState("Bạn");
  const [department, setDepartment] = useState("Marketing");
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState("Tất cả");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshLeaderboard(departmentFilter = selectedDepartment) {
    const query = departmentFilter === "Tất cả" ? "" : `?department=${encodeURIComponent(departmentFilter)}`;
    const result = await apiJson<{ leaderboard: LeaderboardRow[] }>(`/api/v1/game/leaderboard${query}`);
    setLeaderboard(result.leaderboard);
  }

  async function createSession() {
    setIsBusy(true);
    setError(null);
    try {
      const result = await apiJson<SessionResponse>("/api/v1/game/sessions", { method: "POST" });
      setSession(result.session);
      if (result.player_id) setPlayerId(result.player_id);
      await refreshLeaderboard("Tất cả");
    } catch {
      setError("Chưa tạo được phòng game. Vui lòng thử lại.");
    } finally {
      setIsBusy(false);
    }
  }

  useEffect(() => {
    void createSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = session?.questions[session.currentIndex] ?? null;
  const myAnswer = session?.currentAnswers[playerId];
  const myScore = session?.scores[playerId];
  const departments = useMemo(() => {
    const values = new Set([department, ...(session?.players.map((player) => player.department) ?? []), ...leaderboard.map((row) => row.department)]);
    return ["Tất cả", ...Array.from(values)];
  }, [department, leaderboard, session]);

  async function runAction(action: () => Promise<GameSession | null>, next?: () => Promise<void>) {
    if (isBusy) return;
    setIsBusy(true);
    setError(null);
    try {
      const nextSession = await action();
      if (nextSession) setSession(nextSession);
      if (next) await next();
    } catch {
      setError("Game API đang bận. Thử lại một nhịp nữa nhé.");
    } finally {
      setIsBusy(false);
    }
  }

  async function startGame(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    await runAction(async () => {
      const joined = await apiJson<SessionResponse>(`/api/v1/game/sessions/${session.id}/join`, {
        method: "POST",
        body: JSON.stringify({ display_name: displayName, department })
      });
      setPlayerId(joined.player_id ?? playerId);
      const started = await apiJson<SessionResponse>(`/api/v1/game/sessions/${session.id}/start`, { method: "POST" });
      return started.session;
    });
  }

  async function submitAnswer(selectedIndex: number) {
    if (!session || myAnswer) return;
    await runAction(async () => {
      const result = await apiJson<AnswerResponse>(`/api/v1/game/sessions/${session.id}/answer`, {
        method: "POST",
        body: JSON.stringify({ player_id: playerId, selected_index: selectedIndex })
      });
      return result.session;
    });
  }

  async function advance() {
    if (!session) return;
    await runAction(
      async () => {
        const result = await apiJson<SessionResponse>(`/api/v1/game/sessions/${session.id}/next`, { method: "POST" });
        return result.session;
      },
      async () => {
        if (session.phase === "scoreboard" && session.currentIndex === session.questions.length - 1) {
          await refreshLeaderboard();
        }
      }
    );
  }

  async function filterLeaderboard(nextDepartment: string) {
    setSelectedDepartment(nextDepartment);
    await refreshLeaderboard(nextDepartment);
  }

  if (!session) {
    return (
      <section className="panel gameLoading">
        <p className="eyebrow">AI Quiz Battle</p>
        <h2>Đang mở phòng game</h2>
        <p>Chuẩn bị câu hỏi AI, điểm số và leaderboard cho buổi khởi động.</p>
      </section>
    );
  }

  return (
    <div className="gameStack">
      <section className="gameHero panel">
        <div>
          <p className="eyebrow">F09 Engagement Game</p>
          <h2>AI Quiz Battle</h2>
          <p>
            Phiên quiz AI ngắn cho đội ngũ: chấm điểm phía server, câu hỏi vừa sức, có reveal đúng/sai và
            leaderboard theo phòng ban.
          </p>
        </div>
        <div className="gameHeroMetrics">
          <Metric label="Mã phòng" value={session.pinCode} />
          <Metric label="Người chơi" value={String(session.players.length)} />
          <Metric label="Câu hỏi" value={`${session.currentIndex + 1}/${session.questions.length}`} />
        </div>
      </section>

      {error && <div className="resultStrip gameError">{error}</div>}

      {session.phase === "lobby" && (
        <LobbyPanel
          department={department}
          displayName={displayName}
          isBusy={isBusy}
          onDepartment={setDepartment}
          onDisplayName={setDisplayName}
          onStart={startGame}
          session={session}
        />
      )}

      {session.phase === "question" && currentQuestion && (
        <QuestionPanel
          currentQuestion={currentQuestion}
          isBusy={isBusy}
          myAnswer={myAnswer}
          myScore={myScore}
          onAdvance={advance}
          onAnswer={submitAnswer}
          session={session}
        />
      )}

      {session.phase === "reveal" && currentQuestion && (
        <RevealPanel currentQuestion={currentQuestion} myAnswer={myAnswer} myScore={myScore} onAdvance={advance} session={session} />
      )}

      {session.phase === "scoreboard" && (
        <ScoreboardPanel isBusy={isBusy} onAdvance={advance} playerId={playerId} session={session} />
      )}

      {session.phase === "gameover" && (
        <WinnerPanel
          departments={departments}
          leaderboard={leaderboard}
          onDepartment={filterLeaderboard}
          onReplay={createSession}
          playerId={playerId}
          selectedDepartment={selectedDepartment}
          session={session}
        />
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="gameMetric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LobbyPanel({
  department,
  displayName,
  isBusy,
  onDepartment,
  onDisplayName,
  onStart,
  session
}: {
  department: string;
  displayName: string;
  isBusy: boolean;
  onDepartment: (value: string) => void;
  onDisplayName: (value: string) => void;
  onStart: (event: FormEvent<HTMLFormElement>) => void;
  session: GameSession;
}) {
  return (
    <div className="twoColumn gameLobby">
      <section className="panel">
        <p className="eyebrow">Lobby</p>
        <h2>Vào phòng bằng mã {session.pinCode}</h2>
        <form className="assessmentForm" onSubmit={onStart}>
          <label>
            Tên hiển thị
            <input value={displayName} onChange={(event) => onDisplayName(event.target.value)} />
          </label>
          <label>
            Phòng ban
            <input value={department} onChange={(event) => onDepartment(event.target.value)} />
          </label>
          <button className="primaryButton full" disabled={isBusy} type="submit">
            {isBusy ? "Đang bắt đầu..." : "Bắt đầu phiên game"}
          </button>
        </form>
      </section>
      <section className="panel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Người chơi</p>
            <h2>{session.players.length} người sẵn sàng</h2>
          </div>
          <span className="scoreBadge">Server-side scoring</span>
        </div>
        <div className="gamePlayerGrid">
          {session.players.map((player, index) => (
            <div className="gamePlayerChip" key={player.id} style={{ animationDelay: `${index * 55}ms` }}>
              <span>{player.avatar}</span>
              <strong>{player.displayName}</strong>
              <small>{player.department}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function QuestionPanel({
  currentQuestion,
  isBusy,
  myAnswer,
  myScore,
  onAdvance,
  onAnswer,
  session
}: {
  currentQuestion: GameSession["questions"][number];
  isBusy: boolean;
  myAnswer: GameSession["currentAnswers"][string] | undefined;
  myScore: GameSession["scores"][string] | undefined;
  onAdvance: () => void;
  onAnswer: (index: number) => void;
  session: GameSession;
}) {
  const answeredCount = Object.keys(session.currentAnswers).length;

  return (
    <section className="panel gameQuestionPanel">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Câu {session.currentIndex + 1} / {session.questions.length}</p>
          <h2>
            <AnimatedWords text={currentQuestion.prompt} />
          </h2>
        </div>
        <Countdown deadlineTs={session.deadlineTs} timeLimitSec={currentQuestion.timeLimitSec} />
      </div>
      <div className="gameTopicRow">
        <span className="scoreBadge">{currentQuestion.topic}</span>
        <span>{answeredCount}/{session.players.length} đã trả lời</span>
        {myAnswer && <span className="gameSent">Đã gửi +{myScore?.lastGain ?? 0}</span>}
      </div>
      <div className={currentQuestion.type === "truefalse" ? "gameAnswerGrid two" : "gameAnswerGrid"}>
        {currentQuestion.options.map((option, index) => {
          const meta = optionMeta[index % optionMeta.length];
          const selected = myAnswer?.selectedIndex === index;
          const locked = Boolean(myAnswer);
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
      <div className="buttonRow right">
        <button className="secondaryButton" disabled={!myAnswer || isBusy} onClick={onAdvance} type="button">
          Reveal đáp án
        </button>
      </div>
    </section>
  );
}

function RevealPanel({
  currentQuestion,
  myAnswer,
  myScore,
  onAdvance,
  session
}: {
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
        <h2>{correct ? "Chính xác" : myAnswer ? "Chưa đúng" : "Hết giờ"}</h2>
        <p>{correct ? "Câu trả lời nhanh và đúng được cộng điểm tốc độ." : "Đáp án đúng đã được highlight để cả đội cùng học."}</p>
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
          <strong>Fun fact AI</strong>
          <span>{currentQuestion.funFact}</span>
        </div>
        <div className="buttonRow right">
          <button className="primaryButton" onClick={onAdvance} type="button">
            Xem bảng xếp hạng
          </button>
        </div>
      </section>
    </div>
  );
}

function ScoreboardPanel({
  isBusy,
  onAdvance,
  playerId,
  session
}: {
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
        <button className="primaryButton" disabled={isBusy} onClick={onAdvance} type="button">
          {more ? "Câu tiếp theo" : "Xem người chiến thắng"}
        </button>
      </div>
      <RankingList playerId={playerId} ranking={session.ranking} />
    </section>
  );
}

function WinnerPanel({
  departments,
  leaderboard,
  onDepartment,
  onReplay,
  playerId,
  selectedDepartment,
  session
}: {
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
        <h2>{winner?.player.displayName} thắng phiên này</h2>
        <p className="lessonLead">
          {winner?.score.total} điểm - {winner?.player.department}
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
        <button className="secondaryButton full" onClick={onReplay} type="button">
          Tạo phiên mới
        </button>
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
            <small>{row.department} - {row.gamesPlayed} phiên</small>
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
