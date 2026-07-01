import { getEnv, PUBLIC_DATA_ENV } from '@/lib/public-data/config';
import { fetchCareerJobs } from '@/lib/public-data/fetchCareerJobs';
import { fetchFinancialEducation } from '@/lib/public-data/fetchFinancialEducation';
import { fetchWorknetJobs } from '@/lib/public-data/fetchWorknetJobs';
import { fetchYouthPolicies } from '@/lib/public-data/fetchYouthPolicies';
import type {
  PublicDataResponse,
  PublicDataSection,
} from '@/lib/public-data/types';

async function safeFetch(
  fetcher: () => Promise<PublicDataSection>,
  fallback: Pick<PublicDataSection, 'source' | 'label'>
): Promise<PublicDataSection> {
  try {
    return await fetcher();
  } catch (error) {
    return {
      ...fallback,
      configured: true,
      items: [],
      error:
        error instanceof Error
          ? error.message
          : '데이터를 불러오지 못했습니다.',
    };
  }
}

export async function fetchAllPublicData(): Promise<PublicDataResponse> {
  const missingKeys = Object.values(PUBLIC_DATA_ENV).filter(
    (key) => !getEnv(key)
  );

  const sections = await Promise.all([
    safeFetch(fetchYouthPolicies, {
      source: 'youthPolicies',
      label: '청년 정책',
    }),
    safeFetch(fetchCareerJobs, { source: 'careerJobs', label: '직업 정보' }),
    safeFetch(fetchFinancialEducation, {
      source: 'financialEducation',
      label: '금융 교육',
    }),
    safeFetch(fetchWorknetJobs, { source: 'worknetJobs', label: '채용 정보' }),
  ]);

  return { sections, missingKeys };
}
