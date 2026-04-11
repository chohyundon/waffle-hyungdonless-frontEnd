import { SignUpForm } from '@/widgets/SignUp/ui/SignUpForm';
import styles from '@/widgets/SignUp/ui/SginUp.module.css';
import { GoogleLogin } from '@/widgets/Login';
import { SignUpStep } from '@/widgets/SignUp/ui/SignUpStep';
import Logo from '@/shared/assets/icons/loginLogo.svg';
import { assetSrc } from '@/shared/lib/assetSrc';

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
        <img src={assetSrc(Logo)} alt='사부작 로고' />
      </figure>
    </>
  );
}
