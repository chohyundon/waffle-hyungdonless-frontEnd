import Image from 'next/image';

import styles from '@/components/remainCenter/styles/Bottom.module.css';

import welfareIcon from '@/assets/icons/welfareMiniIcon.svg';
import { BOARD_STAT_LIST } from '@/components/Board/consts/boardStatList';
import { BOARD_STAT_ICONS } from '@/components/Board/consts/boardStatIcons';

export const BottomMain = () => {
  return (
    <section className={styles.boardContainer}>
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <article className={styles.contentBox} key={i}>
            <span
              className={`${styles.boardRankNumber} ${i <= 2 ? styles.boardTop3 : styles.notboardTop3}`}
            >
              {i + 1}
            </span>
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
                    src={BOARD_STAT_ICONS[stat.slug]}
                    alt={stat.name}
                    width={14}
                    height={14}
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
