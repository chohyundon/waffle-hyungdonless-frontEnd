import styles from "./SginUp.module.css";
import { SignUpStep } from "../index";
import {Outlet} from "react-router";

export function SignUpPage() {
  return (
    <div className={styles.signUpContainer}>
        <Outlet/>
        <SignUpStep/>
      <figure></figure>
    </div>
  );
}
