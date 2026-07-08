import Image from 'next/image';

import { TopMain } from '@/components/remainCenter/TopMain';
import { BottomMain } from '@/components/remainCenter/BottomMain';

import styles from '@/components/remainCenter/RemainCenter.module.css';

import downIcon from '@/assets/icons/downIcon.svg';
import adImage from '@/assets/icons/ad.svg';
import footerImage from '@/assets/icons/Objects.svg';

export const RemainCenter = () => {
  return (
    <>
      <TopMain />
      <article className={styles.container}>
        <div className={styles.titleBox}>
          <p className={styles.textStyle}>HOT</p>
          <h1 className={styles.title}>게시글</h1>
          <h3 className={styles.subTitle}>
            지금 가장 뜨거운 이야기!
            <br />
            사람들이 공감한 인기 글을 만나보세요.
          </h3>
        </div>
      </article>
      <aside className={styles.realTimeContainer}>
        <h1 className={styles.titleContainer}>
          실시간 <span className={styles.hot}>HOT</span> 키워드
        </h1>
        <article className={styles.realTimeboard}>
          {Array.from({ length: 5 }, (_, i) => {
            return (
              <div className={styles.contentBox} key={i}>
                <h1
                  className={`${styles.realtimeNumber} ${i <= 2 ? styles.top3 : styles.notTop3}`}
                >
                  {i + 1}
                </h1>
                <p className={styles.realtimeContent}>진서 화이팅</p>
                <figure className={styles.realtimeRank}>
                  <Image
                    src={downIcon}
                    alt='순위 하락'
                    width={12}
                    height={12}
                  />
                  <figcaption className={styles.rankNumber}>1</figcaption>
                </figure>
              </div>
            );
          })}
        </article>
        <Image
          src={adImage}
          alt='광고 배너'
          width={280}
          height={120}
          className={styles.image}
        />
      </aside>
      <BottomMain />
      <Image
        src={footerImage}
        alt='서비스 안내 일러스트'
        width={320}
        height={120}
        className={styles.footerImage}
        aria-hidden
      />
    </>
  );
};
