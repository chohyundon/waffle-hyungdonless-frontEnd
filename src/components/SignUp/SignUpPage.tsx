import styles from "./SginUp.module.css";
import {Outlet} from "react-router";

export function SignUpPage() {
  return (
    <div className={styles.signUpContainer}>
        <Outlet/>
      <figure></figure>
    </div>
  );
}
