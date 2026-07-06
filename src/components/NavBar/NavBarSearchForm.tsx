import Image from 'next/image';
import searchIcon from '@/assets/icons/search.svg';
import styles from '@/components/NavBar/NavBar.module.css';

export const NavBarSearchForm = () => {
  return (
    <form
      className={styles.searchForm}
      role='search'
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className={styles.searchInput}
        type='search'
        placeholder='검색'
        aria-label='검색'
      />
      <Image
        src={searchIcon}
        alt=''
        width={18}
        height={18}
        className={styles.searchIcon}
        aria-hidden
      />
    </form>
  );
};
