import { createClient } from '@/lib/supabase/server';
import type { BoardComment } from '@/types/boardType';

export const getBoardComments = async (
  boardId: string
): Promise<BoardComment[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('board_comments')
    .select('id, content, created_at, user_id, nickname')
    .eq('board_id', boardId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
};
