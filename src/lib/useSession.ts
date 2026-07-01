function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  return window.sessionStorage;
}

interface useSessionTypes {
  email?: string;
  password?: string;
  name?: string;
  birth?: string;
  number?: string;
}

export const useSession = (key: string, userData: useSessionTypes) => {
  getSessionStorage()?.setItem(key, JSON.stringify(userData));
};

interface SessionTypes {
  key: 'step1Data';
}

export const getSession = (key: SessionTypes['key']) => {
  return getSessionStorage()?.getItem(key) ?? null;
};

export const removeSession = (key: SessionTypes['key']) => {
  getSessionStorage()?.removeItem(key);
};
