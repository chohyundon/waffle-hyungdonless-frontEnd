'use client';

import Image from 'next/image';
import styles from '@/components/SignUp/SignUpSingle.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import openEye from '@/assets/icons/openEye.svg';
import closeEye from '@/assets/icons/closeEye.svg';
import CheckIcon from '@/assets/icons/checkCircles.svg';
import Logo from '@/assets/icons/loginLogo.svg';

interface SignUpSingleForm {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  birth: string;
  number: string;
  nickname: string;
  terms: boolean;
}

export const SignUpSingle = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpSingleForm>({ mode: 'onChange' });

  const onSubmit = async (data: SignUpSingleForm) => {
    setSubmitError('');
    try {
      const supabase = createClient();

      const [{ data: emailTaken }, { data: nicknameTaken }] = await Promise.all([
        supabase.rpc('is_email_registered', { check_email: data.email }),
        supabase.rpc('is_nickname_taken', { check_nickname: data.nickname }),
      ]);

      if (emailTaken) {
        setSubmitError('이미 가입된 이메일입니다. 로그인해주세요.');
        return;
      }

      if (nicknameTaken) {
        setSubmitError('이미 사용 중인 닉네임입니다.');
        return;
      }

      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            birth: data.birth,
            number: data.number,
            nickname: data.nickname,
            password: data.password,
          },
        },
      });

      if (error) {
        const message = error.message.toLowerCase();

        if (message.includes('already registered')) {
          setSubmitError('이미 가입된 이메일입니다. 로그인해주세요.');
          return;
        }

        if (message.includes('duplicate') || message.includes('unique')) {
          setSubmitError('이미 사용 중인 닉네임입니다.');
          return;
        }

        if (message.includes('rate limit') || message.includes('429')) {
          setSubmitError(
            '회원가입 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.',
          );
          return;
        }

        setSubmitError('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      // Supabase: 기존 이메일이면 error 없이 identities가 비어 있을 수 있음
      if (signUpData.user && signUpData.user.identities?.length === 0) {
        setSubmitError('이미 가입된 이메일입니다. 로그인해주세요.');
        return;
      }

      if (!signUpData.user) {
        setSubmitError('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      setIsDone(true);
    } catch {
      setSubmitError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (isDone) {
    return (
      <>
        <main className={styles.card}>
          <div className={styles.completeBox}>
            <Image
              src={CheckIcon}
              alt='가입 완료'
              width={77}
              height={77}
            />
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
            <label className={styles.label}>이메일</label>
            <input
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
            <label className={styles.label}>비밀번호</label>
            <div className={styles.inputWrap}>
              <input
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
                  aria-hidden
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>비밀번호 확인</label>
            <div className={styles.inputWrap}>
              <input
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
                  showPasswordCheck ? '비밀번호 확인 숨기기' : '비밀번호 확인 보기'
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
                  aria-hidden
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
            <label className={styles.label}>이름</label>
            <input
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
            <label className={styles.label}>생년월일</label>
            <input
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
            <label className={styles.label}>휴대전화</label>
            <input
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
            <label className={styles.label}>닉네임</label>
            <input
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

          {submitError && <span className={styles.error}>{submitError}</span>}

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
