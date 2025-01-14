import styles from "./SignUpForm.module.css";
import {useForm} from "react-hook-form";
import {SignUpData} from "../data/SignUpData.ts";
import {useState} from "react";

export function SignUpFormFirstStep() {
  const [signUpData, setSignUpData] = useState({email: "", password: "", passwordCheck: ""});

  const {register, handleSubmit, formState: {errors, isSubmitted, isSubmitting}} = useForm<SignUpData>();

  const sendSignUpInputValue = (data: SignUpData) => {
    setSignUpData(data);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(sendSignUpInputValue)}>
      <div className={styles.inputContainer}>
        <label className={styles.subTitle}>이메일</label>
        <input type="text" className={styles.inputText} placeholder='example@email.com'
               aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
               {...register('email', {
                 required: '이메일 값 입력은 필수입니다.',
                 pattern: {
                   value: /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
                   message: '이메일 형식에 맞게 입력해주세요.'
                 }
               })}
        />
      </div>
      {errors.email && <span className={styles.errorFont}>{errors.email.message}</span>}
      <div className={styles.passwordInputContainer}>
        <label className={styles.subTitle}>비밀번호</label>
        <input type="password" className={styles.inputText} placeholder="비밀번호"
               aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
               {...register('password', {
                 required: "비밀번호는 필수 입력값입니다.",
                 minLength: {
                   value: 8,
                   message: '비밀번호 길이를 8자리 이상 입력해주세요.'
                 },
               })}/>
      </div>
      {errors.password && <span className={styles.passwordError}>{errors.password.message}</span>}
      <input type='password' className={styles.passwordInputText} placeholder="비밀번호 확인"
             aria-invalid={isSubmitted ? (errors.passwordCheck ? 'true' : 'false') : undefined}
             {...register('passwordCheck', {
               required: "비밀번호는 필수 입력값입니다.",
               minLength: {
                 value: 8,
                 message: '비밀번호 길이를 8자리 이상 입력해주세요.'
               },
               validate: ((value) => value !== signUpData.password || '비밀번호가 일치 하지 않습니다.')
             })}/>
      {errors.passwordCheck && <span className={styles.passwordCheckError}>{errors.passwordCheck.message}</span>}
      <button className={styles.buttonContainer} disabled={isSubmitting}>다음</button>
    </form>
  );
}
