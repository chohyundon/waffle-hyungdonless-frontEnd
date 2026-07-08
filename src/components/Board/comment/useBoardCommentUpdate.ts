import { TransitionStartFunction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CommentOptimisticAction } from '@/components/Board/comment/commentOptimistic';
import { BoardComment } from '@/types/boardType';

export const useBoardCommentUpdate = ({
  comment,
  mutateComment,
  startTransition,
  onRefresh,
}: {
  comment: BoardComment;
  mutateComment: (action: CommentOptimisticAction) => void;
  startTransition: TransitionStartFunction;
  onRefresh: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setEditContent(comment.content);
  }, [comment.content]);

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleUpdate = () => {
    const content = editContent.trim();

    if (content === '') {
      toast.error('댓글을 입력해주세요');
      return;
    }

    setIsUpdating(true);

    startTransition(async () => {
      mutateComment({
        type: 'update',
        comment: { ...comment, content },
      });
      setIsEditing(false);

      try {
        const response = await fetch('/api/board/comment', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            commentId: comment.id,
            content,
          }),
        });

        if (!response.ok) {
          toast.error('댓글 수정에 실패했습니다');
          onRefresh();
          return;
        }

        toast.success('댓글이 수정되었습니다');
        onRefresh();
      } catch {
        toast.error('댓글 수정에 실패했습니다');
        onRefresh();
      } finally {
        setIsUpdating(false);
      }
    });
  };

  return {
    isEditing,
    editContent,
    setEditContent,
    startEditing,
    handleCancelEdit,
    handleUpdate,
    isUpdating,
  };
};
