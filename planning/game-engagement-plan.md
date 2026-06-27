# Delivery Plan — F09 Engagement Game (AI Quiz Battle)

> Companion plan cho `specs/game-engagement-spec.md`.
> Mục tiêu: cho agents/teammates một build order, bản đồ sở hữu, và giao thức handoff.

## 1. Delivery Strategy

Build theo vertical slices, **lõi tất định trước, real-time sau, UI juice cuối**. Mỗi slice phải tạo: shape dữ liệu + contract API/WS + tests + một artifact xác minh nhỏ, trước khi polish.

Thứ tự ưu tiên:

1. Game engine thuần (state machine + scoring) — tất định, test được.
2. Data foundation (`game_*` tables + RLS) + seed câu hỏi AI.
3. Session setup & lobby.
4. Realtime gameplay (WebSocket) + đồng bộ thời gian.
5. Scoring/ranking trực tiếp + scoreboard.
6. Winner ceremony + popup.
7. Aggregate leaderboard + lọc phòng ban.
8. Game feel / juice + accessibility + eval nhẹ.

> Khuyến nghị: hiện thực engine + UI với một seam transport (interface `GameController`) để chạy mock (bots + timer) trước, rồi viết `WebSocketGameController` cùng interface khi backend sẵn sàng — UI không phải đổi.

## 2. Workstreams

| Workstream | Sở hữu | Đường dẫn chính |
|---|---|---|
| `WS-G1 Engine` | state machine, scoring, ranking (thuần) | `lib/game/*` (web) hoặc `game/models/*` (backend) |
| `WS-G2 Supabase` | `game_*` schema, RLS, seed | `supabase/migrations`, `supabase/scripts` |
| `WS-G3 Realtime` | WebSocket server, session manager, broadcast | backend `game/controllers`, `game/services` |
| `WS-G4 Web UI` | lobby, host, player, reveal, scoreboard, winner | `apps/web/features/game`, `components/game` |
| `WS-G5 Content` | bộ câu hỏi AI + fun fact, độ khó | `supabase` seed, `lib/game/mockData` (mock) |
| `WS-G6 Docs/PM` | spec, plan, acceptance, handoff | `specs`, `planning` |

## 3. Milestones

### MG0 — Engine Core (tất định)
**Goal:** lõi game chạy & test được mà không cần DB/real-time.

Tasks:

- Định nghĩa types (Question/Player/GameState/Answer/Score).
- `scoreAnswer` (cơ bản × tốc độ + streak) theo spec §6.
- State machine: lobby → question → reveal → scoreboard → gameover; ranking + tie-break.
- Unit test mô phỏng 1 ván nhiều người.

Acceptance: điểm tốc độ/streak/tie-break/chuyển phase đúng; test pass tất định.

### MG1 — Data Foundation & Seed
**Goal:** mọi dữ liệu game scope theo tổ chức.

Tasks: migration `game_questions, game_quizzes, game_sessions, game_players, game_answers, game_scores, leaderboard_totals`; RLS theo `organization_id`; seed ≥1 bộ 10–15 câu AI + fun fact.

Acceptance: cross-org đọc fail trong test; migration idempotent; seed chạy được.
Parallel: WS-G2 (schema/RLS), WS-G5 (nội dung).

### MG2 — Session Setup & Lobby (F09.1)
**Goal:** host tạo phiên, người chơi join bằng PIN.

Tasks: REST `POST /api/game/sessions`, `GET /api/game/sessions/{id}`; sinh PIN; WS `join` + `lobby_update`.

Acceptance: host tạo phiên & PIN; player join; lobby realtime; chỉ host start.
Parallel: WS-G3 (WS join), WS-G4 (lobby UI), WS-G2 (persistence).

### MG3 — Realtime Gameplay (F09.2)
**Goal:** thi đấu đồng bộ thời gian thực.

Tasks: WS endpoint `/api/v1/game/ws/{session_id}`; message `question/submit_answer/reveal/next_question`; `deadline_ts` tuyệt đối; session manager in-memory; reconnect.

Acceptance: phát câu < 200ms; loại đáp án trễ/trùng; reconnect khôi phục câu hiện tại; chấm server-side.
Parallel: WS-G3 (server), WS-G4 (player/question UI), WS-G1 (engine nhúng).

### MG4 — Question Types (F09.3)
**Goal:** trộn mcq / truefalse / guess trong 1 phiên.

Acceptance: render đúng theo type; logic chấm chung mọi type.
Parallel: WS-G4 (render), WS-G5 (nội dung đa dạng).

### MG5 — Scoring, Scoreboard & Fun Fact (F09.4, F09.5)
**Goal:** điểm trực tiếp + kịch tính thứ hạng + học.

Tasks: broadcast `answer_ack` (points/streak) + `scoreboard` (ranking + delta) sau mỗi câu; reveal kèm `fun_fact` + phân bố lựa chọn.

Acceptance: điểm khớp engine; scoreboard delta đúng; fun fact hiện ở reveal.
Parallel: WS-G3, WS-G4.

### MG6 — Winner Ceremony (F09.6)
**Goal:** kết thúc đáng nhớ.

Tasks: `game_over` (winner + podium + full_ranking); popup vinh danh; podium top 3; nút chơi lại; (confetti thêm sau).

Acceptance: popup hiện đúng quán quân & podium; ghi `game_scores`.
Parallel: WS-G4 (ceremony), WS-G3 (event).

### MG7 — Aggregate Leaderboard & Department Filter (F09.7)
**Goal:** điểm tích lũy + thi đua phòng ban.

Tasks: cập nhật `leaderboard_totals` sau phiên; API đọc leaderboard; filter `department`; (mở rộng) xếp hạng theo phòng.

Acceptance: cộng dồn `total_points`/`games_played` đúng; filter phòng ban chuẩn; scope tổ chức.
Parallel: WS-G2 (query), WS-G4 (UI filter).

### MG8 — Game Feel & Polish
**Goal:** đạt "game feel" theo yêu cầu UX/game feel ở spec §7.

Tasks: auto-advance ~8s ở reveal/scoreboard (bấm tiếp được ngay); countdown đồng bộ + danger 3s cuối; motion transform/opacity + `prefers-reduced-motion`; giải phụ; cân chỉnh pacing < 10 phút.

Acceptance: phiên mượt, không khoảng chết; phản hồi < 400ms; có reduced-motion fallback.

## 4. Agent Assignment Board

| Agent | First task | Done when |
|---|---|---|
| Engine Agent | MG0 engine + scoring + test | test mô phỏng pass tất định |
| Supabase Agent | MG1 schema/RLS/seed | cross-org test pass, seed chạy |
| Realtime Agent | MG3 WS gameplay + session manager | phát câu < 200ms, reconnect OK |
| Web UI Agent | MG2→MG6 màn chơi (game stage, không giống dashboard) | luồng lobby→winner chạy với backend |
| Content Agent | MG1/MG4 bộ câu hỏi AI + fun fact | ≥10–15 câu đa dạng, fun fact đủ |
| Leaderboard Agent | MG7 aggregate + filter | tích lũy & lọc phòng ban đúng |

## 5. Handoff Protocol

Mỗi PR/handoff kèm: Feature ID (F09.x) + workstream; files đổi; migration thêm (idempotent?); API/WS contract thêm/đổi; node/logic engine thêm; tests đã chạy; gap + người nhận kế tiếp.
Đường ghi chú: `planning/handoffs/<date>-F09-<slug>.md`.

## 6. Risk Register

| Rủi ro | Tác động | Giảm thiểu |
|---|---|---|
| Lệch đồng hồ client | điểm tốc độ bất công | tính theo `server_received_ts`, gửi `deadline_ts` tuyệt đối |
| Gian lận điểm | leaderboard sai | chấm server-side, không lộ đáp án trước reveal |
| WS scale nhiều instance | broadcast lỗi | Redis pub/sub + state phiên ngoài process |
| RLS sai | rò dữ liệu chéo công ty | test cross-org mỗi migration |
| Sao chép UI Quizizz/quiz.com | rủi ro thương hiệu | chỉ học pattern, tự thiết kế asset/màu |
| Khoảng chết / lê thê | mất gắn kết | auto-advance, pacing < 10 phút, broadcast nhanh |
| Câu hỏi quá khó | gây nản | nội dung vừa sức, vui; có giải phụ |

## 7. First Steps Checklist

- [ ] Hiện thực MG0 engine + scoring (TypeScript hoặc Python) kèm test runner (vd. vitest/pytest).
- [ ] Viết migration `game_*` + RLS (MG1) và seed bộ câu hỏi AI.
- [ ] Dựng WS endpoint + session manager (MG3) tối thiểu (join → question → reveal).
- [ ] Viết `WebSocketGameController` cùng interface `GameController` để UI mock cắm thẳng.
- [ ] Mở handoff notes cho từng agent đang hoạt động.
