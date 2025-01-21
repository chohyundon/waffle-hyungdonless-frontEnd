import styles from "./SginUp.module.css";
import {SignUpSecondForm, GoogleLogin} from "../index.ts";

export function SignUpFormSecondStep() {
  return (
    <main className={styles.secondStepContainer}>
      <SignUpSecondForm />
      <div className={styles.orContainer}>
        <span className={styles.orBorder}></span>
        <span className={styles.orFont}>또는</span>
        <span className={styles.orBorder}></span>
      </div>
      <GoogleLogin />
    </main>
  )
}
