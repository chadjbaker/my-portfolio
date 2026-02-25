# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased] – 2026-02-23

### Added
- **Add Hero section with TechWheel animation and Shadcn UI components** — Created `src/components/Hero.tsx` as a full-viewport dark hero section (`bg-slate-950`) with a violet ambient glow, Framer Motion staggered entry animation (Badge → headline → sub-copy → buttons), a copy-to-clipboard email button, and a Download CV button. Created `src/components/TechWheel.tsx` as a rotating semi-circle arch of four brand SVG icons (Next.js, Supabase, Vercel, Tailwind) with a proximity-based spotlight effect, glassmorphism icon wrappers (`bg-white/10 backdrop-blur-sm rounded-full`), and hover-to-pause. Installed `framer-motion`, Shadcn `badge`, and Shadcn `button` components. Replaced the `#hero` placeholder in `page.tsx` with `<Hero />`.
  *Why:* `Hero.tsx` and `TechWheel.tsx` are `'use client'` components (required for clipboard API, `useState`, and Framer Motion's `useMotionValue`/`useTransform` hooks), while `page.tsx` remains a Server Component that simply imports them — matching the App Router pattern of keeping interactivity at the leaf level. Shadcn `badge` and `button` are added via the CLI to `src/components/ui/`, consistent with the project's Shadcn component path convention.

## [Unreleased] – 2026-02-23

### Added
- **Add base layout, page sections, and project scaffolding** — Replaced the Next.js default page with a fully sectioned portfolio layout (Hero, About, Experience, Projects, Contact placeholders). Added a `Header` component wired into `RootLayout` with a `pt-16` scroll offset, a `ProjectCard` component scaffold, and configured `next.config.ts` with a Supabase image remote pattern. Also added smooth-scroll behaviour to `globals.css`, updated `CLAUDE.md` with session-start instructions, and added `.claude/` project commands.
  *Why:* Structuring the landing page as discrete named sections (Hero, About, Experience, Projects, Contact) maps directly to the App Router's nested layout model, making it straightforward to later promote each section into its own Server Component that fetches data from Supabase independently.

- **Scaffold project structure with `src/` migration and Shadcn UI init** — Moved `app/` into `src/app/`, updated the `tsconfig` path alias to `./src/*`, initialised Shadcn UI (New York style), and created component directory structure (`layout`, `projects`, `blog`, `contact`, `admin`) plus `src/utils/`.
  *Why:* Adopting the `src/` layout is the recommended Next.js App Router convention; it cleanly separates application code from root-level config files (`next.config.ts`, `tsconfig.json`, etc.) and aligns with Shadcn's expected component paths, keeping Supabase server utilities isolated in `src/utils/`.

- **Initial commit** — Bootstrapped the Next.js project with TypeScript (strict mode), Tailwind CSS v4, and ESLint.
  *Why:* Tailwind v4's PostCSS-first setup integrates directly with Next.js without a separate `tailwind.config.js`, reducing configuration surface area and establishing the base for all Shadcn/UI component styling.
