import {GoogleLogin, LoginForm, LoginStatus} from "../index";
import styles from "./LoginHome.module.css";
import {useNavigate} from "react-router";

export function LoginHomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <main className={styles.mainContainer}>
        <h1 className={styles.loginTitle}>로그인</h1>
        <LoginForm/>
        <LoginStatus />
        <div className={styles.orContainer}>
          <span className={styles.orStyle}/>
          <p className={styles.orFont}>또는</p>
          <span className={styles.orStyle}/>
        </div>
        <div className={styles.googleContainer}>
          <GoogleLogin />
        </div>
        <div className={styles.signUp}>
          <p className={styles.Text}>아직 ‘사부작 사부작’에 처음이세요?</p>
          <p className={styles.signUpText} onClick={() => navigate('/signUp/step1')}>
            회원가입하기
          </p>
        </div>
      </main>
      <figure className={styles.figureContainer}></figure>
    </div>
  );
}
