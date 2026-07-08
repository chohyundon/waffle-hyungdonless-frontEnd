'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import styles from '@/components/Board/styles/BoardCheck.module.css';
import notPage from '@/assets/icons/notPage.svg';
import { BoardStatList } from '@/components/Board/BoardStatList';
import { formatBoardTimeAgo, type BoardItem } from '@/types/boardType';

export const BoardCheck = ({ boardList = [] }: { boardList?: BoardItem[] }) => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;

  const posts = boardList.filter((item) => item.board_type === category) ?? [];

  return (
    <section
      className={`${styles.container} ${posts.length === 0 ? styles.empty : ''}`}
    >
      {posts.length === 0 ? (
        <div className={styles.emptyContainer}>
          <Image
            src={notPage}
            alt='등록된 게시글이 없습니다'
            width={180}
            height={180}
            className={styles.emptyImage}
          />
        </div>
      ) : (
        <ul className={styles.postList}>
          {posts.map((item) => (
            <li key={item.id} className={styles.postItem}>
              <Link
                href={`/board/${category}/${item.id}`}
                className={styles.postLink}
              >
                <article className={styles.postCard}>
                  <span className={styles.badge}>{item.category}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.content}>{item.content}</p>
                  <p className={styles.nickname}>
                    <span className={styles.by}>by</span> {item.nickname}
                  </p>
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
          ))}
        </ul>
      )}
    </section>
  );
};
