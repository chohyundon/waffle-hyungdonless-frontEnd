'use client';

import Image from 'next/image';
import styles from '@/components/SignUp/styles/SignUpSingle.module.css';
import openEye from '@/assets/icons/openEye.svg';
import closeEye from '@/assets/icons/closeEye.svg';
import CheckIcon from '@/assets/icons/checkCircles.svg';
import Logo from '@/assets/icons/loginLogo.svg';
import { useSignUpForm } from '@/components/SignUp/useSignUpForm';

export const SignUpSingle = () => {
  const {
    router,
    showPassword,
    setShowPassword,
    showPasswordCheck,
    setShowPasswordCheck,
    isDone,
    submitError,
    form,
    onSubmit,
  } = useSignUpForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = form;

  if (isDone) {
    return (
      <>
        <main className={styles.card}>
          <div className={styles.completeBox}>
            <Image src={CheckIcon} alt='가입 완료' width={77} height={77} />
            <h1 className={styles.completeTitle}>가입완료!</h1>
            <p className={styles.completeSubTitle}>
              환영합니다. 이제 당신의 여정을 함께 시작해보세요.
            </p>
            <div className={styles.completeButtons}>
              <button
                type='button'
                className={styles.primaryButton}
                onClick={() => router.push('/login')}
              >
                로그인
              </button>
              <button
                type='button'
                className={styles.secondaryButton}
                onClick={() => router.push('/')}
              >
                홈으로 가기
              </button>
            </div>
          </div>
        </main>
        <figure className={styles.logo}>
          <Image src={Logo} alt='사부작 로고' width={160} height={56} />
        </figure>
      </>
    );
  }

  return (
    <>
      <main className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subTitle}>사부작 사부작과 함께 시작해볼까요?</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor='signup-email' className={styles.label}>
              이메일
            </label>
            <input
              id='signup-email'
              type='text'
              className={styles.input}
              placeholder='example@email.com'
              aria-invalid={errors.email ? 'true' : undefined}
              {...register('email', {
                required: '이메일은 필수 입력값입니다.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '이메일 형식에 맞게 입력해주세요.',
                },
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor='signup-password' className={styles.label}>
              비밀번호
            </label>
            <div className={styles.inputWrap}>
              <input
                id='signup-password'
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder='비밀번호 (8자 이상)'
                aria-invalid={errors.password ? 'true' : undefined}
                {...register('password', {
                  required: '비밀번호는 필수 입력값입니다.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 8자 이상 입력해주세요.',
                  },
                })}
              />
              <button
                type='button'
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                <Image
                  src={showPassword ? openEye : closeEye}
                  alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  width={20}
                  height={20}
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor='signup-password-check' className={styles.label}>
              비밀번호 확인
            </label>
            <div className={styles.inputWrap}>
              <input
                id='signup-password-check'
                type={showPasswordCheck ? 'text' : 'password'}
                className={styles.input}
                placeholder='비밀번호 확인'
                aria-invalid={errors.passwordCheck ? 'true' : undefined}
                {...register('passwordCheck', {
                  required: '비밀번호 확인은 필수 입력값입니다.',
                  validate: (value) =>
                    value === watch('password') ||
                    '비밀번호가 일치하지 않습니다.',
                })}
              />
              <button
                type='button'
                className={styles.eyeButton}
                onClick={() => setShowPasswordCheck((prev) => !prev)}
                aria-label={
                  showPasswordCheck
                    ? '비밀번호 확인 숨기기'
                    : '비밀번호 확인 보기'
                }
              >
                <Image
                  src={showPasswordCheck ? openEye : closeEye}
                  alt={
                    showPasswordCheck
                      ? '비밀번호 확인 숨기기'
                      : '비밀번호 확인 보기'
                  }
                  width={20}
                  height={20}
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {errors.passwordCheck && (
              <span className={styles.error}>
                {errors.passwordCheck.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor='signup-name' className={styles.label}>
              이름
            </label>
            <input
              id='signup-name'
              type='text'
              className={styles.input}
              placeholder='홍길동'
              aria-invalid={errors.name ? 'true' : undefined}
              {...register('name', {
                required: '이름은 필수 입력값입니다.',
                pattern: {
                  value: /^[ㄱ-ㅎ가-힣]{2,5}$/,
                  message: '이름은 한글 2~5글자로 입력해주세요.',
                },
              })}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor='signup-birth' className={styles.label}>
              생년월일
            </label>
            <input
              id='signup-birth'
              type='date'
              className={styles.input}
              aria-invalid={errors.birth ? 'true' : undefined}
              {...register('birth', {
                required: '생년월일은 필수 입력값입니다.',
              })}
            />
            {errors.birth && (
              <span className={styles.error}>{errors.birth.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor='signup-number' className={styles.label}>
              휴대전화
            </label>
            <input
              id='signup-number'
              type='text'
              className={styles.input}
              placeholder="'-' 없이 숫자만 입력"
              aria-invalid={errors.number ? 'true' : undefined}
              {...register('number', {
                required: '휴대전화 번호는 필수 입력값입니다.',
                pattern: {
                  value: /^010\d{8}$/,
                  message: "휴대전화 번호는 '-' 없이 숫자만 입력해주세요.",
                },
              })}
            />
            {errors.number && (
              <span className={styles.error}>{errors.number.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor='signup-nickname' className={styles.label}>
              닉네임
            </label>
            <input
              id='signup-nickname'
              type='text'
              className={styles.input}
              placeholder='닉네임 (2~10자)'
              aria-invalid={errors.nickname ? 'true' : undefined}
              {...register('nickname', {
                required: '닉네임은 필수 입력값입니다.',
                minLength: {
                  value: 2,
                  message: '닉네임은 최소 2글자 이상 입력해주세요.',
                },
                maxLength: {
                  value: 10,
                  message: '닉네임은 10자 이내로 입력해주세요.',
                },
              })}
            />
            {errors.nickname && (
              <span className={styles.error}>{errors.nickname.message}</span>
            )}
          </div>

          <label className={styles.termsRow}>
            <input
              id='signup-terms'
              type='checkbox'
              className={styles.checkbox}
              {...register('terms', {
                required: '서비스 이용약관에 동의해주세요.',
              })}
            />
            <span className={styles.termsText}>
              <b>(필수)</b> 서비스 이용약관에 동의합니다.
            </span>
          </label>

          {submitError && (
            <span className={styles.error} role='alert'>
              {submitError}
            </span>
          )}

          <button
            type='submit'
            className={styles.submitButton}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? '가입 중...' : '가입완료'}
          </button>
        </form>
        <div className={styles.loginRow}>
          <span className={styles.loginRowText}>이미 계정이 있으신가요?</span>
          <button
            type='button'
            className={styles.loginLink}
            onClick={() => router.push('/login')}
          >
            로그인
          </button>
        </div>
      </main>
      <figure className={styles.logo}>
        <Image src={Logo} alt='사부작 로고' width={160} height={56} />
      </figure>
    </>
  );
};
