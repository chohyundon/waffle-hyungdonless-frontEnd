import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

import styles from '@/components/Calender/style/Calender.module.css';
import { CalenderScreen } from '@/components/Calender/Calender';

export default function CalenderPage() {
  return (
    <main className={styles.calenderPage}>
      <div className={styles.navContainer}>
        <NavBar />
      </div>
      <article className={styles.calenderContainer}>
        <CalenderScreen />
      </article>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </main>
  );
}
