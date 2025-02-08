import styles from './Home.module.css';
import { Banner } from '../../widgets/Banner';

export function Home() {
  // const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Banner />
    </div>
  );
}
