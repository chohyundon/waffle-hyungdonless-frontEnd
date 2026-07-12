import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createClientMock, fromMock, selectMock, ilikeMock, orderMock } =
  vi.hoisted(() => {
    const orderMock = vi.fn();
    const ilikeMock = vi.fn(() => ({ order: orderMock }));
    const selectMock = vi.fn(() => ({ ilike: ilikeMock }));
    const fromMock = vi.fn(() => ({ select: selectMock }));
    const createClientMock = vi.fn(async () => ({ from: fromMock }));

    return { createClientMock, fromMock, selectMock, ilikeMock, orderMock };
  });

vi.mock('@/lib/supabase/server', () => ({
  createClient: createClientMock,
}));

import { searchBoards } from '@/lib/board/searchBoards';

describe('searchBoards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    orderMock.mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Next.js 검색 테스트',
        },
      ],
      error: null,
    });
  });

  it('빈 검색어면 빈 배열을 반환하고 DB를 조회하지 않는다', async () => {
    await expect(searchBoards('   ')).resolves.toEqual([]);
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it('제목 ilike로 게시글을 조회한다', async () => {
    const result = await searchBoards('Next');

    expect(fromMock).toHaveBeenCalledWith('boards');
    expect(ilikeMock).toHaveBeenCalledWith('title', '%Next%');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Next.js 검색 테스트');
  });

  it('DB 에러면 빈 배열을 반환한다', async () => {
    orderMock.mockResolvedValue({
      data: null,
      error: { message: 'fail' },
    });

    await expect(searchBoards('에러')).resolves.toEqual([]);
  });
});
