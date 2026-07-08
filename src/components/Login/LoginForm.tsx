import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from '@/components/Login/LoginForm.module.css';
import eyeIcon from '@/assets/icons/openEye.svg';
import closeEye from '@/assets/icons/closeEye.svg';
import { LoginInputType } from '@/types/LoginInputType';
import { createClient } from '@/lib/supabase/client';
import { LoginStatus } from '@/components/Login/LoginStatus';

function getLoginErrorMessage(message: string) {
  const lower = message.toLowerCase();

  if (
    lower.includes('invalid login credentials') ||
    lower.includes('invalid credentials')
  ) {
    return '이메일 또는 비밀번호가 올바르지 않습니다.';
  }

  if (lower.includes('too many requests')) {
    return '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.';
  }

  return '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<LoginInputType>();

  const loginInput = async (data: LoginInputType) => {
    setSubmitError('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setSubmitError(getLoginErrorMessage(error.message));
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setSubmitError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(loginInput)}
      noValidate
    >
      <div className={styles.field}>
        <input
          type='email'
          autoComplete='email'
          placeholder='이메일'
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
            type={showPassword ? 'text' : 'password'}
            autoComplete='current-password'
            placeholder='비밀번호'
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
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
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
