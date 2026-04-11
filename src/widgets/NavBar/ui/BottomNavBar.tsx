'use client';

import styles from '@/widgets/NavBar/ui/BottomNavBar.module.css';
import { useRouter } from 'next/navigation';
import { bottomNavBarData } from '@/widgets/NavBar/const/BottomNavBarData';

export const BottomNavBar = () => {
  const router = useRouter();

  const handleCategoryClick = (path: string) => {
    router.push(`/board/${path}`);
  };

  return (
    <section className={styles.bottomNavContainer}>
      <ul className={styles.categoryContainer}>
        {bottomNavBarData.map((item, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(item.path)}
            className={styles.listFont}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
