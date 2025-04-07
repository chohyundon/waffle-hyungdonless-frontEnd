import styles from './NavBar.module.css';
import { moveBoardPage } from '../../../shared/lib/navigationUtils';
import { NavigateFunction } from 'react-router';

interface NavBarMenuItemProps {
  showMenu: boolean;
  navigate: NavigateFunction;
  category: string | undefined;
}

export const NavBarMenuItem = ({
  showMenu,
  navigate,
  category,
}: NavBarMenuItemProps) => {
  if (showMenu) {
    return (
      <div className={styles.menuBar}>
        <li onClick={() => moveBoardPage(navigate)} className={styles.menuFont}>
          사부작 게시판
        </li>
        <li className={styles.menuFont}>캘린더</li>
        <li className={styles.menuFont}>사부작 순위</li>
      </div>
    );
  } else {
    return (
      <>
        <li onClick={() => moveBoardPage(navigate)} className={styles.linkfont}>
          사부작 게시판
        </li>
        <li className={styles.linkfont}>캘린더</li>
        <li className={styles.linkfont}>사부작 순위</li>
      </>
    );
  }
};
