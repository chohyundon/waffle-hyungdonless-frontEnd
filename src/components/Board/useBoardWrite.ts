import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import {
  BOARD_CATEGORY_NAMES,
  CATEGORY_NAME_TO_SLUG,
  HEAD_CATEGORIES,
} from '@/components/Board/consts/boardCategories';
import { defaultBoardPath } from '@/components/MainCenter/homeButton';
import { fetchCurrentUserProfile } from '@/lib/userInfo/useUserInfo';

export const useBoardWrite = () => {
  const router = useRouter();

  const [categoryValue, setCategoryValue] = useState({
    category: '',
    detail: '',
  });

  const [inputValue, setInputValue] = useState({
    title: '',
    value: '',
  });

  const handleChange = (value: string) => {
    setCategoryValue((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleBottomChange = (value: string) => {
    setCategoryValue((prev) => ({
      ...prev,
      detail: value,
    }));
  };

  const handleTitleInputChange = (value: string) => {
    setInputValue((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleTextChange = (value: string) => {
    setInputValue((prev) => ({
      ...prev,
      value,
    }));
  };

  const handleSubmit = async () => {
    if (!categoryValue.category) {
      toast.warn('카테고리를 선택해주세요.');
      return;
    }

    if (!categoryValue.detail) {
      toast.warn('말머리를 선택해주세요.');
      return;
    }

    if (!inputValue.title.trim()) {
      toast.warn('제목을 입력해주세요.');
      return;
    }

    if (!inputValue.value.trim()) {
      toast.warn('내용을 입력해주세요.');
      return;
    }

    const userData = await fetchCurrentUserProfile();

    if (!userData) {
      toast.error('로그인 후 이용해주세요.');
      return;
    }

    const boardData = JSON.stringify({
      title: inputValue.title,
      content: inputValue.value,
      boardType: CATEGORY_NAME_TO_SLUG[categoryValue.category] || '',
      category: categoryValue.detail,
    });

    const formData = new FormData();
    formData.append('board', boardData);
    formData.append('image', '');

    try {
      const response = await fetch('/api/board', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        toast.error(data?.error ?? '글쓰기에 실패했습니다.');
        return;
      }

      toast.success('글이 등록되었습니다.');
      router.push(`${defaultBoardPath}`);
    } catch (error) {
      console.error(error);
      toast.error('글쓰기에 실패했습니다.');
    }
  };

  return {
    selectCategory: BOARD_CATEGORY_NAMES,
    headCategory: HEAD_CATEGORIES,
    categoryValue,
    inputValue,
    handleChange,
    handleBottomChange,
    handleTitleInputChange,
    handleTextChange,
    handleSubmit,
  };
};
