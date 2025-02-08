import styles from './Banner.module.css'
import bannerImg from '../../../shared/assets/icons/bannerImg.svg'

export const Banner = () => {
 return (
  <section className={styles.bannerContainer}>
   <img src={bannerImg} alt="배너" />
  </section>
 );
};