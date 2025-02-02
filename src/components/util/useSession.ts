interface useSessionTypes {
  email?: string;
  password?: string;
  name?: string;
  birth?: string;
  number?: string;
}

export const useSession = (key: string, userData: useSessionTypes) => {
  window.sessionStorage.setItem(key, JSON.stringify(userData));
};

interface SessionTypes {
  key: 'step1Data';
}

export const getSession = (key: SessionTypes['key']) => {
  return window.sessionStorage.getItem(key);
};

export const removeSession = (key: SessionTypes['key']) => {
  window.sessionStorage.removeItem(key);
}