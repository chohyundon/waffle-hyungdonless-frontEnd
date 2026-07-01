import styles from '@/components/Login/LoginForm.module.css';
import googleLogo from '@/assets/icons/googleLogo.svg';
import { assetSrc } from '@/lib/assetSrc';
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
      <img
        src={assetSrc(googleLogo)}
        alt=''
        aria-hidden
        className={styles.googleLogo}
      />
      Google로 로그인
    </button>
  );
}
