import checkCircle from '@/assets/icons/checkCircle.svg';
import nonCheckCircle from '@/assets/icons/nonCheckCircle.svg';
import rightLogo from '@/assets/icons/rightBar.svg';
import styles from '@/components/Login/LoginForm.module.css';
import { useState } from 'react';
import { assetSrc } from '@/lib/assetSrc';

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
        <img
          src={assetSrc(keepLoggedIn ? checkCircle : nonCheckCircle)}
          alt=''
          aria-hidden
          className={styles.checkIcon}
        />
        <span className={styles.fontStyle}>로그인 상태 유지하기</span>
      </label>

      <button type='button' className={`${styles.loginStatus} ${styles.findLink}`}>
        <span className={styles.fontStyle}>아이디/비밀번호 찾기</span>
        <img src={assetSrc(rightLogo)} alt='' aria-hidden />
      </button>
    </div>
  );
};
