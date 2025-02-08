import styles from './Layout.module.css'
import { Outlet } from 'react-router';
import { NavBar } from '../../widgets/NavBar';

export const Layout = () => {
 return (
  <div className={styles.container}>
    <NavBar />
    <Outlet />
  </div>
 );
};