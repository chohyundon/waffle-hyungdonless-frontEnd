import Image from 'next/image';

import styles from '@/components/Footer/styles/footer.module.css';

import camera from '@/assets/icons/camera.svg';
import twitter from '@/assets/icons/twitter.svg';
import youtube from '@/assets/icons/youtube.svg';

const FOOTER_LINKS = [
  '회사소개',
  '이용약관',
  '개인정보처리방침',
  '청소년보호정책',
  '광고소개',
] as const;

const COMPANY_INFO = [
  '대표이사 홍준표',
  '고객정보보호 책임자 홍준표',
  '사업자 등록 124-62-15439',
  '이메일 jinseo0528@naver.com',
  '(본사) 서울시 보문로 32다길 5',
] as const;

const SOCIAL_LINKS = [
  { href: '#', icon: camera, label: 'Instagram' },
  { href: '#', icon: twitter, label: 'Twitter' },
  { href: '#', icon: youtube, label: 'YouTube' },
] as const;

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.inner}>
        <nav className={styles.linkNav} aria-label='푸터 메뉴'>
          <ul className={styles.linkList}>
            {FOOTER_LINKS.map((label) => (
              <li key={label}>
                <button type='button' className={styles.linkButton}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.brandRow}>
          <h2 className={styles.brandName}>(주) 사부작 사부작</h2>
          <p className={styles.supportLine}>고객센터 1544-8427</p>
        </div>

        <ul className={styles.infoList}>
          {COMPANY_INFO.map((item) => (
            <li key={item} className={styles.infoItem}>
              {item}
            </li>
          ))}
        </ul>

        <div className={styles.bottomRow}>
          <div className={styles.actionGroup}>
            <button type='button' className={styles.actionButton}>
              1 : 1 문의
            </button>
            <button type='button' className={styles.actionButton}>
              FAQ
            </button>
          </div>

          <div className={styles.socialGroup}>
            {SOCIAL_LINKS.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                className={styles.socialLink}
                aria-label={label}
              >
                <Image src={icon} alt={`${label} 바로가기`} width={16} height={16} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
