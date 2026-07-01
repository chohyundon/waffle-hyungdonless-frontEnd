import type { PublicDataSection } from '@/lib/public-data/types';
import { getEnv, PUBLIC_DATA_ENV } from '@/lib/public-data/config';
import { getXmlTagValue, parseXmlItems } from '@/lib/public-data/parseXml';

export async function fetchWorknetJobs(): Promise<PublicDataSection> {
  const authKey = getEnv(PUBLIC_DATA_ENV.work24);

  if (!authKey) {
    return {
      source: 'worknetJobs',
      label: '채용 정보',
      configured: false,
      items: [],
      error: 'WORK24_AUTH_KEY가 설정되지 않았습니다.',
    };
  }

  const params = new URLSearchParams({
    authKey,
    callTp: 'L',
    returnType: 'XML',
    startPage: '1',
    display: '10',
    keyword: '신입',
  });

  const response = await fetch(
    `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L01.do?${params.toString()}`,
    { next: { revalidate: 1800 } },
  );

  if (!response.ok) {
    throw new Error(`고용24 API HTTP ${response.status}`);
  }

  const xml = await response.text();
  const message = getXmlTagValue(xml, 'message');

  if (message && /오류|실패|error/i.test(message)) {
    throw new Error(message);
  }

  const rows = parseXmlItems(xml, 'item', [
    'wantedAuthNo',
    'company',
    'title',
    'sal',
    'salTpNm',
    'region',
    'career',
    'minEdubg',
    'wantedInfoUrl',
  ]);

  return {
    source: 'worknetJobs',
    label: '채용 정보',
    configured: true,
    fetchedAt: new Date().toISOString(),
    items: rows.slice(0, 8).map((row, index) => ({
      id: row.wantedAuthNo || `work-${index}`,
      title: row.title || '채용 공고',
      subtitle: row.company,
      description: [row.region, row.career, row.minEdubg].filter(Boolean).join(' · '),
      link: row.wantedInfoUrl,
      meta: row.sal || row.salTpNm ? { salary: row.sal || row.salTpNm } : undefined,
    })),
  };
}
