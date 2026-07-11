'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export interface UserProfile {
  name: string;
  nickname: string;
  email: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export function useUserProfile() {
  const { user, loading: authLoading } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const supabase = createClient();

    void (async () => {
      const { data } = await supabase
        .from('users')
        .select('name, nickname, email')
        .eq('id', user.id)
        .maybeSingle();

      if (cancelled) {
        return;
      }

      setProfile(
        data ?? {
          email: user.email ?? '',
          name: (user.user_metadata?.name as string | undefined) ?? '',
          nickname: (user.user_metadata?.nickname as string | undefined) ?? '',
        }
      );
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return { user, profile, loading: authLoading || loading };
}

export async function fetchCurrentUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('users')
    .select('name, nickname, email')
    .eq('id', user.id)
    .maybeSingle();

  return (
    profile ?? {
      email: user.email ?? '',
      name: (user.user_metadata?.name as string | undefined) ?? '',
      nickname: (user.user_metadata?.nickname as string | undefined) ?? '',
    }
  );
}
