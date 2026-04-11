'use client';

import styles from '@/widgets/MainCenter/ui/MainCenter.module.css';

import moneyIcon from '@/shared/assets/icons/money.svg';
import freeIcon from '@/shared/assets/icons/free.svg';
import houseIcon from '@/shared/assets/icons/house.svg';
import developmentIcon from '@/shared/assets/icons/development.svg';
import QnAIcon from '@/shared/assets/icons/QnA.svg';
import welfareIcon from '@/shared/assets/icons/welfare.svg';

import footerImage from '@/shared/assets/icons/Objects.svg';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { TopBoard } from '@/widgets/MainCenter/ui/TopBoard';
import { BottomBoard } from '@/widgets/MainCenter/ui/BottomBoard';
import { assetSrc } from '@/shared/lib/assetSrc';
import { useUser } from '@/shared/lib/userInfo/useUserInfo';
import { homeButtonEntities } from '../entities/homeButton';

export const MainCenter = () => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;
  const { user } = useUser();
  console.log(user);

  return (
    <section className={styles.mainContainer}>
      <aside className={styles.asideContainer}>
        <h1 className={styles.title}>사부작 게시판</h1>
        <p className={styles.subTitle}>
          소소한 일상부터 유용한 정보까지,
          <br />
          가볍게 사부작거려 보세요!
        </p>
      </aside>
      <section className={styles.categoryContainer}>
        {homeButtonEntities.map((item) => (
          <Link href={item.path} className={styles.iconContainer}>
            <img src={assetSrc(item.icon)} alt={item.name} />
            <p className={styles.textStyle}>{item.name}</p>
          </Link>
        ))}
      </section>
      {category === undefined && (
        <>
          <TopBoard />
          <BottomBoard />
          <img
            src={assetSrc(footerImage)}
            alt=''
            className={styles.image}
            aria-hidden
          />
        </>
      )}
    </section>
  );
};
