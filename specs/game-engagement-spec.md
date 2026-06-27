# Feature Spec — F09 Engagement Game (AI Quiz Battle)

> Stack đích: Next.js, Supabase, FastAPI/LangGraph (backend hiện có), WebSocket cho real-time.
> Mục đích: định nghĩa khung tính năng để nhiều người/agent build song song, tách rõ lõi tất định và lớp real-time.

## 1. Product Frame

Một **module game dạng quizizz** nằm trong nền tảng giáo dục AI cho doanh nghiệp, mục tiêu **gia tăng gắn kết nội bộ**. Game tổ chức định kỳ **sáng thứ 2 đầu tuần** như hoạt động khởi động.

Đặc điểm cốt lõi:

- Quiz trắc nghiệm **thi đấu thời gian thực** (giống Quizizz/Kahoot), **live multiplayer** qua WebSocket — host điều khiển, leaderboard cập nhật trực tiếp.
- Mỗi phiên **10–15 câu**, chủ đề **giới hạn trong AI** (đồng bộ sứ mệnh giáo dục AI của nền tảng).
- Kết thúc hiện **popup vinh danh người chiến thắng**.
- Điểm mỗi thành viên đưa vào **bảng xếp hạng tổng**, **lọc được theo phòng ban**.

Nguyên tắc kế thừa từ dự án: **tất định trước, LLM sau** và **cô lập dữ liệu theo tổ chức (RLS)**. Câu hỏi AI có thể soạn tay hoặc sinh bằng LLM offline, nhưng gameplay & chấm điểm hoàn toàn tất định, chấm phía server.

## 2. Target Architecture

```text
apps/web/                         # Next.js: lobby, host console, player, leaderboard
└── features/game/                # UI components của game (View)

apps/agent/ (hoặc src/ hiện tại)  # Python backend
└── game/
    ├── models/                   # GameSession state machine, ScoringService (Model thuần)
    ├── repositories/             # Supabase repos
    ├── controllers/              # REST + WebSocket (Controller)
    └── services/session_manager  # Registry phiên live + broadcast

supabase/migrations/             # game_* tables + RLS
```

### Runtime Boundaries

| Lớp | Trách nhiệm |
|---|---|
| Next.js | Lobby, host console, màn chơi, leaderboard, popup winner, WS client |
| WebSocket (FastAPI/Starlette) | Phát câu hỏi, nhận đáp án, broadcast điểm/scoreboard |
| Game engine (Python thuần) | State machine phiên, chấm điểm tất định, ranking |
| Supabase | Câu hỏi, phiên, người chơi, đáp án, điểm, leaderboard tổng + RLS |
| In-memory / Redis | State phiên live; Redis pub/sub khi scale nhiều instance |

### Non-Goals (giai đoạn đầu)

- Không sao chép thương hiệu/asset của Quizizz/quiz.com — chỉ học pattern tương tác.
- Không làm chat trong game, voice, hay social feed.
- Không tạo câu hỏi bằng LLM realtime trong lúc chơi (soạn/sinh offline trước).
- Không tự ý thay đổi điểm/record nếu không qua chấm phía server.

## 3. Kiến trúc MVC

- **Model** = logic game thuần (state machine + scoring) + repository Supabase. Test được độc lập, tất định.
- **Controller** = FastAPI REST (cấu hình phiên, leaderboard) + WebSocket (gameplay). Không chứa logic tính điểm.
- **View** = Next.js render trạng thái nhận từ WS/REST; không tự quyết điểm.

> Khuyến nghị hiện thực: tách lõi game (engine + scoring) thành module thuần, và đặt một lớp transport trừu tượng (ví dụ interface `GameController`) giữa UI và nguồn dữ liệu. Khi chưa có backend có thể chạy bằng controller mock (bots + timer); khi có backend chỉ thay bằng `WebSocketGameController` mà UI không đổi.

## 4. Data Model (Supabase)

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `game_questions` | id, topic, type, prompt, options (jsonb), correct_index, time_limit_sec, difficulty, fun_fact | type ∈ mcq/truefalse/guess; chủ đề AI |
| `game_quizzes` | id, organization_id, title, question_ids (jsonb 10–15), created_by | Bộ câu hỏi 1 phiên |
| `game_sessions` | id, quiz_id, organization_id, host_user_id, status, pin_code, started_at, ended_at | status ∈ lobby/active/ended |
| `game_players` | id, session_id, user_id, display_name, department | Người chơi 1 phiên |
| `game_answers` | id, session_id, player_id, question_id, selected_index, response_ms, is_correct, points | Lưu từng câu trả lời |
| `game_scores` | session_id, player_id, total_points, rank | Điểm tổng kết phiên |
| `leaderboard_totals` | organization_id, user_id, department, total_points, games_played, updated_at | Xếp hạng tích lũy |

**RLS:** mọi bảng scope theo `organization_id`. Người chơi chỉ đọc phiên/leaderboard thuộc tổ chức mình; host chỉ điều khiển phiên do mình tạo. `game_questions` global đọc khi active.

## 5. Feature Modules (sub-features của F09)

### F09.1 — Session Setup & Lobby
**Outcome:** host tạo phiên từ một bộ câu hỏi AI (10–15 câu) và mở phòng có mã PIN.

- **Data:** game_quizzes, game_sessions, game_players.
- **API:** `POST /api/game/sessions`, `GET /api/game/sessions/{id}`, `WS join`.
- **Acceptance:** host tạo phiên, sinh PIN; người chơi join bằng PIN; lobby hiện danh sách người chờ realtime; chỉ host bấm start.

### F09.2 — Realtime Gameplay (WebSocket)
**Outcome:** mọi người nhận cùng câu hỏi cùng lúc, trả lời trong giới hạn thời gian.

- **Giao thức WS** `WS /api/v1/game/ws/{session_id}`, message `{type, payload}`:
  - Client→Server: `join`, `start`, `submit_answer`, `next_question`, `end_session`.
  - Server→Client: `lobby_update`, `question`, `answer_ack`, `reveal`, `scoreboard`, `game_over`.
- **Đồng bộ thời gian:** server gửi `deadline_ts` tuyệt đối; client đếm ngược theo deadline. Điểm tốc độ tính bằng `deadline - server_received_ts`.
- **Acceptance:** broadcast câu hỏi < 200ms; không gian lận (đáp án sau deadline/trùng bị loại); reconnect khôi phục câu hiện tại.

### F09.3 — Question Types (đa dạng)
**Outcome:** trộn nhiều dạng câu hỏi trong một phiên để giữ nhịp tươi.

- **Dạng:** `mcq` (4 đáp án), `truefalse` (Đúng/Sai), `guess` (đoán output AI). Hỗ trợ mở rộng multi-select sau.
- **Acceptance:** mỗi câu render đúng theo type; logic chấm điểm chung cho mọi type.

### F09.4 — Scoring & Ranking (tất định)
**Outcome:** chấm điểm công bằng, tạo kịch tính.

- **Công thức (xem §6):** điểm đúng cơ bản × hệ số tốc độ + thưởng streak.
- **Tie-break:** tổng điểm → số câu đúng → tổng thời gian trả lời đúng → đồng hạng.
- **Acceptance:** điểm tất định, test được; scoreboard hiện sau mỗi câu kèm delta hạng; chấm hoàn toàn server-side.

### F09.5 — Fun Fact AI (học + vui)
**Outcome:** sau mỗi câu reveal hiện một fun fact AI ngắn.

- **Data:** `game_questions.fun_fact`.
- **Acceptance:** fun fact hiện ở reveal, là strip học tập ngắn, không chiếm spotlight đúng/sai.

### F09.6 — Winner Ceremony & Popup
**Outcome:** kết thúc đáng nhớ (peak-end rule).

- **Acceptance:** popup vinh danh quán quân; podium top 3; nhạc/confetti (confetti có thể thêm sau); nút chơi lại.

### F09.7 — Aggregate Leaderboard & Department Filter
**Outcome:** điểm tích lũy nhiều phiên, lọc theo phòng ban.

- **Data:** `leaderboard_totals`.
- **Acceptance:** sau phiên cộng dồn `total_points`, tăng `games_played`; lọc theo `department`; (mở rộng) xếp hạng theo phòng để thi đua.

## 6. Cơ chế tính điểm (chuẩn)

Điểm mỗi câu = **Điểm đúng cơ bản** × **Hệ số tốc độ** + **Thưởng streak**.

```text
BASE = 1000
speed_ratio  = clamp((deadline_ts - server_received_ts) / time_limit, 0, 1)
speed_factor = 0.5 + 0.5 * speed_ratio          # [0.5, 1.0]
points       = round(BASE * speed_factor) + streak_bonus   nếu đúng
points       = 0                                            nếu sai / không trả lời
```

| Streak (đúng liên tiếp) | Bonus |
|---|---|
| 2 | +100 |
| 3 | +200 |
| 4 | +300 |
| ≥5 | +500 (trần) |

Trả lời sai → streak về 0. Dùng `server_received_ts` (không tin client time) để công bằng & chống gian lận.

**Tham số cấu hình host:** số câu 10–15 (mặc định 12), thời gian/câu 10–30s (mặc định 20s), bật/tắt streak, trộn thứ tự câu/đáp án.

## 7. UX / Game Feel (yêu cầu chấp nhận)

Bám `03-game-feelings.md` và `04-ui-components-technique.md`:

- **4 trụ cột cảm giác:** hồi hộp đếm ngược đồng bộ; phản hồi tức thì (< 400ms) khi trả lời; kịch tính thứ hạng (scoreboard + delta); cao trào winner.
- **Pacing:** mỗi câu 10–30s, reveal+scoreboard 4–6s, chuyển câu < 1s, cả phiên < 10 phút, không khoảng chết.
- **Auto-advance:** màn reveal/scoreboard tự chuyển tiếp sau ~8s, người chơi vẫn bấm tiếp ngay được.
- **Visual:** game stage (không giống dashboard), 4 đáp án 4 màu + 4 hình học cố định, tile lớn touch-first, tabular-nums cho số.
- **An toàn cảm xúc:** không "bottom shame"; có giải phụ (nhanh nhất, lội ngược dòng); câu hỏi vừa sức, vui.
- **Accessibility:** motion dùng transform/opacity, có `prefers-reduced-motion` fallback.

## 8. Acceptance tổng (Definition of Done)

- Một phiên 10–15 câu chạy < 10 phút, mượt, không khoảng chết.
- Chấm điểm tất định, test được; leaderboard chính xác, lọc phòng ban đúng.
- Real-time đồng bộ (< 200ms phát câu), chống gian lận server-side.
- Mọi bảng `game_*` có RLS theo tổ chức; cross-org đọc fail trong test.
- Migration idempotent; có seed bộ câu hỏi AI mẫu; lõi scoring/engine có unit test.

## 9. Feature ID & quy ước

| ID | Tên |
|---|---|
| `F09` | Engagement Game (AI Quiz Battle) |
| `F09.1` | Session setup & lobby |
| `F09.2` | Realtime gameplay (WebSocket) |
| `F09.3` | Question types |
| `F09.4` | Scoring & ranking |
| `F09.5` | Fun fact AI |
| `F09.6` | Winner ceremony |
| `F09.7` | Aggregate leaderboard & department filter |

Đồng bộ với khung F01–F08 trong `specs/core-feature-spec.md`. Kế hoạch giao việc: `planning/game-engagement-plan.md`.
