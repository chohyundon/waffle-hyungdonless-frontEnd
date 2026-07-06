'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import styles from '@/components/MainCenter/MainCenter.module.css';

import { TopBoard } from '@/components/MainCenter/TopBoard';
import { BottomBoard } from '@/components/MainCenter/BottomBoard';
import { homeButtonEntities } from '@/components/MainCenter/homeButton';
import { YouthPolicySection } from '@/components/MainCenter/YouthPolicySection';

import type { PublicDataResponse } from '@/types/publicDataType';

export const MainCenter = ({ data }: { data?: PublicDataResponse }) => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;
  const policies = data?.result?.youthPolicyList ?? [];
  const isHome = category === undefined;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>사부작 게시판</h1>
          <p className={styles.subTitle}>
            소소한 일상부터 유용한 정보까지,
            <br />
            가볍게 사부작거려 보세요!
          </p>
        </div>

        <nav className={styles.categoryGrid} aria-label='게시판 카테고리'>
          {homeButtonEntities.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              className={styles.categoryCard}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={48}
                height={48}
                aria-hidden
                className={styles.categoryIcon}
              />
              <span className={styles.categoryLabel}>{item.name}</span>
            </Link>
          ))}
        </nav>
      </section>

      {isHome && (
        <div className={styles.sections}>
          <YouthPolicySection policies={policies} />

          <TopBoard />
          <BottomBoard />
        </div>
      )}
    </div>
  );
};
