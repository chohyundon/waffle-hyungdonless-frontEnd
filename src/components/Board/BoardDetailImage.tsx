'use client';

import Image from 'next/image';

import styles from '@/components/Board/styles/BoardDetailImage.module.css';

type BoardDetailImageProps = {
  src: string;
  title: string;
};

export const BoardDetailImage = ({ src, title }: BoardDetailImageProps) => {
  return (
    <figure className={styles.figure}>
      <a
        href={src}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.imageLink}
        aria-label={`${title} 첨부 이미지 원본 보기`}
      >
        <Image
          src={src}
          alt={`${title} 게시글 첨부 이미지`}
          fill
          className={styles.image}
          sizes='(max-width: 768px) 288px, 480px'
        />
      </a>
      <figcaption className={styles.caption}>첨부 이미지 · 클릭하면 원본 보기</figcaption>
    </figure>
  );
};
