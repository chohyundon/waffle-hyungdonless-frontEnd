'use client';

import { TransitionStartFunction, useState } from 'react';
import { toast } from 'react-toastify';

import { CommentOptimisticAction } from '@/components/Board/comment/commentOptimistic';

export const useBoardCommentDelete = ({
  commentId,
  mutateComment,
  startTransition,
  onRefresh,
}: {
  commentId: string;
  mutateComment: (action: CommentOptimisticAction) => void;
  startTransition: TransitionStartFunction;
  onRefresh: () => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isDeleting) {
      return;
    }

    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    setIsDeleting(true);

    startTransition(async () => {
      mutateComment({ type: 'delete', commentId });
      setIsDeleteModalOpen(false);

      try {
        const response = await fetch(
          `/api/board/comment?commentId=${encodeURIComponent(commentId)}`,
          { method: 'DELETE' },
        );

        if (!response.ok) {
          toast.error('댓글 삭제에 실패했습니다');
          onRefresh();
          return;
        }

        toast.success('댓글이 삭제되었습니다');
        onRefresh();
      } catch {
        toast.error('댓글 삭제에 실패했습니다');
        onRefresh();
      } finally {
        setIsDeleting(false);
      }
    });
  };

  return {
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isDeleteModalOpen,
    isDeleting,
  };
};
