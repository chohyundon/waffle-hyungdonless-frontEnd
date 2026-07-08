import { useState } from 'react';

import { createClient } from '@/lib/supabase/client';

export const useGoogleLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const googleLogin = async () => {
    setErrorMessage('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Google 로그인에 실패했습니다.',
      );
    }
  };

  return { errorMessage, googleLogin };
};
