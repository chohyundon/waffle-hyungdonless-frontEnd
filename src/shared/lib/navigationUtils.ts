import { NavigateFunction } from 'react-router';

export const homeNavigation = (navigate: NavigateFunction) => {
  navigate(`/home`);
};

export const moveBoardPage = (navigate: NavigateFunction) => {
  navigate(`/board/money`);
};

export const moveLoginPage = (navigate: NavigateFunction) => {
  navigate(`/login`);
};

export const toggleMenu = (
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowMenu((prev) => !prev);
};
