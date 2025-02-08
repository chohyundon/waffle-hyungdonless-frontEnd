import checkCircle from '../../../shared/assets/icons/checkCircle.svg';
import nonCheckCircle from '../../../shared/assets/icons/nonCheckCircle.svg';
import rightLogo from '../../../shared/assets/icons/rightBar.svg';
import styles from './LoginForm.module.css';
import { useState } from 'react';

export const LoginStatus = () => {
  const [click, setClick] = useState(false);

  const loginStatus = () => {
    setClick((prev) => !prev);
  };

  return (
    <div className={styles.loginStatusContainer}>
      <div className={styles.loginStatus}>
        <img
          src={click ? checkCircle : nonCheckCircle}
          alt='로그인 상태 유지'
          onClick={loginStatus}
          className={styles.checkIcon}
        />
        <span className={styles.fontStyle}>로그인 상태 유지하기</span>
      </div>
      <div className={styles.loginStatus}>
        <span className={styles.fontStyle}>아이디/비밀번호 찾기</span>
        <img src={rightLogo} alt='로그인 상태 유지' onClick={loginStatus} />
      </div>
    </div>
  );
};
