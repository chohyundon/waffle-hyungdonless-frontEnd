import sortCommentIcon from '@/assets/icons/sortComment.svg';
import sortLatestIcon from '@/assets/icons/sortLatest.svg';
import sortLikeIcon from '@/assets/icons/sortLike.svg';

const bottomList = [
  {
    name: '최신순',
    slug: 'latest',
    icon: sortLatestIcon,
  },
  {
    name: '댓글많은순',
    slug: 'manyComment',
    icon: sortCommentIcon,
  },
  {
    name: '좋아요순',
    slug: 'mostLike',
    icon: sortLikeIcon,
  },
] as const;

export default bottomList;
