import styles from './MainCenter.module.css';
import moneyBg from '../../../shared/assets/icons/moneyBg.svg';
import userImage from '../../../shared/assets/icons/userImage.svg';
import viewIcon from '../../../shared/assets/icons/viewIcon.svg';
import commentIcon from '../../../shared/assets/icons/commentIcon.svg';
import likeIcon from '../../../shared/assets/icons/likeIcon.svg';


export const TopBoard = () => {
 return (
   <section className={styles.remainContainer}>
     <img src={moneyBg} alt={moneyBg} className={styles.image} />
     <aside className={styles.board}>
       {Array.from({ length: 4 }, (_, i) => (
         <div className={`${styles.boardList} ${i === 0 && styles.firstBoard}`} key={i}>
           <div className={styles.boardContainer}>
             <p className={styles.badge}>자산증식</p>
             <div className={styles.userContainer}>
               <img src={userImage} alt={userImage} width={20} height={20} />
               <span className={styles.userNameFont}>userName</span>
             </div>
             <p className={styles.boardContent}>제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
               제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목</p>
             <div className={styles.iconsContainer}>
               <div className={styles.icons}>
                 <img src={viewIcon} alt={viewIcon} />
                 <p className={styles.iconsFont}>106</p>
               </div>
               <div className={styles.icons}>
                 <img src={commentIcon} alt={commentIcon} />
                 <p className={styles.iconsFont}>106</p>
               </div>
               <div className={styles.icons}>
                 <img src={likeIcon} alt={likeIcon} />
                 <p className={styles.iconsFont}>106</p>
               </div>
               <div className={styles.numbers}>
                 <span className={styles.bar}></span>
                 <p className={styles.times}>1시간 전</p>
               </div>
             </div>
           </div>
           <span className={`${styles.boardBottom} ${i === 3 && styles.borderNone}`}></span>
         </div>
       ))}
     </aside>
   </section>
 );
};