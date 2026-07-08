import { BoardComment } from '@/types/boardType';

export type CommentOptimisticAction =
  | { type: 'update'; comment: BoardComment }
  | { type: 'delete'; commentId: string };

export const reduceOptimisticComments = (
  current: BoardComment[],
  action: CommentOptimisticAction,
): BoardComment[] => {
  switch (action.type) {
    case 'update':
      return current.map((item) =>
        item.id === action.comment.id ? action.comment : item,
      );
    case 'delete':
      return current.filter((item) => item.id !== action.commentId);
  }
};
