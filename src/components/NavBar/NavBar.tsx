'use client';

import styles from '@/components/NavBar/styles/NavBar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BottomNavBar } from '@/components/NavBar/BottomNavBar';
import { NavBarMenuItem } from '@/components/NavBar/NavBarMenuItem';
import { NavBarIcon } from '@/components/NavBar/NavBarIcon';
import { NavBarLoginUser } from '@/components/NavBar/NavBarLoginUser';
import { NavBarSearchForm } from '@/components/NavBar/NavBarSearchForm';
import { useNotifications } from '@/components/NavBar/useNotifications';
import { AlarmModal } from '@/components/Modal/AlarmModal';
import { useUser } from '@/lib/userInfo/useUserInfo';
import { FiBell } from 'react-icons/fi';

export const NavBar = () => {
  const [showBoardNav, setShowBoardNav] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const { user } = useUser();
  const {
    notifications,
    hasUnread,
    isAlarmOpen,
    openAlarm,
    closeAlarm,
    markAsRead,
  } = useNotifications();

  useEffect(() => {
    setShowBoardNav(pathname.startsWith('/board'));
  }, [pathname]);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.container} aria-label='주요 메뉴'>
        <div className={styles.inner}>
          <div className={styles.leftCluster}>
            <NavBarIcon push={router.push} setShowMenu={setShowMenu} />
            <ul className={styles.navLinks}>
              <NavBarMenuItem showMenu={showMenu} />
            </ul>
          </div>

          <div className={styles.rightCluster}>
            <NavBarSearchForm />
            <ul className={styles.utilityLinks} aria-label='알림 및 메시지'>
              <li>
                <button
                  type='button'
                  className={styles.utilityItem}
                  onClick={openAlarm}
                  aria-label={hasUnread ? '읽지 않은 알림 있음' : '알림'}
                >
                  <FiBell className={styles.utilityIcon} aria-hidden />
                  {hasUnread && (
                    <span className={styles.utilityBadge} aria-hidden />
                  )}
                </button>
              </li>
              <li>
                <button type='button' className={styles.utilityItem}>
                  메세지
                </button>
              </li>
            </ul>
            <NavBarLoginUser user={user} push={router.push} />
          </div>
        </div>

        {showMenu && (
          <div className={styles.mobileMenu}>
            <NavBarMenuItem showMenu={showMenu} variant='mobile' />
          </div>
        )}
      </nav>

      {showBoardNav && <BottomNavBar pathname={pathname} />}

      <AlarmModal
        isOpen={isAlarmOpen}
        onClose={closeAlarm}
        notifications={notifications}
        onRead={markAsRead}
      />
    </header>
  );
};
