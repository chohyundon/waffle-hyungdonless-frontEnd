-- public.board_likes: 게시글 좋아요 (유저 × 글, 중복 불가)
create table public.board_likes (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint board_likes_board_user_unique unique (board_id, user_id)
);

create index board_likes_board_id_idx on public.board_likes (board_id);
create index board_likes_user_id_idx on public.board_likes (user_id);

alter table public.board_likes enable row level security;

create policy "board_likes_select_own"
  on public.board_likes
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "board_likes_insert_own"
  on public.board_likes
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "board_likes_delete_own"
  on public.board_likes
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- board_likes 변경 시 boards.like_count 자동 동기화
create or replace function public.sync_board_like_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.boards
    set
      like_count = like_count + 1,
      updated_at = now()
    where id = new.board_id;

    return new;
  end if;

  if tg_op = 'DELETE' then
    update public.boards
    set
      like_count = greatest(like_count - 1, 0),
      updated_at = now()
    where id = old.board_id;

    return old;
  end if;

  return null;
end;
$$;

create trigger board_likes_sync_count_insert
  after insert on public.board_likes
  for each row
  execute function public.sync_board_like_count();

create trigger board_likes_sync_count_delete
  after delete on public.board_likes
  for each row
  execute function public.sync_board_like_count();
