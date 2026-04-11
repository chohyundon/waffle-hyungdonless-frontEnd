'use client';

import Image from 'next/image';
import type { RouterPush } from '@/shared/lib/navigationUtils';
import { moveLoginPage } from '@/shared/lib/navigationUtils';
import { removeLocalStorage } from '@/shared/lib/useLocalStorage';
import styles from '@/widgets/NavBar/ui/NavBar.module.css';

interface NavBarLoginUserProps {
  realGoogleUserData: any;
  push: RouterPush;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBarLoginUser = ({
  realGoogleUserData,
  push,
  setIsLogin,
}: NavBarLoginUserProps) => {
  const handleRemoveData = () => {
    removeLocalStorage('user');
    removeLocalStorage('userData');
    setIsLogin(false);
  };

  if (realGoogleUserData) {
    const profileSrc = realGoogleUserData.userImg;
    const profileAlt = `${realGoogleUserData.userName ?? '사용자'} 프로필 사진`;

    return (
      <div className={styles.userLogin}>
        {typeof profileSrc === 'string' && profileSrc.startsWith('http') ? (
          <Image
            src={profileSrc}
            alt={profileAlt}
            width={32}
            height={32}
            className={styles.userImage}
          />
        ) : (
          <div className={styles.userImage} aria-label={profileAlt} />
        )}
        <p className={styles.loginBtn} onClick={handleRemoveData}>
          로그아웃
        </p>
      </div>
    );
  } else {
    return (
      <p className={styles.loginBtn} onClick={() => moveLoginPage(push)}>
        로그인
      </p>
    );
  }
};
