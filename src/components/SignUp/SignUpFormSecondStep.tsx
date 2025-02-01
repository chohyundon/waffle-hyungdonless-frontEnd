import styles from './SginUp.module.css';
import { SignUpSecondForm, SignUpStep } from '../index.ts';

export function SignUpFormSecondStep() {
  return (
    <main className={styles.secondStepContainer}>
      <h1 className={styles.title}>회원가입</h1>
      <SignUpSecondForm />
      <SignUpStep />
    </main>
  );
}
