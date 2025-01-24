import {SignUpThirdForm} from "../index.ts";
import styles from './SignUpThirdForm.module.css'

export function SignUpFormThirdStep() {
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>회원가입</h1>
      <SignUpThirdForm />
    </main>
  )
}
