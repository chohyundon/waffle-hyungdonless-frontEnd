'use client';

import Image from 'next/image';

import qnaBg from '@/assets/icons/qnaBg.svg';
import freeBg from '@/assets/icons/freeBg.svg';
import houseBg from '@/assets/icons/houseBg.svg';
import welfareBg from '@/assets/icons/welfareBg.svg';
import developmentBg from '@/assets/icons/developmentBg.svg';

import { useParams } from 'next/navigation';

import styles from '@/components/remainCenter/TopMain.module.css';
import userImage from '@/assets/icons/userImage.svg';
import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import { BOARD_STAT_LIST } from '@/components/Board/consts/boardStatList';

const STAT_ICONS = {
  view: viewIcon,
  comment: commentIcon,
  like: likeIcon,
} as const;

export const TopMain = () => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;

  const CATEGORY_ALT: Record<string, string> = {
    dwelling: '주거 카테고리 일러스트',
    home: '주거 카테고리 일러스트',
    welfare: '복지 카테고리 일러스트',
    development: '자기개발 카테고리 일러스트',
    qna: 'Q&A 카테고리 일러스트',
    free: '자유 카테고리 일러스트',
  };

  let imgSrc = houseBg;
  let imgAlt = CATEGORY_ALT.home;

  if (category === 'dwelling' || category === 'home') {
    imgSrc = houseBg;
    imgAlt = CATEGORY_ALT.home;
  } else if (category === 'welfare') {
    imgSrc = welfareBg;
    imgAlt = CATEGORY_ALT.welfare;
  } else if (category === 'development') {
    imgSrc = developmentBg;
    imgAlt = CATEGORY_ALT.development;
  } else if (category === 'qna') {
    imgSrc = qnaBg;
    imgAlt = CATEGORY_ALT.qna;
  } else if (category === 'free') {
    imgSrc = freeBg;
    imgAlt = CATEGORY_ALT.free;
  }

  return (
    <section className={styles.remainContainer}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={400}
        height={320}
        className={styles.image}
        aria-hidden
      />
      <aside className={styles.board}>
        {Array.from({ length: 4 }, (_, i) => (
          <div className={styles.boardList} key={i}>
            <div className={styles.boardContainer}>
              <p className={styles.badge}>자산증식</p>
              <div className={styles.userContainer}>
                <Image
                  src={userImage}
                  alt='userName 프로필'
                  width={20}
                  height={20}
                />
                <span className={styles.userNameFont}>userName</span>
              </div>
              <p className={styles.boardContent}>
                제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
                제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
              </p>
              <div className={styles.iconsContainer}>
                {BOARD_STAT_LIST.map((stat) => (
                  <div className={styles.icons} key={stat.slug}>
                    <Image
                      src={STAT_ICONS[stat.slug]}
                      alt={stat.name}
                      width={14}
                      height={14}
                      aria-hidden
                    />
                    <p className={styles.iconsFont}>106</p>
                  </div>
                ))}
                <div className={styles.numbers}>
                  <span className={styles.bar}></span>
                  <p className={styles.times}>1시간 전</p>
                </div>
              </div>
            </div>
            <span
              className={`${styles.boardBottom} ${i === 3 && styles.borderNone}`}
            ></span>
          </div>
        ))}
      </aside>
    </section>
  );
};
