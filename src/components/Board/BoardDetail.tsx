'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useOptimistic, useState, useTransition } from 'react';

import { reduceOptimisticComments } from '@/components/Board/comment/commentOptimistic';
import styles from '@/components/Board/styles/BoardDetail.module.css';

import leftBar from '@/assets/icons/leftBar.svg';
import userImages from '@/assets/icons/userImages.svg';
import { BoardStatList } from '@/components/Board/BoardStatList';
import { BoardComment, BoardItem, formatBoardTimeAgo } from '@/types/boardType';
import { useUser } from '@/lib/userInfo/useUserInfo';
import { BoardLikeButton } from '@/components/Board/likeButton/BoardLikeButton';
import { useBoardCommentSubmit } from '@/components/Board/comment/BoardCommentButton';
import { BoardCommentItem } from '@/components/Board/comment/BoardCommentItem';
import { useBoardLike } from '@/components/Board/likeButton/useBoardLike';
import { BoardDetailImage } from '@/components/Board/BoardDetailImage';

export const BoardDetail = ({
  board,
  comments,
}: {
  board: BoardItem;
  comments: BoardComment[];
}) => {
  const router = useRouter();
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const [commentCount, setCommentCount] = useState(board.comment_count);
  const [, startTransition] = useTransition();
  const [optimisticComments, mutateComment] = useOptimistic(
    comments,
    reduceOptimisticComments
  );
  const { liked, likeCount, isLiking, handleLikeClick } = useBoardLike(board);

  const handleCommentDelete = () => {
    setCommentCount((count) => Math.max(count - 1, 0));
  };

  const handleCommentSubmit = useBoardCommentSubmit({
    boardId: board.id,
    comment,
    setComment,
    onSuccess: () => {
      setCommentCount((count) => count + 1);
      router.refresh();
    },
  });

  return (
    <section className={styles.page}>
      <button
        type='button'
        onClick={() => router.back()}
        className={styles.backLink}
      >
        <Image
          src={leftBar}
          alt='뒤로가기 아이콘'
          width={14}
          height={14}
          aria-hidden
        />
        뒤로가기
      </button>

      <article className={styles.container}>
        <div className={styles.postBody}>
          <span className={styles.badge}>{board.category}</span>
          <h1 className={styles.title}>{board.title}</h1>
          <p className={styles.content}>{board.content}</p>
          {board.image_url && (
            <BoardDetailImage src={board.image_url} title={board.title} />
          )}
          <div className={styles.authorRow}>
            <Image
              src={userImages}
              alt={`${board.nickname} 프로필`}
              width={36}
              height={36}
              className={styles.avatar}
            />
            <p className={styles.nickname}>
              <span className={styles.by}>by</span> {board.nickname}
            </p>
          </div>
          <div className={styles.meta}>
            <BoardStatList
              counts={{
                view_count: board.view_count,
                comment_count: commentCount,
                like_count: likeCount,
              }}
              listClassName={styles.stats}
              itemClassName={styles.stat}
            />
            <time className={styles.date} dateTime={board.created_at}>
              {formatBoardTimeAgo(board.created_at)}
            </time>
          </div>
        </div>

        <div className={styles.actions}>
          {user && (
            <BoardLikeButton
              liked={liked}
              likeCount={likeCount}
              isLiking={isLiking}
              handleLikeClick={handleLikeClick}
            />
          )}
          <button type='button' className={styles.actionButton}>
            공유하기
          </button>
        </div>

        <section
          className={styles.commentsSection}
          aria-labelledby='comments-heading'
        >
          <h2 id='comments-heading' className={styles.commentsTitle}>
            댓글
            <span className={styles.commentsCount}>{commentCount}</span>
          </h2>

          <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
            <textarea
              id='board-comment-input'
              className={styles.commentInput}
              placeholder='댓글을 입력해주세요'
              aria-label='댓글 입력'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type='submit' className={styles.submitButton}>
              댓글 등록
            </button>
          </form>

          <ul className={styles.commentsList}>
            {optimisticComments.length === 0 ? (
              <li className={styles.commentEmpty}>아직 댓글이 없습니다.</li>
            ) : (
              optimisticComments.map((item) => (
                <BoardCommentItem
                  key={item.id}
                  comment={item}
                  currentUserId={user?.id}
                  mutateComment={mutateComment}
                  startTransition={startTransition}
                  onRefresh={() => router.refresh()}
                  onDeleteSuccess={handleCommentDelete}
                />
              ))
            )}
          </ul>
        </section>
      </article>
    </section>
  );
};
