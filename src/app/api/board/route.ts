import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type BoardPayload = {
  title: string;
  content: string;
  boardType: string;
  category: string;
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const boardRaw = formData.get('board');
  const image = formData.get('image');

  if (typeof boardRaw !== 'string') {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  let payload: BoardPayload;
  try {
    payload = JSON.parse(boardRaw);
  } catch {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  const { title, content, boardType, category } = payload;

  if (!title?.trim() || !content?.trim() || !boardType || !category) {
    return NextResponse.json(
      { error: '카테고리, 말머리, 제목, 내용을 모두 입력해주세요.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: '로그인 후 이용해주세요.' },
      { status: 401 }
    );
  }

  const { data: profile } = await supabase
    .from('users')
    .select('nickname, email')
    .eq('id', user.id)
    .maybeSingle();

  const { data, error } = await supabase
    .from('boards')
    .insert({
      user_id: user.id,
      title: title.trim(),
      content: content.trim(),
      board_type: boardType,
      category,
      nickname: profile?.nickname ?? '',
      email: profile?.email ?? user.email ?? '',
      image_url:
        typeof image === 'string' && image.trim() ? image.trim() : null,
    })
    .select('id')
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: '글쓰기에 실패했습니다.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
