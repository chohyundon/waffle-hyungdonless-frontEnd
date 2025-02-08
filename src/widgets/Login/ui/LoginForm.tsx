import styles from './LoginForm.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import eyeIcon from '../../../shared/assets/icons/openEye.svg';
import closeEye from '../../../shared/assets/icons/closeEye.svg';
import { LoginInputType } from '../../../shared/types/LoginInputType';

export function LoginForm() {
  const [click, setClick] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginInputType>();

  const loginInput = async (data: LoginInputType) => {
    console.log(data);

    await fetch('https://api.sabujak.life/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const showPassword = () => {
    setClick((prev) => !prev);
  };

  return (
    <form
      className={styles.loginFormContainer}
      onSubmit={handleSubmit(loginInput)}
    >
      <input
        type='text'
        placeholder='이메일'
        id='text'
        className={styles.inputText}
        aria-invalid={
          isSubmitted ? (errors.email ? 'true' : 'false') : undefined
        }
        {...register('email', {
          required: '이메일 입력은 필수 입니다.',
          pattern: {
            value:
              /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
            message: '이메일 형식에 맞게 입력해주세요.',
          },
        })}
      />
      {errors.email && (
        <span className={styles.errorMailFont}>{errors.email.message}</span>
      )}
      <input
        type={click ? 'text' : 'password'}
        placeholder='비밀번호'
        id='password'
        className={styles.inputText}
        aria-invalid={
          isSubmitted ? (errors.password ? 'true' : 'false') : undefined
        }
        {...register('password', {
          required: '비밀번호 입력은 필수 입니다.',
          minLength: {
            value: 8,
            message: '비밀번호 길이를 8자리 이상 입력해주세요.',
          },
        })}
      />
      <img
        src={click ? eyeIcon : closeEye}
        alt='비밀번호 확인'
        className={styles.icon}
        onClick={showPassword}
      />
      {errors.password && (
        <span className={styles.errorFont}>{errors.password.message}</span>
      )}
      <button className={styles.formButton}>로그인</button>
    </form>
  );
}
