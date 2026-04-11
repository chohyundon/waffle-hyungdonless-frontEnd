'use client';

import { GoogleLogin, LoginForm, LoginStatus } from '@/widgets/Login';
import styles from '@/widgets/Login/ui/LoginHome.module.css';
import { useRouter } from 'next/navigation';
import Logo from '@/shared/assets/icons/loginLogo.svg';
import { assetSrc } from '@/shared/lib/assetSrc';

export function LoginHomePage() {
  const router = useRouter();

  return (
    <div className={styles.loginContainer}>
      <main className={styles.mainContainer}>
        <h1 className={styles.loginTitle}>로그인</h1>
        <LoginForm />
        <LoginStatus />
        <div className={styles.orContainer}>
          <span className={styles.orStyle} />
          <p className={styles.orFont}>또는</p>
          <span className={styles.orStyle} />
        </div>
        <div className={styles.googleContainer}>
          <GoogleLogin />
        </div>
        <div className={styles.signUp}>
          <p className={styles.Text}>아직 ‘사부작 사부작’에 처음이세요?</p>
          <p
            className={styles.signUpText}
            onClick={() => router.push('/signup/step1')}
          >
            회원가입하기
          </p>
        </div>
      </main>
      <figure className={styles.figureContainer}>
        <img src={assetSrc(Logo)} alt='사부작 로고' />
      </figure>
    </div>
  );
}
