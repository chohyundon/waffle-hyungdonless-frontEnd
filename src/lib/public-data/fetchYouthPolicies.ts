import type { PublicDataSection } from '@/lib/public-data/types';
import { getEnv, PUBLIC_DATA_ENV } from '@/lib/public-data/config';

interface YouthPolicyRow {
  plcyId?: string;
  plcyNm?: string;
  plcyExplnCn?: string;
  sprvsnInstCdNm?: string;
  plcyKywdNm?: string;
  plcyUrlAddr?: string;
}

export async function fetchYouthPolicies(): Promise<PublicDataSection> {
  const apiKey = getEnv(PUBLIC_DATA_ENV.youthCenter);

  if (!apiKey) {
    return {
      source: 'youthPolicies',
      label: '청년 정책',
      configured: false,
      items: [],
      error: 'YOUTH_CENTER_API_KEY가 설정되지 않았습니다.',
    };
  }

  const params = new URLSearchParams({
    openApiVlak: apiKey,
    pageIndex: '1',
    display: '10',
    rtnType: 'json',
    query: '청년',
  });

  const response = await fetch(
    `https://www.youthcenter.go.kr/opi/youthPlcyList.do?${params.toString()}`,
    {
      cache: 'force-cache',
    }
  );

  if (!response.ok) {
    console.error(`청년정책 API HTTP ${response.status}`);
    return {
      source: 'youthPolicies',
      label: '청년 정책',
      configured: true,
      items: [],
      error: `청년정책 API HTTP ${response.status}`,
    };
  }

  const data = (await response.json()) as {
    result?: { resultList?: YouthPolicyRow[] };
    resultList?: YouthPolicyRow[];
  };

  const rows = data.result?.resultList ?? data.resultList ?? [];

  return {
    source: 'youthPolicies',
    label: '청년 정책',
    configured: true,
    fetchedAt: new Date().toISOString(),
    items: rows.slice(0, 8).map((row, index) => ({
      id: row.plcyId ?? `youth-${index}`,
      title: row.plcyNm ?? '',
      subtitle: row.sprvsnInstCdNm,
      description: row.plcyExplnCn,
      link: row.plcyUrlAddr,
      meta: row.plcyKywdNm ? { keyword: row.plcyKywdNm } : undefined,
    })),
  };
}
