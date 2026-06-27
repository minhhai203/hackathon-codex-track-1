create table if not exists public.game_questions (
  id text primary key,
  organization_id uuid references public.organizations(id) on delete cascade,
  topic text not null,
  type text not null check (type in ('mcq', 'truefalse', 'guess')),
  prompt text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array'),
  correct_index integer not null check (correct_index >= 0),
  time_limit_sec integer not null default 20 check (time_limit_sec between 10 and 30),
  difficulty text not null default 'easy' check (difficulty in ('easy', 'medium', 'hard')),
  fun_fact text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.game_quizzes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  question_mode text not null default 'random' check (question_mode in ('random', 'custom')),
  question_ids jsonb not null check (jsonb_typeof(question_ids) = 'array'),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references public.game_quizzes(id) on delete set null,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  host_user_id uuid references auth.users(id) on delete set null,
  host_display_name text not null default 'Trưởng phòng',
  host_department text not null default 'Marketing',
  question_mode text not null default 'random' check (question_mode in ('random', 'custom')),
  status text not null default 'lobby' check (status in ('lobby', 'active', 'ended')),
  pin_code text not null,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.game_players (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.game_sessions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null,
  department text not null,
  role text not null default 'employee' check (role in ('employee')),
  joined_at timestamptz not null default now(),
  unique (session_id, user_id)
);

create table if not exists public.game_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.game_sessions(id) on delete cascade,
  player_id uuid not null references public.game_players(id) on delete cascade,
  question_id text not null references public.game_questions(id) on delete restrict,
  selected_index integer not null check (selected_index >= 0),
  response_ms integer not null check (response_ms >= 0),
  is_correct boolean not null,
  points integer not null default 0 check (points >= 0),
  created_at timestamptz not null default now(),
  unique (session_id, player_id, question_id)
);

create table if not exists public.game_scores (
  session_id uuid not null references public.game_sessions(id) on delete cascade,
  player_id uuid not null references public.game_players(id) on delete cascade,
  total_points integer not null default 0 check (total_points >= 0),
  rank integer not null check (rank > 0),
  correct_count integer not null default 0 check (correct_count >= 0),
  total_correct_ms integer not null default 0 check (total_correct_ms >= 0),
  created_at timestamptz not null default now(),
  primary key (session_id, player_id)
);

create table if not exists public.leaderboard_totals (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  department text not null,
  total_points integer not null default 0 check (total_points >= 0),
  games_played integer not null default 0 check (games_played >= 0),
  updated_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create index if not exists game_questions_org_idx on public.game_questions (organization_id, active);
create index if not exists game_quizzes_org_idx on public.game_quizzes (organization_id, created_at desc);
create index if not exists game_sessions_org_status_idx on public.game_sessions (organization_id, status, created_at desc);
create index if not exists game_sessions_pin_idx on public.game_sessions (pin_code);
create index if not exists game_players_session_idx on public.game_players (session_id);
create index if not exists game_answers_session_question_idx on public.game_answers (session_id, question_id);
create index if not exists leaderboard_totals_org_department_idx on public.leaderboard_totals (organization_id, department, total_points desc);

alter table public.game_questions enable row level security;
alter table public.game_quizzes enable row level security;
alter table public.game_sessions enable row level security;
alter table public.game_players enable row level security;
alter table public.game_answers enable row level security;
alter table public.game_scores enable row level security;
alter table public.leaderboard_totals enable row level security;

create policy game_questions_select_scoped
on public.game_questions
for select
using (active = true and (organization_id is null or public.is_org_member(organization_id)));

create policy game_questions_insert_org
on public.game_questions
for insert
with check (organization_id is null or public.is_org_member(organization_id));

create policy game_quizzes_select_org
on public.game_quizzes
for select
using (public.is_org_member(organization_id));

create policy game_quizzes_insert_org
on public.game_quizzes
for insert
with check (public.is_org_member(organization_id));

create policy game_sessions_select_org
on public.game_sessions
for select
using (public.is_org_member(organization_id));

create policy game_sessions_insert_org
on public.game_sessions
for insert
with check (public.is_org_member(organization_id));

create policy game_sessions_update_host
on public.game_sessions
for update
using (public.is_org_member(organization_id) and (host_user_id is null or host_user_id = auth.uid()));

create policy game_players_select_session_org
on public.game_players
for select
using (exists (
  select 1
  from public.game_sessions s
  where s.id = game_players.session_id
    and public.is_org_member(s.organization_id)
));

create policy game_players_insert_session_org
on public.game_players
for insert
with check (exists (
  select 1
  from public.game_sessions s
  where s.id = game_players.session_id
    and public.is_org_member(s.organization_id)
));

create policy game_answers_select_session_org
on public.game_answers
for select
using (exists (
  select 1
  from public.game_sessions s
  where s.id = game_answers.session_id
    and public.is_org_member(s.organization_id)
));

create policy game_answers_insert_player_or_org
on public.game_answers
for insert
with check (exists (
  select 1
  from public.game_sessions s
  join public.game_players p on p.session_id = s.id
  where s.id = game_answers.session_id
    and p.id = game_answers.player_id
    and public.is_org_member(s.organization_id)
));

create policy game_scores_select_session_org
on public.game_scores
for select
using (exists (
  select 1
  from public.game_sessions s
  where s.id = game_scores.session_id
    and public.is_org_member(s.organization_id)
));

create policy game_scores_insert_session_org
on public.game_scores
for insert
with check (exists (
  select 1
  from public.game_sessions s
  where s.id = game_scores.session_id
    and public.is_org_member(s.organization_id)
));

create policy leaderboard_totals_select_org
on public.leaderboard_totals
for select
using (public.is_org_member(organization_id));

create policy leaderboard_totals_insert_org
on public.leaderboard_totals
for insert
with check (public.is_org_member(organization_id));

create policy leaderboard_totals_update_org
on public.leaderboard_totals
for update
using (public.is_org_member(organization_id));

insert into public.game_questions (id, topic, type, prompt, options, correct_index, time_limit_sec, difficulty, fun_fact)
values
  ('ai-rag-basics', 'RAG', 'mcq', 'RAG trong AI thường dùng để làm gì?', '["Tra cứu tài liệu thật trước khi trả lời","Tăng kích thước màn hình","Xóa dữ liệu huấn luyện","Tự động mua quảng cáo"]'::jsonb, 0, 20, 'easy', 'RAG giúp câu trả lời có căn cứ hơn vì mô hình được cấp thêm ngữ cảnh từ nguồn dữ liệu thật.'),
  ('ai-prompt-length', 'Prompting', 'truefalse', 'Prompt càng dài thì kết quả AI luôn càng tốt.', '["Đúng","Sai"]'::jsonb, 1, 15, 'easy', 'Prompt tốt cần rõ vai trò, bối cảnh, ràng buộc và định dạng đầu ra; độ dài không tự đảm bảo chất lượng.'),
  ('ai-hallucination', 'An toàn AI', 'mcq', 'Hiện tượng AI bịa thông tin nghe hợp lý nhưng sai gọi là gì?', '["Hallucination","Tokenization","Fine-tuning","Embedding"]'::jsonb, 0, 18, 'easy', 'Giảm hallucination bằng cách yêu cầu nguồn, dùng RAG và kiểm chứng trước khi dùng cho quyết định quan trọng.'),
  ('ai-sensitive-data', 'Bảo mật', 'truefalse', 'Có thể dán dữ liệu khách hàng nhạy cảm vào chatbot công cộng nếu chỉ dùng để tóm tắt nhanh.', '["Đúng","Sai"]'::jsonb, 1, 15, 'easy', 'Dữ liệu cá nhân, tài chính, hợp đồng và thông tin nội bộ cần được ẩn hoặc xử lý trong môi trường được kiểm soát.'),
  ('ai-token', 'LLM cơ bản', 'mcq', 'Token trong mô hình ngôn ngữ gần nhất với khái niệm nào?', '["Mẩu văn bản mô hình xử lý","Mật khẩu đăng nhập","Đồng tiền điện tử","Tên một loại GPU"]'::jsonb, 0, 20, 'easy', 'Chi phí và giới hạn ngữ cảnh của LLM thường tính theo token, không phải số từ.'),
  ('ai-output-constraint', 'Output constraint', 'guess', 'Nếu yêu cầu AI: Tóm tắt cảm xúc trong đúng 1 từ: Tôi vừa được thăng chức, câu trả lời hợp lý nhất là gì?', '["Vui","Một đoạn văn dài","Không thể trả lời","404"]'::jsonb, 0, 20, 'medium', 'Ràng buộc output giúp AI trả lời theo đúng định dạng để dễ dùng trong workflow.'),
  ('ai-temperature', 'Model settings', 'mcq', 'Giảm temperature thường làm câu trả lời AI như thế nào?', '["Ổn định và ít ngẫu nhiên hơn","Luôn dài hơn","Không còn cần prompt","Tự kiểm chứng dữ liệu"]'::jsonb, 0, 20, 'medium', 'Temperature thấp phù hợp khi cần câu trả lời nhất quán; temperature cao phù hợp hơn cho brainstorming.'),
  ('ai-grounding', 'Grounding', 'truefalse', 'Grounding nghĩa là buộc câu trả lời bám vào nguồn/ngữ cảnh được cung cấp.', '["Đúng","Sai"]'::jsonb, 0, 15, 'medium', 'Grounding là thói quen quan trọng trong đào tạo AI doanh nghiệp vì giúp giảm trả lời mơ hồ.'),
  ('ai-eval', 'Đánh giá', 'mcq', 'Cách tốt nhất để biết workflow AI có hiệu quả là gì?', '["Đo bằng tiêu chí và ví dụ thật","Chỉ nhìn câu trả lời có hay không","Dùng prompt dài nhất","Chọn model đắt nhất"]'::jsonb, 0, 20, 'medium', 'Evaluation cần bộ ví dụ, tiêu chí chấm và so sánh trước/sau để tránh cảm tính.'),
  ('ai-role-prompt', 'Prompting', 'mcq', 'Trong prompt công việc, phần Bạn là chuyên gia... chủ yếu giúp gì?', '["Đặt vai trò và góc nhìn trả lời","Tăng bảo mật dữ liệu","Giảm số token về 0","Bắt buộc AI luôn đúng"]'::jsonb, 0, 18, 'easy', 'Vai trò giúp mô hình chọn ngôn ngữ, tiêu chí và độ sâu phù hợp hơn với nhiệm vụ.'),
  ('ai-human-review', 'Governance', 'truefalse', 'Với nội dung gửi khách hàng, con người vẫn nên review trước khi phát hành.', '["Đúng","Sai"]'::jsonb, 0, 15, 'easy', 'Human-in-the-loop giúp giữ chất lượng, tone thương hiệu và kiểm soát rủi ro pháp lý.'),
  ('ai-embedding', 'Embedding', 'mcq', 'Embedding thường được dùng để làm gì trong tìm kiếm AI?', '["Biểu diễn ý nghĩa văn bản thành vector","Nén ảnh thành JPG","Tạo mật khẩu mới","Chạy thanh toán"]'::jsonb, 0, 22, 'hard', 'Embedding giúp tìm các đoạn có nghĩa gần nhau, kể cả khi không trùng chính xác từ khóa.')
on conflict (id) do update
set
  topic = excluded.topic,
  type = excluded.type,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_index = excluded.correct_index,
  time_limit_sec = excluded.time_limit_sec,
  difficulty = excluded.difficulty,
  fun_fact = excluded.fun_fact,
  active = true,
  updated_at = now();
