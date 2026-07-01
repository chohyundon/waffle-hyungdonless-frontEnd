import moneyIcon from '@/assets/icons/money.svg';
import freeIcon from '@/assets/icons/free.svg';
import houseIcon from '@/assets/icons/house.svg';
import developmentIcon from '@/assets/icons/development.svg';
import QnAIcon from '@/assets/icons/QnA.svg';
import welfareIcon from '@/assets/icons/welfare.svg';

interface HomeButtonEntities {
  name: string;
  icon: string;
  path: string;
}

export const homeButtonEntities: HomeButtonEntities[] = [
  { name: '금융', icon: moneyIcon, path: '/board/money' },
  { name: '복지', icon: welfareIcon, path: '/board/welfare' },
  { name: '주거', icon: houseIcon, path: '/board/dwelling' },
  { name: '자기계발', icon: developmentIcon, path: '/board/development' },
  { name: '자유', icon: freeIcon, path: '/board/free' },
  { name: 'Q&A', icon: QnAIcon, path: '/board/qna' },
];
