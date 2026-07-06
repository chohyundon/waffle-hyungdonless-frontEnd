'use client';

import { useEffect, useState } from 'react';

import { ALL, PAGE_SIZE } from '@/components/MainCenter/consts/Policy';
import {
  filterYouthPolicies,
  getLargeCategories,
  getLocations,
  getMediumCategories,
} from '@/components/MainCenter/youthPolicy/filterYouthPolicies';
import type { YouthPolicy } from '@/types/publicDataType';

export function useYouthPolicyFilters(policies: YouthPolicy[]) {
  const [search, setSearch] = useState('');
  const [largeCategory, setLargeCategory] = useState(ALL);
  const [mediumCategory, setMediumCategory] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [page, setPage] = useState(1);

  const largeCategories = getLargeCategories(policies);
  const mediumCategories = getMediumCategories(policies, largeCategory);
  const locations = getLocations(policies);

  const filteredPolicies = filterYouthPolicies(policies, {
    search,
    largeCategory,
    mediumCategory,
    location,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPolicies.length / PAGE_SIZE)
  );

  const start = (page - 1) * PAGE_SIZE;
  const paginatedPolicies = filteredPolicies.slice(start, start + PAGE_SIZE);

  const rangeStart =
    filteredPolicies.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, filteredPolicies.length);

  const hasActiveFilter =
    search !== '' ||
    largeCategory !== ALL ||
    mediumCategory !== ALL ||
    location !== ALL;

  useEffect(() => {
    setPage(1);
  }, [search, largeCategory, mediumCategory, location]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleLargeCategoryChange = (value: string) => {
    setLargeCategory(value);
    setMediumCategory(ALL);
  };

  const resetFilters = () => {
    setSearch('');
    setLargeCategory(ALL);
    setMediumCategory(ALL);
    setLocation(ALL);
    setPage(1);
  };

  const goToPreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  };

  return {
    search,
    setSearch,
    largeCategory,
    mediumCategory,
    location,
    setMediumCategory,
    setLocation,
    page,
    largeCategories,
    mediumCategories,
    locations,
    filteredPolicies,
    paginatedPolicies,
    totalPages,
    rangeStart,
    rangeEnd,
    hasActiveFilter,
    handleLargeCategoryChange,
    resetFilters,
    goToPreviousPage,
    goToNextPage,
  };
}
