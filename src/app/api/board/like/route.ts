import { NextResponse } from 'next/server';

import { getBoardLikeStatus, toggleBoardLike } from '@/lib/board/like';

export async function GET(request: Request) {
  const boardId = new URL(request.url).searchParams.get('boardId');

  if (!boardId) {
    return NextResponse.json(
      { error: 'boardId가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    const data = await getBoardLikeStatus(boardId);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '좋아요 상태를 불러오지 못했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { category } = body;
  let boardId: string | undefined;

  try {
    boardId = body.boardId;
  } catch {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  if (!boardId) {
    return NextResponse.json(
      { error: 'boardId가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    const data = await toggleBoardLike(boardId, category);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json(
        { error: '로그인 후 이용해주세요.' },
        { status: 401 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { error: '좋아요 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
}
