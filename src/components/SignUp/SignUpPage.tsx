import styles from "./SginUp.module.css";
import { SignUpForm } from "../index";
import checkProcedure from "../../assets/signUpProcedure.svg";
// import noneCheckProcedure from "../../assets/nonCheckCircle.svg";

export function SignUpPage() {
  return (
    <div className={styles.signUpContainer}>
      <main className={styles.mainContainer}>
        <SignUpForm />
        <img src={checkProcedure} />
      </main>
      <figure></figure>
    </div>
  );
}
