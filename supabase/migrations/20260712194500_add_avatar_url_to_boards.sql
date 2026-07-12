-- 게시글에 작성자 프로필 이미지 URL 저장 (nickname과 동일하게 denormalize)
alter table public.boards
  add column if not exists avatar_url text;

-- 기존 글: auth.users 메타데이터에서 아바타 백필
update public.boards b
set avatar_url = coalesce(
  nullif(au.raw_user_meta_data->>'avatar_url', ''),
  nullif(au.raw_user_meta_data->>'picture', '')
)
from auth.users au
where b.user_id = au.id
  and b.avatar_url is null;
