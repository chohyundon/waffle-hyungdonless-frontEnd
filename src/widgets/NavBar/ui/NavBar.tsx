'use client';

import styles from '@/widgets/NavBar/ui/NavBar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { NavBarSearchForm } from '@/widgets/NavBar/ui/NavBarSearchForm';
import { useEffect, useState } from 'react';
import { BottomNavBar } from '@/widgets/NavBar/ui/BottomNavBar';
import {
  addLocalStorage,
  getLocalStorage,
} from '@/shared/lib/useLocalStorage';
import { UserTypes } from '@/shared/types/googleUserTypes';
import { NavBarMenuItem } from '@/widgets/NavBar/ui/NavBarMenuItem';
import { NavBarIcon } from '@/widgets/NavBar/ui/NavBarIcon';
import { NavBarLoginUser } from '@/widgets/NavBar/ui/NavBarLoginUser';

export const NavBar = () => {
  const [, setIsLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname() ?? '';
  const router = useRouter();

  const googleUserData = addLocalStorage('userData');
  let realGoogleUserData: UserTypes | null = null;
  if (googleUserData) {
    try {
      realGoogleUserData = JSON.parse(googleUserData) as UserTypes;
    } catch {
      realGoogleUserData = null;
    }
  }

  useEffect(() => {
    if (pathname.startsWith('/board')) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [pathname]);

  useEffect(() => {
    const data = getLocalStorage('user');
    if (data) {
      setIsLogin(true);
      setUserData(data);
    }
  }, [userData]);

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
        <NavBarLoginUser
          realGoogleUserData={realGoogleUserData}
          push={router.push}
          setIsLogin={setIsLogin}
        />
      </div>
      {show && <BottomNavBar />}
    </nav>
  );
};
