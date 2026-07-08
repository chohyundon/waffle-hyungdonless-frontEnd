-- public.boards: 사부작 게시판 글
create table public.boards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  content text not null,
  board_type text not null,
  category text not null,
  nickname text not null,
  email text not null,
  image_url text,
  view_count integer not null default 0,
  like_count integer not null default 0,
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index boards_board_type_created_at_idx
  on public.boards (board_type, created_at desc);

alter table public.boards enable row level security;

create policy "boards_select_all"
  on public.boards
  for select
  to anon, authenticated
  using (true);

create policy "boards_insert_own"
  on public.boards
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "boards_update_own"
  on public.boards
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "boards_delete_own"
  on public.boards
  for delete
  to authenticated
  using (auth.uid() = user_id);
