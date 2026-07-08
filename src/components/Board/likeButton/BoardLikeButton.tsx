'use client';

import Image from 'next/image';

import { BoardItem } from '@/types/boardType';
import { User } from '@supabase/supabase-js';
import likeIcon from '@/assets/icons/likeIcon.svg';
import styles from '@/components/Board/styles/BoardDetail.module.css';
import { useBoardLike } from '@/components/Board/likeButton/useBoardLike';

export const BoardLikeButton = ({
  board,
}: {
  board: BoardItem;
  user: User;
}) => {
  const { liked, likeCount, isLiking, handleLikeClick } = useBoardLike(board);

  return (
    <button
      type='button'
      onClick={handleLikeClick}
      disabled={isLiking}
      aria-pressed={liked}
      className={liked ? styles.likeButtonLiked : styles.likeButton}
    >
      <span>좋아요 {likeCount}</span>
      <Image src={likeIcon} alt='' width={14} height={14} aria-hidden />
    </button>
  );
};
