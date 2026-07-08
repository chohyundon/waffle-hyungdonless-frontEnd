'use client';

import styles from '@/components/MainCenter/styles/YouthPolicySection.module.css';
import { YouthPolicyCard } from '@/components/MainCenter/youthPolicy/YouthPolicyCard';
import { YouthPolicyFilters } from '@/components/MainCenter/youthPolicy/YouthPolicyFilters';
import { YouthPolicyPagination } from '@/components/MainCenter/youthPolicy/YouthPolicyPagination';
import { useYouthPolicyFilters } from '@/components/MainCenter/youthPolicy/useYouthPolicyFilters';
import type { YouthPolicy } from '@/types/publicDataType';

export function YouthPolicySection({ policies }: { policies: YouthPolicy[] }) {
  const {
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
  } = useYouthPolicyFilters(policies);

  if (policies.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby='policy-heading'>
      <div className={styles.header}>
        <div>
          <h2 id='policy-heading' className={styles.title}>
            <span className={styles.accent}>청년</span> 정책
          </h2>
          <p className={styles.desc}>
            사회초년생을 위한 지원 정보 {policies.length}건을 모았어요.
          </p>
        </div>
        <p className={styles.count} aria-live='polite'>
          {filteredPolicies.length === 0
            ? '0건'
            : `${rangeStart}-${rangeEnd} / ${filteredPolicies.length}건`}
        </p>
      </div>

      <YouthPolicyFilters
        search={search}
        onSearchChange={setSearch}
        largeCategory={largeCategory}
        mediumCategory={mediumCategory}
        location={location}
        largeCategories={largeCategories}
        mediumCategories={mediumCategories}
        locations={locations}
        hasActiveFilter={hasActiveFilter}
        onLargeCategoryChange={handleLargeCategoryChange}
        onMediumCategoryChange={setMediumCategory}
        onLocationChange={setLocation}
        onReset={resetFilters}
      />

      {filteredPolicies.length === 0 ? (
        <p className={styles.empty}>조건에 맞는 정책이 없습니다.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {paginatedPolicies.map((policy) => (
              <YouthPolicyCard key={policy.plcyNo} policy={policy} />
            ))}
          </ul>

          <YouthPolicyPagination
            page={page}
            totalPages={totalPages}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
          />
        </>
      )}
    </section>
  );
}
