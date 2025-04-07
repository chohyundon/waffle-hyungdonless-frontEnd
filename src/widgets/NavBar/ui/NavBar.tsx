import styles from './NavBar.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { NavBarSearchForm } from './NavBarSearchForm';
import userImg from '../../../shared/assets/icons/userImg.svg';
import { useEffect, useState } from 'react';
import { BottomNavBar } from './BottomNavBar.tsx';
import Logo from '../../../shared/assets/icons/logo.svg';
import { getSession } from '../../../shared/lib/useSession.ts';
import { addLocalStorage } from '../../../shared/lib/useLocalStorage.ts';
import { UserTypes } from '../../../shared/types/googleUserTypes.ts';
import { FiMenu } from 'react-icons/fi';

export const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const moveLoginPage = () => {
    navigate('/login');
  };

  const handleRemoveData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    setIsLogin(false);
  };

  const googleUserData = addLocalStorage('userData');
  const realGoogleUserData: UserTypes | null =
    googleUserData && JSON.parse(googleUserData);

  useEffect(() => {
    if (location.pathname.startsWith('/board')) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [innerWidth]);

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
    <nav className={styles.container}>
      <ul className={styles.leftLinkContainer}>
        {innerWidth <= 1260 ? (
          <div className={styles.menuContainer}>
            <FiMenu className={styles.menuIcon} />
            <p className={styles.menuText}>사부작 사부작</p>
          </div>
        ) : (
          <img src={Logo} alt='사부작 로고' className={styles.icon} />
        )}
        <li
          onClick={moveBoardPage}
          className={category ? styles.pickFont : styles.linkfont}
        >
          사부작 게시판
        </li>
        <li className={styles.linkfont}>캘린더</li>
        <li className={styles.linkfont}>사부작 순위</li>
      </ul>
      <div className={styles.rightLinkContainer}>
        <NavBarSearchForm />
        <ul className={styles.restContainer}>
          <li className={styles.linkfont}>알림</li>
          <li className={styles.linkfont}>메세지</li>
        </ul>
        {realGoogleUserData ? (
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
        ) : (
          <p className={styles.loginBtn} onClick={moveLoginPage}>
            로그인
          </p>
        )}
      </div>
      {show && <BottomNavBar />}
    </nav>
  );
};
