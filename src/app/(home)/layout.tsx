import { Banner } from '@/components/Banner';
import { MainCenter } from '@/components/MainCenter';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export default function HomeShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <Banner />
      <main>
        <MainCenter />
        {children}
      </main>
      <Footer />
    </>
  );
}
