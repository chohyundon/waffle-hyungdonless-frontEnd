import styles from './NavBar.module.css';
import { Link } from 'react-router';
import { NavBarSearchForm } from './NavBarSearchForm.tsx';
import userImg from '../../assets/userImg.svg'

export const NavBar = () => {
 return (
   <div className={styles.container}>
     <figure className={styles.iconContainer}>
       <img alt='로고자리' className={styles.icon} />
     </figure>
     <div className={styles.leftLinkContainer}>
       <Link to='/' className={styles.linkfont}>사부작 게시판</Link>
       <Link to='/' className={styles.linkfont}>캘린더</Link>
       <Link to='/' className={styles.linkfont}>사부작 순위</Link>
     </div>
     <NavBarSearchForm />
     <div className={styles.rightLinkContainer}>
       <Link to='/' className={styles.linkText}>알림</Link>
       <Link to='/' className={styles.linkText}>메세지</Link>
       <figure>
         <img src={userImg} alt='사용자 이미지' className={styles.userImg}/>
       </figure>
     </div>
   </div>
 );
};