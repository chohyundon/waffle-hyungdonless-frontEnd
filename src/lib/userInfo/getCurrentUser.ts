import type { User } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';

type AuthContext = {
  supabase: SupabaseClient;
  user: User | null;
};

export async function getAuthContext(): Promise<AuthContext> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return { supabase, user: null };
  }

  return { supabase, user };
}

export async function getCurrentUser(): Promise<User | null> {
  const { user } = await getAuthContext();
  return user;
}
