'use client';

import { GoogleLogin } from '@/components/Login/GoogleLogin';
import { LoginForm } from '@/components/Login/LoginForm';
import styles from '@/components/Login/LoginHome.module.css';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/icons/loginLogo.svg';
import Image from 'next/image';

export function LoginHomePage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <section className={styles.card} aria-labelledby='login-title'>
          <header className={styles.header}>
            <h1 id='login-title' className={styles.title}>
              로그인
            </h1>
          </header>

          <LoginForm />

          <div className={styles.divider} role='separator'>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>또는</span>
            <span className={styles.dividerLine} />
          </div>

          <GoogleLogin />

          <p className={styles.signUp}>
            <span className={styles.signUpLabel}>
              아직 &lsquo;사부작 사부작&rsquo;에 처음이세요?
            </span>
            <button
              type='button'
              className={styles.signUpLink}
              onClick={() => router.push('/signup')}
            >
              회원가입하기
            </button>
          </p>
        </section>

        <aside className={styles.brand} aria-hidden='true'>
          <Image src={Logo} alt='사부작 로고' className={styles.brandLogo} />
        </aside>
      </div>
    </div>
  );
}
