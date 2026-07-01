import styles from '@/components/SignUp/SginUp.module.css';

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.signUpContainer}>{children}</div>;
}
