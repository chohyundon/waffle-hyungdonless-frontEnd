import styles from './NavBar.module.css';
import { Link, useNavigate } from 'react-router';
import { NavBarSearchForm } from './NavBarSearchForm';
import userImg from '../../../shared/assets/icons/userImg.svg';
import { useState } from 'react';
import { BottomNavBar } from './BottomNavBar.tsx';

export const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const moveLoginPage = () => {
    navigate('/login');
  };

  return (
    <nav className={styles.container}>
      <figure className={styles.iconContainer}>
        <img alt='로고자리' className={styles.icon} />
      </figure>
      <div className={styles.leftLinkContainer}>
        <Link to='/board' className={styles.linkfont}>
          사부작 게시판
        </Link>
        <Link to='/' className={styles.linkfont}>
          캘린더
        </Link>
        <Link to='/' className={styles.linkfont}>
          사부작 순위
        </Link>
      </div>
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
      <BottomNavBar />
    </nav>
  );
};
