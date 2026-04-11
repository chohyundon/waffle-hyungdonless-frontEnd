'use client';

import styles from '@/widgets/Board/ui/BoardHome.module.css';
import { useRouter, useParams } from 'next/navigation';
import MoneyIcon from '@/shared/assets/icons/moneyMiniIcon.svg';
import DownIcon from '@/shared/assets/icons/downIcon.svg';
import { BoardHomeMain } from '@/widgets/Board/ui/BoardHomeMain';
import { useEffect } from 'react';
import { assetSrc } from '@/shared/lib/assetSrc';

export const BoardHome = () => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;
  const detail = params.detail as string | undefined;
  const router = useRouter();

  const categoryMap: Record<string, string> = {
    money: '금융',
    welfare: '복지',
    home: '주거',
    develop: '자기계발',
    free: '자유',
    qna: 'Q&A',
  };

  const categoryList: { [key: string]: string } = {
    인기글: 'popular',
    '월급 및 관리 및 예산': 'salary',
    '세금 및 공제': 'tax',
    대출: 'loan',
    보험: 'insurance',
    '자산 증식': 'investment',
  };

  useEffect(() => {}, []);

  const title = category ? categoryMap[category] : '';

  const handleMove = (key: string) => {
    if (!category) return;
    router.push(`/board/${category}/${categoryList[key]}`);
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <aside className={styles.asideContainer}>
          <figure className={styles.iconContainer}>
            <img src={assetSrc(MoneyIcon)} alt='아이콘' />
            <figcaption className={styles.title}>{title}</figcaption>
          </figure>
          <span className={styles.borderBottom}></span>
          <ul className={styles.listContainer}>
            {Object.keys(categoryList).map((item, index) => {
              const isActive = detail === categoryList[item];
              return (
                <div key={index} className={styles.listcontainers}>
                  <li
                    className={`${styles.list} ${isActive ? styles.active : ''}`}
                    onClick={() => handleMove(item)}
                  >
                    {item}
                  </li>
                  {!isActive && (
                    <img
                      src={assetSrc(DownIcon)}
                      alt='Down'
                      className={styles.icon}
                      width={25}
                      height={25}
                    />
                  )}
                </div>
              );
            })}
          </ul>
        </aside>
      </div>
      <BoardHomeMain />
    </main>
  );
};
