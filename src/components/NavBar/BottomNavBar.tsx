import Link from 'next/link';

import styles from '@/components/NavBar/styles/BottomNavBar.module.css';
import { bottomNavBarData } from '@/components/NavBar/BottomNavBarData';

const isCategoryActive = (pathname: string, slug: string) =>
  pathname === `/board/${slug}` || pathname.startsWith(`/board/${slug}/`);

export const BottomNavBar = ({ pathname }: { pathname: string }) => {
  return (
    <section className={styles.bottomNavContainer}>
      <ul className={styles.categoryContainer}>
        {bottomNavBarData.map((item) => {
          const isActive = isCategoryActive(pathname, item.path);

          return (
            <li key={item.path} className={styles.listFont}>
              <Link
                href={`/board/${item.path}`}
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
