import type { SupabaseClient } from '@supabase/supabase-js';

export const BOARD_IMAGE_BUCKET = 'board-images';

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const getImageExtension = (file: File) => {
  const fromName = file.name.split('.').pop()?.toLowerCase();

  if (fromName && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fromName)) {
    return fromName === 'jpeg' ? 'jpg' : fromName;
  }

  switch (file.type) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    default:
      return 'jpg';
  }
};

export const uploadBoardImage = async ({
  supabase,
  userId,
  file,
}: {
  supabase: SupabaseClient;
  userId: string;
  file: File;
}) => {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { error: 'jpg, png, webp, gif 이미지만 업로드할 수 있습니다.' };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { error: '이미지는 5MB 이하만 업로드할 수 있습니다.' };
  }

  const extension = getImageExtension(file);
  const path = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(BOARD_IMAGE_BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error(uploadError);
    return { error: '이미지 업로드에 실패했습니다.' };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BOARD_IMAGE_BUCKET).getPublicUrl(path);

  return { publicUrl };
};
