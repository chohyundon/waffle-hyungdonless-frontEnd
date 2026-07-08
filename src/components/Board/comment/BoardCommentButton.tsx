import { FormEvent } from 'react';
import { toast } from 'react-toastify';

export const useBoardCommentSubmit = ({
  boardId,
  comment,
  setComment,
  onSuccess,
}: {
  boardId: string;
  comment: string;
  setComment: (comment: string) => void;
  onSuccess?: () => void;
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.trim() === '') {
      toast.error('댓글을 입력해주세요');
      return;
    }

    try {
      const response = await fetch('/api/board/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boardId,
          content: comment,
        }),
      });

      if (!response.ok) {
        toast.error('댓글 등록에 실패했습니다');
        return;
      }
    } catch {
      toast.error('댓글 등록에 실패했습니다');
      return;
    }

    toast.success('댓글 등록에 성공했습니다');
    setComment('');
    onSuccess?.();
  };

  return handleSubmit;
};
