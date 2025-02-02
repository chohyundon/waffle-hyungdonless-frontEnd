import styles from './Layout.module.css'
import { Outlet } from 'react-router';
import { NavBar } from '../index';

export const Layout = () => {
 return (
  <div className={styles.container}>
    <NavBar />
    <Outlet />
  </div>
 );
};