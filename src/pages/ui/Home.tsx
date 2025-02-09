import styles from './Home.module.css';
import { Banner } from '../../widgets/Banner';
import { Outlet } from 'react-router';

export function Home() {
  // const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Banner />
      <Outlet />
    </div>
  );
}
