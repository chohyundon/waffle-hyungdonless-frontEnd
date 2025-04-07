import styles from './NavBar.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { NavBarSearchForm } from './NavBarSearchForm';
import userImg from '../../../shared/assets/icons/userImg.svg';
import { useEffect, useState } from 'react';
import { BottomNavBar } from './BottomNavBar.tsx';
import { getSession } from '../../../shared/lib/useSession.ts';
import {
  addLocalStorage,
  getLocalStorage,
} from '../../../shared/lib/useLocalStorage.ts';
import { UserTypes } from '../../../shared/types/googleUserTypes.ts';
import { NavBarMenuItem } from './NavBarMenuItem.tsx';
import { NavBarIcon } from './NavBarIcon.tsx';
import { NavBarLoginUser } from './NavBarLoginUser.tsx';

export const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const { category } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

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
    const data = getLocalStorage('user');
    if (data) {
      setIsLogin(true);
      setUserData(data);
    }
  }, [userData]);

  return (
    <nav className={styles.container}>
      <ul className={styles.leftLinkContainer}>
        <NavBarIcon navigate={navigate} setShowMenu={setShowMenu} />
        <NavBarMenuItem
          navigate={navigate}
          showMenu={showMenu}
          category={category}
        />
      </ul>
      <div className={styles.rightLinkContainer}>
        <NavBarSearchForm />
        <ul className={styles.restContainer}>
          <li className={styles.linkfont}>알림</li>
          <li className={styles.linkfont}>메세지</li>
        </ul>
        <NavBarLoginUser
          realGoogleUserData={realGoogleUserData}
          navigate={navigate}
          setIsLogin={setIsLogin}
        />
      </div>
      {show && <BottomNavBar />}
    </nav>
  );
};
