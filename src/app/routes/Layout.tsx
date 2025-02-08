import { NavBar } from '../../widgets/NavBar';
import { Outlet } from 'react-router';
import styles from './Layout.module.css'

export const Layout = () => {
 return (
  <div className={styles.container}>
    <NavBar />
    <main>
      <Outlet />
    </main>
  </div>
 );
};