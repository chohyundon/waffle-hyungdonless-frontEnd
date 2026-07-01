import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

import styles from '@/components/Board/BoardList.module.css';
import { BoardHome } from '@/components/Board/BoardHome';

export const BoardList = () => {
  return (
    <main className={styles.boardContainer}>
      <div className={styles.navContainer}>
        <NavBar />
      </div>
      <BoardHome />
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </main>
  );
};
