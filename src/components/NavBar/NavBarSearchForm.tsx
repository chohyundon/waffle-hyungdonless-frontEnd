'use client';

import Image from 'next/image';
import searchIcon from '@/assets/icons/search.svg';
import styles from '@/components/NavBar/styles/NavBar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const NavBarSearchForm = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return;
    }
    router.push(`/search/${encodeURIComponent(trimmed)}`);
  };

  return (
    <form className={styles.searchForm} role='search' onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        type='search'
        placeholder='검색'
        aria-label='검색'
      />
      <button
        type='submit'
        className={styles.searchButton}
        aria-label='검색하기'
      >
        <Image
          src={searchIcon}
          alt='검색 아이콘'
          width={18}
          height={18}
          className={styles.searchIcon}
          aria-hidden
        />
      </button>
    </form>
  );
};
