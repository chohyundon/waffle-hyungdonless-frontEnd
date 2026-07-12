'use client';

import { useEffect, useId } from 'react';

import styles from '@/components/Modal/styles/AlarmModal.module.css';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import type { NotificationItem } from '@/types/notificationType';

type AlarmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onRead?: (notificationId: string) => void;
  onSelect?: (notification: NotificationItem) => void;
};

export const AlarmModal = ({
  isOpen,
  onClose,
  notifications,
  onRead,
  onSelect,
}: AlarmModalProps) => {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const unreadNotifications = notifications.filter(
    (notification) => !notification.is_read
  );

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.is_read) {
      try {
        const response = await fetch('/api/alarm', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notificationId: notification.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to update notification');
        }

        onRead?.(notification.id);
      } catch (error) {
        console.error(error);
      }
    }

    onSelect?.(notification);
  };

  return (
    <div className={styles.overlay} onClick={onClose} role='presentation'>
      <div
        className={styles.modal}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            알림
          </h2>
          <button
            type='button'
            className={styles.closeButton}
            onClick={onClose}
            aria-label='알림 모달 닫기'
          >
            <span aria-hidden='true'>×</span>
          </button>
        </header>

        <p id={descriptionId} className={styles.srOnly}>
          받은 알림 목록입니다.
        </p>

        {unreadNotifications.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>아직 알림이 없어요</p>
            <p className={styles.emptyDesc}>
              내 게시글에 댓글이 달리면 여기에 표시됩니다.
            </p>
          </div>
        ) : (
          <ul className={styles.list} aria-label='알림 목록'>
            {unreadNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`${styles.item} ${styles.itemUnread}`}
              >
                <button
                  type='button'
                  className={styles.itemButton}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <p className={styles.itemTitle}>{notification.title}</p>
                  <div className={styles.itemMeta}>
                    <span className={styles.unreadDot} aria-label='읽지 않음' />
                    <time dateTime={notification.created_at}>
                      {formatTimeAgo(notification.created_at)}
                    </time>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
