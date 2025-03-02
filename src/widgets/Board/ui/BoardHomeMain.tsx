import { useNavigate, useParams } from 'react-router';
import styles from './BoardHomeMain.module.css';
import rightIcon from '../../../shared/assets/icons/rightBar.svg';
import writeIcon from '../../../shared/assets/icons/writeButton.svg'
import smallCheck from '../../../shared/assets/icons/smallCheck.svg'
import noneSmallCheck from '../../../shared/assets/icons/noneSmallCheck.svg'

export const BoardHomeMain = () => {
  const { category, detail, latest } = useParams();
  const navigate = useNavigate();


  const detailMap: Record<string, string> = {
    popular: '인기글',
    salary: '월급 및 관리 및 예산',
    tax: '세금 및 공제',
    loan: '대출',
    insurance: '보험',
    investment: '자산 증식',
  };

  const bottomList = {
    latest: '최신순',
    manyComment: '댓글많은순',
    mostLike: '좋아요순'
  }


  const detailTitle = detailMap[detail ?? 'popular'];

  return (
    <section className={styles.container}>
      <ul className={styles.listContainer}>
        <li className={styles.listFont}>홈</li>
        <img src={rightIcon} alt="rightBar" width={14} height={14} />
        <li className={styles.listFont}>사부작 게시판</li>
        <img src={rightIcon} alt="rightBar" width={14} height={14} />
        <li className={styles.listFont}>금융</li>
        <img src={rightIcon} alt="rightBar" width={14} height={14} />
        <li className={styles.activeStyle}>{detailTitle}</li>
      </ul>
      <article className={styles.topBoxContainer}>
        <h1 className={styles.title}>나의 커뮤니티</h1>
        <div className={styles.loginContainer}>
          <p className={styles.login}>로그인 후 이용해주세요</p>
        </div>
        <button className={styles.button}>함께 성장하는 커뮤니티, 글 작성해보세요! <img src={writeIcon} alt={writeIcon} /></button>
      </article>
      <article className={styles.bottomBoxContainer}>
        <ul className={styles.bottomList}>
          {Object.entries(bottomList).map(([key, value]) => (
            <div
              className={styles.bottomLostContainer}
              key={key}
              onClick={() => navigate(`/board/${category}/${detail}/${key}`)}
            >
              <img src={key === latest ? smallCheck:  noneSmallCheck} alt="icon" className={styles.icon} />
              <li className={key === latest ? styles.activeFont : styles.listFont}>{value}</li>
            </div>
          ))}
        </ul>
        <div className={styles.bottomBoardContainer}></div>
      </article>
    </section>
  );
};