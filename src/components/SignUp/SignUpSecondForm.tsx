import styles from './SignUpSecondForm.module.css'

export const SignUpSecondForm = () => {
 return (
  <>
    <form className={styles.formContainer}>
      <label className={styles.labelText}>이름</label>
      <input type="text" className={styles.inputBox} />
      <label className={styles.labelText}>생년월일</label>
      <input type="date" className={styles.inputBox} />
      <label className={styles.labelText}>닉네임</label>
      <input type="text" className={styles.inputBox} />
    </form>
  </>
 );
};