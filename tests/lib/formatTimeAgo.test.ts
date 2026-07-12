import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatTimeAgo } from '@/lib/formatTimeAgo';

describe('formatTimeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-12T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('1분 미만이면 방금 전을 반환한다', () => {
    expect(formatTimeAgo('2026-07-12T11:59:30.000Z')).toBe('방금 전');
  });

  it('1시간 미만이면 분 단위를 반환한다', () => {
    expect(formatTimeAgo('2026-07-12T11:45:00.000Z')).toBe('15분 전');
  });

  it('24시간 미만이면 시간 단위를 반환한다', () => {
    expect(formatTimeAgo('2026-07-12T09:00:00.000Z')).toBe('3시간 전');
  });

  it('24시간 이상이면 일 단위를 반환한다', () => {
    expect(formatTimeAgo('2026-07-10T12:00:00.000Z')).toBe('2일 전');
  });
});
