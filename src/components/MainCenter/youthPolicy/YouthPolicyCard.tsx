import styles from '@/components/MainCenter/YouthPolicySection.module.css';
import { stripMiddleDot } from '@/components/MainCenter/youthPolicy/formatPolicyText';
import type { YouthPolicy } from '@/types/publicDataType';

export function YouthPolicyCard({ policy }: { policy: YouthPolicy }) {
  const institution = policy.sprvsnInstCdNm || policy.operInstCdNm;

  return (
    <li className={styles.card}>
      <span className={styles.badge}>
        {stripMiddleDot(policy.lclsfNm)} {stripMiddleDot(policy.mclsfNm)}
      </span>
      <h3 className={styles.name}>{stripMiddleDot(policy.plcyNm)}</h3>
      <p className={styles.explain}>{stripMiddleDot(policy.plcyExplnCn)}</p>
      {institution && (
        <p className={styles.institution}>{stripMiddleDot(institution)}</p>
      )}
      {policy.plcyKywdNm && (
        <p className={styles.keywords}>{stripMiddleDot(policy.plcyKywdNm)}</p>
      )}
      {policy.aplyUrlAddr && (
        <a
          href={policy.aplyUrlAddr}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link}
        >
          신청하기
        </a>
      )}
    </li>
  );
}
