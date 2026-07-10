'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BOARD_DETAIL_MAP } from '@/components/Board/consts/boardCategories';
import { useBoardListRefresh } from '@/components/Board/useBoardListRefresh';
import { useUserProfile } from '@/lib/userInfo/useUserInfo';
import type { BoardItem } from '@/types/boardType';

export const useBoardHomeMain = (boardList: BoardItem[]) => {
  const [boardState, setBoardState] = useState('latest');
  const router = useRouter();
  const { profile: userData, loading: profileLoading } = useUserProfile();

  useBoardListRefresh(router);

  const detailTitle = BOARD_DETAIL_MAP.popular;
  const postCount = boardList.filter(
    (item) => item.email === userData?.email
  ).length;

  const handleWrite = () => {
    router.push(userData ? '/write' : '/login');
  };

  const handleSortTabClick = (key: string) => {
    setBoardState(key);
  };

  return {
    boardList,
    boardState,
    detailTitle,
    postCount,
    profileLoading,
    userData,
    handleWrite,
    handleSortTabClick,
  };
};
