import signUpProcedure from '../../assets/signUpProcedure.svg';
import noneSignUpProcedure from '../../assets/noneSignUpProcedure.svg';
import styles from './SginUp.module.css';
import { useLocation } from 'react-router';

export const SignUpStep = () => {
  const totalStepCount = 4;

  const location = useLocation();
  const step = parseInt(location.pathname.split('/')[2].slice(4, 5));
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
              src={isActive ? signUpProcedure : noneSignUpProcedure}
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
