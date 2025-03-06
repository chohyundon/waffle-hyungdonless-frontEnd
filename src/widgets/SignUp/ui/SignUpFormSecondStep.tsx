import styles from './SginUp.module.css';
import { SignUpSecondForm, SignUpStep } from '../index';
import Logo from '../../../shared/assets/icons/loginLogo.svg';

export function SignUpFormSecondStep() {
  return (
    <>
      <main className={styles.secondStepContainer}>
        <h1 className={styles.title}>회원가입</h1>
        <SignUpSecondForm />
        <SignUpStep />
      </main>
      <figure className={styles.logo}>
        <img src={Logo} alt='Logo' />
      </figure>
    </>
  );
}
