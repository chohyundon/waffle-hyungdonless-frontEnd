import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { LoginInputType } from '@/types/LoginInputType';
import { createClient } from '@/lib/supabase/client';

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

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const form = useForm<LoginInputType>();

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

  return {
    showPassword,
    setShowPassword,
    submitError,
    form,
    loginInput,
  };
};
