export type BoardItem = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  board_type: string;
  category: string;
  nickname: string;
  email: string;
  image_url: string | null;
  avatar_url: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
};

export type BoardComment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  nickname: string;
};

export { formatTimeAgo as formatBoardTimeAgo } from '@/lib/formatTimeAgo';
