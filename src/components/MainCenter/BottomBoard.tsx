import styles from '@/components/MainCenter/BottomBoard.module.css';

import welfareIcon from '@/assets/icons/welfareMiniIcon.svg';
import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import downIcon from '@/assets/icons/downIcon.svg';
import adImage from '@/assets/icons/ad.svg';
import { assetSrc } from '@/lib/assetSrc';

// import homeIcon from '@/assets/icons/homeMiniIcon.svg'
// import developmentIcon from '@/assets/icons/developmentMiniIcon.svg'
// import qnaIcon from '@/assets/icons/qnaMiniIcon.svg'

export const BottomBoard = () => {
  return (
    <>
      <article className={styles.titleContainer}>
        <h1 className={styles.title}>
          <span className={styles.titleFont}>HOT</span>
          게시글
        </h1>
        <p className={styles.subTitle}>
          지금 가장 뜨거운 이야기!
          <br />
          사람들이 공감한 인기 글을 만나보세요.
        </p>
      </article>
      <section className={styles.container}>
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <article className={styles.boardContainer} key={i}>
              <h1
                className={`${styles.boardRankNumber} ${i <= 2 ? styles.checkNum : styles.noneCheck}`}
              >
                {i + 1}
              </h1>
              <figure className={styles.iconContainer}>
                <img
                  src={assetSrc(welfareIcon)}
                  alt=''
                  width={15}
                  height={15}
                />
                <figcaption className={styles.iconFont}>복지</figcaption>
              </figure>
              <p className={styles.boardContent}>주짓수 vs 수영</p>
              <section className={styles.iconsContainer}>
                <figure className={styles.icons}>
                  <img src={assetSrc(viewIcon)} alt='' />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
                <figure className={styles.icons}>
                  <img src={assetSrc(commentIcon)} alt='' />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
                <figure className={styles.icons}>
                  <img src={assetSrc(likeIcon)} alt='' />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
              </section>
              <span
                className={`${styles.borderBottom} ${i === 4 && styles.borderNone}`}
              ></span>
            </article>
          );
        })}
      </section>
      <aside className={styles.sideContainer}>
        <h1 className={styles.hotTitle}>
          실시간 <span className={styles.colorTitle}>HOT</span> 키워드
        </h1>
        <article className={styles.rankContainer}>
          {Array.from({ length: 5 }, (_, i) => {
            return (
              <div className={styles.rankBoard} key={i}>
                <h1
                  className={`${styles.contentTitle} ${i <= 2 && styles.top3Content}`}
                >
                  {i + 1}
                </h1>
                <p className={styles.contentName}>돈이 없네</p>
                <figure className={styles.realtimeRank}>
                  <img src={assetSrc(downIcon)} alt='순위 변동' />
                  <figcaption className={styles.rankNumber}>1</figcaption>
                </figure>
              </div>
            );
          })}
        </article>
        <img src={assetSrc(adImage)} alt='광고' className={styles.image} />
      </aside>
    </>
  );
};
