export type RouterPush = (href: string) => void;

export const homeNavigation = (push: RouterPush) => {
  push(`/`);
};

export const moveBoardPage = (push: RouterPush) => {
  push(`/board/money`);
};

export const moveLoginPage = (push: RouterPush) => {
  push(`/login`);
};

export const toggleMenu = (
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setShowMenu((prev) => !prev);
};
