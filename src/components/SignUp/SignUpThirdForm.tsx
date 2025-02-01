import styles from './SignUpThirdForm.module.css';
import { useForm } from 'react-hook-form';
import { SignUpStepName } from '../data/SignUpData.ts';
import { useLocation } from 'react-router';

export const SignUpThirdForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<SignUpStepName>();
  const { state } = useLocation();

  const sendNickName = async (data: SignUpStepName) => {
    const signUpData = {
      email: state?.email,
      password: state?.password,
      name: state?.name,
      birth: state?.birth,
      number: state?.number,
      nickname: data.nickname,
    };

    await fetch('https://api.sabujak.life/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(sendNickName)}
    >
      <label className={styles.titleName}>닉네임</label>
      <input
        type='text'
        placeholder='홍준표'
        className={styles.inputBox}
        aria-invalid={
          isSubmitted ? (errors.nickname ? 'true' : 'false') : undefined
        }
        {...register('nickname', {
          required: '닉네임값은 필수 입력 입니다.',
          maxLength: {
            value: 10,
            message: '닉네임은 10자 이내로 가능합니다.',
          },
        })}
      />
      {!errors.nickname && (
        <span className={styles.defaultFont}>10자 이내로 가능합니다.</span>
      )}
      {errors.nickname && (
        <span className={styles.errorFont}>{errors.nickname.message}</span>
      )}
      <button className={styles.buttonContainer}>가입완료</button>
    </form>
  );
};
