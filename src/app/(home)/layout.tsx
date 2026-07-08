import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import styles from '@/app/(home)/styles/home.module.css';

export default function HomeShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
