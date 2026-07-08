import { BoardHome } from '@/components/Board/BoardHome';
import { getBoardList } from '@/lib/getBoardList';

export const BoardList = async () => {
  const boardList = await getBoardList();

  return <BoardHome boardList={boardList} />;
};
