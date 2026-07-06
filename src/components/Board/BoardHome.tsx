'use client';

import styles from '@/components/Board/BoardHome.module.css';
import MoneyIcon from '@/assets/icons/moneyMiniIcon.svg';
import DownIcon from '@/assets/icons/downIcon.svg';
import { BoardHomeMain } from '@/components/Board/BoardHomeMain';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

const categoryMap: Record<string, string> = {
  money: '금융',
  welfare: '복지',
  home: '주거',
  develop: '자기계발',
  free: '자유',
  qna: 'Q&A',
};

const categoryList: Record<string, string> = {
  인기글: 'popular',
  '월급 및 관리 및 예산': 'salary',
  '세금 및 공제': 'tax',
  대출: 'loan',
  보험: 'insurance',
  '자산 증식': 'investment',
};

export const BoardHome = () => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;
  const detail = params.detail as string | undefined;
  const router = useRouter();
  const title = category ? categoryMap[category] : '';

  const handleMove = (key: string) => {
    if (!category) return;
    router.push(`/board/${category}/${categoryList[key]}`);
  };

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.asideContainer}>
        <figure className={styles.iconContainer}>
          <Image src={MoneyIcon} alt='' width={24} height={24} aria-hidden />
          <figcaption className={styles.title}>{title}</figcaption>
        </figure>
        <span className={styles.borderBottom} aria-hidden />
        <ul className={styles.sidebarList}>
          {Object.keys(categoryList).map((item) => {
            const isActive = detail === categoryList[item];

            return (
              <li key={item} className={styles.sidebarItem}>
                <button
                  type='button'
                  className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`}
                  onClick={() => handleMove(item)}
                >
                  {item}
                </button>
                {!isActive && (
                  <Image
                    src={DownIcon}
                    alt=''
                    width={20}
                    height={20}
                    aria-hidden
                  />
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <BoardHomeMain />
    </main>
  );
};
