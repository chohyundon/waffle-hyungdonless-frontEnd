import Image from 'next/image';

import styles from '@/components/remainCenter/styles/TopMain.module.css';
import userImage from '@/assets/icons/userImage.svg';
import { BOARD_STAT_LIST } from '@/components/Board/consts/boardStatList';
import { BOARD_STAT_ICONS } from '@/components/Board/consts/boardStatIcons';
import { getCategoryImage } from '@/components/remainCenter/getCategoryImage';

export const TopMain = ({ category }: { category?: string }) => {
  const { src: imgSrc, alt: imgAlt } = getCategoryImage(category);

  return (
    <section className={styles.remainContainer}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={400}
        height={320}
        className={styles.image}
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
                      src={BOARD_STAT_ICONS[stat.slug]}
                      alt=''
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
