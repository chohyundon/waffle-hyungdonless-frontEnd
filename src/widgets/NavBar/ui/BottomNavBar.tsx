import styles from './BottomNavBar.module.css'
import hamburgerIcon from '../../../shared/assets/icons/hamburgerBar.svg'

export const BottomNavBar = () => {
 return (
  <section className={styles.bottomNavContainer}>
    <ul className={styles.categoryContainer}>
      <img src={hamburgerIcon} alt="메뉴 바" width={24} height={24} className={styles.icon}/>
      <li className={styles.categoryFont}>금융</li>
      <li className={styles.categoryFont}>복지</li>
      <li className={styles.categoryFont}>주거</li>
      <li className={styles.categoryFont}>자기계발</li>
      <li className={styles.categoryFont}>자유</li>
      <li className={styles.categoryFont}>Q&A</li>
    </ul>
  </section>
 );
};