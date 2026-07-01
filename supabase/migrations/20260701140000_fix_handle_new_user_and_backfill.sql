-- 트리거: OAuth/누락 metadata 대비 + 기존 auth.users 프로필 백필
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_nickname text;
begin
  profile_nickname := coalesce(
    nullif(new.raw_user_meta_data->>'nickname', ''),
    split_part(coalesce(new.email, 'user'), '@', 1) || '_' || substr(new.id::text, 1, 8)
  );

  insert into public.users (id, email, name, birth, number, nickname, password)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(
      nullif(new.raw_user_meta_data->>'name', ''),
      split_part(coalesce(new.email, 'user'), '@', 1)
    ),
    coalesce(
      nullif(new.raw_user_meta_data->>'birth', '')::date,
      '1900-01-01'::date
    ),
    coalesce(new.raw_user_meta_data->>'number', ''),
    profile_nickname,
    coalesce(new.raw_user_meta_data->>'password', '')
  )
  on conflict (id) do update set
    email = excluded.email,
    name = excluded.name,
    birth = excluded.birth,
    number = excluded.number,
    nickname = excluded.nickname,
    password = excluded.password,
    updated_at = now();

  return new;
end;
$$;

insert into public.users (id, email, name, birth, number, nickname, password)
select
  u.id,
  coalesce(u.email, ''),
  coalesce(
    nullif(u.raw_user_meta_data->>'name', ''),
    split_part(coalesce(u.email, 'user'), '@', 1)
  ),
  coalesce(
    nullif(u.raw_user_meta_data->>'birth', '')::date,
    '1900-01-01'::date
  ),
  coalesce(u.raw_user_meta_data->>'number', ''),
  coalesce(
    nullif(u.raw_user_meta_data->>'nickname', ''),
    split_part(coalesce(u.email, 'user'), '@', 1) || '_' || substr(u.id::text, 1, 8)
  ),
  coalesce(u.raw_user_meta_data->>'password', '')
from auth.users u
where not exists (
  select 1 from public.users p where p.id = u.id
);
