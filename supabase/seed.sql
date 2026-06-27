-- Demo seed data for the current Supabase schema.
-- Run after supabase/migrations/20260627000100_core_platform.sql.
-- Test password for every seeded account: Demo@2026!

begin;

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-4111-8111-111111111111',
    'authenticated',
    'authenticated',
    'admin.nam@demo.local',
    crypt('Demo@2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Nguyen Hoang Nam","app_role":"admin"}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-4222-8222-222222222222',
    'authenticated',
    'authenticated',
    'admin.ha@demo.local',
    crypt('Demo@2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Tran Thu Ha","app_role":"admin"}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-4333-8333-333333333333',
    'authenticated',
    'authenticated',
    'an.le@demo.local',
    crypt('Demo@2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Le Minh An"}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '44444444-4444-4444-8444-444444444444',
    'authenticated',
    'authenticated',
    'bao.pham@demo.local',
    crypt('Demo@2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Pham Gia Bao"}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '55555555-5555-4555-8555-555555555555',
    'authenticated',
    'authenticated',
    'chi.do@demo.local',
    crypt('Demo@2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Do Khanh Chi"}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '66666666-6666-4666-8666-666666666666',
    'authenticated',
    'authenticated',
    'dung.vo@demo.local',
    crypt('Demo@2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Vo Quoc Dung"}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '77777777-7777-4777-8777-777777777777',
    'authenticated',
    'authenticated',
    'mai.nguyen@demo.local',
    crypt('Demo@2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Nguyen Ngoc Mai"}'::jsonb,
    now(),
    now()
  )
on conflict (id) do update
set
  email = excluded.email,
  encrypted_password = excluded.encrypted_password,
  email_confirmed_at = excluded.email_confirmed_at,
  raw_app_meta_data = excluded.raw_app_meta_data,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = now();

insert into auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
values
  (
    '11111111-1111-4111-8111-111111111111',
    '11111111-1111-4111-8111-111111111111',
    '{"sub":"11111111-1111-4111-8111-111111111111","email":"admin.nam@demo.local"}'::jsonb,
    'email',
    'admin.nam@demo.local',
    now(),
    now(),
    now()
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    '22222222-2222-4222-8222-222222222222',
    '{"sub":"22222222-2222-4222-8222-222222222222","email":"admin.ha@demo.local"}'::jsonb,
    'email',
    'admin.ha@demo.local',
    now(),
    now(),
    now()
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    '33333333-3333-4333-8333-333333333333',
    '{"sub":"33333333-3333-4333-8333-333333333333","email":"an.le@demo.local"}'::jsonb,
    'email',
    'an.le@demo.local',
    now(),
    now(),
    now()
  ),
  (
    '44444444-4444-4444-8444-444444444444',
    '44444444-4444-4444-8444-444444444444',
    '{"sub":"44444444-4444-4444-8444-444444444444","email":"bao.pham@demo.local"}'::jsonb,
    'email',
    'bao.pham@demo.local',
    now(),
    now(),
    now()
  ),
  (
    '55555555-5555-4555-8555-555555555555',
    '55555555-5555-4555-8555-555555555555',
    '{"sub":"55555555-5555-4555-8555-555555555555","email":"chi.do@demo.local"}'::jsonb,
    'email',
    'chi.do@demo.local',
    now(),
    now(),
    now()
  ),
  (
    '66666666-6666-4666-8666-666666666666',
    '66666666-6666-4666-8666-666666666666',
    '{"sub":"66666666-6666-4666-8666-666666666666","email":"dung.vo@demo.local"}'::jsonb,
    'email',
    'dung.vo@demo.local',
    now(),
    now(),
    now()
  ),
  (
    '77777777-7777-4777-8777-777777777777',
    '77777777-7777-4777-8777-777777777777',
    '{"sub":"77777777-7777-4777-8777-777777777777","email":"mai.nguyen@demo.local"}'::jsonb,
    'email',
    'mai.nguyen@demo.local',
    now(),
    now(),
    now()
  )
on conflict (id) do update
set
  user_id = excluded.user_id,
  identity_data = excluded.identity_data,
  provider = excluded.provider,
  provider_id = excluded.provider_id,
  last_sign_in_at = excluded.last_sign_in_at,
  updated_at = now();

insert into public.organizations (id, name, slug, owner_user_id, created_at)
values
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Cong ty Minh Hai AI',
    'minh-hai-ai',
    '11111111-1111-4111-8111-111111111111',
    now()
  )
on conflict (slug) do update
set
  name = excluded.name,
  owner_user_id = excluded.owner_user_id;

insert into public.organization_members (
  id,
  organization_id,
  user_id,
  role,
  department,
  job_title,
  created_at
)
values
  (
    '90111111-1111-4111-8111-111111111111',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '11111111-1111-4111-8111-111111111111',
    'owner',
    'Ban dieu hanh',
    'Giam doc van hanh AI',
    now()
  ),
  (
    '90222222-2222-4222-8222-222222222222',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '22222222-2222-4222-8222-222222222222',
    'manager',
    'Van hanh',
    'Quan tri vien van hanh',
    now()
  ),
  (
    '90333333-3333-4333-8333-333333333333',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '33333333-3333-4333-8333-333333333333',
    'employee',
    'Marketing',
    'Chuyen vien noi dung',
    now()
  ),
  (
    '90444444-4444-4444-8444-444444444444',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '44444444-4444-4444-8444-444444444444',
    'employee',
    'Kinh doanh',
    'Nhan vien phat trien khach hang',
    now()
  ),
  (
    '90555555-5555-4555-8555-555555555555',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '55555555-5555-4555-8555-555555555555',
    'employee',
    'Ke toan',
    'Chuyen vien bao cao tai chinh',
    now()
  ),
  (
    '90666666-6666-4666-8666-666666666666',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '66666666-6666-4666-8666-666666666666',
    'employee',
    'Van hanh',
    'Dieu phoi quy trinh',
    now()
  ),
  (
    '90777777-7777-4777-8777-777777777777',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '77777777-7777-4777-8777-777777777777',
    'employee',
    'Nhan su',
    'Chuyen vien dao tao noi bo',
    now()
  )
on conflict (organization_id, user_id) do update
set
  role = excluded.role,
  department = excluded.department,
  job_title = excluded.job_title;

insert into public.profiles (
  user_id,
  full_name,
  preferred_address,
  role_id,
  ai_level,
  learning_profile,
  created_at,
  updated_at
)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'Nguyen Hoang Nam',
    'anh',
    'van-hanh',
    5,
    '{"goals":["xem tong quan van hanh","phan bo lo trinh hoc"],"daily_tasks":["duyet bao cao","theo doi tien do"],"admin":true}'::jsonb,
    now(),
    now()
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'Tran Thu Ha',
    'chi',
    'van-hanh',
    4,
    '{"goals":["kiem tra nguoi hoc can ho tro","tong hop tin hieu phong ban"],"daily_tasks":["van hanh dashboard","ho tro quan ly"],"admin":true}'::jsonb,
    now(),
    now()
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'Le Minh An',
    'anh',
    'marketing',
    3,
    '{"goals":["lap ke hoach noi dung nhanh hon"],"daily_tasks":["viet brief","len lich noi dung"]}'::jsonb,
    now(),
    now()
  ),
  (
    '44444444-4444-4444-8444-444444444444',
    'Pham Gia Bao',
    'anh',
    'kinh-doanh',
    2,
    '{"goals":["chuan bi cau hoi discovery","tom tat cuoc goi"],"daily_tasks":["goi khach hang","viet follow-up"]}'::jsonb,
    now(),
    now()
  ),
  (
    '55555555-5555-4555-8555-555555555555',
    'Do Khanh Chi',
    'chi',
    'ke-toan',
    2,
    '{"goals":["giam thoi gian lap bao cao"],"daily_tasks":["doi soat","giai thich bien dong"]}'::jsonb,
    now(),
    now()
  ),
  (
    '66666666-6666-4666-8666-666666666666',
    'Vo Quoc Dung',
    'neutral',
    'van-hanh',
    1,
    '{"goals":["viet SOP ro hon"],"daily_tasks":["dieu phoi quy trinh","cap nhat checklist"]}'::jsonb,
    now(),
    now()
  ),
  (
    '77777777-7777-4777-8777-777777777777',
    'Nguyen Ngoc Mai',
    'chi',
    'khac',
    0,
    '{"goals":["hoc cach tom tat tai lieu dao tao"],"daily_tasks":["tong hop feedback","chuan bi tai lieu"]}'::jsonb,
    now(),
    now()
  )
on conflict (user_id) do update
set
  full_name = excluded.full_name,
  preferred_address = excluded.preferred_address,
  role_id = excluded.role_id,
  ai_level = excluded.ai_level,
  learning_profile = excluded.learning_profile,
  updated_at = now();

insert into public.learning_modules (
  id,
  role_id,
  tier,
  level,
  title,
  outcome,
  content,
  active,
  created_at
)
values
  (
    'foundation-ai-safety',
    'common',
    1,
    1,
    'AI Safety And Data Boundaries',
    'Learner can identify what data should not be pasted into AI tools.',
    '{"tags":["safety","governance","company-data"],"starter_kit":["Check data sensitivity before prompting.","Redact private fields before using AI."],"prerequisite_ids":[]}'::jsonb,
    true,
    now()
  ),
  (
    'foundation-prompt-basics',
    'common',
    1,
    1,
    'Prompt Basics For Daily Work',
    'Learner can turn a daily task into a clear AI prompt.',
    '{"tags":["prompting","workflow","productivity"],"starter_kit":["Ask for output format first.","Give role, context, and constraints."],"prerequisite_ids":["foundation-ai-safety"]}'::jsonb,
    true,
    now()
  ),
  (
    'foundation-tool-selection',
    'common',
    2,
    2,
    'Choose The Right AI Tool',
    'Learner can decide when to use chat, search, summarization, or automation.',
    '{"tags":["tooling","workflow","decision"],"starter_kit":["Match the tool to the job.","Prefer the simplest workflow first."],"prerequisite_ids":["foundation-prompt-basics"]}'::jsonb,
    true,
    now()
  ),
  (
    'foundation-rag-basics',
    'common',
    3,
    3,
    'Search, Retrieve, And Ground Answers',
    'Learner can understand why retrieval matters and how to verify an answer.',
    '{"tags":["rag","retrieval","grounding"],"starter_kit":["Ask the source before trusting the answer.","Use snippets, not memory only."],"prerequisite_ids":["foundation-tool-selection"]}'::jsonb,
    true,
    now()
  ),
  (
    'sales-discovery-ai',
    'kinh-doanh',
    2,
    2,
    'AI For Sales Discovery',
    'Learner can use AI to prepare discovery questions and account notes.',
    '{"tags":["sales","customer","discovery"],"starter_kit":["Draft discovery questions.","Summarize call notes into next steps."],"prerequisite_ids":["foundation-prompt-basics"]}'::jsonb,
    true,
    now()
  ),
  (
    'sales-proposal-ai',
    'kinh-doanh',
    3,
    3,
    'AI For Proposals And Follow-ups',
    'Learner can generate a polished proposal draft and follow-up plan.',
    '{"tags":["sales","proposal","follow-up"],"starter_kit":["Turn call notes into a proposal outline.","Ask for objection handling ideas."],"prerequisite_ids":["sales-discovery-ai"]}'::jsonb,
    true,
    now()
  ),
  (
    'accounting-report-automation',
    'ke-toan',
    2,
    2,
    'Accounting Reporting Automation',
    'Learner can reduce manual reporting work with structured prompts.',
    '{"tags":["accounting","reporting","automation"],"starter_kit":["Ask for report templates.","Summarize monthly variance explanations."],"prerequisite_ids":["foundation-prompt-basics"]}'::jsonb,
    true,
    now()
  ),
  (
    'accounting-reconciliation-ai',
    'ke-toan',
    3,
    3,
    'AI For Reconciliation And Exceptions',
    'Learner can use AI to inspect mismatches and draft exception notes.',
    '{"tags":["accounting","reconciliation","exceptions"],"starter_kit":["Ask for exception grouping.","Draft internal reconciliation notes."],"prerequisite_ids":["accounting-report-automation"]}'::jsonb,
    true,
    now()
  ),
  (
    'marketing-content-planning',
    'marketing',
    2,
    2,
    'AI For Content Planning',
    'Learner can plan content themes and production briefs with AI.',
    '{"tags":["marketing","content","planning"],"starter_kit":["Turn campaign goals into weekly themes.","Ask for content angles."],"prerequisite_ids":["foundation-prompt-basics"]}'::jsonb,
    true,
    now()
  ),
  (
    'marketing-campaign-briefs',
    'marketing',
    3,
    3,
    'AI For Campaign Briefs',
    'Learner can draft campaign briefs and iterate them quickly.',
    '{"tags":["marketing","campaign","brief"],"starter_kit":["Draft a campaign brief.","Ask for audience and CTA variants."],"prerequisite_ids":["marketing-content-planning"]}'::jsonb,
    true,
    now()
  ),
  (
    'operations-workflow-automation',
    'van-hanh',
    2,
    2,
    'AI For Operations Workflow Automation',
    'Learner can speed up recurring ops work with AI templates.',
    '{"tags":["operations","workflow","automation"],"starter_kit":["List repetitive tasks.","Draft a workflow SOP."],"prerequisite_ids":["foundation-prompt-basics"]}'::jsonb,
    true,
    now()
  ),
  (
    'operations-policy-qa',
    'van-hanh',
    3,
    3,
    'AI For Policy And SOP QA',
    'Learner can inspect policy drafts and improve clarity.',
    '{"tags":["operations","policy","sop"],"starter_kit":["Check a SOP against common edge cases.","Draft policy FAQs."],"prerequisite_ids":["operations-workflow-automation"]}'::jsonb,
    true,
    now()
  ),
  (
    'general-productivity-notes',
    'khac',
    2,
    2,
    'AI For Notes And Meetings',
    'Learner can turn meetings into structured next actions.',
    '{"tags":["general","notes","meetings"],"starter_kit":["Summarize meeting notes.","Extract action items and owners."],"prerequisite_ids":["foundation-prompt-basics"]}'::jsonb,
    true,
    now()
  ),
  (
    'general-research-synthesis',
    'khac',
    3,
    3,
    'AI For Research Synthesis',
    'Learner can compare sources and synthesize a practical answer.',
    '{"tags":["general","research","synthesis"],"starter_kit":["Compare options side by side.","Ask for a concise recommendation."],"prerequisite_ids":["general-productivity-notes"]}'::jsonb,
    true,
    now()
  ),
  (
    'legacy-spreadsheet-prompting',
    'common',
    4,
    5,
    'Legacy Spreadsheet Prompting',
    'Archived advanced module used to test inactive catalog filtering.',
    '{"tags":["legacy","spreadsheet"],"starter_kit":["Compare old and new workflows."],"prerequisite_ids":["foundation-rag-basics"]}'::jsonb,
    false,
    now()
  )
on conflict (id) do update
set
  role_id = excluded.role_id,
  tier = excluded.tier,
  level = excluded.level,
  title = excluded.title,
  outcome = excluded.outcome,
  content = excluded.content,
  active = excluded.active;

insert into public.learning_paths (
  id,
  organization_id,
  name,
  version,
  created_by,
  created_at
)
values
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Lo trinh nen tang AI cho cong ty',
    1,
    '11111111-1111-4111-8111-111111111111',
    now()
  ),
  (
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    null,
    'Lo trinh mau cong khai',
    1,
    null,
    now()
  )
on conflict (id) do update
set
  organization_id = excluded.organization_id,
  name = excluded.name,
  version = excluded.version,
  created_by = excluded.created_by;

insert into public.learning_path_modules (path_id, module_id, ordering)
values
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'foundation-ai-safety', 1),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'foundation-prompt-basics', 2),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'foundation-tool-selection', 3),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'marketing-content-planning', 4),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'sales-discovery-ai', 5),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'accounting-report-automation', 6),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'operations-workflow-automation', 7),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'foundation-ai-safety', 1),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'foundation-prompt-basics', 2),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'foundation-rag-basics', 3)
on conflict (path_id, module_id) do update
set ordering = excluded.ordering;

insert into public.assessment_results (
  id,
  user_id,
  organization_id,
  role_id,
  score,
  ai_level,
  payload,
  created_at
)
values
  (
    'a1333333-3333-4333-8333-333333333333',
    '33333333-3333-4333-8333-333333333333',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'marketing',
    78,
    3,
    '{"strengths":["Can brief campaign context"],"gaps":["Needs retrieval habit"],"daily_tasks":["content calendar","campaign brief"]}'::jsonb,
    now() - interval '5 days'
  ),
  (
    'a1444444-4444-4444-8444-444444444444',
    '44444444-4444-4444-8444-444444444444',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'kinh-doanh',
    64,
    2,
    '{"strengths":["Good customer context"],"gaps":["Needs better output framing"],"daily_tasks":["call notes","follow-up email"]}'::jsonb,
    now() - interval '4 days'
  ),
  (
    'a1555555-5555-4555-8555-555555555555',
    '55555555-5555-4555-8555-555555555555',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'ke-toan',
    69,
    2,
    '{"strengths":["Understands data sensitivity"],"gaps":["Needs automation examples"],"daily_tasks":["monthly variance","reconciliation"]}'::jsonb,
    now() - interval '3 days'
  ),
  (
    'a1666666-6666-4666-8666-666666666666',
    '66666666-6666-4666-8666-666666666666',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'van-hanh',
    42,
    1,
    '{"strengths":["Clear workflow owner"],"gaps":["Needs prompt basics"],"daily_tasks":["SOP update","handoff checklist"]}'::jsonb,
    now() - interval '2 days'
  ),
  (
    'a1777777-7777-4777-8777-777777777777',
    '77777777-7777-4777-8777-777777777777',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'khac',
    24,
    0,
    '{"strengths":["Knows internal training context"],"gaps":["New to AI tools"],"daily_tasks":["feedback summary","training notes"]}'::jsonb,
    now() - interval '1 day'
  )
on conflict (id) do update
set
  score = excluded.score,
  ai_level = excluded.ai_level,
  payload = excluded.payload;

insert into public.module_progress (
  user_id,
  module_id,
  status,
  completed_at,
  created_at
)
values
  (
    '33333333-3333-4333-8333-333333333333',
    'foundation-ai-safety',
    'hoan-thanh',
    now() - interval '6 days',
    now() - interval '8 days'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'foundation-prompt-basics',
    'hoan-thanh',
    now() - interval '4 days',
    now() - interval '8 days'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'marketing-content-planning',
    'dang-hoc',
    null,
    now() - interval '2 days'
  ),
  (
    '44444444-4444-4444-8444-444444444444',
    'foundation-ai-safety',
    'hoan-thanh',
    now() - interval '5 days',
    now() - interval '8 days'
  ),
  (
    '44444444-4444-4444-8444-444444444444',
    'sales-discovery-ai',
    'dang-hoc',
    null,
    now() - interval '2 days'
  ),
  (
    '55555555-5555-4555-8555-555555555555',
    'accounting-report-automation',
    'hoan-thanh',
    now() - interval '1 day',
    now() - interval '6 days'
  ),
  (
    '66666666-6666-4666-8666-666666666666',
    'foundation-prompt-basics',
    'chua-hoc',
    null,
    now()
  ),
  (
    '77777777-7777-4777-8777-777777777777',
    'general-productivity-notes',
    'chua-hoc',
    null,
    now()
  )
on conflict (user_id, module_id) do update
set
  status = excluded.status,
  completed_at = excluded.completed_at;

insert into public.chat_conversations (
  id,
  user_id,
  organization_id,
  audience,
  title,
  summary,
  created_at
)
values
  (
    'd1333333-3333-4333-8333-333333333333',
    '33333333-3333-4333-8333-333333333333',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'employee',
    'Lap campaign brief bang AI',
    'Learner asked how to structure a marketing brief safely.',
    now() - interval '2 days'
  ),
  (
    'd2222222-2222-4222-8222-222222222222',
    '22222222-2222-4222-8222-222222222222',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'manager',
    'Tong quan doi ngu can ho tro',
    'Admin reviewed risk signals by department.',
    now() - interval '1 day'
  )
on conflict (id) do update
set
  title = excluded.title,
  summary = excluded.summary;

insert into public.chat_messages (
  id,
  conversation_id,
  role,
  content,
  created_at
)
values
  (
    'e1333333-3333-4333-8333-333333333331',
    'd1333333-3333-4333-8333-333333333333',
    'system',
    'Use curriculum-backed guidance and avoid exposing sensitive company data.',
    now() - interval '2 days'
  ),
  (
    'e1333333-3333-4333-8333-333333333332',
    'd1333333-3333-4333-8333-333333333333',
    'user',
    'Toi can viet brief cho chien dich thang toi, nen bat dau the nao?',
    now() - interval '2 days' + interval '1 minute'
  ),
  (
    'e1333333-3333-4333-8333-333333333333',
    'd1333333-3333-4333-8333-333333333333',
    'assistant',
    'Hay mo ta muc tieu, doi tuong, kenh, rang buoc va dinh dang dau ra mong muon.',
    now() - interval '2 days' + interval '2 minutes'
  ),
  (
    'e2222222-2222-4222-8222-222222222221',
    'd2222222-2222-4222-8222-222222222222',
    'user',
    'Phong ban nao dang can ho tro nhat?',
    now() - interval '1 day'
  ),
  (
    'e2222222-2222-4222-8222-222222222222',
    'd2222222-2222-4222-8222-222222222222',
    'assistant',
    'Van hanh co tin hieu rui ro cao nhat vi AI level thap va module prompt basics chua hoan thanh.',
    now() - interval '1 day' + interval '2 minutes'
  )
on conflict (id) do update
set
  role = excluded.role,
  content = excluded.content;

insert into public.chat_memories (
  user_id,
  organization_id,
  audience,
  core_context,
  updated_at
)
values
  (
    '33333333-3333-4333-8333-333333333333',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'employee',
    'Marketing learner wants practical campaign brief templates and source-backed answers.',
    now()
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'manager',
    'Admin watches team risk, completion trend, and department coverage.',
    now()
  )
on conflict (user_id, audience) do update
set
  organization_id = excluded.organization_id,
  core_context = excluded.core_context,
  updated_at = now();

insert into public.practice_submissions (
  id,
  user_id,
  module_id,
  content,
  created_at
)
values
  (
    'f1333333-3333-4333-8333-333333333333',
    '33333333-3333-4333-8333-333333333333',
    'marketing-content-planning',
    'Campaign brief draft with target audience, content pillars, and channel notes.',
    now() - interval '1 day'
  ),
  (
    'f1444444-4444-4444-8444-444444444444',
    '44444444-4444-4444-8444-444444444444',
    'sales-discovery-ai',
    'Discovery question list for a new B2B lead and follow-up summary format.',
    now() - interval '2 days'
  ),
  (
    'f1666666-6666-4666-8666-666666666666',
    '66666666-6666-4666-8666-666666666666',
    'operations-workflow-automation',
    'Draft SOP outline for weekly inventory handoff and escalation rules.',
    now() - interval '3 days'
  )
on conflict (id) do update
set
  content = excluded.content;

insert into public.grading_results (
  id,
  submission_id,
  score,
  confidence,
  feedback,
  rubric_version,
  created_at
)
values
  (
    '0f133333-3333-4333-8333-333333333333',
    'f1333333-3333-4333-8333-333333333333',
    84,
    0.86,
    'Brief has clear structure; add evidence links and safety notes.',
    'v1',
    now() - interval '23 hours'
  ),
  (
    '0f144444-4444-4444-8444-444444444444',
    'f1444444-4444-4444-8444-444444444444',
    76,
    0.79,
    'Good customer context; improve next-step specificity.',
    'v1',
    now() - interval '47 hours'
  ),
  (
    '0f166666-6666-4666-8666-666666666666',
    'f1666666-6666-4666-8666-666666666666',
    58,
    0.62,
    'SOP draft is useful but needs concrete edge cases and owner fields.',
    'v1',
    now() - interval '70 hours'
  )
on conflict (id) do update
set
  score = excluded.score,
  confidence = excluded.confidence,
  feedback = excluded.feedback,
  rubric_version = excluded.rubric_version;

insert into public.reflections (
  id,
  user_id,
  module_id,
  content,
  is_shared,
  created_at
)
values
  (
    'ab333333-3333-4333-8333-333333333333',
    '33333333-3333-4333-8333-333333333333',
    'marketing-content-planning',
    'AI giup toi ra duoc 5 goc noi dung nhanh hon, nhung can checklist de tranh noi qua.',
    true,
    now() - interval '1 day'
  ),
  (
    'ab444444-4444-4444-8444-444444444444',
    '44444444-4444-4444-8444-444444444444',
    'sales-discovery-ai',
    'Toi can mau cau hoi ngan gon hon cho khach hang moi.',
    false,
    now() - interval '2 days'
  ),
  (
    'ab555555-5555-4555-8555-555555555555',
    '55555555-5555-4555-8555-555555555555',
    null,
    'Bao cao mau tiet kiem thoi gian, nhung du lieu tai chinh can duoc an danh.',
    true,
    now() - interval '3 days'
  )
on conflict (id) do update
set
  content = excluded.content,
  is_shared = excluded.is_shared;

insert into public.time_logs (
  id,
  user_id,
  hours_saved,
  usefulness,
  note,
  created_at
)
values
  (
    'c1333333-3333-4333-8333-333333333333',
    '33333333-3333-4333-8333-333333333333',
    11.50,
    8,
    'Tiet kiem thoi gian len outline campaign.',
    now() - interval '1 day'
  ),
  (
    'c1444444-4444-4444-8444-444444444444',
    '44444444-4444-4444-8444-444444444444',
    8.00,
    7,
    'Tom tat call notes nhanh hon.',
    now() - interval '2 days'
  ),
  (
    'c1555555-5555-4555-8555-555555555555',
    '55555555-5555-4555-8555-555555555555',
    14.00,
    9,
    'Giam thoi gian viet giai thich bien dong.',
    now() - interval '3 days'
  ),
  (
    'c1666666-6666-4666-8666-666666666666',
    '66666666-6666-4666-8666-666666666666',
    4.50,
    6,
    'Co SOP nhap ban dau nhung can review.',
    now() - interval '4 days'
  )
on conflict (id) do update
set
  hours_saved = excluded.hours_saved,
  usefulness = excluded.usefulness,
  note = excluded.note;

insert into public.ai_usage_ledger (
  id,
  user_id,
  feature_key,
  tokens_used,
  created_at
)
values
  (
    'ba333333-3333-4333-8333-333333333333',
    '33333333-3333-4333-8333-333333333333',
    'assessment',
    1280,
    now() - interval '5 days'
  ),
  (
    'ba333333-3333-4333-8333-333333333334',
    '33333333-3333-4333-8333-333333333333',
    'tutor-chat',
    2460,
    now() - interval '1 day'
  ),
  (
    'ba222222-2222-4222-8222-222222222222',
    '22222222-2222-4222-8222-222222222222',
    'manager-summary',
    1980,
    now() - interval '1 day'
  ),
  (
    'ba666666-6666-4666-8666-666666666666',
    '66666666-6666-4666-8666-666666666666',
    'practice-grading',
    910,
    now() - interval '3 days'
  )
on conflict (id) do update
set
  feature_key = excluded.feature_key,
  tokens_used = excluded.tokens_used;

commit;
