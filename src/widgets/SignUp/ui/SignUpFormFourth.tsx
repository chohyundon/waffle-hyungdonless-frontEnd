'use client';

import styles from '@/widgets/SignUp/ui/SignUpFormFourth.module.css';
import { useRouter } from 'next/navigation';

export const SignUpFormFourth = () => {
  const router = useRouter();

  const moveLoginPage = () => {
    router.push('/login');
  };

  const moveMainPage = () => {
    router.push('/');
  };

  return (
    <form>
      <button className={styles.loginForm} onClick={moveLoginPage}>
        로그인
      </button>
      <button className={styles.homeLogin} onClick={moveMainPage}>
        홈으로 가기
      </button>
    </form>
  );
};
