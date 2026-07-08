import Image from 'next/image';
import styles from '@/components/MainCenter/BottomBoard.module.css';

import portfolioIcon from '@/assets/icons/developmentMiniIcon.svg';
import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import { BOARD_SLUG_TO_NAME } from '@/components/Board/consts/boardCategories';
import { BOARD_STAT_LIST } from '@/components/Board/consts/boardStatList';
import type { BoardItem } from '@/types/boardType';

const STAT_ICONS = {
  view: viewIcon,
  comment: commentIcon,
  like: likeIcon,
} as const;

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
              <div className={styles.hotStats}>
                {BOARD_STAT_LIST.map((stat) => (
                  <span className={styles.stat} key={stat.slug}>
                    <Image
                      src={STAT_ICONS[stat.slug]}
                      alt={stat.name}
                      width={14}
                      height={14}
                      aria-hidden
                    />
                    {stat.slug === 'view'
                      ? post.view_count
                      : stat.slug === 'comment'
                        ? post.comment_count
                        : post.like_count}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
