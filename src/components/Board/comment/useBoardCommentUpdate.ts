'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { BoardComment } from '@/types/boardType';

export const useBoardCommentUpdate = ({
  comment,
  onMutate,
}: {
  comment: BoardComment;
  onMutate: () => void;
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

  const handleUpdate = async () => {
    if (editContent.trim() === '') {
      toast.error('댓글을 입력해주세요');
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch('/api/board/comment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentId: comment.id,
          content: editContent,
        }),
      });

      if (!response.ok) {
        toast.error('댓글 수정에 실패했습니다');
        return;
      }

      toast.success('댓글이 수정되었습니다');
      setIsEditing(false);
      onMutate();
    } catch {
      toast.error('댓글 수정에 실패했습니다');
    } finally {
      setIsUpdating(false);
    }
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
