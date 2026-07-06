import Image from 'next/image';
import styles from '@/components/MainCenter/BottomBoard.module.css';

import welfareIcon from '@/assets/icons/welfareMiniIcon.svg';
import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import downIcon from '@/assets/icons/downIcon.svg';
import adImage from '@/assets/icons/ad.svg';

export const BottomBoard = () => {
  return (
    <section className={styles.wrapper} aria-labelledby='hot-heading'>
      <div className={styles.mainColumn}>
        <header className={styles.header}>
          <h2 id='hot-heading' className={styles.title}>
            <span className={styles.titleAccent}>HOT</span> 게시글
          </h2>
          <p className={styles.subTitle}>
            지금 가장 뜨거운 이야기!
            <br />
            사람들이 공감한 인기 글을 만나보세요.
          </p>
        </header>

        <ol className={styles.hotList}>
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i} className={styles.hotItem}>
              <span
                className={`${styles.rank} ${i <= 2 ? styles.rankTop : ''}`}
              >
                {i + 1}
              </span>
              <span className={styles.categoryTag}>
                <Image src={welfareIcon} alt='' width={14} height={14} aria-hidden />
                복지
              </span>
              <p className={styles.hotTitle}>주짓수 vs 수영</p>
              <div className={styles.hotStats}>
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
              </div>
            </li>
          ))}
        </ol>
      </div>

      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>
          실시간 <span className={styles.titleAccent}>HOT</span> 키워드
        </h3>
        <ol className={styles.keywordList}>
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i} className={styles.keywordItem}>
              <span className={`${styles.keywordRank} ${i <= 2 ? styles.rankTop : ''}`}>
                {i + 1}
              </span>
              <span className={styles.keywordText}>돈이 없네</span>
              <span className={styles.keywordChange}>
                <Image src={downIcon} alt='' width={12} height={12} aria-hidden />
                1
              </span>
            </li>
          ))}
        </ol>
        <div className={styles.adWrap}>
          <Image
            src={adImage}
            alt='광고'
            width={280}
            height={120}
            className={styles.adImage}
          />
        </div>
      </aside>
    </section>
  );
};
