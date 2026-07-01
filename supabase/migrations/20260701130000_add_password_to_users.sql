-- public.users에 password 컬럼 추가 (auth.users와 별도 프로필용)
-- 실제 로그인 검증은 Supabase Auth(auth.users)가 담당합니다.
alter table public.users
  add column if not exists password text not null default '';

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
