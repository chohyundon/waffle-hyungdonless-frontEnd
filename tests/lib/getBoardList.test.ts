import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getBoardListByCategory } from '@/lib/getBoardList';
import type { BoardItem } from '@/types/boardType';

const mockEq = vi.fn();
const mockSelect = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn(() => ({ select: mockSelect }));
const mockCreateClient = vi.fn(async () => ({ from: mockFrom }));

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => mockCreateClient(),
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

describe('getBoardListByCategory', () => {
  beforeEach(() => {
    mockEq.mockReset();
    mockSelect.mockClear();
    mockFrom.mockClear();
    mockCreateClient.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('board_type이 일치하는 게시글 목록을 반환한다', async () => {
    mockEq.mockResolvedValue({
      data: [portfolioPost],
      error: null,
    });

    const result = await getBoardListByCategory('portfolio');

    expect(mockFrom).toHaveBeenCalledWith('boards');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('board_type', 'portfolio');
    expect(result).toEqual([portfolioPost]);
  });

  it('Supabase 에러가 발생하면 빈 배열을 반환한다', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    mockEq.mockResolvedValue({
      data: null,
      error: { message: 'db error' },
    });

    const result = await getBoardListByCategory('portfolio');

    expect(result).toEqual([]);
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('data가 null이면 빈 배열을 반환한다', async () => {
    mockEq.mockResolvedValue({
      data: null,
      error: null,
    });

    const result = await getBoardListByCategory('portfolio');

    expect(result).toEqual([]);
  });
});
