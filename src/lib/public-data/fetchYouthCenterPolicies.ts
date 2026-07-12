import type { PublicDataResponse } from '@/types/publicDataType';

export const EMPTY_PUBLIC_DATA: PublicDataResponse = {
  resultCode: 0,
  resultMessage: 'empty',
  result: {
    pagging: {
      totCount: 0,
      pageNum: 1,
      pageSize: 0,
    },
    youthPolicyList: [],
  },
};

export async function fetchYouthCenterPolicies(): Promise<PublicDataResponse> {
  const apiKey = process.env.YOUTH_CENTER_API_KEY?.trim();

  if (!apiKey) {
    console.error('YOUTH_CENTER_API_KEY가 설정되지 않았습니다.');
    return EMPTY_PUBLIC_DATA;
  }

  const url = new URL('https://www.youthcenter.go.kr/go/ythip/getPlcy');
  url.searchParams.set('apiKeyNm', apiKey);
  url.searchParams.set('pageSize', '300');

  try {
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`청년정책 API HTTP ${response.status}`);
      return EMPTY_PUBLIC_DATA;
    }

    return (await response.json()) as PublicDataResponse;
  } catch (error) {
    console.error('청년정책 API 요청 실패:', error);
    return EMPTY_PUBLIC_DATA;
  }
}
