import { useQuery } from '@tanstack/react-query';
import type { PublicDataResponse } from '@/lib/public-data/types';

async function fetchPublicData(): Promise<PublicDataResponse> {
  const response = await fetch('/api/public-data');

  if (!response.ok) {
    throw new Error('공공 데이터를 불러오지 못했습니다.');
  }

  return response.json();
}

export function usePublicData() {
  return useQuery({
    queryKey: ['public-data'],
    queryFn: fetchPublicData,
    staleTime: 1000 * 60 * 30,
  });
}
