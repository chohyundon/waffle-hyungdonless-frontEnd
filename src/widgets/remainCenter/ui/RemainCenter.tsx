import { TopMain } from './TopMain.tsx';
import styles from './RemainCenter.module.css'
import { BottomMain } from './BottomMain.tsx';

export const RemainCenter = () => {

  return (
    <>
      <TopMain />
      <article className={styles.container}>
        <div className={styles.titleBox}>
          <p className={styles.textStyle}>HOT</p>
          <h1 className={styles.title}>게시글</h1>
          <h3 className={styles.subTitle}>지금 가장 뜨거운 이야기!<br />
            사람들이 공감한 인기 글을 만나보세요.
          </h3>
        </div>
      </article>
      <BottomMain />
    </>
  );
};


