import { describe, expect, it } from 'vitest';

import { sortBoardList } from '@/lib/board/sortBoardList';
import type { BoardItem } from '@/types/boardType';

const createPost = (overrides: Partial<BoardItem>): BoardItem => ({
  id: '1',
  user_id: 'user-1',
  title: '제목',
  content: '본문',
  board_type: 'portfolio',
  category: '카테고리',
  nickname: '유저',
  email: 'test@test.com',
  image_url: null,
  avatar_url: null,
  view_count: 0,
  like_count: 0,
  comment_count: 0,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('sortBoardList', () => {
  const boardList = [
    createPost({
      id: '1',
      created_at: '2024-01-01T00:00:00Z',
      comment_count: 1,
      like_count: 2,
    }),
    createPost({
      id: '2',
      created_at: '2024-03-01T00:00:00Z',
      comment_count: 5,
      like_count: 10,
    }),
    createPost({
      id: '3',
      created_at: '2024-02-01T00:00:00Z',
      comment_count: 3,
      like_count: 4,
    }),
  ];

  it('latest 정렬이면 created_at 내림차순으로 반환한다', () => {
    const result = sortBoardList(boardList, 'latest');

    expect(result.map((item) => item.id)).toEqual(['2', '3', '1']);
  });

  it('manyComment 정렬이면 comment_count 내림차순으로 반환한다', () => {
    const result = sortBoardList(boardList, 'manyComment');

    expect(result.map((item) => item.id)).toEqual(['2', '3', '1']);
  });

  it('mostLike 정렬이면 like_count 내림차순으로 반환한다', () => {
    const result = sortBoardList(boardList, 'mostLike');

    expect(result.map((item) => item.id)).toEqual(['2', '3', '1']);
  });

  it('원본 배열을 변경하지 않는다', () => {
    const original = [...boardList];

    sortBoardList(boardList, 'latest');

    expect(boardList).toEqual(original);
  });
});
