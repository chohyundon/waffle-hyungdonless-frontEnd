import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import styles from '@/components/Board/BoardHomeMain.module.css';
import writeIcon from '@/assets/icons/writeButton.svg';
import smallCheck from '@/assets/icons/smallCheck.svg';
import noneSmallCheck from '@/assets/icons/noneSmallCheck.svg';
import userImages from '@/assets/icons/userImages.svg';
import { BOARD_DETAIL_MAP } from '@/components/Board/consts/boardCategories';
import { BoardCheck } from '@/components/Board/BoardCheck';
import { useUserProfile } from '@/lib/userInfo/useUserInfo';
import type { BoardItem } from '@/types/boardType';
import bottomList from '@/components/Board/consts/boardBottomList';

export const BoardHomeMain = ({
  boardList = [],
}: {
  boardList?: BoardItem[];
}) => {
  const params = useParams() ?? {};
  const detailMap = BOARD_DETAIL_MAP;

  const detail = params.detail as string | undefined;
  const latest = params.latest as string | undefined;
  const router = useRouter();
  const { profile: userData, loading: profileLoading } = useUserProfile();

  const detailTitle = detailMap[detail ?? 'popular'];
  const postCount = boardList.filter(
    (item) => item.email === userData?.email
  )?.length;

  const handleWrite = () => {
    router.push(userData ? '/write' : '/login');
  };

  const handleSortTabClick = (key: string) => {
    console.log(key);
  };

  console.log(bottomList);

  return (
    <section className={styles.container}>
      <article className={styles.communityCard}>
        <p className={styles.cardLabel}>나의 커뮤니티</p>

        {profileLoading ? (
          <div
            className={styles.profileLoading}
            aria-busy='true'
            aria-live='polite'
          >
            <div className={styles.profileLoadingAvatar} aria-hidden />
            <div className={styles.profileLoadingContent}>
              <div className={styles.profileLoadingLine} aria-hidden />
              <div className={styles.profileLoadingStats} aria-hidden>
                <span className={styles.profileLoadingStat} />
                <span className={styles.profileLoadingStat} />
                <span className={styles.profileLoadingStat} />
              </div>
            </div>
            <span className={styles.srOnly}>프로필을 불러오는 중입니다</span>
          </div>
        ) : userData ? (
          <div className={styles.profileRow}>
            <Image
              src={userImages}
              alt={`${userData.name} 프로필`}
              width={72}
              height={72}
              className={styles.userImage}
            />
            <div className={styles.profileInfo}>
              <p className={styles.userName}>{userData.name}님</p>
              <dl className={styles.stats}>
                <div className={styles.statItem}>
                  <dt className={styles.statLabel}>작성한 글</dt>
                  <dd className={styles.statValue}>{postCount}</dd>
                </div>
                <div className={styles.statItem}>
                  <dt className={styles.statLabel}>작성한 댓글</dt>
                  <dd className={styles.statValue}>15</dd>
                </div>
                <div className={styles.statItem}>
                  <dt className={styles.statLabel}>획득한 배지</dt>
                  <dd className={styles.statValue}>20</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <p className={styles.loginPrompt}>로그인 후 이용해주세요</p>
        )}
      </article>

      <button
        type='button'
        className={styles.writeButton}
        onClick={handleWrite}
      >
        함께 성장하는 커뮤니티, 글 작성해보세요!
        <Image
          src={writeIcon}
          alt='글쓰기'
          width={20}
          height={20}
          aria-hidden
        />
      </button>

      <div className={styles.listSection}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>
            {detailTitle} <span className={styles.listCount}>{postCount}</span>
          </h2>
          <ul className={styles.sortTabs} aria-label='정렬'>
            {bottomList.map((item) => {
              const isActive = item.slug === (latest ?? 'latest');

              return (
                <li key={item.slug}>
                  <button
                    type='button'
                    className={`${styles.sortTab} ${isActive ? styles.sortTabActive : ''}`}
                    onClick={() => handleSortTabClick(item.slug)}
                  >
                    <Image
                      src={isActive ? smallCheck : noneSmallCheck}
                      alt={isActive ? `${item.name} 선택됨` : item.name}
                      width={16}
                      height={16}
                      className={styles.sortIcon}
                      aria-hidden
                    />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <BoardCheck boardList={boardList} />
      </div>
    </section>
  );
};
