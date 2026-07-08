import Image from 'next/image';

import styles from '@/components/Login/LoginForm.module.css';
import googleLogo from '@/assets/icons/googleLogo.svg';
import { createClient } from '@/lib/supabase/client';

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
    <button
      type='button'
      className={styles.googleButton}
      onClick={googleLogin}
    >
      <Image
        src={googleLogo}
        alt='Google 로고'
        width={20}
        height={20}
        aria-hidden
        className={styles.googleLogo}
      />
      Google로 로그인
    </button>
  );
}
