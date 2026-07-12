import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

import { BoardListThumbnail } from '@/components/Board/BoardListThumbnail';
import { BoardStatList } from '@/components/Board/BoardStatList';
import styles from '@/components/Search/styles/SearchResults.module.css';
import { formatBoardTimeAgo, type BoardItem } from '@/types/boardType';

type SearchResultsProps = {
  query: string;
  boards: BoardItem[];
};

export function SearchResults({ query, boards }: SearchResultsProps) {
  return (
    <section className={styles.page} aria-label='검색 결과'>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.query}>&ldquo;{query}&rdquo;</span> 검색 결과
        </h1>
        <p className={styles.count}>{boards.length}개</p>
      </header>

      <div className={styles.listSection}>
        {boards.length === 0 ? (
          <div className={styles.empty} role='status'>
            <div className={styles.emptyIconWrap} aria-hidden>
              <FiSearch className={styles.emptyIcon} />
            </div>
            <div className={styles.emptyText}>
              <p className={styles.emptyTitle}>
                <span className={styles.query}>&ldquo;{query}&rdquo;</span>에
                대한 결과가 없어요
              </p>
              <p className={styles.emptyDesc}>
                검색어를 줄이거나, 다른 키워드로 다시 찾아보세요.
              </p>
            </div>
            <ul className={styles.emptyTips} aria-label='검색 팁'>
              <li>띄어쓰기나 맞춤법을 확인해 보세요</li>
              <li>더 짧은 단어로 검색해 보세요</li>
            </ul>
            <Link href='/' className={styles.emptyHomeLink}>
              홈으로 돌아가기
            </Link>
          </div>
        ) : (
          <ul className={styles.list}>
            {boards.map((board) => (
              <li key={board.id} className={styles.item}>
                <Link
                  href={`/board/${board.board_type}/${board.id}`}
                  className={styles.link}
                >
                  <article className={styles.card}>
                    <div className={styles.content}>
                      <div className={styles.badgeRow}>
                        <span className={styles.boardType}>
                          {board.board_type}
                        </span>
                        <span className={styles.badge}>{board.category}</span>
                      </div>
                      <h2 className={styles.postTitle}>{board.title}</h2>
                      <p className={styles.excerpt}>{board.content}</p>
                      <p className={styles.nickname}>
                        <span className={styles.by}>by</span>
                        {board.nickname}
                      </p>
                    </div>

                    {board.image_url && (
                      <BoardListThumbnail
                        src={board.image_url}
                        title={board.title}
                        className={styles.thumb}
                      />
                    )}

                    <div className={styles.meta}>
                      <BoardStatList
                        counts={board}
                        listClassName={styles.stats}
                        itemClassName={styles.stat}
                        hideIconLabel
                      />
                      <time className={styles.date} dateTime={board.created_at}>
                        {formatBoardTimeAgo(board.created_at)}
                      </time>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
