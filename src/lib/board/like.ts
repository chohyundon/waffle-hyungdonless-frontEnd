import { revalidatePath } from 'next/cache';

import { getAuthContext } from '@/lib/userInfo/getCurrentUser';

type ToggleLikeResult = {
  liked: boolean;
  like_count: number;
};

export const getBoardLikeStatus = async (
  boardId: string
): Promise<{ liked: boolean; like_count: number }> => {
  const { supabase, user } = await getAuthContext();

  const { data: board, error: boardError } = await supabase
    .from('boards')
    .select('like_count')
    .eq('id', boardId)
    .maybeSingle();

  if (boardError || !board) {
    throw new Error('게시글을 찾을 수 없습니다.');
  }

  if (!user) {
    return { liked: false, like_count: board.like_count };
  }

  const { data: existing, error: likeError } = await supabase
    .from('board_likes')
    .select('id')
    .eq('board_id', boardId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (likeError) {
    throw new Error('좋아요 상태를 불러오지 못했습니다.');
  }

  return {
    liked: Boolean(existing),
    like_count: board.like_count,
  };
};

export const toggleBoardLike = async (
  boardId: string,
  category: string
): Promise<ToggleLikeResult> => {
  const { supabase, user } = await getAuthContext();

  if (!user) {
    throw new Error('UNAUTHORIZED');
  }

  const { data: existing, error: selectError } = await supabase
    .from('board_likes')
    .select('id')
    .eq('board_id', boardId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (selectError) {
    throw new Error('좋아요 처리에 실패했습니다.');
  }

  if (existing) {
    const { error: deleteError } = await supabase
      .from('board_likes')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      throw new Error('좋아요 취소에 실패했습니다.');
    }
  } else {
    const { error: insertError } = await supabase.from('board_likes').insert({
      board_id: boardId,
      user_id: user.id,
    });

    if (insertError) {
      throw new Error('좋아요 등록에 실패했습니다.');
    }
  }
  revalidatePath(`/board/${category}`);
  revalidatePath(`/board/${category}/${boardId}`);

  const { data: board, error: boardError } = await supabase
    .from('boards')
    .select('like_count')
    .eq('id', boardId)
    .maybeSingle();

  if (boardError || !board) {
    throw new Error('좋아요 수를 불러오지 못했습니다.');
  }

  return {
    liked: !existing,
    like_count: board.like_count,
  };
};
