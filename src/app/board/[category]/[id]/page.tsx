import { BoardDetail } from '@/components/Board/BoardDetail';
import { getBoardComments } from '@/lib/board/comment';
import { getBoardById } from '@/lib/getBoardList';

type PageProps = {
  params: Promise<{ category: string; id: string }>;
};

export default async function BoardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [board, comments] = await Promise.all([
    getBoardById(id),
    getBoardComments(id),
  ]);

  return <BoardDetail board={board} comments={comments} />;
}
