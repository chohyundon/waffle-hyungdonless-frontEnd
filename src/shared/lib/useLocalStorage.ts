function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export const addLocalStorage = (key: string): string | null => {
  const storage = getStorage();
  return storage?.getItem(key) ?? null;
};

export const removeLocalStorage = (key: string): void => {
  getStorage()?.removeItem(key);
};

export const getLocalStorage = (key: string): string | null => {
  const storage = getStorage();
  return storage?.getItem(key) ?? null;
};
