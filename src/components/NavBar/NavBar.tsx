'use client';

import styles from '@/components/NavBar/NavBar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { NavBarSearchForm } from '@/components/NavBar/NavBarSearchForm';
import { useEffect, useState } from 'react';
import { BottomNavBar } from '@/components/NavBar/BottomNavBar';
import { NavBarMenuItem } from '@/components/NavBar/NavBarMenuItem';
import { NavBarIcon } from '@/components/NavBar/NavBarIcon';
import { NavBarLoginUser } from '@/components/NavBar/NavBarLoginUser';
import { useUser } from '@/lib/userInfo/useUserInfo';

export const NavBar = () => {
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname() ?? '';
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith('/board')) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [pathname]);

  const { user } = useUser();

  return (
    <nav className={styles.container}>
      <ul className={styles.leftLinkContainer}>
        <NavBarIcon push={router.push} setShowMenu={setShowMenu} />
        <NavBarMenuItem push={router.push} showMenu={showMenu} />
      </ul>
      <div className={styles.rightLinkContainer}>
        <NavBarSearchForm />
        <ul className={styles.restContainer}>
          <li className={styles.linkfont}>알림</li>
          <li className={styles.linkfont}>메세지</li>
        </ul>
        <NavBarLoginUser user={user} push={router.push} />
      </div>
      {show && <BottomNavBar />}
    </nav>
  );
};
