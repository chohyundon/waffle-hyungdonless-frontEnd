import {SignUpFormFourth, SignUpStep} from "../index.ts";
import styles from './SignUpFormFourth.module.css'
import Icon from '../../assets/checkCircles.svg'

export function SignUpFormFourthStep() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.completeContainer}>
        <img src={Icon} alt={Icon} width={77} height={77} />
        <span className={styles.font}>가입완료!</span>
      </div>
      <div className={styles.fontContainer}>
        <h1 className={styles.title}>환영합니다</h1>
        <p className={styles.subTitle}>이제 당신의 여정을 함께 시작해보세요<br/> 다양한 정보와 소중한 인연이 기다리고 있습니다!</p>
      </div>
      <SignUpFormFourth />
      <SignUpStep/>
    </main>
  )
}
