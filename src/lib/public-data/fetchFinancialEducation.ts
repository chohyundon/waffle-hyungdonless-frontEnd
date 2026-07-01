import type { PublicDataSection } from '@/lib/public-data/types';
import { getEnv, PUBLIC_DATA_ENV } from '@/lib/public-data/config';
import { parseXmlItems } from '@/lib/public-data/parseXml';

export async function fetchFinancialEducation(): Promise<PublicDataSection> {
  const serviceKey = getEnv(PUBLIC_DATA_ENV.dataGoKr);

  if (!serviceKey) {
    return {
      source: 'financialEducation',
      label: '금융 교육',
      configured: false,
      items: [],
      error: 'DATA_GO_KR_SERVICE_KEY가 설정되지 않았습니다.',
    };
  }

  const params = new URLSearchParams({
    serviceKey,
    pageNo: '1',
    numOfRows: '10',
    type: 'json',
  });

  const response = await fetch(
    `https://apis.data.go.kr/B553701/SeominFinancialEducationContentsInfoService/getFinancialEducationContentsInfo?${params.toString()}`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(`금융교육 API HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('json')) {
    const data = (await response.json()) as {
      response?: {
        body?: {
          items?: {
            item?: Array<{
              edcSbjcNm?: string;
              edcLgclsNm?: string;
              edcSmclsNm?: string;
              edcIntrcCn?: string;
            }>;
          };
        };
      };
    };

    const rows = data.response?.body?.items?.item ?? [];

    return {
      source: 'financialEducation',
      label: '금융 교육',
      configured: true,
      fetchedAt: new Date().toISOString(),
      items: rows.slice(0, 8).map((row, index) => ({
        id: `finance-${index}`,
        title: row.edcSbjcNm ?? '금융 교육',
        subtitle: [row.edcLgclsNm, row.edcSmclsNm].filter(Boolean).join(' · '),
        description: row.edcIntrcCn,
      })),
    };
  }

  const xml = await response.text();
  const rows = parseXmlItems(xml, 'item', [
    'edcSbjcNm',
    'edcLgclsNm',
    'edcSmclsNm',
    'edcIntrcCn',
  ]);

  return {
    source: 'financialEducation',
    label: '금융 교육',
    configured: true,
    fetchedAt: new Date().toISOString(),
    items: rows.slice(0, 8).map((row, index) => ({
      id: `finance-${index}`,
      title: row.edcSbjcNm || '금융 교육',
      subtitle: [row.edcLgclsNm, row.edcSmclsNm].filter(Boolean).join(' · '),
      description: row.edcIntrcCn,
    })),
  };
}
