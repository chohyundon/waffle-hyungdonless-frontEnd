import styles from '@/components/NavBar/styles/NavBar.module.css';
import { NAV_MENU_ITEMS } from '@/components/NavBar/consts/navMenuItems';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavBarMenuItemProps {
  showMenu: boolean;
  variant?: 'desktop' | 'mobile';
}

export const NavBarMenuItem = ({
  showMenu,
  variant = 'desktop',
}: NavBarMenuItemProps) => {
  const pathname = usePathname() ?? '';
  const isBoardActive = pathname.startsWith('/board');

  const renderMenuItem = (item: (typeof NAV_MENU_ITEMS)[number]) => {
    const isActive = item.label === '사부작 게시판' && isBoardActive;

    if (!item.href) {
      return (
        <span className={styles.navLinkDisabled} aria-disabled='true'>
          {item.label}
        </span>
      );
    }

    if (variant === 'mobile') {
      return (
        <Link
          href={item.href}
          className={`${styles.mobileMenuLink} ${
            isActive ? styles.navLinkActive : ''
          }`}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <Link
        className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
        href={item.href}
      >
        {item.label}
      </Link>
    );
  };

  if (variant === 'mobile') {
    return (
      <ul className={styles.mobileMenuList}>
        {NAV_MENU_ITEMS.map((item) => (
          <li key={item.label}>{renderMenuItem(item)}</li>
        ))}
      </ul>
    );
  }

  if (showMenu) {
    return null;
  }

  return (
    <>
      {NAV_MENU_ITEMS.map((item) => (
        <li key={item.label} className={styles.navLinkItem}>
          {renderMenuItem(item)}
        </li>
      ))}
    </>
  );
};
