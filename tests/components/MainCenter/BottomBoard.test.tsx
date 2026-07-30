import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BottomBoard } from '@/components/MainCenter/BottomBoard';
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

describe('BottomBoard', () => {
  afterEach(() => {
    cleanup();
  });

  it('게시글이 없으면 빈 상태 문구를 표시한다', () => {
    render(<BottomBoard boardList={[]} />);

    expect(screen.getByText('아직 HOT 게시글이 없어요')).toBeTruthy();
    expect(
      screen.getByText('인기 게시글이 생기면 여기에 보여드릴게요')
    ).toBeTruthy();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('boardList가 전달되지 않아도 빈 상태 문구를 표시한다', () => {
    render(<BottomBoard />);

    expect(screen.getByText('아직 HOT 게시글이 없어요')).toBeTruthy();
  });

  it('게시글이 있으면 빈 상태 문구를 표시하지 않는다', () => {
    render(<BottomBoard boardList={[createBoardItem()]} />);

    expect(screen.queryByText('아직 HOT 게시글이 없어요')).toBeNull();
    expect(screen.getByText('테스트 게시글')).toBeTruthy();
  });

  it('게시글은 좋아요 수 기준 내림차순으로 최대 5개까지 렌더링된다', () => {
    const boardList = Array.from({ length: 7 }, (_, i) =>
      createBoardItem({
        id: `board-${i}`,
        title: `게시글 ${i}`,
        like_count: i,
      })
    );

    render(<BottomBoard boardList={boardList} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    expect(screen.getByText('게시글 6')).toBeTruthy();
    expect(screen.queryByText('게시글 0')).toBeNull();
  });
});
