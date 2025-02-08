import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../shared/lib/firebaseconfig.ts';
import styles from './LoginForm.module.css';
import googleLogo from '../../../shared/assets/icons/googleLogo.svg';
import { useNavigate } from 'react-router';

export function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);

      // 로그인된 사용자 정보
      const user = result.user;
      const userName = user?.displayName;
      const userImg = user?.photoURL;
      const googleUser = { userName, userImg };
      console.log(user);

      const googleData = JSON.stringify(googleUser);

      const userStorage = window.localStorage;
      userStorage.setItem('userData', googleData);

      if (userStorage) {
        navigate('/');
      }

      console.log('User Info:', user);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={styles.googleForm} onClick={googleLogin}>
      <img src={googleLogo} alt='google 로고' className={styles.googleLogo} />
      <p>Google로 로그인</p>
    </div>
  );
}
