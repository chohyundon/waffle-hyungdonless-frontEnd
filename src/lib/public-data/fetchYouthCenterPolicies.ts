import type { PublicDataResponse } from '@/types/publicDataType';

export async function fetchYouthCenterPolicies(): Promise<PublicDataResponse> {
  const apiKey = process.env.YOUTH_CENTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('YOUTH_CENTER_API_KEY가 설정되지 않았습니다.');
  }

  const url = new URL('https://www.youthcenter.go.kr/go/ythip/getPlcy');
  url.searchParams.set('apiKeyNm', apiKey);
  url.searchParams.set('pageSize', '300');

  const response = await fetch(url, {
    method: 'GET',
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(`청년정책 API HTTP ${response.status}`);
  }

  return response.json() as Promise<PublicDataResponse>;
}
