import { createClient } from '@/shared/lib/supabase/client';

export const useGetUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  try {
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
