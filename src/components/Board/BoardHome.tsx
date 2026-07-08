'use client';

import styles from '@/components/Board/BoardHome.module.css';
import { BoardHomeMain } from '@/components/Board/BoardHomeMain';

import { BoardItem } from '@/types/boardType';

export const BoardHome = ({ boardList = [] }: { boardList?: BoardItem[] }) => {
  return (
    <main className={styles.mainContainer}>
      <BoardHomeMain boardList={boardList} />
    </main>
  );
};
