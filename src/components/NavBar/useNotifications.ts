'use client';

import { useCallback, useEffect, useState } from 'react';
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

import { subscribeNotifications } from '@/lib/supabase/realtime';
import { useUser } from '@/lib/userInfo/useUserInfo';
import type { NotificationItem } from '@/types/notificationType';

export function useNotifications() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      return;
    }

    try {
      const response = await fetch('/api/alarm');
      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as NotificationItem[];
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    void fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!user) {
      return;
    }

    return subscribeNotifications(user.id, (payload) => {
      const insertPayload =
        payload as RealtimePostgresInsertPayload<NotificationItem>;
      setNotifications((prev) => [insertPayload.new, ...prev]);
    });
  }, [user]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notificationId ? { ...item, is_read: true } : item
      )
    );
  }, []);

  const hasUnread = notifications.some((item) => !item.is_read);

  return {
    notifications,
    hasUnread,
    isAlarmOpen,
    openAlarm: () => setIsAlarmOpen(true),
    closeAlarm: () => setIsAlarmOpen(false),
    markAsRead,
  };
}
