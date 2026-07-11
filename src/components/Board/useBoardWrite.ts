import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import {
  BOARD_CATEGORY_NAMES,
  CATEGORY_NAME_TO_SLUG,
  HEAD_CATEGORIES,
} from '@/components/Board/consts/boardCategories';
import { defaultBoardPath } from '@/components/MainCenter/homeButton';
import { fetchCurrentUserProfile } from '@/lib/userInfo/useUserInfo';

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))}KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
};

export const useBoardWrite = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categoryValue, setCategoryValue] = useState({
    category: '',
    detail: '',
  });

  const [inputValue, setInputValue] = useState({
    title: '',
    value: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  useEffect(() => {
    if (!image) {
      setImagePreviewUrl(null);
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreviewUrl(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [image]);

  const validateImageFile = (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      toast.warn('jpg, png, webp, gif 이미지만 업로드할 수 있습니다.');
      return false;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.warn('이미지는 5MB 이하만 업로드할 수 있습니다.');
      return false;
    }

    return true;
  };

  const setSelectedImage = (file: File | null) => {
    if (!file) {
      setImage(null);
      return;
    }

    if (!validateImageFile(file)) {
      return;
    }

    setImage(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
    }

    e.target.value = '';
  };

  const handleImageRemove = () => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDraggingImage(true);
  };

  const handleImageDragLeave = () => {
    setIsDraggingImage(false);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDraggingImage(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      setSelectedImage(file);
    }
  };

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
    if (image) {
      formData.append('image', image as Blob);
    }

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
      router.push(defaultBoardPath);
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
    image,
    imagePreviewUrl,
    isDraggingImage,
    fileInputRef,
    formatFileSize,
    handleImageChange,
    handleImageRemove,
    openImagePicker,
    handleImageDragOver,
    handleImageDragLeave,
    handleImageDrop,
    handleChange,
    handleBottomChange,
    handleTitleInputChange,
    handleTextChange,
    handleSubmit,
  };
};
