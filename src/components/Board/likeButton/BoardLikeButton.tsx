'use client';

import Image from 'next/image';

import likeIcon from '@/assets/icons/likeIcon.svg';
import styles from '@/components/Board/styles/BoardDetail.module.css';

export const BoardLikeButton = ({
  liked,
  likeCount,
  isLiking,
  handleLikeClick,
}: {
  liked: boolean;
  likeCount: number;
  isLiking: boolean;
  handleLikeClick: () => void;
}) => {
  return (
    <button
      type='button'
      onClick={handleLikeClick}
      disabled={isLiking}
      aria-pressed={liked}
      className={liked ? styles.likeButtonLiked : styles.likeButton}
    >
      <span>좋아요 {likeCount}</span>
      <Image src={likeIcon} alt='좋아요 아이콘' width={14} height={14} />
    </button>
  );
};
