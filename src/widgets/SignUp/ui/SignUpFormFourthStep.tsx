import { SignUpFormFourth, SignUpStep } from '@/widgets/SignUp';
import styles from '@/widgets/SignUp/ui/SignUpFormFourth.module.css';
import Icon from '@/shared/assets/icons/checkCircles.svg';
import Logo from '@/shared/assets/icons/loginLogo.svg';
import { assetSrc } from '@/shared/lib/assetSrc';

export function SignUpFormFourthStep() {
  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.completeContainer}>
          <img
            src={assetSrc(Icon)}
            alt='가입 완료'
            width={77}
            height={77}
          />
          <span className={styles.font}>가입완료!</span>
        </div>
        <div className={styles.fontContainer}>
          <h1 className={styles.title}>환영합니다</h1>
          <p className={styles.subTitle}>
            이제 당신의 여정을 함께 시작해보세요
            <br /> 다양한 정보와 소중한 인연이 기다리고 있습니다!
          </p>
        </div>
        <SignUpFormFourth />
        <SignUpStep />
      </main>
      <figure className={styles.logo}>
        <img src={assetSrc(Logo)} alt='사부작 로고' />
      </figure>
    </>
  );
}
