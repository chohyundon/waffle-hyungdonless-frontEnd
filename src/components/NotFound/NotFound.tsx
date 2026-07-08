'use client';

import Image from 'next/image';
import NotFoundSrc from '@/assets/icons/notFound.svg';
import BackIcon from '@/assets/icons/backiconImage.svg';

import styles from '@/components/NotFound/styles/NotFound.module.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';

export const NotFound = () => {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <NavBar />
      <main className={styles.mainContainer}>
        <Image
          src={NotFoundSrc}
          alt='서비스 준비중 안내 이미지'
          width={240}
          height={240}
        />
        <h1 className={styles.title}>
          지금은
          <span className={styles.colorTitle}>서비스 준비중</span>
          입니다
        </h1>
        <p className={styles.subTitle}>
          이용에 불편을 드려 죄송합니다.
          <br />
          빠른 시일 내에 준비하여 찾아뵙겠습니다.
        </p>
        <button
          type='button'
          className={styles.button}
          onClick={() => router.back()}
        >
          뒤로가기
          <Image
            src={BackIcon}
            alt=''
            width={20}
            height={20}
            aria-hidden
          />
        </button>
      </main>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </section>
  );
};
