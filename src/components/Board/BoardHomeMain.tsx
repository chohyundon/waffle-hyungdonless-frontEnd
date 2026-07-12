'use client';

import Image from 'next/image';
import styles from '@/components/Board/styles/BoardHomeMain.module.css';
import writeIcon from '@/assets/icons/writeButton.svg';
import userImages from '@/assets/icons/userImages.svg';
import { BoardCheck } from '@/components/Board/BoardCheck';
import { useBoardHomeMain } from '@/components/Board/useBoardHomeMain';
import { useBoardPagination } from '@/components/Board/useBoardPagination';
import type { BoardItem } from '@/types/boardType';
import bottomList from '@/components/Board/consts/boardBottomList';

export const BoardHomeMain = ({
  boardList,
  category,
}: {
  boardList?: BoardItem[];
  category: string;
}) => {
  const {
    boardList: list,
    boardState,
    detailTitle,
    postCount,
    commentCount,
    profileLoading,
    userData,
    handleWrite,
    handleSortTabClick,
  } = useBoardHomeMain(boardList ?? []);

  const { posts, currentPage, totalPages, goToPage } = useBoardPagination(
    list,
    boardState
  );

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
              <dl className={styles.stats} aria-label='내 활동 요약'>
                <div className={styles.statItem}>
                  <dt className={styles.statLabel}>작성한 글</dt>
                  <dd className={styles.statValue}>{postCount}</dd>
                </div>
                <div className={styles.statItem}>
                  <dt className={styles.statLabel}>작성한 댓글</dt>
                  <dd className={styles.statValue}>{commentCount}</dd>
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
        <Image src={writeIcon} alt='글쓰기 아이콘' width={20} height={20} />
      </button>

      <div className={styles.listSection}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>
            {detailTitle} <span className={styles.listCount}>{postCount}</span>
          </h2>
          <ul className={styles.sortTabs} aria-label='정렬'>
            {bottomList.map((item) => {
              const isActive = boardState === item.slug;

              return (
                <li key={item.slug}>
                  <button
                    type='button'
                    className={`${styles.sortTab} ${
                      isActive ? styles.sortTabActive : ''
                    }`}
                    aria-pressed={isActive}
                    onClick={() => handleSortTabClick(item.slug)}
                  >
                    <Image
                      src={item.icon}
                      alt={
                        isActive ? `${item.name} 선택됨` : `${item.name} 아이콘`
                      }
                      width={16}
                      height={16}
                      className={styles.sortIcon}
                    />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <BoardCheck
          posts={posts}
          category={category}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </section>
  );
};
