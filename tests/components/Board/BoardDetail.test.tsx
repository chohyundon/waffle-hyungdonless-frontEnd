import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';

import { BoardDetail } from '@/components/Board/BoardDetail';
import { BoardItem } from '@/types/boardType';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: vi.fn(), refresh: vi.fn() }),
}));

vi.mock('@/lib/userInfo/useUserInfo', () => ({
  useUser: () => ({
    user: { id: 'user-1', email: 'test@test.com' },
    loading: false,
  }),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('@/components/Board/likeButton/BoardLikeButton', () => ({
  BoardLikeButton: () => null,
}));

describe('BoardDetail 댓글 등록', () => {
  const board: BoardItem = {
    id: 'board-1',
    user_id: 'user-1',
    title: '테스트 글',
    content: '본문',
    board_type: 'free',
    category: '자유',
    nickname: '테스트유저',
    email: 'test@test.com',
    image_url: null,
    view_count: 0,
    like_count: 0,
    comment_count: 0,
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  };

  beforeEach(() => {
    vi.mocked(toast.error).mockClear();
    vi.mocked(toast.success).mockClear();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: { id: 'comment-1' } }),
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('댓글을 입력하고 등록하면 comment API로 POST 요청을 보낸다', async () => {
    const user = userEvent.setup();

    render(<BoardDetail board={board} comments={[]} />);

    const textarea = screen.getByPlaceholderText('댓글을 입력해주세요');

    await user.type(textarea, '첫 번째 댓글');
    await user.click(screen.getByRole('button', { name: /댓글 등록/ }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/board/comment',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            boardId: board.id,
            content: '첫 번째 댓글',
          }),
        })
      );
    });

    expect(toast.success).toHaveBeenCalledWith('댓글 등록에 성공했습니다');
    expect((textarea as HTMLTextAreaElement).value).toBe('');
  });

  it('빈 댓글을 등록하면 API 요청을 보내지 않는다', async () => {
    const user = userEvent.setup();

    render(<BoardDetail board={board} comments={[]} />);

    await user.click(screen.getByRole('button', { name: /댓글 등록/ }));

    expect(toast.error).toHaveBeenCalledWith('댓글을 입력해주세요');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('댓글 등록 API가 실패하면 에러 토스트를 표시한다', async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network error'))
    );

    render(<BoardDetail board={board} comments={[]} />);

    const textarea = screen.getByPlaceholderText('댓글을 입력해주세요');

    await user.type(textarea, '실패할 댓글');
    await user.click(screen.getByRole('button', { name: /댓글 등록/ }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('댓글 등록에 실패했습니다');
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect((textarea as HTMLTextAreaElement).value).toBe('실패할 댓글');
  });
});
