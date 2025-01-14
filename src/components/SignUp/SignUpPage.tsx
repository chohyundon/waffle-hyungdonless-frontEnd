import styles from "./SginUp.module.css";
import { SignUpStep } from "../index";
import {Outlet} from "react-router";

export function SignUpPage() {
  return (
    <div className={styles.signUpContainer}>
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>회원가입</h1>
        <Outlet/>
        <SignUpStep/>
      </main>
      <figure></figure>
    </div>
  );
}
