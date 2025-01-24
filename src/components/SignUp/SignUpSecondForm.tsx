import styles from './SignUpSecondForm.module.css'
import {useForm} from "react-hook-form";
import {SignUpStepData} from "../data/SignUpData.ts";
import {useNavigate} from "react-router";
import {Delay} from "../util/Delay.ts";

export const SignUpSecondForm = () => {
  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<SignUpStepData>();

  const sendSignUpStep2Value = async (data:SignUpStepData) => {
    await fetch('https://api.sabujak.life/users/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    if(data) {
      await Delay(2000);
      navigate('/signUp/step3')
    }
  }

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
       <input type="date" className={styles.dateInputBox}
              aria-invalid={isSubmitted ? (errors.birth ? 'true' : 'false') : undefined}
              {...register("birth", {
                required: "생년월일은 필수 입력입니다."
              })} />
     </div>
     {errors.birth && (<span className={styles.errorFont1}>{errors.birth.message}</span>)}
     <input type="text" className={styles.inputBoxExample} placeholder="인증번호 입력"/>
     <button className={styles.subButton}>다음</button>
   </form>
 );
};