interface useSessionTypes {
    email: string;
    password: string;
}

export const useSession = (key: string, userData: useSessionTypes) => {
  window.sessionStorage.setItem(key, JSON.stringify(userData));
}

interface SessionTypes {
  key : 'step1Data' | 'step2Data' | 'step3Data'
}

export const getSession = (key: SessionTypes['key']) => {
  return window.sessionStorage.getItem(key);
}