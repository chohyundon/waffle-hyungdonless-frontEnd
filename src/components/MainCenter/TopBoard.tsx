import Image from 'next/image';
import styles from '@/components/MainCenter/TopBoard.module.css';

import moneyBg from '@/assets/icons/moneyBg.svg';
import userImage from '@/assets/icons/userImage.svg';
import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';

export const TopBoard = () => {
  return (
    <section className={styles.wrapper} aria-labelledby='featured-heading'>
      <div className={styles.visual}>
        <Image
          src={moneyBg}
          alt=''
          fill
          className={styles.visualImage}
          sizes='400px'
          aria-hidden
        />
      </div>

      <div className={styles.postPanel}>
        <h2 id='featured-heading' className={styles.panelTitle}>
          추천 게시글
        </h2>
        <ul className={styles.postList}>
          {Array.from({ length: 4 }, (_, i) => (
            <li key={i} className={styles.postItem}>
              <span className={styles.badge}>자산증식</span>
              <div className={styles.postMeta}>
                <Image src={userImage} alt='' width={20} height={20} aria-hidden />
                <span className={styles.userName}>userName</span>
              </div>
              <p className={styles.postTitle}>
                제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
              </p>
              <div className={styles.stats}>
                <span className={styles.stat}>
                  <Image src={viewIcon} alt='' width={14} height={14} aria-hidden />
                  106
                </span>
                <span className={styles.stat}>
                  <Image src={commentIcon} alt='' width={14} height={14} aria-hidden />
                  106
                </span>
                <span className={styles.stat}>
                  <Image src={likeIcon} alt='' width={14} height={14} aria-hidden />
                  106
                </span>
                <span className={styles.time}>1시간 전</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
