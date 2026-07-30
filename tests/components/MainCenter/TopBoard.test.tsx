import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TopBoard } from '@/components/MainCenter/TopBoard';
import type { BoardItem } from '@/types/boardType';

const createBoardItem = (overrides: Partial<BoardItem> = {}): BoardItem => ({
  id: 'board-1',
  user_id: 'user-1',
  title: '테스트 게시글',
  content: '내용',
  board_type: 'portfolio',
  category: '포트폴리오',
  nickname: '테스트유저',
  email: 'test@example.com',
  image_url: null,
  avatar_url: null,
  view_count: 0,
  like_count: 0,
  comment_count: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

describe('TopBoard', () => {
  afterEach(() => {
    cleanup();
  });

  it('게시글이 없으면 빈 상태 문구를 표시한다', () => {
    render(<TopBoard boardList={[]} />);

    expect(screen.getByText('아직 추천할 게시글이 없어요')).toBeTruthy();
    expect(screen.getByText('다양한 이야기를 나눠보세요')).toBeTruthy();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('boardList가 전달되지 않아도 빈 상태 문구를 표시한다', () => {
    render(<TopBoard />);

    expect(screen.getByText('아직 추천할 게시글이 없어요')).toBeTruthy();
  });

  it('게시글이 있으면 빈 상태 문구를 표시하지 않는다', () => {
    render(<TopBoard boardList={[createBoardItem()]} />);

    expect(screen.queryByText('아직 추천할 게시글이 없어요')).toBeNull();
    expect(screen.getByText('테스트 게시글')).toBeTruthy();
  });

  it('게시글은 최대 4개까지만 렌더링된다', () => {
    const boardList = Array.from({ length: 6 }, (_, i) =>
      createBoardItem({ id: `board-${i}`, title: `게시글 ${i}` })
    );

    render(<TopBoard boardList={boardList} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
