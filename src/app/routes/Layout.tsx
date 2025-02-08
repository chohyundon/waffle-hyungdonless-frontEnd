import { NavBar } from '../../widgets/NavBar';
import { Outlet } from 'react-router';

export const Layout = () => {
 return (
  <>
    <NavBar />
    <main>
      <Outlet />
    </main>
  </>
 );
};