import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';

import { BoardDetail } from '@/components/Board/BoardDetail';
import { BoardComment, BoardItem } from '@/types/boardType';

const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: vi.fn(), refresh: mockRefresh }),
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
    avatar_url: null,
    view_count: 0,
    like_count: 0,
    comment_count: 0,
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  };

  beforeEach(() => {
    vi.mocked(toast.error).mockClear();
    vi.mocked(toast.success).mockClear();
    mockRefresh.mockClear();

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

describe('BoardDetail 댓글 수정·삭제 optimistic', () => {
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
    avatar_url: null,
    view_count: 0,
    like_count: 0,
    comment_count: 2,
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  };

  const comments: BoardComment[] = [
    {
      id: 'comment-1',
      content: '원본 댓글',
      created_at: '2021-01-01',
      user_id: 'user-1',
      nickname: '테스트유저',
    },
    {
      id: 'comment-2',
      content: '다른 사용자 댓글',
      created_at: '2021-01-02',
      user_id: 'user-2',
      nickname: '다른유저',
    },
  ];

  beforeEach(() => {
    vi.mocked(toast.error).mockClear();
    vi.mocked(toast.success).mockClear();
    mockRefresh.mockClear();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: comments[0] }),
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('댓글을 수정하고 저장하면 PATCH API를 호출하고 router.refresh를 실행한다', async () => {
    const user = userEvent.setup();

    render(<BoardDetail board={board} comments={comments} />);

    await user.click(screen.getByRole('button', { name: '수정' }));

    const editTextarea = screen.getByDisplayValue('원본 댓글');
    await user.clear(editTextarea);
    await user.type(editTextarea, '수정된 댓글');
    await user.click(screen.getByRole('button', { name: '저장' }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/board/comment',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({
            commentId: 'comment-1',
            content: '수정된 댓글',
          }),
        })
      );
    });

    expect(toast.success).toHaveBeenCalledWith('댓글이 수정되었습니다');
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('댓글을 삭제하면 DELETE API를 호출하고 router.refresh를 실행한다', async () => {
    const user = userEvent.setup();

    render(<BoardDetail board={board} comments={comments} />);

    await user.click(screen.getByRole('button', { name: '삭제' }));
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `/api/board/comment?commentId=${encodeURIComponent('comment-1')}`,
        { method: 'DELETE' }
      );
    });

    expect(toast.success).toHaveBeenCalledWith('댓글이 삭제되었습니다');
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('댓글이 없으면 빈 상태 메시지를 표시한다', () => {
    render(
      <BoardDetail board={{ ...board, comment_count: 0 }} comments={[]} />
    );

    expect(screen.getByText('아직 댓글이 없습니다.')).toBeTruthy();
  });

  it('첨부 이미지가 있으면 게시글 본문 아래에 표시한다', () => {
    const imageUrl =
      'https://example.supabase.co/storage/v1/object/public/board-images/user-1/sample.png';

    render(
      <BoardDetail
        board={{ ...board, image_url: imageUrl }}
        comments={[]}
      />
    );

    expect(
      screen.getByRole('img', { name: '테스트 글 게시글 첨부 이미지' })
    ).toBeTruthy();
    expect(screen.getByText('첨부 이미지 · 클릭하면 원본 보기')).toBeTruthy();
    const imageLink = screen.getByRole('link', {
      name: '테스트 글 첨부 이미지 원본 보기',
    });

    expect(imageLink.getAttribute('href')).toBe(imageUrl);
  });
});
