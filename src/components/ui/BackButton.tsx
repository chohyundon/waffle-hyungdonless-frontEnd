'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from '@/components/ui/styles/BackButton.module.css';

type BackButtonProps = {
  label?: string;
  icon: string;
  className?: string;
};

export const BackButton = ({
  label = '뒤로가기',
  icon,
  className,
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type='button'
      className={`${styles.button} ${className ?? ''}`}
      onClick={() => router.back()}
    >
      <Image
        src={icon}
        alt={`${label} 아이콘`}
        width={20}
        height={20}
        className={styles.icon}
      />
      {label}
    </button>
  );
};
