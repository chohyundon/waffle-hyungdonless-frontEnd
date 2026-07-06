import styles from '@/components/MainCenter/YouthPolicySection.module.css';
import { ALL } from '@/components/MainCenter/consts/Policy';
import { stripMiddleDot } from '@/components/MainCenter/youthPolicy/formatPolicyText';

type YouthPolicyFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  largeCategory: string;
  mediumCategory: string;
  location: string;
  largeCategories: string[];
  mediumCategories: string[];
  locations: string[];
  hasActiveFilter: boolean;
  onLargeCategoryChange: (value: string) => void;
  onMediumCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onReset: () => void;
};

export function YouthPolicyFilters({
  search,
  onSearchChange,
  largeCategory,
  mediumCategory,
  location,
  largeCategories,
  mediumCategories,
  locations,
  hasActiveFilter,
  onLargeCategoryChange,
  onMediumCategoryChange,
  onLocationChange,
  onReset,
}: YouthPolicyFiltersProps) {
  return (
    <div className={styles.filters}>
      <label className={styles.searchField}>
        <span className={styles.srOnly}>정책 검색</span>
        <input
          type='search'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='정책명, 키워드, 기관명 검색'
          className={styles.searchInput}
        />
      </label>

      <label className={styles.selectField}>
        <span className={styles.selectLabel}>대분류</span>
        <select
          value={largeCategory}
          onChange={(e) => onLargeCategoryChange(e.target.value)}
          className={styles.select}
        >
          {largeCategories.map((item) => (
            <option key={item} value={item}>
              {stripMiddleDot(item)}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.selectField}>
        <span className={styles.selectLabel}>중분류</span>
        <select
          value={mediumCategory}
          onChange={(e) => onMediumCategoryChange(e.target.value)}
          className={styles.select}
          disabled={mediumCategories.length <= 1}
        >
          {mediumCategories.map((item) => (
            <option key={item} value={item}>
              {stripMiddleDot(item)}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.selectField}>
        <span className={styles.selectLabel}>지역</span>
        <select
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className={styles.select}
        >
          <option value={ALL}>{ALL}</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <button
        type='button'
        className={styles.resetButton}
        onClick={onReset}
        disabled={!hasActiveFilter}
      >
        필터 초기화
      </button>
    </div>
  );
}
