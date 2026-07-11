import type { BoardItem } from '@/types/boardType';

export type BoardSortSlug = 'latest' | 'manyComment' | 'mostLike';

export const sortBoardList = (
  boardList: BoardItem[],
  sort: string
): BoardItem[] => {
  const items = [...boardList];

  if (sort === 'manyComment') {
    return items.sort((a, b) => b.comment_count - a.comment_count);
  }

  if (sort === 'mostLike') {
    return items.sort((a, b) => b.like_count - a.like_count);
  }

  return items.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};
