'use client';

import styles from '@/widgets/Login/ui/LoginForm.module.css';
import googleLogo from '@/shared/assets/icons/googleLogo.svg';
import { assetSrc } from '@/shared/lib/assetSrc';
import { createClient } from '@/shared/lib/supabase/client';

export function GoogleLogin() {
  const supabase = createClient();

  const googleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        alert(error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <button className={styles.googleForm} onClick={googleLogin}>
      <img
        src={assetSrc(googleLogo)}
        alt='Google 로고'
        className={styles.googleLogo}
      />
      <p>Google로 로그인</p>
    </button>
  );
}
