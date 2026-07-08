import { createElement } from 'react';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => createElement('img', { src, alt, ...props }),
}));
