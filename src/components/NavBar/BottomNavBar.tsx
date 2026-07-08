import Link from 'next/link';

import styles from '@/components/NavBar/styles/BottomNavBar.module.css';
import { bottomNavBarData } from '@/components/NavBar/BottomNavBarData';

export const BottomNavBar = () => {
  return (
    <section className={styles.bottomNavContainer}>
      <ul className={styles.categoryContainer}>
        {bottomNavBarData.map((item) => (
          <li key={item.path} className={styles.listFont}>
            <Link href={`/board/${item.path}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
