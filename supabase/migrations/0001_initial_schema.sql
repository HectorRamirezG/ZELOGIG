create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) between 1 and 60),
  created_at timestamptz not null default now()
);

create table if not exists public.levels (
  id text primary key,
  title text not null,
  difficulty smallint not null check (difficulty between 1 and 5),
  schema_version smallint not null default 1,
  definition jsonb not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.level_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  level_id text not null references public.levels(id) on delete cascade,
  completed boolean not null default false,
  best_moves integer check (best_moves is null or best_moves >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, level_id)
);

alter table public.profiles enable row level security;
alter table public.levels enable row level security;
alter table public.level_progress enable row level security;

create policy "published levels are readable" on public.levels for select using (is_published = true);
create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "users read own progress" on public.level_progress for select using (auth.uid() = user_id);
create policy "users insert own progress" on public.level_progress for insert with check (auth.uid() = user_id);
create policy "users update own progress" on public.level_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
