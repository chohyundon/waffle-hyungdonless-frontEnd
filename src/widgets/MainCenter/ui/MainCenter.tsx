import styles from './MainCenter.module.css';

import moneyIcon from '../../../shared/assets/icons/money.svg';
import freeIcon from '../../../shared/assets/icons/free.svg';
import houseIcon from '../../../shared/assets/icons/house.svg';
import developmentIcon from '../../../shared/assets/icons/development.svg';
import QnAIcon from '../../../shared/assets/icons/QnA.svg';
import welfareIcon from '../../../shared/assets/icons/welfare.svg';

import footerImage from '../../../shared/assets/icons/Objects.svg'

import { Link, useParams } from 'react-router';

import { TopBoard } from './TopBoard.tsx';
import { BottomBoard } from './BottomBoard.tsx';

export const MainCenter = () => {
  const { category } = useParams();

  return (
    <section className={styles.mainContainer}>
      <aside className={styles.asideContainer}>
        <h1 className={styles.title}>사부작 게시판</h1>
        <p className={styles.subTitle}>
          소소한 일상부터 유용한 정보까지,
          <br />
          가볍게 사부작거려 보세요!
        </p>
      </aside>
      <section className={styles.categoryContainer}>
        <Link to={'/'} className={styles.iconContainer}>
          <img src={moneyIcon} alt={moneyIcon} />
          <p className={styles.textStyle}>금융</p>
        </Link>
        <Link to={'/welfare'} className={styles.iconContainer}>
          <img src={welfareIcon} alt={welfareIcon} />
          <p className={styles.textStyle}>복지</p>
        </Link>
        <Link to={'/dwelling'} className={styles.iconContainer}>
          <img src={houseIcon} alt={houseIcon} />
          <p className={styles.textStyle}>주거</p>
        </Link>
        <Link to={'/development'} className={styles.iconContainer}>
          <img src={developmentIcon} alt={developmentIcon} />
          <p className={styles.textStyle}>자기게발</p>
        </Link>
        <Link to={'/free'} className={styles.iconContainer}>
          <img src={freeIcon} alt={freeIcon} />
          <p className={styles.textStyle}>자유</p>
        </Link>
        <Link to={'/qna'} className={styles.iconContainer}>
          <img src={QnAIcon} alt={QnAIcon} />
          <p className={styles.textStyle}>Q&A</p>
        </Link>
      </section>
      {category === undefined &&
        <>
          <TopBoard />
          <BottomBoard />
          <img src={footerImage} alt={footerImage} className={styles.image}/>
        </>
      }
    </section>
  );
};
