import { ALL, getPolicyRegions, matchesLocation } from '@/components/MainCenter/consts/Policy';
import { normalize } from '@/components/MainCenter/youthPolicy/formatPolicyText';
import type { YouthPolicy } from '@/types/publicDataType';

type PolicyFilters = {
  search: string;
  largeCategory: string;
  mediumCategory: string;
  location: string;
};

function sortKo(values: string[]) {
  return [...values].sort((a, b) => a.localeCompare(b, 'ko'));
}

function getLargeCategories(policies: YouthPolicy[]) {
  return sortKo([...new Set(policies.map((policy) => policy.lclsfNm))]);
}

function getMediumCategories(policies: YouthPolicy[], largeCategory: string) {
  return sortKo([...new Set(policies.map((policy) => policy.mclsfNm))]).filter(
    (category) => category !== ALL && category !== largeCategory
  );
}

function getLocations(policies: YouthPolicy[]) {
  return sortKo([
    ...new Set(policies.flatMap((policy) => getPolicyRegions(policy.zipCd))),
  ]);
}

function buildPolicySearchHaystack(policy: YouthPolicy) {
  return [
    policy.plcyNm,
    policy.plcyExplnCn,
    policy.plcyKywdNm,
    policy.sprvsnInstCdNm,
    policy.operInstCdNm,
  ]
    .filter(Boolean)
    .join(' ');
}

function filterYouthPolicies(policies: YouthPolicy[], filters: PolicyFilters) {
  const query = normalize(filters.search);

  return policies.filter((policy) => {
    if (
      filters.largeCategory !== ALL &&
      policy.lclsfNm !== filters.largeCategory
    ) {
      return false;
    }

    if (
      filters.mediumCategory !== ALL &&
      policy.mclsfNm !== filters.mediumCategory
    ) {
      return false;
    }

    if (
      !matchesLocation(getPolicyRegions(policy.zipCd), filters.location)
    ) {
      return false;
    }

    if (!query) {
      return true;
    }

    return normalize(buildPolicySearchHaystack(policy)).includes(query);
  });
}

export type { PolicyFilters };
export {
  filterYouthPolicies,
  getLargeCategories,
  getLocations,
  getMediumCategories,
};
