import { createClient } from '@/lib/supabase/server';
import type { BoardItem } from '@/types/boardType';

export const getBoardList = async (): Promise<BoardItem[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
};

export const getBoardById = async (id: string): Promise<BoardItem> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('id', id);
  try {
    if (error) {
      throw new Error('Failed to fetch board by id');
    }
    return data?.[0] ?? null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch board by id');
  }
};
