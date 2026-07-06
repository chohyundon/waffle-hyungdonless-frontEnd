const ALL = '전체';
const PAGE_SIZE = 9;
const NATIONWIDE = '전국';
const UNKNOWN = '미지정';
const NATIONWIDE_CODE_THRESHOLD = 100;

const SIDO_BY_CODE: Record<string, string> = {
  '11': '서울',
  '26': '부산',
  '27': '대구',
  '28': '인천',
  '29': '광주',
  '30': '대전',
  '31': '울산',
  '36': '세종',
  '41': '경기',
  '42': '강원',
  '43': '충북',
  '44': '충남',
  '45': '전북',
  '46': '전남',
  '47': '경북',
  '48': '경남',
  '50': '제주',
  '51': '강원',
  '52': '전북',
};

function getPolicyRegions(zipCd?: string) {
  if (!zipCd?.trim()) {
    return [UNKNOWN];
  }

  const codes = zipCd
    .split(',')
    .map((code) => code.trim())
    .filter(Boolean);

  if (codes.length >= NATIONWIDE_CODE_THRESHOLD) {
    return [NATIONWIDE];
  }

  const regions = [
    ...new Set(
      codes
        .map((code) => SIDO_BY_CODE[code.slice(0, 2)])
        .filter((region): region is string => Boolean(region))
    ),
  ];

  return regions.length > 0 ? regions : [UNKNOWN];
}

function matchesLocation(policyRegions: string[], location: string) {
  if (location === ALL) {
    return true;
  }

  if (location === NATIONWIDE) {
    return policyRegions.includes(NATIONWIDE);
  }

  if (location === UNKNOWN) {
    return policyRegions.includes(UNKNOWN);
  }

  return (
    policyRegions.includes(location) || policyRegions.includes(NATIONWIDE)
  );
}

export {
  ALL,
  NATIONWIDE,
  PAGE_SIZE,
  UNKNOWN,
  getPolicyRegions,
  matchesLocation,
};
