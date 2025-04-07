import {
  homeNavigation,
  toggleMenu,
} from '../../../shared/lib/navigationUtils';
import styles from './NavBar.module.css';
import Logo from '../../../shared/assets/icons/logo.svg';
import { NavigateFunction } from 'react-router';
import { FiMenu } from 'react-icons/fi';
import { useWindowSize } from '../../../shared/lib/useWindowSize';

interface NavBarIconProps {
  navigate: NavigateFunction;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBarIcon = ({ navigate, setShowMenu }: NavBarIconProps) => {
  const { width } = useWindowSize();

  if (width <= 1260) {
    return (
      <div className={styles.menuContainer}>
        <FiMenu
          className={styles.menuIcon}
          onClick={() => toggleMenu(setShowMenu)}
        />
        <p className={styles.menuText} onClick={() => homeNavigation(navigate)}>
          사부작 사부작
        </p>
      </div>
    );
  } else {
    return (
      <img
        src={Logo}
        alt='사부작 로고'
        className={styles.icon}
        onClick={() => homeNavigation(navigate)}
      />
    );
  }
};
