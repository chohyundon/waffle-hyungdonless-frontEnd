import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import viewIcon from '@/assets/icons/viewIcon.svg';

import { BOARD_STAT_LIST } from '@/components/Board/consts/boardStatList';

export const BOARD_STAT_ICONS = {
  view: viewIcon,
  comment: commentIcon,
  like: likeIcon,
} as const;

type BoardStatCounts = {
  view_count: number;
  comment_count: number;
  like_count: number;
};

export const getBoardStatCount = (
  counts: BoardStatCounts,
  slug: (typeof BOARD_STAT_LIST)[number]['slug']
) => {
  switch (slug) {
    case 'view':
      return counts.view_count;
    case 'comment':
      return counts.comment_count;
    case 'like':
      return counts.like_count;
  }
};
