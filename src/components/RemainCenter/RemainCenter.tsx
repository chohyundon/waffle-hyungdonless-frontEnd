import Image from 'next/image';

import { TopMain } from '@/components/RemainCenter/TopMain';
import { BottomMain } from '@/components/RemainCenter/BottomMain';

import styles from '@/components/RemainCenter/styles/RemainCenter.module.css';

import downIcon from '@/assets/icons/downIcon.svg';
import adImage from '@/assets/icons/ad.svg';
import footerImage from '@/assets/icons/Objects.svg';

export const RemainCenter = ({ category }: { category?: string }) => {
  return (
    <>
      <TopMain category={category} />
      <article className={styles.container}>
        <div className={styles.titleBox}>
          <p className={styles.textStyle}>HOT</p>
          <h1 className={styles.title}>게시글</h1>
          <h2 className={styles.subTitle}>
            지금 가장 뜨거운 이야기!
            <br />
            사람들이 공감한 인기 글을 만나보세요.
          </h2>
        </div>
      </article>
      <aside className={styles.realTimeContainer}>
        <h2 className={styles.titleContainer}>
          실시간 <span className={styles.hot}>HOT</span> 키워드
        </h2>
        <article className={styles.realTimeboard}>
          {Array.from({ length: 5 }, (_, i) => {
            return (
              <div className={styles.contentBox} key={i}>
                <span
                  className={`${styles.realtimeNumber} ${i <= 2 ? styles.top3 : styles.notTop3}`}
                >
                  {i + 1}
                </span>
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
        alt='사부작 사부작 푸터 일러스트'
        width={320}
        height={120}
        className={styles.footerImage}
      />
    </>
  );
};
