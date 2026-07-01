'use client';

import NotFoundSrc from '@/assets/icons/notFound.svg';
import BackIcon from '@/assets/icons/backiconImage.svg';

import styles from '@/components/NotFound/NotFound.module.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { assetSrc } from '@/lib/assetSrc';

export const NotFound = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.back();
  };

  return (
    <section className={styles.container}>
      <NavBar />
      <main className={styles.mainContainer}>
        <img src={assetSrc(NotFoundSrc)} alt='서비스 준비중입니다' />
        <h1 className={styles.title}>
          지금은
          <p className={styles.colorTitle}>서비스 준비중</p>
          입니다
        </h1>
        <p className={styles.subTitle}>
          이용에 불편을 드려 죄송합니다.
          <br />
          빠른 시일 내에 준비하여 찾아뵙겠습니다.
        </p>
        <div className={styles.buttonContainer} onClick={handleReturn}>
          <button className={styles.button}>뒤로가기</button>
          <img src={assetSrc(BackIcon)} alt='뒤로가기 버튼' />
        </div>
      </main>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </section>
  );
};
