import type { PublicDataSection } from '@/lib/public-data/types';
import { getEnv, PUBLIC_DATA_ENV } from '@/lib/public-data/config';

interface CareerJobRow {
  job_nm?: string;
  job_cd?: string;
  aptit_name?: string;
  wage?: string;
  work?: string;
}

export async function fetchCareerJobs(): Promise<PublicDataSection> {
  const apiKey = getEnv(PUBLIC_DATA_ENV.careerNet);

  if (!apiKey) {
    return {
      source: 'careerJobs',
      label: '직업 정보',
      configured: false,
      items: [],
      error: 'CAREER_NET_API_KEY가 설정되지 않았습니다.',
    };
  }

  const params = new URLSearchParams({
    apiKey,
    pageIndex: '1',
  });

  const response = await fetch(
    `https://www.career.go.kr/cnet/front/openapi/jobs.json?${params.toString()}`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(`커리어넷 API HTTP ${response.status}`);
  }

  const data = (await response.json()) as {
    hashMap?: { code?: string; message?: string };
    jobs?: CareerJobRow[];
  };

  if (data.hashMap?.code && data.hashMap.code !== '0') {
    throw new Error(data.hashMap.message ?? '커리어넷 API 인증 실패');
  }

  const rows = data.jobs ?? [];

  return {
    source: 'careerJobs',
    label: '직업 정보',
    configured: true,
    fetchedAt: new Date().toISOString(),
    items: rows.slice(0, 8).map((row, index) => ({
      id: row.job_cd ?? `job-${index}`,
      title: row.job_nm ?? '직업 정보',
      subtitle: row.aptit_name,
      description: row.work,
      meta: row.wage ? { wage: row.wage } : undefined,
    })),
  };
}
