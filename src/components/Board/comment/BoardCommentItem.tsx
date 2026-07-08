'use client';

import Image from 'next/image';
import { TransitionStartFunction } from 'react';

import userImages from '@/assets/icons/userImages.svg';
import styles from '@/components/Board/BoardDetail.module.css';
import { BoardComment, formatBoardTimeAgo } from '@/types/boardType';

import { CommentDeleteModal } from '@/components/Board/comment/CommentDeleteModal';
import { CommentOptimisticAction } from '@/components/Board/comment/commentOptimistic';
import { useBoardCommentDelete } from '@/components/Board/comment/useBoardCommentDelete';
import { useBoardCommentUpdate } from '@/components/Board/comment/useBoardCommentUpdate';

export const BoardCommentItem = ({
  comment,
  currentUserId,
  mutateComment,
  startTransition,
  onRefresh,
}: {
  comment: BoardComment;
  currentUserId?: string;
  mutateComment: (action: CommentOptimisticAction) => void;
  startTransition: TransitionStartFunction;
  onRefresh: () => void;
}) => {
  const isOwner = Boolean(currentUserId && currentUserId === comment.user_id);

  const {
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isDeleteModalOpen,
    isDeleting,
  } = useBoardCommentDelete({
    commentId: comment.id,
    mutateComment,
    startTransition,
    onRefresh,
  });

  const {
    isEditing,
    editContent,
    setEditContent,
    startEditing,
    handleCancelEdit,
    handleUpdate,
    isUpdating,
  } = useBoardCommentUpdate({
    comment,
    mutateComment,
    startTransition,
    onRefresh,
  });

  const isSubmitting = isDeleting || isUpdating;

  return (
    <li className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <Image
          src={userImages}
          alt={`${comment.nickname} 프로필`}
          width={32}
          height={32}
          className={styles.commentAvatar}
        />

        <div className={styles.commentMeta}>
          <p className={styles.commentAuthor}>{comment.nickname}</p>
          <time className={styles.commentDate} dateTime={comment.created_at}>
            {formatBoardTimeAgo(comment.created_at)}
          </time>
        </div>

        {isOwner && !isEditing && (
          <div className={styles.commentActions}>
            <button
              type='button'
              className={styles.commentActionButton}
              onClick={startEditing}
              disabled={isSubmitting}
            >
              수정
            </button>
            <button
              type='button'
              className={`${styles.commentActionButton} ${styles.commentActionButtonDanger}`}
              onClick={openDeleteModal}
              disabled={isSubmitting}
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className={styles.commentEditForm}>
          <textarea
            className={styles.commentInput}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            disabled={isSubmitting}
          />
          <div className={styles.commentEditActions}>
            <button
              type='button'
              className={styles.commentEditCancel}
              onClick={handleCancelEdit}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type='button'
              className={styles.submitButton}
              onClick={handleUpdate}
              disabled={isSubmitting}
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.commentContent}>{comment.content}</p>
      )}

      <CommentDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </li>
  );
};
