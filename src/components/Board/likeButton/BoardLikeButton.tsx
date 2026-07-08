'use client';

import { useState } from 'react';

import { BoardItem } from '@/types/boardType';
import { toast } from 'react-toastify';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import likeIcon from '@/assets/icons/likeIcon.svg';
import styles from '@/components/Board/BoardDetail.module.css';

export const BoardLikeButton = ({
  board,
  user,
}: {
  board: BoardItem;
  user: User;
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(board.like_count);
  const [isLiking, setIsLiking] = useState(false);

  const handleLikeClick = async () => {
    if (!user) {
      toast.error('로그인 후 이용해주세요');
      return;
    }

    if (isLiking) return;

    setIsLiking(true);

    try {
      const response = await fetch('/api/board/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boardId: board.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? '좋아요 처리에 실패했습니다.');
        return;
      }

      setLiked(data.liked);
      setLikeCount(data.like_count);
    } catch (error) {
      console.error(error);
      toast.error('좋아요 처리에 실패했습니다.');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleLikeClick}
      disabled={isLiking}
      className={liked ? styles.likeButtonLiked : styles.likeButton}
    >
      <span>좋아요 {likeCount}</span>
      <Image src={likeIcon} alt='좋아요' width={14} height={14} aria-hidden />
    </button>
  );
};
