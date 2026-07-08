import developmentBg from '@/assets/icons/developmentBg.svg';
import freeBg from '@/assets/icons/freeBg.svg';
import houseBg from '@/assets/icons/houseBg.svg';
import qnaBg from '@/assets/icons/qnaBg.svg';
import welfareBg from '@/assets/icons/welfareBg.svg';

const CATEGORY_ALT: Record<string, string> = {
  dwelling: '주거 카테고리 일러스트',
  home: '주거 카테고리 일러스트',
  welfare: '복지 카테고리 일러스트',
  development: '자기개발 카테고리 일러스트',
  qna: 'Q&A 카테고리 일러스트',
  free: '자유 카테고리 일러스트',
};

export const getCategoryImage = (category?: string) => {
  if (category === 'welfare') {
    return { src: welfareBg, alt: CATEGORY_ALT.welfare };
  }

  if (category === 'development') {
    return { src: developmentBg, alt: CATEGORY_ALT.development };
  }

  if (category === 'qna') {
    return { src: qnaBg, alt: CATEGORY_ALT.qna };
  }

  if (category === 'free') {
    return { src: freeBg, alt: CATEGORY_ALT.free };
  }

  return { src: houseBg, alt: CATEGORY_ALT.home };
};
