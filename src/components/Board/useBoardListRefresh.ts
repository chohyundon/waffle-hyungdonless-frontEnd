'use client';

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect } from 'react';

import { updateStore } from '@/store/update';

const refreshBoardList = (router: AppRouterInstance) => {
  if (!updateStore.getState().update) return;

  router.refresh();
  updateStore.getState().setUpdate(false);
};

export const useBoardListRefresh = (router: AppRouterInstance) => {
  useEffect(() => {
    refreshBoardList(router);

    return updateStore.subscribe((state, prevState) => {
      if (!state.update || prevState.update) return;

      refreshBoardList(router);
    });
  }, [router]);
};
