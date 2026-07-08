---
name: test
description: >-
  Vitest + React Testing Library로 이 프로젝트의 컴포넌트/UI 테스트를
  작성·수정·리뷰한다. 테스트 추가, vitest 설정, fetch mock, BoardLikeButton 같은
  상호작용 테스트 요청 시 사용.
---

# Vitest 테스트 가이드

## Instructions

### 프로젝트 구조

테스트는 `src/`와 분리해 `tests/` 아래에 둔다. 경로는 `src` 구조를 그대로
미러링한다.

```
tests/
├── setup/
│   └── vitest.setup.ts          # 공통 mock (next/image 등)
└── components/
    └── Board/
        └── likeButton/
            └── BoardLikeButton.test.tsx
```

- 설정 파일: `vitest.config.mts` (`.ts` 아님)
- 실행: `pnpm test` (watch) / `pnpm test --run` (CI·1회)
- JSX 테스트 파일은 반드시 `.test.tsx` 확장자 사용
- import는 `@/` 절대경로 사용 (`src/` 규칙과 동일)

### vitest.config.mts

```ts
test: {
  environment: 'jsdom',
  setupFiles: ['./tests/setup/vitest.setup.ts'],
  include: ['tests/**/*.{test,spec}.{ts,tsx}'],
}
```

`tests/setup/vitest.setup.ts`에 `next/image` mock이 이미 있다. 새 테스트에서
중복 mock하지 않는다.

### 요소 선택 우선순위

1. **Role + 접근 이름** — `getByRole('button', { name: /로그인/ })`
2. **Label** — `getByLabelText('비밀번호')`
3. **Text** — `getByText('계정 만들기')`
4. **Placeholder** — `getByPlaceholderText('이메일을 입력하세요')`
5. **Test ID** — `getByTestId('submit-button')` (최후의 수단)

CSS 클래스(`.login-button`)나 DOM 구조(`div > form > button`)로 선택하지 않는다.

### 조회 메서드

| 메서드     | 용도                                  |
| ---------- | ------------------------------------- |
| `getBy*`   | 반드시 존재하는 요소                  |
| `queryBy*` | 존재하지 않음을 검증 (부재 확인)      |
| `findBy*`  | 비동기로 나타나는 요소 (`await` 필요) |

```tsx
// 있어야 함
expect(screen.getByRole('button', { name: /로그인/ })).toBeTruthy();

// 없어야 함
expect(screen.queryByText('오류')).toBeNull();

// 비동기 (state 업데이트 후 UI 반영)
expect(await screen.findByText('완료')).toBeTruthy();
```

> `@testing-library/jest-dom`은 현재 미설치. `toBeInTheDocument()` 대신
> `toBeTruthy()`, `toBeNull()`, `(el as HTMLButtonElement).disabled` 등 Vitest
> 기본 matcher를 사용한다.

### 테스트 설명 & 구조

- 형식: **`[조건 또는 행동]하면 [기대 결과]한다`**
- 한 테스트에 **하나의 주요 동작/결과**만 검증
- Arrange → Act → Assert 순서 유지

```tsx
it('유효한 이메일과 비밀번호를 입력하면 로그인 요청을 실행한다', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.type(
    screen.getByRole('textbox', { name: /이메일/ }),
    'test@example.com'
  );
  await user.click(screen.getByRole('button', { name: /로그인/ }));

  expect(await screen.findByText('완료')).toBeTruthy();
});
```

### 사용자 이벤트

`fireEvent` 대신 `@testing-library/user-event` 사용.

```tsx
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();
await user.type(input, '텍스트');
await user.click(button);
await user.clear(input);
```

`userEvent.setup()` 없이 `await userEvent.click(button)`도 가능하나, 한 테스트
안에서는 `setup()` 인스턴스를 쓰는 편이 안전하다.

### 비동기

- `findBy*` 또는 `waitFor`로 UI 갱신을 기다린다
- `setTimeout`으로 대기하지 않는다

```tsx
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

### 모킹 (필요한 범위만)

#### fetch (API 호출 — 이 프로젝트 기본 패턴)

MSW는 설치되어 있지 않다. `vi.stubGlobal('fetch', ...)`를 사용한다.

```tsx
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ liked: true, like_count: 1 }),
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});
```

#### 모듈

```tsx
vi.mock('react-toastify', () => ({
  toast: { error: vi.fn() },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));
```

#### 함수

```tsx
const handleSubmit = vi.fn();
vi.mocked(someFn).mockResolvedValue({ id: '1' });
```

### 격리

- `beforeEach` / `afterEach`에서 mock·stub을 정리한다 (`cleanup()`,
  `vi.unstubAllGlobals()`)
- 테스트 간 state·mock 공유 금지
- 전역 mock은 `tests/setup/vitest.setup.ts` 또는 해당 describe 블록 안에만 둔다

### 대원칙

구현 세부사항(className, 내부 state 이름)이 아니라 **사용자에게 보이는
동작**(텍스트, 버튼 활성/비활성, 역할)을 검증한다.

## Examples

### BoardLikeButton — 클릭 후 count 증가

참고: `tests/components/Board/likeButton/BoardLikeButton.test.tsx`

```tsx
it('좋아요 버튼을 클릭하면 좋아요 수가 1 증가한다', async () => {
  render(<BoardLikeButton board={board} user={user} />);

  await userEvent.click(screen.getByRole('button', { name: /좋아요 0/ }));

  expect(await screen.findByRole('button', { name: /좋아요 1/ })).toBeTruthy();
  expect(fetch).toHaveBeenCalledWith(
    '/api/board/like',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ boardId: board.id }),
    })
  );
});
```

### BoardDetail — 댓글 등록 API POST

참고: `tests/components/Board/BoardDetail.test.tsx`

```tsx
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: { id: 'comment-1' } }),
    })
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it('댓글을 입력하고 등록하면 comment API로 POST 요청을 보낸다', async () => {
  const user = userEvent.setup();
  render(<BoardDetail board={board} />);

  const textarea = screen.getByPlaceholderText('댓글을 입력해주세요');
  await user.type(textarea, '첫 번째 댓글');
  await user.click(screen.getByRole('button', { name: /댓글 등록/ }));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      '/api/board/comment',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          boardId: board.id,
          content: '첫 번째 댓글',
        }),
      })
    );
  });

  expect(toast.success).toHaveBeenCalledWith('댓글 등록에 성공했습니다');
  expect((textarea as HTMLTextAreaElement).value).toBe('');
});
```

### BoardCommentItem — 댓글 삭제 API DELETE

참고: `tests/components/Board/comment/BoardCommentItem.test.tsx`

```tsx
beforeEach(() => {
  vi.stubGlobal(
    'confirm',
    vi.fn(() => true)
  );
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
  );
});

it('삭제를 확인하면 DELETE API를 호출하고 성공 토스트를 표시한다', async () => {
  const user = userEvent.setup();
  render(
    <ul>
      <BoardCommentItem
        comment={comment}
        currentUserId='user-1'
        onMutate={onMutate}
      />
    </ul>
  );

  await user.click(screen.getByRole('button', { name: '삭제' }));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      `/api/board/comment?commentId=${encodeURIComponent(comment.id)}`,
      { method: 'DELETE' }
    );
  });

  expect(toast.success).toHaveBeenCalledWith('댓글이 삭제되었습니다');
  expect(onMutate).toHaveBeenCalledTimes(1);
});
```

`window.confirm`도 `vi.stubGlobal('confirm', ...)`으로 mock한다.

### 새 컴포넌트 테스트 추가 절차

1. `src/components/Foo/Bar.tsx` → `tests/components/Foo/Bar.test.tsx` 생성
2. `render` + `screen.getByRole`로 초기 UI 검증
3. API를 쓰면 `vi.stubGlobal('fetch', ...)` 추가
4. `pnpm test --run`으로 통과 확인

## Troubleshooting

| 증상                     | 해결                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| JSX parse error          | 파일 확장자를 `.test.tsx`로 변경                                 |
| `@/` import 실패         | `vitest.config.mts`의 `vite-tsconfig-paths` 확인                 |
| `next/image` 에러        | `tests/setup/vitest.setup.ts` mock 확인                          |
| 클릭 후 UI 안 바뀜       | `fetch` mock 응답에 컴포넌트가 기대하는 JSON 필드 포함 여부 확인 |
| 여러 submit 버튼이 잡힘  | `afterEach`에 `cleanup()` 추가                                   |
| `user-event` import 실패 | `pnpm add -D @testing-library/user-event`                        |
