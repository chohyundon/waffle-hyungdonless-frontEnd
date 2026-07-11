import { useState } from 'react';
import { toast } from 'react-toastify';

import { updateStore } from '@/store/update';
import { BoardItem } from '@/types/boardType';

export const useBoardLike = (board: BoardItem) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(board.like_count);
  const [isLiking, setIsLiking] = useState(false);

  const handleLikeClick = async () => {
    if (isLiking) return;

    setIsLiking(true);

    try {
      const response = await fetch('/api/board/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boardId: board.id,
          category: board.board_type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? '좋아요 처리에 실패했습니다.');
        return;
      }

      setLiked(data.liked);
      setLikeCount(data.like_count);
      updateStore.getState().setUpdate(true);
    } catch (error) {
      console.error(error);
      toast.error('좋아요 처리에 실패했습니다.');
    } finally {
      setIsLiking(false);
    }
  };

  return { liked, likeCount, isLiking, handleLikeClick };
};
