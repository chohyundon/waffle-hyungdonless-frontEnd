import { NavBar } from '@/widgets/NavBar';
import { Footer } from '@/widgets/Footer';

import styles from '@/widgets/Board/ui/BoardList.module.css';
import { BoardHome } from '@/widgets/Board/ui/BoardHome';

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
