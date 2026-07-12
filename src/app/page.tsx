import { MainCenter } from '@/components/MainCenter';
import HomeShellLayout from '@/app/(home)/layout';
import {
  EMPTY_PUBLIC_DATA,
  fetchYouthCenterPolicies,
} from '@/lib/public-data/fetchYouthCenterPolicies';
import { getBoardList } from '@/lib/getBoardList';

export default async function Home() {
  const [data, boardList] = await Promise.all([
    fetchYouthCenterPolicies().catch((error) => {
      console.error(error);
      return EMPTY_PUBLIC_DATA;
    }),
    getBoardList(),
  ]);

  return (
    <HomeShellLayout>
      <MainCenter data={data} boardList={boardList} />
    </HomeShellLayout>
  );
}
