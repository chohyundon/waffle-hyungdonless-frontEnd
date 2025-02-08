import styles from './SignUpFormFourth.module.css';
import { useNavigate } from 'react-router';

export const SignUpFormFourth = () => {
  const navigate = useNavigate();

  const moveLoginPage = () => {
    navigate('/login');
  };

  const moveMainPage = () => {
    navigate('/');
  };

  return (
    <form>
      <button className={styles.loginForm} onClick={moveLoginPage}>
        로그인
      </button>
      <button className={styles.homeLogin} onClick={moveMainPage}>
        홈으로 가기
      </button>
    </form>
  );
};
