import type { StaticImageData } from 'next/image';

/** Next.js가 정적 import를 `StaticImageData`로 줄 때 `<img src>`는 `.src`가 필요합니다 */
export function assetSrc(
  imported: string | StaticImageData | undefined | null
): string {
  if (imported == null) return '';
  if (typeof imported === 'string') return imported;
  return imported.src;
}
