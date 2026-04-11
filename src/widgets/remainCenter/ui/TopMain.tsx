'use client';

import qnaBg from '@/shared/assets/icons/qnaBg.svg';
import freeBg from '@/shared/assets/icons/freeBg.svg';
import houseBg from '@/shared/assets/icons/houseBg.svg';
import welfareBg from '@/shared/assets/icons/welfareBg.svg';
import developmentBg from '@/shared/assets/icons/developmentBg.svg';

import { useParams } from 'next/navigation';

import styles from '@/widgets/remainCenter/ui/TopMain.module.css';
import userImage from '@/shared/assets/icons/userImage.svg';
import viewIcon from '@/shared/assets/icons/viewIcon.svg';
import commentIcon from '@/shared/assets/icons/commentIcon.svg';
import likeIcon from '@/shared/assets/icons/likeIcon.svg';
import { assetSrc } from '@/shared/lib/assetSrc';

export const TopMain = () => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;

  let imgSrc = houseBg;

  if (category === 'dwelling' || category === 'home') imgSrc = houseBg;
  else if (category === 'welfare') imgSrc = welfareBg;
  else if (category === 'development') imgSrc = developmentBg;
  else if (category === 'qna') imgSrc = qnaBg;
  else if (category === 'free') imgSrc = freeBg;

  return (
    <section className={styles.remainContainer}>
      <img src={assetSrc(imgSrc)} alt='' className={styles.image} aria-hidden />
      <aside className={styles.board}>
        {Array.from({ length: 4 }, (_, i) => (
          <div className={styles.boardList} key={i}>
            <div className={styles.boardContainer}>
              <p className={styles.badge}>자산증식</p>
              <div className={styles.userContainer}>
                <img src={assetSrc(userImage)} alt='' width={20} height={20} />
                <span className={styles.userNameFont}>userName</span>
              </div>
              <p className={styles.boardContent}>
                제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
                제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
              </p>
              <div className={styles.iconsContainer}>
                <div className={styles.icons}>
                  <img src={assetSrc(viewIcon)} alt='' />
                  <p className={styles.iconsFont}>106</p>
                </div>
                <div className={styles.icons}>
                  <img src={assetSrc(commentIcon)} alt='' />
                  <p className={styles.iconsFont}>106</p>
                </div>
                <div className={styles.icons}>
                  <img src={assetSrc(likeIcon)} alt='' />
                  <p className={styles.iconsFont}>106</p>
                </div>
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
