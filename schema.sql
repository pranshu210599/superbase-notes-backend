create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);