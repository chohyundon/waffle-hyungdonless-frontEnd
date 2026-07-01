import styles from '@/components/remainCenter/Bottom.module.css';

import welfareIcon from '@/assets/icons/welfareMiniIcon.svg';
// import homeIcon from '@/assets/icons/homeMiniIcon.svg'
// import developmentIcon from '@/assets/icons/developmentMiniIcon.svg'
// import qnaIcon from '@/assets/icons/qnaMiniIcon.svg'

import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import { assetSrc } from '@/lib/assetSrc';

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
              <img src={assetSrc(welfareIcon)} alt='' width={15} height={15} />
              <figcaption className={styles.iconFont}>복지</figcaption>
            </figure>
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
