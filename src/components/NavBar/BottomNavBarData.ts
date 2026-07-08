import { BOARD_CATEGORIES } from '@/components/Board/consts/boardCategories';

export const bottomNavBarData = BOARD_CATEGORIES.map((category) => ({
  name: category.name,
  path: category.slug,
}));
