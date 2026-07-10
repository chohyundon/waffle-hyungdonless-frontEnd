import { describe, expect, it } from 'vitest';

import { paginateList } from '@/lib/board/paginateList';

describe('paginateList', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

  it('1페이지면 처음 5개를 반환한다', () => {
    const result = paginateList(items, 1, 5);

    expect(result.items).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(3);
    expect(result.totalItems).toBe(12);
  });

  it('2페이지면 다음 5개를 반환한다', () => {
    const result = paginateList(items, 2, 5);

    expect(result.items).toEqual(['f', 'g', 'h', 'i', 'j']);
    expect(result.currentPage).toBe(2);
  });

  it('마지막 페이지는 남은 개수만 반환한다', () => {
    const result = paginateList(items, 3, 5);

    expect(result.items).toEqual(['k', 'l']);
    expect(result.currentPage).toBe(3);
  });

  it('페이지가 범위를 벗어나면 마지막 페이지로 보정한다', () => {
    const result = paginateList(items, 99, 5);

    expect(result.currentPage).toBe(3);
    expect(result.items).toEqual(['k', 'l']);
  });
});
