import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import styles from '@/components/Board/BoardHomeMain.module.css';
import rightIcon from '@/assets/icons/rightBar.svg';
import writeIcon from '@/assets/icons/writeButton.svg';
import smallCheck from '@/assets/icons/smallCheck.svg';
import noneSmallCheck from '@/assets/icons/noneSmallCheck.svg';
import userImages from '@/assets/icons/userImages.svg';
import { BoardCheck } from '@/components/Board/BoardCheck';
import { useUserProfile } from '@/lib/userInfo/useUserInfo';

const detailMap: Record<string, string> = {
  popular: '인기글',
  salary: '월급 및 관리 및 예산',
  tax: '세금 및 공제',
  loan: '대출',
  insurance: '보험',
  investment: '자산 증식',
};

const bottomList = {
  latest: '최신순',
  manyComment: '댓글많은순',
  mostLike: '좋아요순',
} as const;

export const BoardHomeMain = () => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;
  const detail = params.detail as string | undefined;
  const latest = params.latest as string | undefined;
  const router = useRouter();
  const { profile: userData } = useUserProfile();

  const detailTitle = detailMap[detail ?? 'popular'];

  const handleWrite = () => {
    router.push(userData ? '/write' : '/login');
  };

  return (
    <section className={styles.container}>
      <nav className={styles.breadcrumb} aria-label='현재 위치'>
        <span className={styles.breadcrumbItem}>홈</span>
        <Image src={rightIcon} alt='' width={14} height={14} aria-hidden />
        <span className={styles.breadcrumbItem}>사부작 게시판</span>
        <Image src={rightIcon} alt='' width={14} height={14} aria-hidden />
        <span className={styles.breadcrumbItem}>금융</span>
        <Image src={rightIcon} alt='' width={14} height={14} aria-hidden />
        <span className={styles.breadcrumbActive}>{detailTitle}</span>
      </nav>

      <article className={styles.communityCard}>
        <p className={styles.cardLabel}>나의 커뮤니티</p>

        {userData ? (
          <div className={styles.profileRow}>
            <Image
              src={userImages}
              alt=''
              width={72}
              height={72}
              aria-hidden
              className={styles.userImage}
            />
            <div className={styles.profileInfo}>
              <p className={styles.userName}>{userData.name}님</p>
              <dl className={styles.stats}>
                <div className={styles.statItem}>
                  <dt className={styles.statLabel}>작성한 글</dt>
                  <dd className={styles.statValue}>25</dd>
                </div>
                <div className={styles.statItem}>
                  <dt className={styles.statLabel}>작성한 댓글</dt>
                  <dd className={styles.statValue}>15</dd>
                </div>
                <div className={styles.statItem}>
                  <dt className={styles.statLabel}>획득한 배지</dt>
                  <dd className={styles.statValue}>17</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <p className={styles.loginPrompt}>로그인 후 이용해주세요</p>
        )}
      </article>

      <button type='button' className={styles.writeButton} onClick={handleWrite}>
        함께 성장하는 커뮤니티, 글 작성해보세요!
        <Image src={writeIcon} alt='' width={20} height={20} aria-hidden />
      </button>

      <ul className={styles.sortTabs} aria-label='정렬'>
        {Object.entries(bottomList).map(([key, value]) => {
          const isActive = key === (latest ?? 'latest');

          return (
            <li key={key}>
              <button
                type='button'
                className={`${styles.sortTab} ${isActive ? styles.sortTabActive : ''}`}
                onClick={() =>
                  router.push(`/board/${category}/${detail}/${key}`)
                }
              >
                <Image
                  src={isActive ? smallCheck : noneSmallCheck}
                  alt=''
                  width={16}
                  height={16}
                  className={styles.sortIcon}
                  aria-hidden
                />
                {value}
              </button>
            </li>
          );
        })}
      </ul>

      <BoardCheck />
    </section>
  );
};
