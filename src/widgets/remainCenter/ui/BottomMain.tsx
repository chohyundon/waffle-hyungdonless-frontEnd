import styles from './Bottom.module.css';

import welfareIcon from '../../../shared/assets/icons/welfareMiniIcon.svg';
// import homeIcon from '../../../shared/assets/icons/homeMiniIcon.svg'
// import developmentIcon from '../../../shared/assets/icons/developmentMiniIcon.svg'
// import qnaIcon from '../../../shared/assets/icons/qnaMiniIcon.svg'

import viewIcon from '../../../shared/assets/icons/viewIcon.svg';
import commentIcon from '../../../shared/assets/icons/commentIcon.svg';
import likeIcon from '../../../shared/assets/icons/likeIcon.svg';

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
              <img src={welfareIcon} alt={welfareIcon} width={15} height={15} />
              <figcaption className={styles.iconFont}>복지</figcaption>
            </figure>
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
