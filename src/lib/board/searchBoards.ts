import { createClient } from '@/lib/supabase/server';
import type { BoardItem } from '@/types/boardType';

export async function searchBoards(query: string): Promise<BoardItem[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .ilike('title', `%${trimmed}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}
