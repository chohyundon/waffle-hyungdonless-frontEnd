import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

export interface SignUpSingleForm {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  birth: string;
  number: string;
  nickname: string;
  terms: boolean;
}

export const useSignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const form = useForm<SignUpSingleForm>({ mode: 'onChange' });

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

  return {
    router,
    showPassword,
    setShowPassword,
    showPasswordCheck,
    setShowPasswordCheck,
    isDone,
    submitError,
    form,
    onSubmit,
  };
};
