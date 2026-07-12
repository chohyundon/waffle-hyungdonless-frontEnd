-- public.notifications: 인앱 알림 (댓글 알림 등)
create table public.notifications (
  id           uuid        primary key default gen_random_uuid(),
  recipient_id uuid        not null references auth.users (id) on delete cascade,
  actor_id     uuid        not null references auth.users (id) on delete cascade,
  type         text        not null default 'board_comment',
  board_id     uuid        not null references public.boards (id) on delete cascade,
  comment_id   uuid        references public.board_comments (id) on delete set null,
  title        text        not null,
  is_read      boolean     not null default false,
  created_at   timestamptz not null default now()
);

-- 내 알림 목록 조회용 (최신순)
create index notifications_recipient_created_at_idx
  on public.notifications (recipient_id, created_at desc);

-- 읽지 않은 개수 카운트용
create index notifications_recipient_is_read_idx
  on public.notifications (recipient_id, is_read);

alter table public.notifications enable row level security;

-- 본인 알림만 조회 가능
create policy "notifications_select_own"
  on public.notifications
  for select
  to authenticated
  using (auth.uid() = recipient_id);

-- 읽음 처리 (is_read 업데이트)만 허용, 직접 INSERT는 트리거만 가능
create policy "notifications_update_own"
  on public.notifications
  for update
  to authenticated
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

-- 직접 삭제는 본인만 가능
create policy "notifications_delete_own"
  on public.notifications
  for delete
  to authenticated
  using (auth.uid() = recipient_id);

-- ---------------------------------------------------------------
-- 트리거: board_comments INSERT 시 글 작성자에게 알림 생성
-- ---------------------------------------------------------------
create or replace function public.create_board_comment_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_board_owner_id uuid;
  v_actor_nickname text;
begin
  -- 1) 해당 게시글의 작성자 조회
  select user_id
    into v_board_owner_id
    from public.boards
   where id = new.board_id;

  -- 2) 본인 게시글에 본인이 댓글 → 알림 없음
  if v_board_owner_id is null or v_board_owner_id = new.user_id then
    return new;
  end if;

  -- 3) 댓글 작성자 닉네임 확인 (board_comments.nickname 우선 사용)
  v_actor_nickname := coalesce(nullif(trim(new.nickname), ''), '누군가');

  -- 4) 알림 생성
  insert into public.notifications (
    recipient_id,
    actor_id,
    type,
    board_id,
    comment_id,
    title
  ) values (
    v_board_owner_id,
    new.user_id,
    'board_comment',
    new.board_id,
    new.id,
    v_actor_nickname || '님이 댓글을 남겼습니다.'
  );

  return new;
end;
$$;

create trigger board_comments_create_notification
  after insert on public.board_comments
  for each row
  execute function public.create_board_comment_notification();

-- ---------------------------------------------------------------
-- Realtime: notifications 테이블 구독 활성화
-- ---------------------------------------------------------------
alter publication supabase_realtime add table public.notifications;
