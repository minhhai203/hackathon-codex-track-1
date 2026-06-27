create extension if not exists pgcrypto;

create or replace function public.is_org_member(org_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.organization_members m
    where m.organization_id = org_id
      and m.user_id = auth.uid()
  )
$$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'manager', 'employee')),
  department text,
  job_title text,
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  preferred_address text not null default 'neutral' check (preferred_address in ('anh', 'chi', 'neutral')),
  role_id text,
  ai_level integer not null default 0 check (ai_level between 0 and 5),
  learning_profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  role_id text not null,
  score integer not null check (score between 0 and 100),
  ai_level integer not null check (ai_level between 0 and 5),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_modules (
  id text primary key,
  role_id text not null,
  tier integer not null check (tier between 1 and 4),
  level integer not null check (level between 1 and 5),
  title text not null,
  outcome text not null,
  content jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  name text not null,
  version integer not null default 1,
  created_by uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_path_modules (
  path_id uuid not null references public.learning_paths(id) on delete cascade,
  module_id text not null references public.learning_modules(id) on delete cascade,
  ordering integer not null,
  primary key (path_id, module_id)
);

create table if not exists public.module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null references public.learning_modules(id) on delete cascade,
  status text not null check (status in ('chua-hoc', 'dang-hoc', 'hoan-thanh')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  audience text not null check (audience in ('employee', 'manager')),
  title text,
  summary text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_memories (
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  audience text not null check (audience in ('employee', 'manager')),
  core_context text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, audience)
);

create table if not exists public.practice_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null references public.learning_modules(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.grading_results (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.practice_submissions(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  confidence numeric(4,2) not null default 0,
  feedback text not null,
  rubric_version text not null default 'v1',
  created_at timestamptz not null default now()
);

create table if not exists public.reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text references public.learning_modules(id) on delete set null,
  content text not null,
  is_shared boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.time_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hours_saved numeric(5,2) not null default 0,
  usefulness integer not null default 0 check (usefulness between 1 and 10),
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_usage_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature_key text not null,
  tokens_used integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.profiles enable row level security;
alter table public.assessment_results enable row level security;
alter table public.learning_modules enable row level security;
alter table public.learning_paths enable row level security;
alter table public.learning_path_modules enable row level security;
alter table public.module_progress enable row level security;
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_memories enable row level security;
alter table public.practice_submissions enable row level security;
alter table public.grading_results enable row level security;
alter table public.reflections enable row level security;
alter table public.time_logs enable row level security;
alter table public.ai_usage_ledger enable row level security;

create policy organizations_select_own
on public.organizations
for select
using (owner_user_id = auth.uid() or public.is_org_member(id));

create policy organizations_insert_own
on public.organizations
for insert
with check (owner_user_id = auth.uid());

create policy organization_members_select_own
on public.organization_members
for select
using (user_id = auth.uid() or public.is_org_member(organization_id));

create policy organization_members_insert_own
on public.organization_members
for insert
with check (user_id = auth.uid());

create policy organization_members_update_own
on public.organization_members
for update
using (user_id = auth.uid());

create policy profiles_select_own
on public.profiles
for select
using (user_id = auth.uid());

create policy profiles_insert_own
on public.profiles
for insert
with check (user_id = auth.uid());

create policy profiles_update_own
on public.profiles
for update
using (user_id = auth.uid());

create policy assessment_results_select_own
on public.assessment_results
for select
using (user_id = auth.uid() or public.is_org_member(organization_id));

create policy assessment_results_insert_own
on public.assessment_results
for insert
with check (user_id = auth.uid());

create policy learning_modules_select_public
on public.learning_modules
for select
using (active = true);

create policy learning_paths_select_org
on public.learning_paths
for select
using (organization_id is null or public.is_org_member(organization_id));

create policy learning_paths_insert_org
on public.learning_paths
for insert
with check (organization_id is null or public.is_org_member(organization_id));

create policy learning_path_modules_select_org
on public.learning_path_modules
for select
using (exists (
  select 1
  from public.learning_paths p
  where p.id = learning_path_modules.path_id
    and (p.organization_id is null or public.is_org_member(p.organization_id))
));

create policy module_progress_select_own
on public.module_progress
for select
using (user_id = auth.uid());

create policy module_progress_insert_own
on public.module_progress
for insert
with check (user_id = auth.uid());

create policy module_progress_update_own
on public.module_progress
for update
using (user_id = auth.uid());

create policy chat_conversations_select_own
on public.chat_conversations
for select
using (user_id = auth.uid());

create policy chat_conversations_insert_own
on public.chat_conversations
for insert
with check (user_id = auth.uid());

create policy chat_messages_select_own
on public.chat_messages
for select
using (exists (
  select 1
  from public.chat_conversations c
  where c.id = chat_messages.conversation_id
    and c.user_id = auth.uid()
));

create policy chat_messages_insert_own
on public.chat_messages
for insert
with check (exists (
  select 1
  from public.chat_conversations c
  where c.id = chat_messages.conversation_id
    and c.user_id = auth.uid()
));

create policy chat_memories_select_own
on public.chat_memories
for select
using (user_id = auth.uid());

create policy chat_memories_insert_own
on public.chat_memories
for insert
with check (user_id = auth.uid());

create policy chat_memories_update_own
on public.chat_memories
for update
using (user_id = auth.uid());

create policy practice_submissions_select_own
on public.practice_submissions
for select
using (user_id = auth.uid());

create policy practice_submissions_insert_own
on public.practice_submissions
for insert
with check (user_id = auth.uid());

create policy grading_results_select_own
on public.grading_results
for select
using (exists (
  select 1
  from public.practice_submissions s
  where s.id = grading_results.submission_id
    and s.user_id = auth.uid()
));

create policy reflections_select_own
on public.reflections
for select
using (user_id = auth.uid() or is_shared = true);

create policy reflections_insert_own
on public.reflections
for insert
with check (user_id = auth.uid());

create policy reflections_update_own
on public.reflections
for update
using (user_id = auth.uid());

create policy time_logs_select_own
on public.time_logs
for select
using (user_id = auth.uid());

create policy time_logs_insert_own
on public.time_logs
for insert
with check (user_id = auth.uid());

create policy ai_usage_ledger_select_own
on public.ai_usage_ledger
for select
using (user_id = auth.uid());

create policy ai_usage_ledger_insert_own
on public.ai_usage_ledger
for insert
with check (user_id = auth.uid());
