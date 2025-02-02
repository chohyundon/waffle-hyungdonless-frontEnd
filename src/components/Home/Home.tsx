import { useNavigate } from 'react-router';
import { NavBar } from '../NavBar/NavBar.tsx';
import styles from './Home.module.css';

export function Home() {
  // const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <NavBar />
    </div>
  );
}
