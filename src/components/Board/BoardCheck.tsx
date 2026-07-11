'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from '@/components/Board/styles/BoardCheck.module.css';
import notPage from '@/assets/icons/notPage.svg';
import { BoardStatList } from '@/components/Board/BoardStatList';
import { BoardListThumbnail } from '@/components/Board/BoardListThumbnail';
import { formatBoardTimeAgo, type BoardItem } from '@/types/boardType';

type BoardCheckProps = {
  posts: BoardItem[];
  category: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const BoardCheck = ({
  posts,
  category,
  currentPage,
  totalPages,
  onPageChange,
}: BoardCheckProps) => {
  const isEmpty = posts.length === 0 && currentPage === 1;

  return (
    <section className={styles.container} aria-label='게시글 목록'>
      <ul className={styles.postList}>
        {isEmpty ? (
          <li className={styles.emptyItem}>
            <div className={styles.emptyState} role='status'>
              <Image
                src={notPage}
                alt='등록된 게시글이 없습니다'
                width={180}
                height={180}
                className={styles.emptyImage}
              />
              <p className={styles.emptyText}>등록된 게시글이 없습니다</p>
            </div>
          </li>
        ) : (
          posts.map((item) => (
            <li key={item.id} className={styles.postItem}>
              <Link
                href={`/board/${category}/${item.id}`}
                className={styles.postLink}
              >
                <article className={styles.postCard}>
                  <div className={styles.postContent}>
                    <span className={styles.badge}>{item.category}</span>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.content}>{item.content}</p>
                    <p className={styles.nickname}>
                      <span className={styles.by}>by</span> {item.nickname}
                    </p>
                  </div>
                  {item.image_url && (
                    <BoardListThumbnail
                      src={item.image_url}
                      title={item.title}
                      className={styles.postThumb}
                    />
                  )}
                  <div className={styles.meta}>
                    <BoardStatList
                      counts={item}
                      listClassName={styles.stats}
                      itemClassName={styles.stat}
                      hideIconLabel
                    />
                    <time className={styles.date} dateTime={item.created_at}>
                      {formatBoardTimeAgo(item.created_at)}
                    </time>
                  </div>
                </article>
              </Link>
            </li>
          ))
        )}
      </ul>

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label='게시글 페이지'>
          <button
            type='button'
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label='이전 페이지'
          >
            이전
          </button>

          <ul className={styles.pageList}>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;

              return (
                <li key={page}>
                  <button
                    type='button'
                    className={`${styles.pageNumber} ${
                      isActive ? styles.pageNumberActive : ''
                    }`}
                    onClick={() => onPageChange(page)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`${page}페이지`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type='button'
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label='다음 페이지'
          >
            다음
          </button>
        </nav>
      )}
    </section>
  );
};
