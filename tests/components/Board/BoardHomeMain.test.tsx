import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BoardHomeMain } from '@/components/Board/BoardHomeMain';
import { updateStore } from '@/store/update';
import type { BoardItem } from '@/types/boardType';

const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: mockRefresh }),
}));

vi.mock('@/lib/userInfo/useUserInfo', () => ({
  useUserProfile: () => ({ profile: null, loading: false }),
}));

const createPost = (overrides: Partial<BoardItem> = {}): BoardItem => ({
  id: 'board-1',
  user_id: 'user-1',
  title: '포트폴리오 피드백 요청',
  content: '포트폴리오 리뷰 부탁드립니다.',
  board_type: 'portfolio',
  category: '포트폴리오 피드백',
  nickname: '테스트유저',
  email: 'test@test.com',
  image_url: null,
  view_count: 10,
  like_count: 2,
  comment_count: 1,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('BoardHomeMain', () => {
  beforeEach(() => {
    updateStore.setState({ update: false });
    mockRefresh.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('update가 true로 바뀌면 router.refresh를 호출한다', async () => {
    const initialPost = createPost();

    render(<BoardHomeMain boardList={[initialPost]} category='portfolio' />);

    updateStore.getState().setUpdate(true);

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });

    expect(updateStore.getState().update).toBe(false);
  });

  it('상세에서 update가 true인 채로 돌아오면 마운트 시 router.refresh를 호출한다', async () => {
    const initialPost = createPost();

    updateStore.setState({ update: true });

    render(<BoardHomeMain boardList={[initialPost]} category='portfolio' />);

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });

    expect(updateStore.getState().update).toBe(false);
  });

  it('첨부 이미지가 있는 게시글은 목록 카드에 썸네일을 표시한다', () => {
    const imageUrl =
      'https://example.supabase.co/storage/v1/object/public/board-images/user-1/sample.png';

    render(
      <BoardHomeMain
        boardList={[createPost({ image_url: imageUrl })]}
        category='portfolio'
      />
    );

    expect(screen.getByText('포트폴리오 피드백 요청')).toBeTruthy();
    expect(
      screen.getByRole('img', {
        name: '포트폴리오 피드백 요청 게시글 첨부 이미지',
      })
    ).toBeTruthy();
  });
});
