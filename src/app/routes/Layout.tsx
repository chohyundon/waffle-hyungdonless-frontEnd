import { NavBar } from '../../widgets/NavBar';
import { Footer } from '../../widgets/Footer';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
