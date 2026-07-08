import Image from 'next/image';
import checkCircle from '@/assets/icons/checkCircle.svg';
import nonCheckCircle from '@/assets/icons/nonCheckCircle.svg';
import rightLogo from '@/assets/icons/rightBar.svg';
import styles from '@/components/Login/styles/LoginForm.module.css';
import { useState } from 'react';

export const LoginStatus = () => {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  return (
    <div className={styles.loginStatusContainer}>
      <label className={styles.loginStatus}>
        <input
          type='checkbox'
          checked={keepLoggedIn}
          onChange={() => setKeepLoggedIn((prev) => !prev)}
          className={styles.hiddenCheckbox}
        />
        <Image
          src={keepLoggedIn ? checkCircle : nonCheckCircle}
          alt={
            keepLoggedIn ? '로그인 상태 유지하기' : '로그인 상태 유지하기 해제'
          }
          width={20}
          height={20}
          aria-hidden
          className={styles.checkIcon}
        />
        <span className={styles.fontStyle}>로그인 상태 유지하기</span>
      </label>

      <button
        type='button'
        className={`${styles.loginStatus} ${styles.findLink}`}
      >
        <span className={styles.fontStyle}>아이디/비밀번호 찾기</span>
        <Image src={rightLogo} alt='아이디/비밀번호 찾기 아이콘' width={14} height={14} aria-hidden />
      </button>
    </div>
  );
};
