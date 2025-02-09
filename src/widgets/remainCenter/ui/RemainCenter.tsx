import moneyBg from '../../../shared/assets/icons/moneyBg.svg'
import qnaBg from '../../../shared/assets/icons/qnaBg.svg'
import freeBg from '../../../shared/assets/icons/freeBg.svg'
import houseBg from '../../../shared/assets/icons/houseBg.svg'
import welfareBg from '../../../shared/assets/icons/welfareBg.svg'
import developmentBg from '../../../shared/assets/icons/developmentBg.svg'

import { useParams } from 'react-router';

export const RemainCenter = () => {
  const {category} = useParams()

  let imgSrc = moneyBg;

  if (category === 'home') imgSrc = houseBg;
  else if (category === 'welfare') imgSrc = welfareBg;
  else if (category === 'development') imgSrc = developmentBg;
  else if (category === 'qna') imgSrc = qnaBg;
  else if (category === 'free') imgSrc = freeBg;

 return (
  <section>
   <img src={imgSrc} alt='이미지 사진' />
  </section>
 );
};