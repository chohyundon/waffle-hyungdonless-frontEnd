import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { User } from '@supabase/supabase-js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BoardLikeButton } from '@/components/Board/likeButton/BoardLikeButton';
import { BoardItem } from '@/types/boardType';

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn() },
}));

describe('BoardLikeButton', () => {
  const board: BoardItem = {
    id: '1',
    user_id: '1',
    title: 'test',
    content: 'test',
    board_type: 'free',
    category: '자유',
    nickname: 'test',
    email: 'test@test.com',
    image_url: null,
    view_count: 0,
    like_count: 0,
    comment_count: 0,
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  };

  const user = {
    id: '1',
    email: 'test@test.com',
  } as User;

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

  it('좋아요 버튼을 클릭하면 좋아요 수가 1 증가한다', async () => {
    render(
      <BoardLikeButton
        liked={false}
        likeCount={0}
        isLiking={false}
        handleLikeClick={vi.fn()}
      />
    );

    const button = screen.getByRole('button', { name: /좋아요 0/ });

    await userEvent.click(button);

    expect(
      await screen.findByRole('button', { name: /좋아요 1/i })
    ).toBeTruthy();
    expect(fetch).toHaveBeenCalledWith(
      '/api/board/like',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ boardId: board.id, category: board.board_type }),
      })
    );
  });
});
