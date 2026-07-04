# `app/page.tsx` — 홈(포트폴리오) 페이지

> Claude Code / AI 에이전트용 컨텍스트 문서  
> 대상 파일: [`app/page.tsx`](../app/page.tsx)

## 개요

Inseong 개인 포트폴리오 사이트의 **메인 랜딩 페이지**입니다. Next.js App Router의 루트 경로(`/`)에 해당하며, 단일 파일에 UI·콘텐츠·네비게이션 로직이 모두 포함된 **클라이언트 컴포넌트**입니다.

| 항목 | 내용 |
|------|------|
| 경로 | `app/page.tsx` |
| 라우트 | `/` |
| 렌더링 | `"use client"` — 클라이언트 컴포넌트 |
| 스타일 | Tailwind CSS 유틸리티 + `app/globals.css` 커스텀 클래스 |
| 관련 파일 | `app/layout.tsx`, `app/globals.css`, `app/blog/page.tsx` |

## 기술 스택

- **Next.js 15** (App Router)
- **React 18** (`useState`, `useEffect`)
- **TypeScript**
- **Tailwind CSS 4**
- **next/link** — `/blog` 페이지 링크

## 파일 구조

```
HomePage (default export)
├── 상태: menuOpen (모바일 햄버거 메뉴)
├── 상수: sections (앵커 네비게이션 목록)
├── 데이터: skillCategories, experiences, projects
├── 공유 컴포넌트: MediaCard (이미지 + 하이퍼링크 제목 + bullet + skill chip 카드)
├── useEffect: document scroll-behavior smooth 설정
├── handleScroll: 섹션 앵커 스크롤 (헤더 offset 80px)
└── JSX
    ├── header (고정 네비게이션 + 모바일 드롭다운)
    ├── main (6개 섹션)
    └── footer
```

## 타입 정의

```ts
type Bullet = { text: string; tone: "sky" | "emerald" | "amber" | "violet" };

type Project = {
  title: string;
  badge: string;           // 예: "University Project", "Hackathon"
  skills: string[];
  bullets: Bullet[];
  image?: string;          // 카드 상단 이미지 경로 (예: "/images/xxx.png")
  link?: string;           // 제목 클릭 시 이동할 외부 링크
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  badge: string;
  image?: string;
  link?: string;
  bullets: Bullet[];
  skills: string[];
};
```

- `tone: "sky"` — 프로젝트/경력 요약(lead) bullet. `project-bulletRow--lead` 클래스 적용
- 그 외 tone — 상세 성과/역할 bullet
- `image`/`link`는 둘 다 optional. `image` 미입력 시 `MediaCard`가 placeholder 박스를 렌더링하고, `link` 미입력 시 제목이 일반 텍스트로 렌더링됨

### `MediaCard` 컴포넌트

Projects·Experience 두 섹션이 동일한 카드 레이아웃(상단 이미지 → 배지/메타 → 제목(링크) → bullet 목록 → skill chip)을 공유하므로 `app/page.tsx` 상단에 `MediaCard`를 정의해 재사용합니다. props: `badge`, `title`, `meta?`, `image?`, `link?`, `bullets`, `skills`.

## 섹션 구성

| id | label | 설명 |
|----|-------|------|
| `summary` | About | 자기소개 헤더 |
| `experience` | Experience | `experiences` 배열 기반 카드 목록 (현재 TradieCoach, Pupfish — 내용/이미지/링크는 placeholder, 사용자가 직접 채울 예정) |
| `projects` | Projects | `projects` 배열 기반 카드 목록 |
| `education` | Education | 학력 (Monash, Tech University of Korea) — JSX 하드코딩 |
| `skills` | Skills | `skillCategories` 3개 카드 (Languages, Backend, Tools) |
| `contact` | Contact | 이메일, GitHub, LinkedIn |

**섹션 순서가 변경되었습니다**: Experience가 Projects보다 먼저 표시됩니다 (`sections` 네비게이션 배열과 `<main>` 내 JSX 순서 모두 반영됨).

각 섹션에 `scroll-mt-24` 클래스가 있어 고정 헤더 아래로 스크롤 시 잘리지 않도록 offset을 둡니다.

## 데이터 소스

현재 **모든 콘텐츠는 컴포넌트 내부에 하드코딩**되어 있습니다. 외부 CMS, JSON, API 연동은 없습니다.

### `experiences` (2건, placeholder)

1. TradieCoach - role/period/bullets/skills 모두 `TODO` placeholder, `image`/`link`도 placeholder 경로
2. Pupfish — 위와 동일하게 placeholder 상태

사용자가 `public/images/`에 실제 이미지를 넣고 텍스트·링크를 직접 채울 예정입니다.

### `projects` (4건)

1. Tradie Coaching Platform — CakePHP, 팀 리드 (University Project, `experiences`의 TradieCoach 회사 항목과는 별개)
2. E-Commerce Website — CakePHP, Australia Post API
3. Project Collaborate Platform — React + Supabase, 해커톤
4. Digital Santorini Board Game — Java, MiniMax AI

### `skillCategories` (3카테고리)

- Languages & Frameworks
- Backend & APIs
- Tools & Workflow

각 카테고리는 `icon: "code" | "server" | "workflow"`에 따라 인라인 SVG 아이콘이 렌더링됩니다.

## 네비게이션 동작

1. **데스크톱 (`sm:` 이상)**: 헤더에 섹션 버튼이 가로로 표시
2. **모바일**: 햄버거(☰) 버튼 → 오버레이 + 드롭다운 메뉴
3. **스크롤**: `handleScroll(id)`가 `getBoundingClientRect` + `window.scrollTo`로 smooth scroll (offset 80px)
4. **Blog 링크**: `<Link href="/blog">` — 별도 페이지로 이동

`useEffect`에서 `document.documentElement.style.scrollBehavior = "smooth"`를 설정합니다 (브라우저 지원 시).

## 스타일링 규칙

### Tailwind (인라인)

- 배경: `bg-slate-950`, 텍스트: `text-slate-50`
- 카드: `rounded-2xl border border-slate-800 bg-slate-900/40`
- 강조색: `text-sky-400`, `text-sky-300`
- 레이아웃: `max-w-4xl mx-auto`, 섹션 간 `gap-20`

### `globals.css` 커스텀 클래스 (이 파일에서 사용)

| 클래스 | 용도 |
|--------|------|
| `.page-scale` | 페이지 전체 스케일/타이포 조정 |
| `.project-badge`, `.project-cardHead` | 프로젝트 카드 배지 |
| `.project-bullets`, `.project-bulletRow`, `.project-bulletIcon--{tone}` | bullet 리스트 |
| `.project-skillChip`, `.project-skills` | 프로젝트 스킬 칩 |
| `.skill-card`, `.skill-icon`, `.skill-chip` | 스킬 섹션 카드 |

**스타일 수정 시** Tailwind 클래스와 `globals.css` 양쪽을 확인해야 합니다.

## 수정 시 주의사항

1. **불필요하게 컴포넌트 분리하지 않기** — 현재는 단일 파일 구조가 의도된 형태입니다. 분리가 필요하면 사용자와 먼저 상의하세요.
2. **콘텐츠 추가 패턴**
   - 프로젝트: `projects` 배열에 `Project` 객체 추가
   - 스킬: `skillCategories` 배열 수정
   - 학력/경력: 해당 `<section>` JSX에 `<li>` 또는 `<div>` 카드 추가
3. **네비게이션 동기화** — 새 섹션 추가 시 `sections` 배열과 `<section id="...">`를 함께 업데이트
4. **Contact 링크** — 이메일 `href`가 `mailto:` 없이 `is8159750@gmail.com`으로 되어 있음 (잠재적 버그). GitHub URL도 placeholder(`your-id`) 포함 가능성 있음
5. **클라이언트 컴포넌트 유지** — 스크롤·메뉴 상태 때문에 `"use client"` 제거 시 동작이 깨집니다
6. **다국어** — 현재 UI 텍스트는 영어. `layout.tsx`의 `lang="ko"`와 불일치

## 관련 페이지

- [`app/blog/page.tsx`](../app/blog/page.tsx) — 블로그 페이지 (동일한 `page-scale` + slate 다크 테마)
- [`app/layout.tsx`](../app/layout.tsx) — 루트 레이아웃, metadata, `globals.css` import

## Claude Code 사용법

이 문서를 컨텍스트에 포함하려면:

```
@docs/app-page.md
```

또는 `app/page.tsx` 수정 요청 시 위 문서를 함께 참조하도록 지시하세요.
