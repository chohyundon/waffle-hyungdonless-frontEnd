import Image from 'next/image';

import styles from '@/components/remainCenter/Bottom.module.css';

import welfareIcon from '@/assets/icons/welfareMiniIcon.svg';
import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import { BOARD_STAT_LIST } from '@/components/Board/consts/boardStatList';

const STAT_ICONS = {
  view: viewIcon,
  comment: commentIcon,
  like: likeIcon,
} as const;

export const BottomMain = () => {
  return (
    <section className={styles.boardContainer}>
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <article className={styles.contentBox} key={i}>
            <h1
              className={`${styles.boardRankNumber} ${i <= 2 ? styles.boardTop3 : styles.notboardTop3}`}
            >
              {i + 1}
            </h1>
            <figure className={styles.iconContainer}>
              <Image
                src={welfareIcon}
                alt='복지 카테고리'
                width={15}
                height={15}
              />
              <figcaption className={styles.iconFont}>복지</figcaption>
            </figure>
            <section className={styles.iconsContainer}>
              {BOARD_STAT_LIST.map((stat) => (
                <figure className={styles.icons} key={stat.slug}>
                  <Image
                    src={STAT_ICONS[stat.slug]}
                    alt={stat.name}
                    width={14}
                    height={14}
                    aria-hidden
                  />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
              ))}
            </section>
            <p className={styles.boardContent}>주짓수 vs 수영</p>
            <span
              className={`${styles.borderBottom} ${i === 4 && styles.borderNone}`}
            ></span>
          </article>
        );
      })}
    </section>
  );
};
