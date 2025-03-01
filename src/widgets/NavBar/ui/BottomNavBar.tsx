import styles from './BottomNavBar.module.css';
import hamburgerIcon from '../../../shared/assets/icons/hamburgerBar.svg';
import { useNavigate, useParams } from 'react-router';

export const BottomNavBar = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  return (
    <section className={styles.bottomNavContainer}>
      <ul className={styles.categoryContainer}>
        <img
          src={hamburgerIcon}
          alt='메뉴 바'
          width={24}
          height={24}
          className={styles.icon}
        />
        <li
          className={
            category === 'money' ? styles.pickFont : styles.categoryFont
          }
          onClick={() => navigate('/board/money')}
        >
          금융
        </li>
        <li
          className={
            category === 'welfare' ? styles.pickFont : styles.categoryFont
          }
          onClick={() => navigate('/board/welfare')}
        >
          복지
        </li>
        <li
          className={
            category === 'home' ? styles.pickFont : styles.categoryFont
          }
          onClick={() => navigate('/board/home')}
        >
          주거
        </li>
        <li
          className={
            category === 'develop' ? styles.pickFont : styles.categoryFont
          }
          onClick={() => navigate('/board/develop')}
        >
          자기계발
        </li>
        <li
          className={
            category === 'free' ? styles.pickFont : styles.categoryFont
          }
          onClick={() => navigate('/board/free')}
        >
          자유
        </li>
        <li
          className={category === 'qna' ? styles.pickFont : styles.categoryFont}
          onClick={() => navigate('/board/qna')}
        >
          Q&A
        </li>
      </ul>
    </section>
  );
};
