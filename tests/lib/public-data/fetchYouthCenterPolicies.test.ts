import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  EMPTY_PUBLIC_DATA,
  fetchYouthCenterPolicies,
} from '@/lib/public-data/fetchYouthCenterPolicies';

describe('fetchYouthCenterPolicies', () => {
  const originalKey = process.env.YOUTH_CENTER_API_KEY;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    process.env.YOUTH_CENTER_API_KEY = originalKey;
    vi.unstubAllGlobals();
  });

  it('API 키가 없으면 빈 데이터를 반환한다', async () => {
    delete process.env.YOUTH_CENTER_API_KEY;

    await expect(fetchYouthCenterPolicies()).resolves.toEqual(
      EMPTY_PUBLIC_DATA
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it('HTTP 오류면 빈 데이터를 반환한다', async () => {
    process.env.YOUTH_CENTER_API_KEY = 'test-key';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    await expect(fetchYouthCenterPolicies()).resolves.toEqual(
      EMPTY_PUBLIC_DATA
    );
  });

  it('네트워크 오류면 빈 데이터를 반환한다', async () => {
    process.env.YOUTH_CENTER_API_KEY = 'test-key';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));

    await expect(fetchYouthCenterPolicies()).resolves.toEqual(
      EMPTY_PUBLIC_DATA
    );
  });

  it('성공 시 API JSON을 반환한다', async () => {
    process.env.YOUTH_CENTER_API_KEY = 'test-key';
    const payload = {
      ...EMPTY_PUBLIC_DATA,
      resultMessage: 'ok',
      result: {
        ...EMPTY_PUBLIC_DATA.result,
        pagging: { totCount: 1, pageNum: 1, pageSize: 1 },
      },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(payload),
      })
    );

    await expect(fetchYouthCenterPolicies()).resolves.toEqual(payload);
    expect(fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({
        method: 'GET',
        next: { revalidate: 3600 },
      })
    );
  });
});
