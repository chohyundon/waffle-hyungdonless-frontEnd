'use client';

import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/components/Modal/styles/CommentDeleteModal.module.css';

export const CommentDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) => {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isDeleting) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={isDeleting ? undefined : onClose}
      role='presentation'
    >
      <div
        className={styles.modal}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className={styles.title}>
          댓글을 삭제할까요?
        </h2>
        <p id={descriptionId} className={styles.description}>
          삭제한 댓글은 복구할 수 없습니다.
        </p>
        <div className={styles.actions}>
          <button
            type='button'
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isDeleting}
          >
            취소
          </button>
          <button
            type='button'
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
