'use client';

import Image from 'next/image';

import styles from '@/components/Login/styles/LoginForm.module.css';
import googleLogo from '@/assets/icons/googleLogo.svg';
import { useGoogleLogin } from '@/components/Login/useGoogleLogin';

export function GoogleLogin() {
  const { errorMessage, googleLogin } = useGoogleLogin();

  return (
    <div>
      <button
        type='button'
        className={styles.googleButton}
        onClick={googleLogin}
      >
        <Image
          src={googleLogo}
          alt=''
          width={20}
          height={20}
          aria-hidden
          className={styles.googleLogo}
        />
        Google로 로그인
      </button>
      {errorMessage && (
        <p className={styles.submitError} role='alert'>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
