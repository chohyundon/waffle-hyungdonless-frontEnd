'use client';

import signUpProcedure from '@/shared/assets/icons/signUpProcedure.svg';
import noneSignUpProcedure from '@/shared/assets/icons/noneSignUpProcedure.svg';
import styles from '@/widgets/SignUp/ui/SginUp.module.css';
import { usePathname } from 'next/navigation';
import { assetSrc } from '@/shared/lib/assetSrc';

export const SignUpStep = () => {
  const totalStepCount = 4;

  const pathname = usePathname() ?? '';
  const stepSegment = pathname.split('/')[2] ?? '';
  const step = parseInt(stepSegment.slice(4, 5), 10);
  const data = ['이메일 입력', '본인인증', '정보입력', '가입완료'];

  return (
    <div className={styles.stepIcon}>
      {Array.from({ length: totalStepCount }, (_, index) => {
        const currentStep = index + 1;
        const isActive = currentStep === step;

        return (
          <div key={currentStep} className={styles.stepItem}>
            <span className={isActive ? styles.stepFont : styles.stepNoneFont}>
              {isActive ? (
                <span className={styles.currentStep}>
                  {currentStep}
                  <p className={styles.userFont}>{data[currentStep - 1]}</p>
                </span>
              ) : (
                <p>{currentStep}</p>
              )}
            </span>
            <img
              src={assetSrc(
                isActive ? signUpProcedure : noneSignUpProcedure,
              )}
              alt={`step${currentStep}`}
              className={
                isActive ? styles.stepCheckIcon : styles.stepNoneCheckIcon
              }
            />
          </div>
        );
      })}
    </div>
  );
};
