import { LoginForm } from "../index";
import styles from "./LoginHome.module.css";

export function LoginHomePage() {
  return (
    <>
      <div className={styles.loginContainer}>
        <main className={styles.mainContainer}>
          <h1 className={styles.loginTitle}>LOGIN</h1>
          <LoginForm />
        </main>
        <figure className={styles.figureContainer}></figure>
      </div>
    </>
  );
}
