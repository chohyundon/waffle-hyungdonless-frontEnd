export const addLocalStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

export const removeLocalStorage = (key: string) => {
  return window.localStorage.removeItem(key);
};

export const getLocalStorage = (key: string) => {
  return window.localStorage.getItem(key);
};
