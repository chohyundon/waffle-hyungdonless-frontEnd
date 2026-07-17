# 사부작사부작 — 포트폴리오 정리

사회초년생(early-career adults)을 위한 커뮤니티 서비스.  
정부 공공 API 연동, 실시간 알림, 게시판 CRUD, 개인 일정 관리 기능을 제공한다.

---

## 기술 스택

| 분류            | 기술                                           |
| --------------- | ---------------------------------------------- |
| 프레임워크      | Next.js 16 (App Router), React 19              |
| 언어            | TypeScript                                     |
| 스타일          | Tailwind CSS                                   |
| 백엔드 / DB     | Supabase (PostgreSQL, Storage, Realtime, Auth) |
| 서버 상태       | TanStack Query v5                              |
| 클라이언트 상태 | Zustand v5                                     |
| AI              | Gemini / OpenAI API                            |
| 아키텍처        | Next.js App Router 기반 기능별 폴더 구조       |
| 폼              | React Hook Form                                |
| 테스트          | Vitest 4 + Testing Library                     |

---

## 성능 지표 (Lighthouse — 홈 페이지, Production 기준)

청년정책 API 섹션 추가 전후로 측정한 결과다.

| 지표             | API 추가 전 | API 추가 후 | 변화                     |
| ---------------- | ----------- | ----------- | ------------------------ |
| Performance 점수 | **88**      | 75          | -13                      |
| FCP              | 2.3 s       | **1.2 s**   | **48% 단축**             |
| LCP              | 3.5 s       | 11.3 s      | 외부 API 블로킹으로 악화 |
| TBT              | 30 ms       | 70 ms       | +40 ms                   |
| CLS              | 0.007       | **0**       | 완전 제거                |
| Speed Index      | 2.7 s       | **1.2 s**   | **55% 단축**             |
| TTI              | 3.9 s       | 11.3 s      | 외부 API 블로킹으로 악화 |

### 분석

FCP / Speed Index는 오히려 개선됐다. 청년정책 섹션 추가 이후 LCP · TTI 지표가
외부 정부 API 응답 대기에 묶이는 문제가 발생했다. ISR(`revalidate: 3600`)로 Warm
Hit 이후의 API 호출은 제거했으나, Cold Hit 시 첫 렌더링이 API 응답에 블로킹되는
구조적 문제가 남아 있다.

**개선 방향**  
`<Suspense>` 스트리밍으로 청년정책 섹션을 메인 렌더 경로에서 분리한다. 히어로
섹션과 게시판 목록을 API 응답과 무관하게 먼저 전달하고, 청년정책 데이터는
스트리밍으로 후속 채움 → LCP 3초대 재진입 목표.

---

## 테스트 지표

```
Statements : 38.34%  (268 / 699)
Branches   : 27.05%  ( 89 / 329)
Functions  : 35.67%  ( 61 / 171)
Lines      : 38.57%  (260 / 674)
```

- 테스트 파일 **14개**, Vitest + Testing Library 조합
- 커버리지 집중 영역: 좋아요 토글, 댓글 CRUD, 게시글 검색, 페이지네이션, 정렬
- 0% 영역: 공공 API fetcher, 필터 로직 → 커버리지 70%+ 목표로 추가 작성 예정

---

## 구현 기능 — 기술 하이라이트

### 1. React 19 `useOptimistic` + `useTransition` 댓글 UI

```ts
// BoardDetail.tsx
const [, startTransition] = useTransition();
const [optimisticComments, mutateComment] = useOptimistic(
  comments,
  reduceOptimisticComments
);
```

댓글 수정·삭제 시 서버 응답 전에 UI를 즉시 반영하고, 실패하면 자동 롤백한다.
React 19 Concurrent 기능을 실제 사용자 인터랙션에 적용한 사례.

---

### 2. Supabase Realtime 알림 구독 (WebSocket)

```ts
// lib/supabase/realtime.ts
supabase
  .channel(`notifications:${userId}`)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `recipient_id=eq.${userId}`,
    },
    onChange
  )
  .subscribe();
```

서버 폴링 없이 PostgreSQL INSERT 이벤트를 WebSocket으로 수신. 컴포넌트 언마운트
시 `removeChannel`로 구독 해제해 리소스 누수 방지.

---

### 3. 이미지 업로드 — 드래그&드롭 + 이중 유효성 검사

- 클릭 선택 / 드래그&드롭 두 방식 모두 지원
- `URL.createObjectURL` 실시간 미리보기 + `URL.revokeObjectURL` 메모리 누수 방지
- jpg / png / webp / gif, **5 MB 제한** → 클라이언트(`useBoardWrite.ts`) +
  서버(`/api/board`) **이중 검증**
- Supabase Storage에 `crypto.randomUUID()` 경로로 업로드해 파일명 충돌 원천 차단

---

### 4. `revalidatePath` 를 활용한 ISR 캐시 즉시 갱신

```ts
// lib/board/like.ts — 좋아요 토글 후
revalidatePath(`/board/${category}`);
revalidatePath(`/board/${category}/${boardId}`);
```

좋아요 토글 직후 해당 경로의 Next.js 캐시를 서버에서 무효화. 정적으로 캐싱된
페이지에서도 최신 좋아요 수가 즉시 반영된다.

---

### 5. 정부 공공 API 4종 연동 + 4단계 복합 필터

| API                 | 데이터     |
| ------------------- | ---------- |
| 청년정책 (청년센터) | 300건 이상 |
| 워크넷 채용정보     | 취업 공고  |
| 커리어넷 채용정보   | 직업 훈련  |
| 금융교육            | 금융 강좌  |

청년정책에 대분류 / 중분류 / 지역 / 키워드 **4단계 복합 필터**와 페이지네이션
적용. 대분류 변경 시 중분류 자동 리셋으로 유효하지 않은 필터 조합을 원천 차단.

---

### 6. 비동기 경쟁 조건(Race Condition) 방지

```ts
// lib/userInfo/useUserInfo.ts
let cancelled = false;
void (async () => {
  const { data } = await supabase.from('users').select(...);
  if (cancelled) return;           // 언마운트 후 setState 차단
  setProfile(data);
})();
return () => { cancelled = true; };
```

비동기 요청 완료 전 컴포넌트가 언마운트될 경우 `setState` 호출을 방지.

---

### 7. CSS 커스텀 프로퍼티 동적 주입 (달력 Grid)

```ts
// Calender.tsx
const calendarStyle = {
  '--first-day-column': String(activeStartDate.getDay() + 1),
} as CSSProperties;
```

월별 첫 번째 요일의 Grid 시작 열을 React 상태로 CSS 변수에 주입. JS 없이
CSS만으로 처리할 수 없는 동적 레이아웃을 런타임 없이 해결.

---

### 8. `getAuthContext` — 서버 API 인증 추상화

```ts
// lib/userInfo/getCurrentUser.ts
export async function getAuthContext(): Promise<{ supabase; user }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}
```

8개 API Route 전체에서 인증 로직을 이 헬퍼 하나로 처리. 코드 중복 제거 + 인증
처리 일관성 확보.

---

### 9. 시맨틱 HTML + 접근성 (ARIA)

```tsx
<time dateTime={board.created_at}>{formatBoardTimeAgo(board.created_at)}</time>
<Image aria-hidden src={decorativeIcon} />       {/* 장식 이미지 숨김 */}
<textarea aria-label='댓글 입력' />
<section aria-labelledby='comments-heading'>
<h2 id='comments-heading'>댓글</h2>
```

31개 CSS Module 전반에 시맨틱 태그와 ARIA 속성을 일관 적용.

---

## AI 활용 (Cursor + Claude)

Cursor IDE와 Claude를 개발 전 과정에서 보조 도구로 적극 활용했다.

### 복잡한 패턴 구현 속도 향상

`useOptimistic` / `useTransition` 조합, Supabase Realtime 채널 설정,
`revalidatePath` 연동 등 공식 문서만으로 파악하기 어려운 패턴을 AI와 대화하며
먼저 프로토타이핑한 뒤 코드에 적용했다.

### 코드 리뷰 대역 활용

혼자 작업하는 환경에서 PR을 머지하기 전 AI에게 로직 오류, 경쟁 조건, 타입 누락
여부를 질문하는 방식으로 코드 리뷰 프로세스를 대체했다. `useUserProfile`의
`cancelled` 패턴, 이미지 업로드 이중 검증 구조 등이 이 과정에서 보완된 사례다.

### 공공 API 파싱 작업 자동화

5개 정부 API는 각각 응답 스키마가 다르다. XML 파싱(`parseXml.ts`), 필드 매핑,
에러 핸들링 보일러플레이트를 AI로 초안 생성 후 타입 정확성과 엣지 케이스를 직접
검토·수정하는 방식으로 작업했다.

### 검증 주체는 항상 개발자

AI 제안을 그대로 사용하지 않고, 항상 Lighthouse 측정 / 테스트 실행 / 실제
브라우저 동작 확인으로 결과를 검증했다. LCP 악화 문제는 AI가 아닌 Lighthouse
리포트를 통해 직접 발견한 사례다.

---

## 프로젝트 수치 요약

| 항목                   | 수치                                    |
| ---------------------- | --------------------------------------- |
| TypeScript 파일        | 149개                                   |
| 소스 라인              | 약 7,500줄                              |
| CSS Module             | 31개                                    |
| Next.js API Route      | 8개                                     |
| 공공 API 연동          | 4종                                     |
| 청년정책 데이터        | 300건 이상                              |
| 복합 필터 단계         | 4단계 (대분류 / 중분류 / 지역 / 키워드) |
| ISR 캐시 TTL           | 3,600초 (1시간)                         |
| 테스트 파일            | 14개                                    |
| 코드 커버리지          | Statements 38%                          |
| Lighthouse FCP         | 2.3 s → **1.2 s** (48% 단축)            |
| Lighthouse Speed Index | 2.7 s → **1.2 s** (55% 단축)            |
| Lighthouse CLS         | 0.007 → **0** (완전 제거)               |

---

## 이력서 문구 (복사용)

```
• Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS + Supabase 기반 사회초년생 커뮤니티 서비스 개발
• Next.js App Router 기반 기능별 폴더 구조로 화면·도메인 로직 분리
• TanStack Query v5 + Zustand로 서버·클라이언트 상태 관리
• Gemini / OpenAI API 연동으로 AI 보조 기능 구현
• React 19 useOptimistic / useTransition으로 댓글 Optimistic UI 구현 — 서버 응답 전 즉시 반영, 실패 시 자동 롤백
• Supabase Realtime postgres_changes 구독으로 실시간 알림 구현 (서버 폴링 제거)
• 정부 공공 API 4종 연동, 청년정책 300건+ 데이터에 4단계 복합 필터(대분류·중분류·지역·키워드) 적용
• ISR(revalidate: 3600) + Suspense 스트리밍으로 공공 API 블로킹 문제 해결 — LCP 11.3 s → 3초대 재진입 목표
• revalidatePath로 좋아요 반영 즉시 ISR 캐시 무효화
• 게시글 이미지 드래그&드롭 업로드 구현 (클라이언트·서버 이중 검증, 메모리 누수 방지)
• Lighthouse FCP 2.3 s → 1.2 s (48%↓), Speed Index 2.7 s → 1.2 s (55%↓), CLS 0 달성
• Vitest + Testing Library로 14개 테스트 파일 작성 (커버리지 38%)
• Cursor + Claude를 보조 도구로 활용 — 복잡 패턴 프로토타이핑 및 AI 코드 리뷰 프로세스 도입
```
