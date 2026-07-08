-- public.board_comments: 게시글 댓글
create table public.board_comments (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  content text not null,
  nickname text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint board_comments_content_not_blank check (char_length(trim(content)) > 0)
);

create index board_comments_board_id_created_at_idx
  on public.board_comments (board_id, created_at asc);

create index board_comments_user_id_idx on public.board_comments (user_id);

alter table public.board_comments enable row level security;

create policy "board_comments_select_all"
  on public.board_comments
  for select
  to anon, authenticated
  using (true);

create policy "board_comments_insert_own"
  on public.board_comments
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "board_comments_update_own"
  on public.board_comments
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "board_comments_delete_own"
  on public.board_comments
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- board_comments 변경 시 boards.comment_count 자동 동기화
create or replace function public.sync_board_comment_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.boards
    set
      comment_count = comment_count + 1,
      updated_at = now()
    where id = new.board_id;

    return new;
  end if;

  if tg_op = 'DELETE' then
    update public.boards
    set
      comment_count = greatest(comment_count - 1, 0),
      updated_at = now()
    where id = old.board_id;

    return old;
  end if;

  return null;
end;
$$;

create trigger board_comments_sync_count_insert
  after insert on public.board_comments
  for each row
  execute function public.sync_board_comment_count();

create trigger board_comments_sync_count_delete
  after delete on public.board_comments
  for each row
  execute function public.sync_board_comment_count();
