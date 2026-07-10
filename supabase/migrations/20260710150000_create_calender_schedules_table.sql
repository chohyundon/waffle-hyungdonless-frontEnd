-- public.calender_schedules: 사용자 개인 캘린더 일정
create table public.calender_schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text not null default '',
  start_date date not null,
  end_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint calender_schedules_end_after_start check (end_date >= start_date)
);

create index calender_schedules_user_id_start_date_idx
  on public.calender_schedules (user_id, start_date);

alter table public.calender_schedules enable row level security;

create policy "calender_schedules_select_own"
  on public.calender_schedules
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "calender_schedules_insert_own"
  on public.calender_schedules
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "calender_schedules_update_own"
  on public.calender_schedules
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "calender_schedules_delete_own"
  on public.calender_schedules
  for delete
  to authenticated
  using (auth.uid() = user_id);
