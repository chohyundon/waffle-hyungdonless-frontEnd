# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project

사회초년생(early-career adults)을 위한 커뮤니티 서비스 "사부작 사부작". Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS + Supabase + TanStack Query + Zustand + Gemini/OpenAI API 기반 프로젝트.

## Commands

```bash
pnpm run dev          # Next.js dev server on http://localhost:3000
pnpm run build        # Production build
pnpm run start        # Serve the production build
pnpm run lint         # ESLint over the whole repo (eslint .)
pnpm run format       # Prettier check on ./src
pnpm run format:fix   # Prettier write on ./src
```

## Architecture

표준 Next.js App Router 구조:

```
src/
  app/          # 라우트, 레이아웃, API
  components/   # UI 컴포넌트 (기능별 폴더)
  lib/          # 유틸, Supabase 클라이언트, hooks
  types/        # TypeScript 타입
  assets/       # SVG 등 정적 에셋
```
