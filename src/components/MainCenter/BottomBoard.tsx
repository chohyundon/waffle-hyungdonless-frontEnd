import Image from 'next/image';
import styles from '@/components/MainCenter/styles/BottomBoard.module.css';

import portfolioIcon from '@/assets/icons/developmentMiniIcon.svg';
import { BOARD_SLUG_TO_NAME } from '@/components/Board/consts/boardCategories';
import { BoardStatList } from '@/components/Board/BoardStatList';
import type { BoardItem } from '@/types/boardType';

export const BottomBoard = ({ boardList = [] }: { boardList?: BoardItem[] }) => {
  const hotPosts = [...boardList]
    .sort((a, b) => b.like_count - a.like_count)
    .slice(0, 5);

  return (
    <section className={styles.wrapper} aria-labelledby='hot-heading'>
      <header className={styles.header}>
        <h2 id='hot-heading' className={styles.title}>
          <span className={styles.titleAccent}>HOT</span> 게시글
        </h2>
        <p className={styles.subTitle}>
          지금 가장 뜨거운 이야기!
          <br />
          사람들이 공감한 인기 글을 만나보세요.
        </p>
      </header>

      <ol className={styles.hotList}>
        {hotPosts.map((post, i) => {
          const categoryName =
            BOARD_SLUG_TO_NAME[post.board_type] ?? post.category;

          return (
            <li key={post.id} className={styles.hotItem}>
              <span
                className={`${styles.rank} ${i <= 2 ? styles.rankTop : ''}`}
              >
                {i + 1}
              </span>
              <span className={styles.categoryTag}>
                <Image
                  src={portfolioIcon}
                  alt={`${categoryName} 카테고리`}
                  width={14}
                  height={14}
                  aria-hidden
                />
                {categoryName}
              </span>
              <p className={styles.hotTitle}>{post.title}</p>
              <BoardStatList
                counts={post}
                listClassName={styles.hotStats}
                itemClassName={styles.stat}
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
};
