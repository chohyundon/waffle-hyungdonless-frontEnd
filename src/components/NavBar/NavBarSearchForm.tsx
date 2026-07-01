import searchIcon from '@/assets/icons/search.svg';
import { assetSrc } from '@/lib/assetSrc';
import styles from '@/components/NavBar/NavBar.module.css';

export const NavBarSearchForm = () => {
  return (
    <form className={styles.formContainer}>
      <input className={styles.inputText} />
      <img src={assetSrc(searchIcon)} alt='검색' className={styles.icons} />
    </form>
  );
};
