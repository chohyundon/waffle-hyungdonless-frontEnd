import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../util/firebaseconfig";
import styles from "./LoginForm.module.css";
import googleLogo from "../../assets/googleLogo.svg";

export function GoogleLogin() {
  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // 로그인된 사용자 정보
      const user = result.user;

      console.log("User Info:", user);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={styles.googleForm}>
      <img src={googleLogo} alt="google 로고" className={styles.googleLogo} />
      <p onClick={googleLogin}>Google로 로그인</p>
    </div>
  );
}
