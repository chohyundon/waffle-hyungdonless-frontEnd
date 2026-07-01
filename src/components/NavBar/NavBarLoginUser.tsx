import Image from 'next/image';
import type { User } from '@supabase/supabase-js';
import type { RouterPush } from '@/lib/navigationUtils';
import { moveLoginPage } from '@/lib/navigationUtils';
import styles from '@/components/NavBar/NavBar.module.css';
import { createClient } from '@/lib/supabase/client';
import defaultUserImage from '@/assets/icons/userImg.svg';

interface NavBarLoginUserProps {
  user: User | null;
  push: RouterPush;
}

function getUserAvatar(user: User) {
  const candidates = [
    user.user_metadata?.avatar_url,
    user.user_metadata?.picture,
    user.identities?.[0]?.identity_data?.avatar_url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate;
    }
  }

  return defaultUserImage;
}

function getUserDisplayName(user: User) {
  const candidates = [
    user.user_metadata?.name,
    user.user_metadata?.full_name,
    user.identities?.[0]?.identity_data?.name,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate;
    }
  }

  return '사용자';
}

export const NavBarLoginUser = ({ user, push }: NavBarLoginUserProps) => {
  const supabase = createClient();

  const handleRemoveData = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  };

  if (user) {
    return (
      <div className={styles.userLogin}>
        <Image
          src={getUserAvatar(user)}
          alt={getUserDisplayName(user)}
          width={32}
          height={32}
          className={styles.userImage}
        />
        <p className={styles.loginBtn} onClick={handleRemoveData}>
          로그아웃
        </p>
      </div>
    );
  }

  return (
    <p className={styles.loginBtn} onClick={() => moveLoginPage(push)}>
      로그인
    </p>
  );
};
