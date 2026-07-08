import { MainCenter } from '@/components/MainCenter';
import HomeShellLayout from '@/app/(home)/layout';
import { fetchPublicData } from '@/lib/public-data/fetchAllPublicData';
import { getBoardList } from '@/lib/getBoardList';

export default async function Home() {
  const data = await fetchPublicData();
  const boardList = await getBoardList();

  return (
    <HomeShellLayout>
      <MainCenter data={data} boardList={boardList} />
    </HomeShellLayout>
  );
}
