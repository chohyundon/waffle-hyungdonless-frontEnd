import { useNavigate, useParams } from 'react-router';
import styles from './BoardHomeMain.module.css';
import rightIcon from '../../../shared/assets/icons/rightBar.svg';
import writeIcon from '../../../shared/assets/icons/writeButton.svg';
import smallCheck from '../../../shared/assets/icons/smallCheck.svg';
import noneSmallCheck from '../../../shared/assets/icons/noneSmallCheck.svg';
import userImages from '../../../shared/assets/icons/userImages.svg';
import { useEffect, useState } from 'react';

interface UserProps  {
  name: string;
  nickname: string;
  email: string;
}

export const BoardHomeMain = () => {
  const { category, detail, latest } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProps>();

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (typeof data === 'string') {
      setUserData(JSON.parse(data));
    }
  }, []);

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
    mostLike: '좋아요순',
  };

  const detailTitle = detailMap[detail ?? 'popular'];

  return (
    <section className={styles.container}>
      <ul className={styles.listContainer}>
        <li className={styles.listFont}>홈</li>
        <img src={rightIcon} alt='rightBar' width={14} height={14} />
        <li className={styles.listFont}>사부작 게시판</li>
        <img src={rightIcon} alt='rightBar' width={14} height={14} />
        <li className={styles.listFont}>금융</li>
        <img src={rightIcon} alt='rightBar' width={14} height={14} />
        <li className={styles.activeStyle}>{detailTitle}</li>
      </ul>
      {userData ? (
        <article className={styles.topBoxContainer}>
          <h1 className={styles.title}>나의 커뮤니티</h1>
          <div className={styles.isLoginContainer}>
            <img src={userImages} alt={userImages} />
          </div>
          <div className={styles.isLoginRightContainer}>
            <h3 className={styles.loginTitle}>바보의 지배자</h3>
            <p className={styles.loginSubtitle}>{userData.name}님</p>
            <ul className={styles.userList}>
              <div className={styles.userListMini}>
                <li className={styles.listText}>작성한 글</li>
                <span className={styles.colorFont}>25</span>
              </div>
              <div className={styles.userListMini}>
                <li className={styles.listText}>작성한 댓글</li>
                <span className={styles.colorFont}>15</span>
              </div>
              <div className={styles.userListMini}>
                <li className={styles.listText}>획득한 배지</li>
                <span className={styles.colorFont}>17</span>
              </div>
            </ul>
          </div>
        </article>
      ) : (
        <article className={styles.noneTopBoxContainer}>
          <h1 className={styles.title}>나의 커뮤니티</h1>
          <div className={styles.loginContainer}>
            <p className={styles.login}>로그인 후 이용해주세요</p>
          </div>
        </article>
      )}
      <button className={userData ?  styles.buttons : styles.button}>
        함께 성장하는 커뮤니티, 글 작성해보세요!
        <img src={writeIcon} alt={writeIcon} />
      </button>
      <article>
        <ul className={userData ? styles.bottomLists : styles.bottomList}>
          {Object.entries(bottomList).map(([key, value]) => (
            <div
              className={styles.bottomLostContainer}
              key={key}
              onClick={() => navigate(`/board/${category}/${detail}/${key}`)}
            >
              <img
                src={key === latest ? smallCheck : noneSmallCheck}
                alt='icon'
                className={styles.icon}
              />
              <li
                className={key === latest ? styles.activeFont : styles.listFont}
              >
                {value}
              </li>
            </div>
          ))}
        </ul>
        <div className={styles.bottomBoardContainer}></div>
      </article>
    </section>
  );
};
