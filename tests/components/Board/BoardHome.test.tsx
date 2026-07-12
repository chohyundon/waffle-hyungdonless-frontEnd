import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BoardHome } from '@/components/Board/BoardHome';
import { getBoardListByCategory } from '@/lib/getBoardList';
import type { BoardItem } from '@/types/boardType';

vi.mock('@/lib/getBoardList', () => ({
  getBoardListByCategory: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ category: 'portfolio' }),
  usePathname: () => '/board/portfolio',
}));

vi.mock('@/lib/userInfo/useUserInfo', () => ({
  useUserProfile: () => ({ profile: null, loading: false }),
}));

const portfolioPost: BoardItem = {
  id: 'board-1',
  user_id: 'user-1',
  title: '포트폴리오 피드백 요청',
  content: '포트폴리오 리뷰 부탁드립니다.',
  board_type: 'portfolio',
  category: '포트폴리오 피드백',
  nickname: '테스트유저',
  email: 'test@test.com',
  image_url: null,
  avatar_url: null,
  view_count: 10,
  like_count: 2,
  comment_count: 1,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('BoardHome', () => {
  beforeEach(() => {
    vi.mocked(getBoardListByCategory).mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('category로 getBoardListByCategory를 호출하면 해당 게시글을 화면에 렌더링한다', async () => {
    vi.mocked(getBoardListByCategory).mockResolvedValue([portfolioPost]);

    const ui = await BoardHome({ category: 'portfolio' });
    render(ui);

    expect(getBoardListByCategory).toHaveBeenCalledWith('portfolio');
    expect(getBoardListByCategory).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('heading', { name: '포트폴리오 피드백 요청' })
    ).toBeTruthy();
    expect(screen.getByText('포트폴리오 리뷰 부탁드립니다.')).toBeTruthy();
  });

  it('getBoardListByCategory가 빈 배열을 반환하면 게시글 없음 안내를 표시한다', async () => {
    vi.mocked(getBoardListByCategory).mockResolvedValue([]);

    const ui = await BoardHome({ category: 'portfolio' });
    render(ui);

    expect(getBoardListByCategory).toHaveBeenCalledWith('portfolio');
    expect(screen.getByAltText('등록된 게시글이 없습니다')).toBeTruthy();
  });
});
