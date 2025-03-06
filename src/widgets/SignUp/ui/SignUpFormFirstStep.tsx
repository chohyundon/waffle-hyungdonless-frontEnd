import { SignUpForm } from './SignUpForm.tsx';
import styles from './SginUp.module.css';
import { GoogleLogin } from '../../Login';
import { SignUpStep } from './SignUpStep.tsx';
import Logo from '../../../shared/assets/icons/loginLogo.svg';

export function SignUpFormFirstStep() {
  return (
    <>
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>회원가입</h1>
        <SignUpForm />
        <div className={styles.orContainer}>
          <span className={styles.orBorder} />
          <span className={styles.orFont}>또는</span>
          <span className={styles.orBorder} />
        </div>
        <SignUpStep />
        <GoogleLogin />
      </main>
      <figure className={styles.logo}>
        <img src={Logo} alt='Logo' />
      </figure>
    </>
  );
}
