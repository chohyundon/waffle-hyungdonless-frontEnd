import { MainCenter } from '@/components/MainCenter';
import HomeShellLayout from '@/app/(home)/layout';
import { fetchPublicData } from '@/lib/public-data/fetchAllPublicData';

export default async function Home() {
  const data = await fetchPublicData();

  return (
    <HomeShellLayout>
      <MainCenter data={data} />
    </HomeShellLayout>
  );
}
