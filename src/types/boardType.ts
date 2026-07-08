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

export const formatBoardTimeAgo = (createdAt: string) => {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    return '방금 전';
  }

  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return diffDays > 0 ? `${diffDays}일 전` : '오늘';
};
