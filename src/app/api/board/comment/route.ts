import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { boardId, content } = await request.json();

    if (!boardId || !content?.trim()) {
      return NextResponse.json(
        { error: 'boardId와 content가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data: profile } = await supabase
      .from('users')
      .select('nickname')
      .eq('id', user.id)
      .maybeSingle();

    const nickname =
      profile?.nickname ??
      (user.user_metadata?.nickname as string | undefined) ??
      '익명';

    const { data: comment, error } = await supabase
      .from('board_comments')
      .insert({
        board_id: boardId,
        content: content.trim(),
        user_id: user.id,
        nickname,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    const { data: board } = await supabase
      .from('boards')
      .select('board_type')
      .eq('id', boardId)
      .maybeSingle();

    if (board?.board_type) {
      revalidatePath(`/board/${board.board_type}`);
      revalidatePath(`/board/${board.board_type}/${boardId}`);
    }

    return NextResponse.json({ data: comment }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const board_id = searchParams.get('board_id');

  if (!board_id) {
    return NextResponse.json(
      { error: 'board_id가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('board_comments')
      .select('id, content, created_at, user_id, nickname')
      .eq('board_id', board_id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { commentId, content } = await request.json();

    if (!commentId || !content?.trim()) {
      return NextResponse.json(
        { error: 'commentId와 content가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('board_comments')
      .update({
        content: content.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', commentId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const commentId = new URL(request.url).searchParams.get('commentId');

  if (!commentId) {
    return NextResponse.json(
      { error: 'commentId가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase
      .from('board_comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
