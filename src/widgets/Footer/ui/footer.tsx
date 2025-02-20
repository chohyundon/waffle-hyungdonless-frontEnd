import styles from './footer.module.css';

import camera from '../../../shared/assets/icons/camera.svg';
import twitter from '../../../shared/assets/icons/twitter.svg';
import youtube from '../../../shared/assets/icons/youtube.svg';

export const Footer = () => {
 return (
  <footer className={styles.container}>
    <div className={styles.footerContainer}>
      <ul className={styles.listContainer}>
        <li className={styles.fontSize}>회사소개</li>
        <span className={styles.separator}>|</span>
        <li className={styles.fontSize}>이용약관</li>
        <span className={styles.separator}>|</span>
        <li className={styles.fontSize}>개인정보처리방침</li>
        <span className={styles.separator}>|</span>
        <li className={styles.fontSize}>청소년보호정책</li>
        <span className={styles.separator}>|</span>
        <li className={styles.fontSize}>광고소개</li>
      </ul>
      <h1 className={styles.footerTitle}>(주) 사부작 사부작</h1>
      <h3 className={styles.secondTitle}>고객센터 1544-8427</h3>
      <ul className={styles.bottomListContainer}>
        <li className={styles.fontSizes}>대표이사 홍준표</li>
        <li className={styles.fontSizes}>고객정보보호 책임자 홍준표</li>
        <li className={styles.fontSizes}>사업자 등록 124-62-15439</li>
        <li className={styles.fontSizes}>이메일 jinseo0528@naver.com</li>
        <li className={styles.fontSizes}>(본사) 서울시 보문로 32다길 5</li>
      </ul>
      <button className={styles.leftButtonContainer}>1 : 1 문의</button>
      <button className={styles.rightButtonContainer}>FAQ</button>
      <figure className={styles.imgContainer}>
        <img src={camera} alt={camera} className={styles.cameraIcon} />
      </figure>
      <figure className={styles.imgContainer1}>
        <img src={twitter} alt={twitter} className={styles.cameraIcon} />
      </figure>
      <figure className={styles.imgContainer2}>
        <img src={youtube} alt={youtube} className={styles.cameraIcon} />
      </figure>
    </div>
  </footer>
 );
};