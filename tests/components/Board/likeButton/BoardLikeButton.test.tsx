import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BoardLikeButton } from '@/components/Board/likeButton/BoardLikeButton';

describe('BoardLikeButton', () => {
  it('좋아요 수와 pressed 상태를 표시한다', () => {
    render(
      <BoardLikeButton
        liked={true}
        likeCount={3}
        isLiking={false}
        handleLikeClick={vi.fn()}
      />
    );

    const button = screen.getByRole('button', { name: /좋아요 3/ });
    expect(button).toBeTruthy();
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('클릭하면 handleLikeClick을 호출한다', async () => {
    const handleLikeClick = vi.fn();

    render(
      <BoardLikeButton
        liked={false}
        likeCount={0}
        isLiking={false}
        handleLikeClick={handleLikeClick}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /좋아요 0/ }));

    expect(handleLikeClick).toHaveBeenCalledTimes(1);
  });

  it('처리 중이면 버튼을 비활성화한다', () => {
    render(
      <BoardLikeButton
        liked={false}
        likeCount={1}
        isLiking={true}
        handleLikeClick={vi.fn()}
      />
    );

    expect(
      (screen.getByRole('button', { name: /좋아요 1/ }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });
});
