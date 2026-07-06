import styles from '@/components/NavBar/NavBar.module.css';
import { moveBoardPage } from '@/lib/navigationUtils';
import type { RouterPush } from '@/lib/navigationUtils';
import { usePathname } from 'next/navigation';

interface NavBarMenuItemProps {
  showMenu: boolean;
  push: RouterPush;
  variant?: 'desktop' | 'mobile';
}

const menuItems: Array<{
  label: string;
  href: string | null;
  onClick?: (push: RouterPush) => void;
}> = [
  { label: '사부작 게시판', href: '/board/money/popular', onClick: moveBoardPage },
  { label: '캘린더', href: null },
  { label: '사부작 순위', href: null },
];

export const NavBarMenuItem = ({
  showMenu,
  push,
  variant = 'desktop',
}: NavBarMenuItemProps) => {
  const pathname = usePathname() ?? '';
  const isBoardActive = pathname.startsWith('/board');

  if (variant === 'mobile') {
    return (
      <ul className={styles.mobileMenuList}>
        {menuItems.map((item) => (
          <li key={item.label}>
            <button
              type='button'
              className={`${styles.mobileMenuLink} ${
                item.label === '사부작 게시판' && isBoardActive
                  ? styles.navLinkActive
                  : ''
              }`}
              onClick={() => {
                if (item.onClick) {
                  item.onClick(push);
                }
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  if (showMenu) {
    return null;
  }

  return (
    <>
      {menuItems.map((item) => {
        const isActive = item.label === '사부작 게시판' && isBoardActive;

        return (
          <li key={item.label} className={styles.navLinkItem}>
            <button
              type='button'
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              onClick={() => {
                if (item.onClick) {
                  item.onClick(push);
                }
              }}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </>
  );
};
