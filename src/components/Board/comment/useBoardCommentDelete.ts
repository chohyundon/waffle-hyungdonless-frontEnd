'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

export const useBoardCommentDelete = ({
  commentId,
  onMutate,
}: {
  commentId: string;
  onMutate: () => void;
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

  const confirmDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/board/comment?commentId=${encodeURIComponent(commentId)}`,
        { method: 'DELETE' },
      );

      if (!response.ok) {
        toast.error('댓글 삭제에 실패했습니다');
        return;
      }

      toast.success('댓글이 삭제되었습니다');
      setIsDeleteModalOpen(false);
      onMutate();
    } catch {
      toast.error('댓글 삭제에 실패했습니다');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isDeleteModalOpen,
    isDeleting,
  };
};
