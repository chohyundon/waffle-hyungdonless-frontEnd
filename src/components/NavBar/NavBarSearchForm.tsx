import searchIcon from '../../assets/search.svg'
import styles from './NavBar.module.css'

export const NavBarSearchForm = () => {
 return (
  <form className={styles.formContainer}>
   <input className={styles.inputText}/>
    <img src={searchIcon} alt='searchIcon' className={styles.icons}/>
  </form>
 );
};