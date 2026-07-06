import styles from '@/components/MainCenter/YouthPolicySection.module.css';

type YouthPolicyPaginationProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function YouthPolicyPagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: YouthPolicyPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label='청년 정책 페이지'>
      <button
        type='button'
        className={styles.pageButton}
        onClick={onPrevious}
        disabled={page === 1}
      >
        이전
      </button>
      <span className={styles.pageInfo}>
        {page} / {totalPages}
      </span>
      <button
        type='button'
        className={styles.pageButton}
        onClick={onNext}
        disabled={page === totalPages}
      >
        다음
      </button>
    </nav>
  );
}
