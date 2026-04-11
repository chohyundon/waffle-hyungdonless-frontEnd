import styles from '@/widgets/SignUp/ui/SginUp.module.css';

export function SignUpPage({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.signUpContainer}>
      {children}
      <figure></figure>
    </div>
  );
}
