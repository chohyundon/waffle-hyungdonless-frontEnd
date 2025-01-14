import {SignUpForm} from "./SignUpForm.tsx";
import styles from "./SginUp.module.css";
import {GoogleLogin} from "../Login/GoogleLogin.tsx";

export function SignUpFormFirstStep() {
  return (
    <>
      <SignUpForm />
      <div className={styles.orContainer}>
        <span className={styles.orBorder}></span>
        <span className={styles.orFont}>또는</span>
        <span className={styles.orBorder}></span>
      </div>
      <GoogleLogin />
    </>
  )
}
