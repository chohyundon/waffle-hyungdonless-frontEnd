import searchIcon from '../../../shared/assets/icons/search.svg'
import styles from './NavBar.module.css'

export const NavBarSearchForm = () => {
 return (
  <form className={styles.formContainer}>
   <input className={styles.inputText}/>
    <img src={searchIcon} alt='searchIcon' className={styles.icons}/>
  </form>
 );
};