import { Banner } from '../../widgets/Banner';
import { Outlet } from 'react-router';
import { MainCenter } from '../../widgets/MainCenter';

export function Home() {
  // const navigate = useNavigate();

  return (
    <>
      <Banner />
      <main>
        <MainCenter />
        <Outlet />
      </main>
    </>
  );
}
