'use client';

import styles from '@/components/NavBar/styles/NavBar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { NavBarSearchForm } from '@/components/NavBar/NavBarSearchForm';
import { useEffect, useState } from 'react';
import { BottomNavBar } from '@/components/NavBar/BottomNavBar';
import { NavBarMenuItem } from '@/components/NavBar/NavBarMenuItem';
import { NavBarIcon } from '@/components/NavBar/NavBarIcon';
import { NavBarLoginUser } from '@/components/NavBar/NavBarLoginUser';
import { useUser } from '@/lib/userInfo/useUserInfo';

export const NavBar = () => {
  const [showBoardNav, setShowBoardNav] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname() ?? '';
  const router = useRouter();

  useEffect(() => {
    setShowBoardNav(pathname.startsWith('/board'));
  }, [pathname]);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  const { user } = useUser();

  return (
    <header className={styles.header}>
      <nav className={styles.container} aria-label='주요 메뉴'>
        <div className={styles.inner}>
          <div className={styles.leftCluster}>
            <NavBarIcon push={router.push} setShowMenu={setShowMenu} />
            <ul className={styles.navLinks}>
              <NavBarMenuItem push={router.push} showMenu={showMenu} />
            </ul>
          </div>

          <div className={styles.rightCluster}>
            <NavBarSearchForm />
            <ul className={styles.utilityLinks} aria-label='알림 및 메시지'>
              <li className={styles.utilityItem}>알림</li>
              <li className={styles.utilityItem}>메세지</li>
            </ul>
            <NavBarLoginUser user={user} push={router.push} />
          </div>
        </div>

        {showMenu && (
          <div className={styles.mobileMenu}>
            <NavBarMenuItem
              push={router.push}
              showMenu={showMenu}
              variant='mobile'
            />
          </div>
        )}
      </nav>

      {showBoardNav && <BottomNavBar />}
    </header>
  );
};
