import styles from '@/components/Board/BoardCheck.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import viewIcon from '@/assets/icons/viewIcon.svg';
import commentIcon from '@/assets/icons/commentIcon.svg';
import likeIcon from '@/assets/icons/likeIcon.svg';
import notPage from '@/assets/icons/notPage.svg';
import { assetSrc } from '@/lib/assetSrc';

interface stateProps {
  boardType: string;
  id?: string;
  title?: string;
  nickname?: string;
  category?: string;
  content?: string;
  createDate: string;
}

export const BoardCheck = () => {
  const params = useParams() ?? {};
  const category = params.category as string | undefined;
  const [ok, setOk] = useState<stateProps[]>([]);

  const categoryMap = {
    money: 'b001',
    welfare: 'b002',
    home: 'b003',
    develop: 'b004',
    free: 'b005',
    qna: 'b006',
  };

  const categoryCode =
    categoryMap[category as keyof typeof categoryMap] || 'default';

  useEffect(() => {
    const fetchData = async () => {
      if (categoryCode !== 'default') {
        try {
          const response = await fetch(
            `https://api.sabujak.life/board/boards/${categoryCode}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setOk(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        }
      } else {
        console.warn('Invalid category, skipping fetch.');
      }
    };

    fetchData();
  }, [categoryCode]);

  console.log(ok);

  const calculateDaysAgo = (createDate: string) => {
    const createdDate = new Date(createDate);
    const today = new Date();
    const diffTime = today.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays}일 전` : '오늘';
  };

  return (
    <section
      className={`${styles.container} ${ok.length === 0 ? styles.empty : ''}`}
    >
      {ok.length === 0 ? (
        <div className={styles.emptyContainer}>
          <img src={assetSrc(notPage)} alt='서비스 준비 중' />
        </div>
      ) : (
        ok
          .filter((item) => item?.boardType === categoryCode)
          .map((item, i) => (
            <ul key={i} className={styles.listContainer}>
              <li className={styles.icon}>{item?.category}</li>
              <li className={styles.title}>{item?.title}</li>
              <li className={styles.content}>{item?.content}</li>
              <li className={styles.nickname}>
                <p className={styles.by}>by</p> {item?.nickname}
              </li>
              <section className={styles.iconsContainer}>
                <figure className={styles.icons}>
                  <img src={assetSrc(viewIcon)} alt='' />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
                <figure className={styles.icons}>
                  <img src={assetSrc(commentIcon)} alt='' />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
                <figure className={styles.icons}>
                  <img src={assetSrc(likeIcon)} alt='' />
                  <figcaption className={styles.iconFont}>106</figcaption>
                </figure>
                <li className={styles.date}>
                  {calculateDaysAgo(item?.createDate)}
                </li>
                {i !== ok.length - 1 && <span className={styles.border}></span>}
              </section>
            </ul>
          ))
      )}
    </section>
  );
};
