import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import styles from '@/components/Board/BoardCheck.module.css';
import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import notPage from '@/assets/icons/notPage.svg';
import { formatBoardTimeAgo, type BoardItem } from '@/types/boardType';
import { BOARD_STAT_LIST } from '@/components/Board/consts/boardStatList';

const STAT_ICONS = {
  view: viewIcon,
  comment: commentIcon,
  like: likeIcon,
} as const;

export const BoardCheck = ({ boardList = [] }: { boardList?: BoardItem[] }) => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;
  const router = useRouter();

  const posts = boardList.filter((item) => item.board_type === category) ?? [];

  const handlePostClick = (id: string) => {
    console.log(id);
    router.push(`/board/${category}/${id}`);
  };

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
            <li
              key={item.id}
              onClick={() => handlePostClick(item.id)}
              className={styles.postItem}
            >
              <article className={styles.postCard}>
                <span className={styles.badge}>{item.category}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.content}>{item.content}</p>
                <p className={styles.nickname}>
                  <span className={styles.by}>by</span> {item.nickname}
                </p>
                <div className={styles.meta}>
                  <div className={styles.stats}>
                    {BOARD_STAT_LIST.map((stat) => (
                      <span className={styles.stat} key={stat.slug}>
                        <Image
                          src={STAT_ICONS[stat.slug]}
                          alt={stat.name}
                          width={14}
                          height={14}
                        />
                        {stat.slug === 'view'
                          ? item.view_count
                          : stat.slug === 'comment'
                            ? item.comment_count
                            : item.like_count}
                      </span>
                    ))}
                  </div>
                  <time className={styles.date} dateTime={item.created_at}>
                    {formatBoardTimeAgo(item.created_at)}
                  </time>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
