import styles from '@/components/Board/styles/BoardHome.module.css';
import { BoardHomeMain } from '@/components/Board/BoardHomeMain';
import { getBoardListByCategory } from '@/lib/getBoardList';

export const BoardHome = async ({ category }: { category: string }) => {
  const boardList = await getBoardListByCategory(category);

  return (
    <main className={styles.mainContainer}>
      <BoardHomeMain boardList={boardList} category={category} />
    </main>
  );
};
