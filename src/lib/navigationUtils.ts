export type RouterPush = (href: string) => void;

export const homeNavigation = (push: RouterPush) => {
  push(`/`);
};

import { defaultBoardPath } from '@/components/MainCenter/homeButton';

export const moveBoardPage = (push: RouterPush) => {
  push(defaultBoardPath);
};

export const moveLoginPage = (push: RouterPush) => {
  push(`/login`);
};

export const toggleMenu = (
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setShowMenu((prev) => !prev);
};
