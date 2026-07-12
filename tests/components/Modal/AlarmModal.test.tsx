import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AlarmModal } from '@/components/Modal/AlarmModal';
import type { NotificationItem } from '@/types/notificationType';

const createNotification = (
  overrides: Partial<NotificationItem> = {}
): NotificationItem => ({
  id: 'notification-1',
  recipient_id: 'user-1',
  actor_id: 'user-2',
  type: 'board_comment',
  board_id: 'board-1',
  comment_id: 'comment-1',
  title: '테스트유저님이 댓글을 남겼습니다.',
  is_read: false,
  created_at: new Date().toISOString(),
  ...overrides,
});

describe('AlarmModal', () => {
  const onClose = vi.fn();
  const onRead = vi.fn();
  const onSelect = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
    onRead.mockClear();
    onSelect.mockClear();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            message: '알림을 읽음 처리했습니다.',
            data: createNotification({ is_read: true }),
          }),
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('닫혀 있으면 모달을 렌더링하지 않는다', () => {
    render(
      <AlarmModal
        isOpen={false}
        onClose={onClose}
        notifications={[createNotification()]}
      />
    );

    expect(screen.queryByRole('dialog', { name: '알림' })).toBeNull();
  });

  it('읽지 않은 알림이 없으면 빈 상태를 보여준다', () => {
    render(
      <AlarmModal
        isOpen
        onClose={onClose}
        notifications={[createNotification({ is_read: true })]}
      />
    );

    expect(screen.getByText('아직 알림이 없어요')).toBeTruthy();
    expect(screen.queryByRole('list', { name: '알림 목록' })).toBeNull();
  });

  it('읽지 않은 알림만 목록에 보여준다', () => {
    render(
      <AlarmModal
        isOpen
        onClose={onClose}
        notifications={[
          createNotification({
            id: 'unread-1',
            title: '읽지 않은 알림',
            is_read: false,
          }),
          createNotification({
            id: 'read-1',
            title: '이미 읽은 알림',
            is_read: true,
          }),
        ]}
      />
    );

    expect(screen.getByText('읽지 않은 알림')).toBeTruthy();
    expect(screen.queryByText('이미 읽은 알림')).toBeNull();
  });

  it('알림을 클릭하면 PATCH 요청을 보내고 onRead를 호출한다', async () => {
    const user = userEvent.setup();
    const notification = createNotification({ id: 'notification-42' });

    render(
      <AlarmModal
        isOpen
        onClose={onClose}
        notifications={[notification]}
        onRead={onRead}
        onSelect={onSelect}
      />
    );

    await user.click(screen.getByText(notification.title));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/alarm',
        expect.objectContaining({
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notificationId: 'notification-42' }),
        })
      );
    });

    expect(onRead).toHaveBeenCalledWith('notification-42');
    expect(onSelect).toHaveBeenCalledWith(notification);
  });

  it('닫기 버튼을 누르면 onClose를 호출한다', async () => {
    const user = userEvent.setup();

    render(
      <AlarmModal
        isOpen
        onClose={onClose}
        notifications={[createNotification()]}
      />
    );

    await user.click(screen.getByRole('button', { name: '알림 모달 닫기' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Escape 키를 누르면 onClose를 호출한다', async () => {
    const user = userEvent.setup();

    render(
      <AlarmModal
        isOpen
        onClose={onClose}
        notifications={[createNotification()]}
      />
    );

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
