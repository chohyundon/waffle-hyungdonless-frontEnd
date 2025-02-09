import styles from './Home.module.css';
import { Banner } from '../../widgets/Banner';
import { Outlet } from 'react-router';
import { MainCenter } from '../../widgets/MainCenter';

export function Home() {
  // const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Banner />
      <main>
        <MainCenter />
        <Outlet />
      </main>
    </div>
  );
}
