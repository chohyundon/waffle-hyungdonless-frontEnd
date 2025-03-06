import styles from './NavBar.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { NavBarSearchForm } from './NavBarSearchForm';
import userImg from '../../../shared/assets/icons/userImg.svg';
import { useEffect, useState } from 'react';
import { BottomNavBar } from './BottomNavBar.tsx';
import Logo from '../../../shared/assets/icons/logo.svg';

export const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();

  const moveLoginPage = () => {
    navigate('/login');
  };

  const handleRemoveData = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
  };

  useEffect(() => {
    if (location.pathname.startsWith('/board')) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      setIsLogin(true);
      setUserData(data);
    }
  }, [userData]);

  const moveBoardPage = () => {
    navigate('/board/money');
  };

  return (
    <nav>
      <div className={styles.container}>
        <ul className={styles.leftLinkContainer}>
          <figure onClick={() => navigate('/')}>
            <img src={Logo} alt={Logo} className={styles.icon} />
          </figure>
          <li
            onClick={moveBoardPage}
            className={category ? styles.pickFont : styles.linkfont}
          >
            사부작 게시판
          </li>
          <li className={styles.linkfont}>캘린더</li>
          <li className={styles.linkfont}>사부작 순위</li>
        </ul>
        <NavBarSearchForm />
        {isLogin ? (
          <div className={styles.rightLinkContainer}>
            <Link to='/' className={styles.linkText}>
              알림
            </Link>
            <p onClick={handleRemoveData} className={styles.linkText}>
              로그아웃
            </p>
            <figure>
              <img
                src={userImg}
                alt='사용자 이미지'
                className={styles.userImg}
              />
            </figure>
          </div>
        ) : (
          <div className={styles.rightLinkContainer}>
            <button
              className={styles.whiteButtonStyles}
              onClick={moveLoginPage}
            >
              로그인
            </button>
            <button className={styles.buttonStyle} onClick={moveLoginPage}>
              회원가입
            </button>
          </div>
        )}
      </div>
      {show && <BottomNavBar />}
    </nav>
  );
};
