# 사부작 사부작

사회초년생(직장인 초년생)을 위한 커뮤니티 서비스입니다.
직장생활·재정관리·인간관계 등 초년생이 겪는 어려움을 서로 나누고 함께 성장하는
공간을 목표로 합니다.

<br />

## 팀원 구성

| 팀원   | 역할               | 사진                                                                                                                                |
| ------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 도니   | Frontend Developer | <img src="https://github.com/user-attachments/assets/09611484-c985-42cf-a9d5-f1018824d9f2" width="150" height="150" alt="도니" />   |
| 준     | Backend Developer  | <img src="https://github.com/user-attachments/assets/6e521cc2-58d7-47d9-9740-3e1e654f17f2" width="150" height="150" alt="준" />     |
| 이브   | Backend Developer  | <img src="https://github.com/user-attachments/assets/304960b4-c38d-4c24-a9d5-c6ec61891d33" width="150" height="150" alt="이브" />   |
| 노라   | UI/UX Designer     | <img src="https://github.com/user-attachments/assets/a7e9c4be-7af8-44bf-9e51-25448b4a9b26" width="150" height="150" alt="노라" />   |
| 클레어 | UI/UX Designer     | <img src="https://github.com/user-attachments/assets/d4b7fdf2-7904-42e7-bd1c-68ac27307f1f" width="150" height="150" alt="클레어" /> |

<br />

## 기술 스택

| 분류            | 기술                                 |
| --------------- | ------------------------------------ |
| Framework       | Next.js 16 (App Router)              |
| Language        | TypeScript 6                         |
| UI              | React 19                             |
| Styling         | Tailwind CSS                         |
| 서버 상태       | TanStack Query v5                    |
| 클라이언트 상태 | Zustand v5                           |
| 폼              | React Hook Form                      |
| Backend / DB    | Supabase (PostgreSQL, Auth, Storage) |
| AI              | Gemini / OpenAI API                  |
| 아키텍처        | Next.js App Router 기반 기능별 폴더 구조 |
| 테스트          | Vitest, Testing Library              |
| 패키지 매니저   | pnpm                                 |

<br />

## 주요 기능

### 홈 화면

- 게시판 카테고리 빠른 접근 (직장, 재정, 인간관계 등)
- 인기 게시글 목록 (좋아요 수 기준)
- 청년정책 섹션 (검색·카테고리·지역 필터, 페이지네이션)

### 게시판

- 카테고리별 게시글 목록 및 상세 조회
- 게시글 작성·수정·삭제 (이미지 첨부 포함)
- 좋아요 토글
- 댓글 작성·수정·삭제 (Optimistic UI 적용)
- 작성자 프로필 아바타 표시

### 청년정책

- 청년정책 공공 API 데이터를 Supabase DB에 동기화
- 정책명·설명·키워드 기반 텍스트 검색
- 대분류·중분류 카테고리 필터
- 우편번호 기반 지역 필터 (시도 단위)
- 서버사이드 페이지네이션 (9건/페이지)

### 캘린더

- 월간 캘린더 뷰
- 날짜별 일정 등록·조회

### 알림

- 내 게시글에 달린 댓글 알림 수신
- 읽음/안읽음 상태 관리

### 검색

- 게시글 제목·내용 키워드 검색

### 인증

- Supabase Auth 기반 로그인·회원가입
- 세션 유지 (SSR 쿠키)

<br />

## 성능 개선

| 개선 내용               | 방법                                                            | 효과                                                 |
| ----------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| 청년정책 응답 속도      | 공공 API 2,000건 → Supabase DB 동기화 + 서버사이드 페이지네이션 | 2,448ms → 68ms (97% 단축)                            |
| 외부 API 중복 호출 제거 | Next.js `fetch` 캐싱 (`revalidate: 3600`) 적용                  | 캐시 히트 시 외부 API 왕복 생략                      |
| 댓글 UX                 | React 19 `useOptimistic` + `startTransition`                    | 서버 응답 전 UI 즉시 반영, 실패 시 자동 롤백         |
| 필터 연산 이전          | 클라이언트 JS 필터링 → Supabase PostgreSQL RPC 함수             | DB에서 필터·검색 처리, 클라이언트 전송 데이터 최소화 |

<br />

## 시작하기

```bash
# 패키지 설치
pnpm install

# 환경 변수 설정 (.env 파일 생성)
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# YOUTH_CENTER_API_KEY=...

# 개발 서버 실행
pnpm dev
```

| 명령어               | 설명                                   |
| -------------------- | -------------------------------------- |
| `pnpm dev`           | 개발 서버 실행 (http://localhost:3000) |
| `pnpm build`         | 프로덕션 빌드                          |
| `pnpm start`         | 프로덕션 서버 실행                     |
| `pnpm lint`          | ESLint 검사                            |
| `pnpm format:fix`    | Prettier 포맷 적용                     |
| `pnpm test`          | Vitest 테스트 실행                     |
| `pnpm test:coverage` | 커버리지 포함 테스트 실행              |

<br />

## 프로젝트 구조

```
src/
├── app/               # 라우트, 레이아웃, API Route
│   ├── (home)/        # 홈 화면
│   ├── board/         # 게시판
│   ├── calender/      # 캘린더
│   ├── search/        # 검색
│   ├── login/         # 로그인
│   ├── signup/        # 회원가입
│   └── api/           # API Route Handlers
├── components/        # 기능별 UI 컴포넌트
│   ├── Board/
│   ├── Calender/
│   ├── MainCenter/    # 홈 화면 (청년정책 포함)
│   └── NavBar/
├── lib/               # 유틸, Supabase 클라이언트, hooks
│   ├── public-data/   # 청년정책 API/DB 연동
│   └── supabase/
├── types/             # TypeScript 타입 정의
└── assets/            # SVG 등 정적 에셋
```
