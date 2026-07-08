'use client';

import Image from 'next/image';

import styles from '@/components/Login/styles/LoginForm.module.css';
import eyeIcon from '@/assets/icons/openEye.svg';
import closeEye from '@/assets/icons/closeEye.svg';
import { LoginStatus } from '@/components/Login/LoginStatus';
import { useLoginForm } from '@/components/Login/useLoginForm';

export function LoginForm() {
  const { showPassword, setShowPassword, submitError, form, loginInput } =
    useLoginForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = form;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(loginInput)}
      noValidate
    >
      <div className={styles.field}>
        <input
          id='login-email'
          type='email'
          autoComplete='email'
          placeholder='이메일'
          aria-label='이메일'
          className={styles.input}
          disabled={isSubmitting}
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
          <span className={styles.error} role='alert'>
            {errors.email.message}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.passwordWrap}>
          <input
            id='login-password'
            type={showPassword ? 'text' : 'password'}
            autoComplete='current-password'
            placeholder='비밀번호'
            aria-label='비밀번호'
            className={styles.input}
            disabled={isSubmitting}
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
          <button
            type='button'
            className={styles.togglePassword}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            disabled={isSubmitting}
          >
            <Image
              src={showPassword ? eyeIcon : closeEye}
              alt=''
              width={20}
              height={20}
              aria-hidden
            />
          </button>
        </div>
        {errors.password && (
          <span className={styles.error} role='alert'>
            {errors.password.message}
          </span>
        )}
      </div>

      <LoginStatus />

      {submitError && (
        <p className={styles.submitError} role='alert'>
          {submitError}
        </p>
      )}

      <button
        type='submit'
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
