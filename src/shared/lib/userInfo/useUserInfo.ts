'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/shared/lib/supabase/client';

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!error) setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
}
