import type { User } from '@supabase/supabase-js';

export function getUserAvatarUrl(user: User): string | null {
  const candidates = [
    user.user_metadata?.avatar_url,
    user.user_metadata?.picture,
    user.identities?.[0]?.identity_data?.avatar_url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate;
    }
  }

  return null;
}
