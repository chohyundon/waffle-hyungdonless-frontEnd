'use client';

import { homeNavigation, toggleMenu } from '@/lib/navigationUtils';
import type { RouterPush } from '@/lib/navigationUtils';
import styles from '@/components/NavBar/styles/NavBar.module.css';
import Logo from '@/assets/icons/logo.svg';
import { FiMenu } from 'react-icons/fi';
import { useWindowSize } from '@/lib/useWindowSize';
import Image from 'next/image';

interface NavBarIconProps {
  push: RouterPush;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBarIcon = ({ push, setShowMenu }: NavBarIconProps) => {
  const { width } = useWindowSize();

  if (width > 0 && width <= 1260) {
    return (
      <div className={styles.menuContainer}>
        <button
          type='button'
          className={styles.menuIconButton}
          onClick={() => toggleMenu(setShowMenu)}
          aria-label='메뉴 열기'
        >
          <FiMenu className={styles.menuIcon} aria-hidden />
        </button>
        <button
          type='button'
          className={styles.menuText}
          onClick={() => homeNavigation(push)}
        >
          사부작 사부작
        </button>
      </div>
    );
  }

  return (
    <button
      type='button'
      className={styles.icon}
      onClick={() => homeNavigation(push)}
      aria-label='홈으로 이동'
    >
      <Image
        src={Logo}
        alt='사부작 사부작 로고'
        width={112}
        height={40}
        className={styles.navLogo}
        priority
      />
    </button>
  );
};
