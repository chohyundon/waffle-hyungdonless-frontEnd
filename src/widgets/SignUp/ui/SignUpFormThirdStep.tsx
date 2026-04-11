import { SignUpStep, SignUpThirdForm } from '@/widgets/SignUp';
import styles from '@/widgets/SignUp/ui/SignUpThirdForm.module.css';
import Circle from '@/shared/assets/icons/circle.svg';
import rightButton from '@/shared/assets/icons/rightButton.svg';
import Logo from '@/shared/assets/icons/loginLogo.svg';
import { assetSrc } from '@/shared/lib/assetSrc';

export function SignUpFormThirdStep() {
  return (
    <>
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>회원가입</h1>
        <SignUpThirdForm />
        <div className={styles.checkContainer}>
          <img src={assetSrc(Circle)} alt='' />
          <span className={styles.fonts}>약관 모두 동의</span>
        </div>
        <div className={styles.bottomCheckContainer}>
          <img src={assetSrc(Circle)} alt='' />
          <span className={styles.fonts}>
            <p className={styles.boldFonts}>(필수)</p> 서비스 이용약관 동의
          </span>
          <img src={assetSrc(rightButton)} alt='' className={styles.icon} />
        </div>
        <div className={styles.bottomCheckContainer1}>
          <img src={assetSrc(Circle)} alt='' />
          <span className={styles.fonts}>
            <p className={styles.boldFonts}>(필수)</p> 서비스 이용약관 동의
          </span>
          <img src={assetSrc(rightButton)} alt='' className={styles.icon} />
        </div>
        <div className={styles.bottomCheckContainer2}>
          <img src={assetSrc(Circle)} alt='' />
          <span className={styles.fonts}>
            <p className={styles.boldFonts}>(필수)</p> 서비스 이용약관 동의
          </span>
          <img src={assetSrc(rightButton)} alt='' className={styles.icon} />
        </div>
        <div className={styles.bottomCheckContainer3}>
          <img src={assetSrc(Circle)} alt='' />
          <span className={styles.fonts}>(선택) 개인정보 마케팅 활용 동의</span>
          <img src={assetSrc(rightButton)} alt='' className={styles.icon} />
        </div>
        <SignUpStep />
      </main>
      <figure className={styles.logo}>
        <img src={assetSrc(Logo)} alt='사부작 로고' />
      </figure>
    </>
  );
}
