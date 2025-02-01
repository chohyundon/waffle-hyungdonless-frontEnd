import styles from './SignUpSecondForm.module.css'
import {useForm} from "react-hook-form";
import {SignUpStepData} from "../data/SignUpData.ts";
import {useNavigate} from "react-router";
import {Delay} from "../util/Delay.ts";
import Select from "../../assets/select.svg";
import {getSession} from "../util/useSession.ts"
import React, {useState} from "react";
import {useTimer} from "../util/useTimer.ts";
import {c} from "vite/dist/node/types.d-aGj9QkWt";

export const SignUpSecondForm = () => {
  const navigate = useNavigate();
  const step1Data = getSession('step1Data');
  const signUpData = step1Data ? JSON.parse(step1Data) : null;
  const [checkNumberData, setCheckNumberData] = useState('');
  const {count, startTimer, seconds, formatTime, format } = useTimer(0);

  const {register, handleSubmit, getValues, formState: {errors, isSubmitted}} = useForm<SignUpStepData>();
  console.log(checkNumberData.verificationCode);

  const sendSignUpStep2Value = async (data:SignUpStepData) => {
    // if(data.checkNumber === checkNumberData.verificationCode) {
    //   alert('정답')
    // }

    // if(data) {
    //   await Delay(2000);
    //   // navigate('/signUp/step3', {state: {...state, ...data}});
    // }
  }

  const submitSmsApi = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
      const data = getValues();

      const bodyData = {
        email: signUpData.email,
        name: data.name,
        number: data.number,
      };

      if (bodyData.email && bodyData.name && bodyData.number) {
        const response = await fetch('https://api.sabujak.life/sms/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });
        const result = await response.json();
        setCheckNumberData(result);

        startTimer(30);
        formatTime(300);
      }
  };

 return (
   <form className={styles.formContainer} onSubmit={handleSubmit(sendSignUpStep2Value)}>
     <label className={styles.labelText}>이름</label>
     <input type="text" className={styles.inputBox} placeholder="조현돈"
            aria-invalid={isSubmitted ? (errors.name ? 'true' : 'false') : undefined}
            {...register("name", {
              required: "이름 값 입력은 필수 입력입니다.",
              pattern: {
                value: /^[ㄱ-ㅎ|가-힣]+$/,
                message: '한글로만 입력해주세요.'
              },
              maxLength: {
                value: 5,
                message: '이름은 5글자 미만으로 작성해주세요.'
              }
            })}/>
     {errors.name && (<span className={styles.errorFont}>{errors.name.message}</span>)}
     <div className={styles.inputBoxContainer}>
       <label className={styles.labelText}>생년월일</label>
       <input type="date" className={styles.dateInputBox} />
     </div>
     {errors.birth && (<span className={styles.errorFont1}>{errors.birth.message}</span>)}
     <div className={styles.inputAuthContainer}>
       <label className={styles.labelTitle}>휴대전화 인증</label>
       <select className={styles.select}>
         <option>통신사</option>
       </select>
       <img src={Select} alt="select" className={styles.selectIcon}/>
       <div className={styles.numberContainer}>
         <input type="text" placeholder="-없이 숫자만 입력"  className={styles.writeNumber} aria-invalid={isSubmitted ? (errors.number ? 'true' : 'false') : undefined}
                {...register('number', {
            required: '핸드폰번호 입력은 필수 입니다.'
         })}/>
         <button className={styles.numberButton} disabled={count > 0} onClick={submitSmsApi}>
           {count > 0 ? `00:${String(count).padStart(2, '0')}` : '인증요청'}
         </button>
       </div>
     </div>
     {errors.number && <span className={styles.errorFont2}>{errors.number.message}</span>}
     <input type="text" className={styles.inputBoxExample} aria-invalid={isSubmitted ? (errors.checkNumber ? 'true' : 'false') : undefined}
            placeholder="인증번호 입력" {...register('checkNumber', {
              required: '인증번호 입력은 필수 입니다.',
              validate: (value) => value === checkNumberData || '인증번호가 일치하지 않습니다.'
     })}/>
     <span className={styles.secondText}>{seconds > 0 && format(seconds)}</span>
     {errors.checkNumber && <span className={styles.errorFont3}>{errors.checkNumber.message}</span>}
     <button className={styles.subButton}>다음</button>
   </form>
 );
};