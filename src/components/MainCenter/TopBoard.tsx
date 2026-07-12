import Image from 'next/image';

import styles from '@/components/MainCenter/styles/TopBoard.module.css';
import userImage from '@/assets/icons/userImage.svg';
import { BoardStatList } from '@/components/Board/BoardStatList';
import { formatBoardTimeAgo, type BoardItem } from '@/types/boardType';

export const TopBoard = ({ boardList = [] }: { boardList?: BoardItem[] }) => {
  const featuredPosts = boardList.slice(0, 4);

  return (
    <section className={styles.wrapper} aria-labelledby='featured-heading'>
      <div className={styles.postPanel}>
        <h2 id='featured-heading' className={styles.panelTitle}>
          추천 게시글
        </h2>
        <ul className={styles.postList}>
          {featuredPosts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <span className={styles.badge}>{post.category}</span>
              <div className={styles.postMeta}>
                <Image
                  src={post.avatar_url ?? userImage}
                  alt={`${post.nickname} 프로필`}
                  width={20}
                  height={20}
                  className={styles.avatar}
                />
                <span className={styles.userName}>{post.nickname}</span>
              </div>
              <p className={styles.postTitle}>{post.title}</p>
              <div className={styles.stats}>
                <BoardStatList counts={post} itemClassName={styles.stat} />
                <span className={styles.time}>
                  {formatBoardTimeAgo(post.created_at)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
