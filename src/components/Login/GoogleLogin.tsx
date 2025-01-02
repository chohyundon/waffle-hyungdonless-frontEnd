import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../util/firebaseconfig";

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
    <>
      <button onClick={googleLogin}>구글로 로그인</button>
    </>
  );
}
