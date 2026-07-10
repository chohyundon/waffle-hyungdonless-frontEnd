-- board_comments.board_id 기준으로 boards.comment_count 재계산
create or replace function public.recount_board_comment_counts()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.boards b
  set
    comment_count = coalesce(c.cnt, 0),
    updated_at = now()
  from (
    select board_id, count(*)::int as cnt
    from public.board_comments
    group by board_id
  ) c
  where b.id = c.board_id;

  update public.boards
  set
    comment_count = 0,
    updated_at = now()
  where id not in (
    select distinct board_id from public.board_comments
  );
end;
$$;

select public.recount_board_comment_counts();
