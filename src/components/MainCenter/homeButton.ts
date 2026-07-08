import {
  BOARD_CATEGORIES,
  DEFAULT_BOARD_CATEGORY,
} from '@/components/Board/consts/boardCategories';

export const homeButtonEntities = BOARD_CATEGORIES.map((category) => ({
  name: category.name,
  icon: category.icon,
  path: `/board/${category.slug}`,
}));

export const defaultBoardPath = `/board/${DEFAULT_BOARD_CATEGORY.slug}`;
