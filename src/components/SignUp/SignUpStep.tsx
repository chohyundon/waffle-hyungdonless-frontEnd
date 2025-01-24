import signUpProcedure from '../../assets/signUpProcedure.svg';
import noneSignUpProcedure from '../../assets/noneSignUpProcedure.svg';
import styles from './SginUp.module.css'
import {useLocation} from "react-router";

export const SignUpStep = () => {

  const location = useLocation();
  console.log(location);
  const repeatImages = Array(3).fill(noneSignUpProcedure);

  return (
    <div className={styles.stepIcon}>
      <span className={styles.stepFont}>
        <p className={styles.number}>1</p><br/>이메일 입력
      </span>
      <img src={signUpProcedure} alt="signUpProcedure" className={styles.stepCheckIcon}/>
      {repeatImages.map((src, index) => (
        <div key={index}>
          <span className={styles.stepNoneFont}>{index+1}</span>
          <img src={src} alt={`noneSignUpProcedure-${index}`} className={styles.stepNoneCheckIcon}/>
        </div>
      ))}
    </div>
  );
};