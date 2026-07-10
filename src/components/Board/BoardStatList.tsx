import Image from 'next/image';
import { Fragment } from 'react';

import { BOARD_STAT_LIST } from '@/components/Board/consts/boardStatList';
import {
  BOARD_STAT_ICONS,
  getBoardStatCount,
} from '@/components/Board/consts/boardStatIcons';

type BoardStatCounts = {
  view_count: number;
  comment_count: number;
  like_count: number;
};

type BoardStatListProps = {
  counts: BoardStatCounts;
  listClassName?: string;
  itemClassName?: string;
  valueClassName?: string;
  iconSize?: number;
  hideIconLabel?: boolean;
};

export const BoardStatList = ({
  counts,
  listClassName,
  itemClassName,
  valueClassName,
  iconSize = 14,
}: BoardStatListProps) => {
  const Wrapper = listClassName ? 'div' : Fragment;
  const wrapperProps = listClassName ? { className: listClassName } : {};

  return (
    <Wrapper {...wrapperProps}>
      {BOARD_STAT_LIST.map((stat) => (
        <span className={itemClassName} key={stat.slug}>
          <Image
            src={BOARD_STAT_ICONS[stat.slug]}
            alt={stat.name}
            width={iconSize}
            height={iconSize}
          />
          {valueClassName ? (
            <span className={valueClassName}>
              {getBoardStatCount(counts, stat.slug)}
            </span>
          ) : (
            getBoardStatCount(counts, stat.slug)
          )}
        </span>
      ))}
    </Wrapper>
  );
};
