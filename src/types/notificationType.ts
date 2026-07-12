export type NotificationItem = {
  id: string;
  recipient_id: string;
  actor_id: string;
  type: string;
  board_id: string;
  comment_id: string | null;
  title: string;
  is_read: boolean;
  created_at: string;
};
