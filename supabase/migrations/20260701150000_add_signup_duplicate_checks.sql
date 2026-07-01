-- 회원가입 전 이메일/닉네임 중복 확인 (anon 호출 가능)
create or replace function public.is_email_registered(check_email text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where lower(email) = lower(check_email)
  );
$$;

create or replace function public.is_nickname_taken(check_nickname text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where nickname = check_nickname
  );
$$;

grant execute on function public.is_email_registered(text) to anon, authenticated;
grant execute on function public.is_nickname_taken(text) to anon, authenticated;
