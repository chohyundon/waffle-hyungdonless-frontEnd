import styles from './BottomBoard.module.css';

import welfareIcon from '../../../shared/assets/icons/welfareMiniIcon.svg';
import viewIcon from '../../../shared/assets/icons/viewIcon.svg';
import commentIcon from '../../../shared/assets/icons/commentIcon.svg';
import likeIcon from '../../../shared/assets/icons/likeIcon.svg';
import downIcon from '../../../shared/assets/icons/downIcon.svg';
import adImage from '../../../shared/assets/icons/ad.svg';

// import homeIcon from '../../../shared/assets/icons/homeMiniIcon.svg'
// import developmentIcon from '../../../shared/assets/icons/developmentMiniIcon.svg'
// import qnaIcon from '../../../shared/assets/icons/qnaMiniIcon.svg'

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
                  src={welfareIcon}
                  alt={welfareIcon}
                  width={15}
                  height={15}
                />
                <figcaption className={styles.iconFont}>복지</figcaption>
              </figure>
              <p className={styles.boardContent}>주짓수 vs 수영</p>
              <section className={styles.iconsContainer}>
                <figure className={styles.icons}>
                  <img src={viewIcon} alt={viewIcon} />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
                <figure className={styles.icons}>
                  <img src={commentIcon} alt={commentIcon} />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
                <figure className={styles.icons}>
                  <img src={likeIcon} alt={likeIcon} />
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
                  <img src={downIcon} alt={downIcon} />
                  <figcaption className={styles.rankNumber}>1</figcaption>
                </figure>
              </div>
            );
          })}
        </article>
        <img src={adImage} alt={adImage} className={styles.image} />
      </aside>
    </>
  );
};
