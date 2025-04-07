import { NavigateFunction } from 'react-router';
import { moveLoginPage } from '../../../shared/lib/navigationUtils';
import { removeLocalStorage } from '../../../shared/lib/useLocalStorage';
import styles from './NavBar.module.css';

interface NavBarLoginUserProps {
  realGoogleUserData: any;
  navigate: NavigateFunction;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBarLoginUser = ({
  realGoogleUserData,
  navigate,
  setIsLogin,
}: NavBarLoginUserProps) => {
  const handleRemoveData = () => {
    removeLocalStorage('user');
    removeLocalStorage('userData');
    setIsLogin(false);
  };

  if (realGoogleUserData) {
    return (
      <div className={styles.userLogin}>
        <img
          src={realGoogleUserData.userImg}
          alt='유저 이미지'
          className={styles.userImage}
        />
        <p className={styles.loginBtn} onClick={handleRemoveData}>
          로그아웃
        </p>
      </div>
    );
  } else {
    return (
      <p className={styles.loginBtn} onClick={() => moveLoginPage(navigate)}>
        로그인
      </p>
    );
  }
};
