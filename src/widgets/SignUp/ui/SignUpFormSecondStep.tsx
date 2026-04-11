import styles from '@/widgets/SignUp/ui/SginUp.module.css';
import { SignUpSecondForm, SignUpStep } from '@/widgets/SignUp';
import Logo from '@/shared/assets/icons/loginLogo.svg';
import { assetSrc } from '@/shared/lib/assetSrc';

export function SignUpFormSecondStep() {
  return (
    <>
      <main className={styles.secondStepContainer}>
        <h1 className={styles.title}>회원가입</h1>
        <SignUpSecondForm />
        <SignUpStep />
      </main>
      <figure className={styles.logo}>
        <img src={assetSrc(Logo)} alt='사부작 로고' />
      </figure>
    </>
  );
}
