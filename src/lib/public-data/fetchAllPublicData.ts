import { fetchYouthCenterPolicies } from '@/lib/public-data/fetchYouthCenterPolicies';
import type { PublicDataResponse } from '@/types/publicDataType';

export async function fetchPublicData(): Promise<PublicDataResponse> {
  if (typeof window === 'undefined') {
    return fetchYouthCenterPolicies();
  }

  const response = await fetch('/api/public-data');

  if (!response.ok) {
    throw new Error('공공 데이터를 불러오지 못했습니다.');
  }

  return response.json() as Promise<PublicDataResponse>;
}
