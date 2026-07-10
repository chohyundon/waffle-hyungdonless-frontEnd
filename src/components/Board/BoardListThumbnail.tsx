import Image from 'next/image';

import styles from '@/components/Board/styles/BoardListThumbnail.module.css';

type BoardListThumbnailProps = {
  src: string;
  title: string;
  className?: string;
};

export const BoardListThumbnail = ({
  src,
  title,
  className,
}: BoardListThumbnailProps) => {
  return (
    <div className={`${styles.thumbnailWrap} ${className ?? ''}`}>
      <Image
        src={src}
        alt={`${title} 게시글 첨부 이미지`}
        width={112}
        height={84}
        className={styles.thumbnail}
        sizes='112px'
      />
    </div>
  );
};
