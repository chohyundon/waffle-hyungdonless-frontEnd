-- public.users: auth.users와 1:1 프로필 테이블
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  password text not null default '',
  name text not null,
  birth date not null,
  number text not null,
  nickname text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "users_select_own"
  on public.users
  for select
  to authenticated
  using (auth.uid() = id);

create policy "users_update_own"
  on public.users
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "users_insert_own"
  on public.users
  for insert
  to authenticated
  with check (auth.uid() = id);

-- auth 가입 시 user_metadata로 public.users 자동 생성
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name, birth, number, nickname, password)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    (new.raw_user_meta_data->>'birth')::date,
    new.raw_user_meta_data->>'number',
    new.raw_user_meta_data->>'nickname',
    coalesce(new.raw_user_meta_data->>'password', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
