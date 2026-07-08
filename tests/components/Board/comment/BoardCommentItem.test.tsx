import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';

import { BoardCommentItem } from '@/components/Board/comment/BoardCommentItem';
import { BoardComment } from '@/types/boardType';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('BoardCommentItem 댓글 삭제', () => {
  const comment: BoardComment = {
    id: 'comment-1',
    content: '삭제할 댓글',
    created_at: '2021-01-01',
    user_id: 'user-1',
    nickname: '테스트유저',
  };

  const onRefresh = vi.fn();
  const mutateComment = vi.fn();
  const startTransition = vi.fn((callback: () => void) => {
    void callback();
  });

  const renderCommentItem = (currentUserId?: string) =>
    render(
      <ul>
        <BoardCommentItem
          comment={comment}
          currentUserId={currentUserId}
          mutateComment={mutateComment}
          startTransition={startTransition}
          onRefresh={onRefresh}
        />
      </ul>
    );

  beforeEach(() => {
    vi.mocked(toast.error).mockClear();
    vi.mocked(toast.success).mockClear();
    onRefresh.mockClear();
    mutateComment.mockClear();
    startTransition.mockClear();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('본인 댓글이면 삭제 버튼을 표시한다', () => {
    renderCommentItem('user-1');

    expect(screen.getByRole('button', { name: '삭제' })).toBeTruthy();
  });

  it('다른 사용자 댓글이면 삭제 버튼을 표시하지 않는다', () => {
    renderCommentItem('other-user');

    expect(screen.queryByRole('button', { name: '삭제' })).toBeNull();
  });

  it('삭제 버튼을 누르면 확인 모달을 표시한다', async () => {
    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '삭제' }));

    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('댓글을 삭제할까요?')).toBeTruthy();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('모달에서 삭제하기를 누르면 DELETE API를 호출하고 성공 토스트를 표시한다', async () => {
    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '삭제' }));
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `/api/board/comment?commentId=${encodeURIComponent(comment.id)}`,
        { method: 'DELETE' }
      );
    });

    expect(toast.success).toHaveBeenCalledWith('댓글이 삭제되었습니다');
    expect(mutateComment).toHaveBeenCalledWith({
      type: 'delete',
      commentId: comment.id,
    });
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('모달에서 취소를 누르면 API 요청을 보내지 않는다', async () => {
    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '삭제' }));
    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(fetch).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
    expect(onRefresh).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('삭제 API가 실패하면 에러 토스트를 표시한다', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Internal server error' }),
      })
    );

    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '삭제' }));
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('댓글 삭제에 실패했습니다');
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});

describe('BoardCommentItem 댓글 수정', () => {
  const comment: BoardComment = {
    id: 'comment-1',
    content: '수정할 댓글',
    created_at: '2021-01-01',
    user_id: 'user-1',
    nickname: '테스트유저',
  };

  const onRefresh = vi.fn();
  const mutateComment = vi.fn();
  const startTransition = vi.fn((callback: () => void) => {
    void callback();
  });

  const renderCommentItem = (currentUserId?: string) =>
    render(
      <ul>
        <BoardCommentItem
          comment={comment}
          currentUserId={currentUserId}
          mutateComment={mutateComment}
          startTransition={startTransition}
          onRefresh={onRefresh}
        />
      </ul>
    );

  beforeEach(() => {
    vi.mocked(toast.error).mockClear();
    vi.mocked(toast.success).mockClear();
    onRefresh.mockClear();
    mutateComment.mockClear();
    startTransition.mockClear();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: comment }),
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('본인 댓글이면 수정 버튼을 표시한다', () => {
    renderCommentItem('user-1');

    expect(screen.getByRole('button', { name: '수정' })).toBeTruthy();
  });

  it('다른 사용자 댓글이면 수정 버튼을 표시하지 않는다', () => {
    renderCommentItem('other-user');

    expect(screen.queryByRole('button', { name: '수정' })).toBeNull();
  });

  it('수정 버튼을 누르면 편집 입력창을 표시한다', async () => {
    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '수정' }));

    expect(screen.getByDisplayValue('수정할 댓글')).toBeTruthy();
    expect(screen.getByRole('button', { name: '저장' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '취소' })).toBeTruthy();
  });

  it('취소를 누르면 편집 모드를 종료하고 API 요청을 보내지 않는다', async () => {
    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '수정' }));
    await user.clear(screen.getByDisplayValue('수정할 댓글'));
    await user.type(screen.getByRole('textbox'), '임시 수정');
    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(screen.getByText('수정할 댓글')).toBeTruthy();
    expect(fetch).not.toHaveBeenCalled();
    expect(mutateComment).not.toHaveBeenCalled();
  });

  it('저장을 누르면 PATCH API를 호출하고 optimistic update를 실행한다', async () => {
    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '수정' }));
    await user.clear(screen.getByDisplayValue('수정할 댓글'));
    await user.type(screen.getByRole('textbox'), '수정된 댓글');
    await user.click(screen.getByRole('button', { name: '저장' }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/board/comment',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({
            commentId: comment.id,
            content: '수정된 댓글',
          }),
        })
      );
    });

    expect(mutateComment).toHaveBeenCalledWith({
      type: 'update',
      comment: {
        ...comment,
        content: '수정된 댓글',
      },
    });
    expect(toast.success).toHaveBeenCalledWith('댓글이 수정되었습니다');
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('빈 내용으로 저장하면 API 요청을 보내지 않는다', async () => {
    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '수정' }));
    await user.clear(screen.getByDisplayValue('수정할 댓글'));
    await user.click(screen.getByRole('button', { name: '저장' }));

    expect(toast.error).toHaveBeenCalledWith('댓글을 입력해주세요');
    expect(fetch).not.toHaveBeenCalled();
    expect(mutateComment).not.toHaveBeenCalled();
  });

  it('수정 API가 실패하면 에러 토스트를 표시하고 onRefresh를 호출한다', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Internal server error' }),
      })
    );

    const user = userEvent.setup();

    renderCommentItem('user-1');

    await user.click(screen.getByRole('button', { name: '수정' }));
    await user.clear(screen.getByDisplayValue('수정할 댓글'));
    await user.type(screen.getByRole('textbox'), '실패할 댓글');
    await user.click(screen.getByRole('button', { name: '저장' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('댓글 수정에 실패했습니다');
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(mutateComment).toHaveBeenCalledWith({
      type: 'update',
      comment: {
        ...comment,
        content: '실패할 댓글',
      },
    });
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});
