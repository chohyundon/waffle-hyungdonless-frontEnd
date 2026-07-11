'use client';

import { useEffect, useState } from 'react';

import { paginateList } from '@/lib/board/paginateList';
import { sortBoardList } from '@/lib/board/sortBoardList';
import type { BoardItem } from '@/types/boardType';

export const useBoardPagination = (boardList: BoardItem[], sort: string) => {
  const [page, setPage] = useState(1);
  const BOARD_PAGE_SIZE = 5;

  const sortedPosts = sortBoardList(boardList, sort);

  useEffect(() => {
    setPage(1);
  }, [sort]);

  const { items, currentPage, totalPages, totalItems } = paginateList(
    sortedPosts,
    page,
    BOARD_PAGE_SIZE
  );

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return {
    posts: items,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    goToPrev: () => goToPage(currentPage - 1),
    goToNext: () => goToPage(currentPage + 1),
  };
};
