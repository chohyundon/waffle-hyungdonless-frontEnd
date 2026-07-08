import assignmentIcon from '@/assets/icons/checkCircle.svg';
import portfolioIcon from '@/assets/icons/development.svg';
import interviewIcon from '@/assets/icons/userImg.svg';
import jobWorryIcon from '@/assets/icons/free.svg';
import studyIcon from '@/assets/icons/developmentMiniIcon.svg';
import qnaIcon from '@/assets/icons/QnA.svg';

type BoardCategory = {
  name: string;
  slug: string;
  icon: string;
  miniIcon: string;
};

const BOARD_CATEGORIES = [
  {
    name: '포트폴리오',
    slug: 'portfolio',
    icon: portfolioIcon,
    miniIcon: portfolioIcon,
  },
  {
    name: '면접',
    slug: 'interview',
    icon: interviewIcon,
    miniIcon: interviewIcon,
  },
  {
    name: '과제/테스트',
    slug: 'assignment',
    icon: assignmentIcon,
    miniIcon: assignmentIcon,
  },
  {
    name: '취준 고민',
    slug: 'job-worry',
    icon: jobWorryIcon,
    miniIcon: jobWorryIcon,
  },
  {
    name: '스터디',
    slug: 'study',
    icon: studyIcon,
    miniIcon: studyIcon,
  },
  {
    name: 'Q&A',
    slug: 'qna',
    icon: qnaIcon,
    miniIcon: qnaIcon,
  },
] as const satisfies readonly BoardCategory[];

const HEAD_CATEGORIES = [
  '이력서 첨삭',
  '자기소개서 첨삭',
  '지원동기',
  '경험 정리',
  '프로젝트 설명',
  '포트폴리오 피드백',
  '1분 자기소개',
  '면접 답변',
  '기술 면접',
  '인성 면접',
  '사전과제',
  '코딩테스트',
  '탈락 후기',
  '멘탈 관리',
  '취준 루틴',
  '스터디 모집',
] as const;

const BOARD_DETAIL_LIST = {
  인기글: 'popular',
  최신글: 'latest',
} as const;

const BOARD_DETAIL_MAP: Record<string, string> = {
  popular: '인기글',
  latest: '최신글',
};

const BOARD_CATEGORY_NAMES = BOARD_CATEGORIES.map((category) => category.name);

const CATEGORY_NAME_TO_SLUG = Object.fromEntries(
  BOARD_CATEGORIES.map((category) => [category.name, category.slug])
);

const CATEGORY_SLUG_TO_NAME = Object.fromEntries(
  BOARD_CATEGORIES.map((category) => [category.slug, category.name])
);

const BOARD_SLUG_TO_NAME = Object.fromEntries(
  BOARD_CATEGORIES.map((category) => [category.slug, category.name])
);

const DEFAULT_BOARD_CATEGORY = BOARD_CATEGORIES[0];

export type { BoardCategory };
export {
  BOARD_CATEGORIES,
  BOARD_CATEGORY_NAMES,
  BOARD_DETAIL_LIST,
  BOARD_DETAIL_MAP,
  BOARD_SLUG_TO_NAME,
  CATEGORY_NAME_TO_SLUG,
  CATEGORY_SLUG_TO_NAME,
  DEFAULT_BOARD_CATEGORY,
  HEAD_CATEGORIES,
};
