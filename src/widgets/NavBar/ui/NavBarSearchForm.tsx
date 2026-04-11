import searchIcon from '@/shared/assets/icons/search.svg';
import { assetSrc } from '@/shared/lib/assetSrc';
import styles from '@/widgets/NavBar/ui/NavBar.module.css';

export const NavBarSearchForm = () => {
  return (
    <form className={styles.formContainer}>
      <input className={styles.inputText} />
      <img src={assetSrc(searchIcon)} alt='검색' className={styles.icons} />
    </form>
  );
};
