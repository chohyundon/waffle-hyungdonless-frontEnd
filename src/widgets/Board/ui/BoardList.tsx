import { NavBar } from '../../NavBar';
import { Footer } from '../../Footer';

import styles from './BoardList.module.css';
import { BoardHome } from './BoardHome.tsx';

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
