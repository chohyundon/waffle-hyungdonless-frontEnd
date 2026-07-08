import Image from 'next/image';
import Link from 'next/link';

import styles from '@/components/MainCenter/styles/MainCenter.module.css';

import { TopBoard } from '@/components/MainCenter/TopBoard';
import { BottomBoard } from '@/components/MainCenter/BottomBoard';
import { homeButtonEntities } from '@/components/MainCenter/homeButton';
import { YouthPolicySection } from '@/components/MainCenter/YouthPolicySection';

import type { BoardItem } from '@/types/boardType';
import type { PublicDataResponse } from '@/types/publicDataType';

export const MainCenter = ({
  data,
  boardList,
}: {
  data?: PublicDataResponse;
  boardList?: BoardItem[];
}) => {
  const policies = data?.result?.youthPolicyList ?? [];

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
                alt={`${item.name} 카테고리`}
                width={48}
                height={48}
                className={styles.categoryIcon}
              />
              <span className={styles.categoryLabel}>{item.name}</span>
            </Link>
          ))}
        </nav>
      </section>

      <div className={styles.sections}>
        <YouthPolicySection policies={policies} />

        <TopBoard boardList={boardList} />
        <BottomBoard boardList={boardList} />
      </div>
    </div>
  );
};
