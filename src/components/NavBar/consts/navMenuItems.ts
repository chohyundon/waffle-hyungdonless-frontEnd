import { defaultBoardPath } from '@/components/MainCenter/homeButton';

export type NavMenuItem = {
  label: string;
  href?: string;
};

export const NAV_MENU_ITEMS: NavMenuItem[] = [
  { label: '사부작 게시판', href: defaultBoardPath },
  { label: '캘린더', href: '/calender' },
];
