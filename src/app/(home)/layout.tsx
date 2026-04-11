'use client';

import { Banner } from '@/widgets/Banner';
import { MainCenter } from '@/widgets/MainCenter';
import { NavBar } from '@/widgets/NavBar';
import { Footer } from '@/widgets/Footer';

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
