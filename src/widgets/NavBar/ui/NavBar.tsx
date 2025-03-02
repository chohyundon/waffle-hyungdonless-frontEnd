import styles from './NavBar.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { NavBarSearchForm } from './NavBarSearchForm';
import userImg from '../../../shared/assets/icons/userImg.svg';
import { useEffect, useState } from 'react';
import { BottomNavBar } from './BottomNavBar.tsx';

export const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();
  console.log(location);

  const moveLoginPage = () => {
    navigate('/login');
  };


  useEffect(() => {
    if (location.pathname.startsWith('/board')) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [location.pathname]);

  const moveBoardPage = () => {
    navigate('/board/money');
  };

  return (
    <nav>
    <div className={styles.container}>
      <figure className={styles.iconContainer} onClick={() => navigate('/')}>
        <img alt='로고자리' className={styles.icon} />
      </figure>
      <ul className={styles.leftLinkContainer}>
        <li
          onClick={moveBoardPage}
          className={category ? styles.pickFont : styles.linkfont}
        >
          사부작 게시판
        </li>
        <li className={styles.linkfont}>
          캘린더
        </li>
        <li className={styles.linkfont}>
          사부작 순위
        </li>
      </ul>
      <NavBarSearchForm />
      {isLogin ? (
        <div className={styles.rightLinkContainer}>
          <Link to='/' className={styles.linkText}>
            알림
          </Link>
          <Link to='/' className={styles.linkText}>
            메세지
          </Link>
          <figure>
            <img src={userImg} alt='사용자 이미지' className={styles.userImg} />
          </figure>
        </div>
      ) : (
        <div className={styles.rightLinkContainer}>
          <button className={styles.whiteButtonStyles} onClick={moveLoginPage}>
            로그인
          </button>
          <button className={styles.buttonStyle} onClick={moveLoginPage}>
            회원가입
          </button>
        </div>
      )}
    </div>
      {show && <BottomNavBar /> }
    </nav>
  );
};
