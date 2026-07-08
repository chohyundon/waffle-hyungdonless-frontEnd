import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

import styles from '@/components/Board/styles/BoardList.module.css';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.boardContainer}>
      <div className={styles.navContainer}>
        <NavBar />
      </div>
      {children}
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </main>
  );
}
