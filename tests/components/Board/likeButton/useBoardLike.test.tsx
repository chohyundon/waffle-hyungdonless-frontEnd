import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useBoardLike } from '@/components/Board/likeButton/useBoardLike';
import type { BoardItem } from '@/types/boardType';

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn() },
}));

vi.mock('@/store/update', () => ({
  updateStore: {
    getState: () => ({ setUpdate: vi.fn() }),
  },
}));

const board: BoardItem = {
  id: 'board-1',
  user_id: 'user-1',
  title: 'test',
  content: 'test',
  board_type: 'portfolio',
  category: '포트폴리오 피드백',
  nickname: '도오니',
  email: 'test@test.com',
  image_url: null,
  avatar_url: null,
  view_count: 0,
  like_count: 0,
  comment_count: 0,
  created_at: '2021-01-01',
  updated_at: '2021-01-01',
};

describe('useBoardLike', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ liked: true, like_count: 1 }),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('좋아요 성공 시 liked와 like_count를 갱신한다', async () => {
    const { result } = renderHook(() => useBoardLike(board));

    await act(async () => {
      await result.current.handleLikeClick();
    });

    await waitFor(() => {
      expect(result.current.liked).toBe(true);
      expect(result.current.likeCount).toBe(1);
    });

    expect(fetch).toHaveBeenCalledWith(
      '/api/board/like',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          boardId: board.id,
          category: board.board_type,
        }),
      })
    );
  });

  it('API 실패 시 좋아요 수를 유지한다', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: '실패' }),
      })
    );

    const { result } = renderHook(() => useBoardLike(board));

    await act(async () => {
      await result.current.handleLikeClick();
    });

    expect(result.current.liked).toBe(false);
    expect(result.current.likeCount).toBe(0);
  });
});
