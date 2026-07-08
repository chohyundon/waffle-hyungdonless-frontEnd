import { describe, expect, it } from 'vitest';

import { reduceOptimisticComments } from '@/components/Board/comment/commentOptimistic';
import { BoardComment } from '@/types/boardType';

describe('reduceOptimisticComments', () => {
  const comments: BoardComment[] = [
    {
      id: 'comment-1',
      content: '첫 번째 댓글',
      created_at: '2021-01-01',
      user_id: 'user-1',
      nickname: '유저1',
    },
    {
      id: 'comment-2',
      content: '두 번째 댓글',
      created_at: '2021-01-02',
      user_id: 'user-2',
      nickname: '유저2',
    },
  ];

  it('update action이면 해당 댓글 내용만 교체한다', () => {
    const result = reduceOptimisticComments(comments, {
      type: 'update',
      comment: {
        ...comments[0],
        content: '수정된 댓글',
      },
    });

    expect(result).toHaveLength(2);
    expect(result[0].content).toBe('수정된 댓글');
    expect(result[1]).toEqual(comments[1]);
  });

  it('delete action이면 해당 댓글을 목록에서 제거한다', () => {
    const result = reduceOptimisticComments(comments, {
      type: 'delete',
      commentId: 'comment-1',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('comment-2');
  });

  it('delete action 대상이 없으면 목록을 그대로 유지한다', () => {
    const result = reduceOptimisticComments(comments, {
      type: 'delete',
      commentId: 'comment-999',
    });

    expect(result).toEqual(comments);
  });
});
