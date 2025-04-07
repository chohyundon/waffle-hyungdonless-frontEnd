import styles from './BottomNavBar.module.css';
import { useNavigate, useParams } from 'react-router';
import { bottomNavBarData } from '../const/BottomNavBarData';

export const BottomNavBar = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleCategoryClick = (path: string) => {
    navigate(`/board/${path}`);
  };

  return (
    <section className={styles.bottomNavContainer}>
      <ul className={styles.categoryContainer}>
        {bottomNavBarData.map((item, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(item.path)}
            className={styles.listFont}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
