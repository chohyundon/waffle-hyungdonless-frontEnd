import styles from '@/widgets/NavBar/ui/NavBar.module.css';
import { moveBoardPage } from '@/shared/lib/navigationUtils';
import type { RouterPush } from '@/shared/lib/navigationUtils';

interface NavBarMenuItemProps {
  showMenu: boolean;
  push: RouterPush;
}

export const NavBarMenuItem = ({ showMenu, push }: NavBarMenuItemProps) => {
  if (showMenu) {
    return (
      <div className={styles.menuBar}>
        <li onClick={() => moveBoardPage(push)} className={styles.menuFont}>
          사부작 게시판
        </li>
        <li className={styles.menuFont}>캘린더</li>
        <li className={styles.menuFont}>사부작 순위</li>
      </div>
    );
  } else {
    return (
      <>
        <li onClick={() => moveBoardPage(push)} className={styles.linkfont}>
          사부작 게시판
        </li>
        <li className={styles.linkfont}>캘린더</li>
        <li className={styles.linkfont}>사부작 순위</li>
      </>
    );
  }
};
