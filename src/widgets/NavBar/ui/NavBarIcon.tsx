'use client';

import {
  homeNavigation,
  toggleMenu,
} from '@/shared/lib/navigationUtils';
import type { RouterPush } from '@/shared/lib/navigationUtils';
import styles from '@/widgets/NavBar/ui/NavBar.module.css';
import Logo from '@/shared/assets/icons/logo.svg';
import { FiMenu } from 'react-icons/fi';
import { useWindowSize } from '@/shared/lib/useWindowSize';
import { assetSrc } from '@/shared/lib/assetSrc';

interface NavBarIconProps {
  push: RouterPush;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBarIcon = ({ push, setShowMenu }: NavBarIconProps) => {
  const { width } = useWindowSize();

  if (width > 0 && width <= 1260) {
    return (
      <div className={styles.menuContainer}>
        <FiMenu
          className={styles.menuIcon}
          onClick={() => toggleMenu(setShowMenu)}
        />
        <p className={styles.menuText} onClick={() => homeNavigation(push)}>
          사부작 사부작
        </p>
      </div>
    );
  } else {
    return (
      <img
        src={assetSrc(Logo)}
        alt='사부작 로고'
        className={styles.icon}
        onClick={() => homeNavigation(push)}
      />
    );
  }
};
