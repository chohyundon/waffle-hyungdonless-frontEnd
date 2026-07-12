import styles from '@/components/SignUp/styles/SignUp.module.css';

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.signUpContainer}>{children}</div>;
}
