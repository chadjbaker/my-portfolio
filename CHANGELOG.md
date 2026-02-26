# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased] – 2026-02-25

### Added
- **Add `About` section component** — Created `src/components/About.tsx` as a `'use client'` component with a two-column desktop layout (stacking to single column on mobile), three paragraphs of narrative copy on the left, and a categorised skill-badge grid (Frontend / Backend / Tools) on the right. Each badge group uses a distinct accent derived from the brand palette. Scroll-triggered fade-up animation is implemented with Framer Motion's `useInView` hook (`once: true`, `-80px` root margin) so the section animates in as the user scrolls to it.
  *Why:* Keeping `About.tsx` as a `'use client'` leaf component (required for `useInView`) while `page.tsx` remains a Server Component follows the App Router pattern of pushing interactivity to the edge; the static narrative copy and badge data are co-located in the file rather than fetched from Supabase, which is appropriate until content management is wired up.

- **Add `scripts/finish-work.sh` and `npm run finish-work` alias** — Added a shell script at `scripts/finish-work.sh` that stages all changes, commits with a provided message, and pushes to the current branch with automatic upstream tracking. Wired as `npm run finish-work` in `package.json`. Also added persistent Claude project memory (`memory/MEMORY.md`) defining the full `finish-work` protocol (git add → AI commit message → push → `/changelog`).
  *Why:* Codifying the ship workflow as a project script and a memory-backed Claude command reduces friction at the end of each session and ensures the changelog is always updated alongside code changes.

- **Add `tailwind.config.ts` as typed brand-palette reference** — Created `tailwind.config.ts` at the project root documenting the four Huemint brand colours (`#2B3C49`, `#F3C141`, `#E9EAE1`, `#768E8E`) with their Shadcn semantic-token mappings. The file is intentionally **not** loaded via `@config` because Tailwind v4 is configured entirely through CSS.
  *Why:* Tailwind v4 uses `@theme inline` + CSS custom properties as the single source of truth; a `@config` directive pointing at a TypeScript file would cause PostCSS to fail silently (Node cannot execute `.ts` without a transpiler), so the config file serves as documentation and a typed reference for IDE tooling only.

### Changed
- **Apply Huemint brand palette site-wide via Shadcn CSS variables** — Replaced the default Shadcn light-mode `:root` variables in `src/app/globals.css` with brand-mapped `oklch()` values: `--background` → `#2b3c49` (dark blue-gray), `--primary` → `#f3c141` (golden yellow), `--foreground` → `#e9eae1` (off-white cream), `--muted-foreground` → `#768e8e` (teal-gray). Derived card, secondary, muted, border, input, and ring tokens from the same palette. Mirrored values into `.dark` so Shadcn components behave correctly if a dark-mode toggle is added later. Removed the previously-added `brand-*` inline theme tokens now that all components use semantic tokens.
  *Why:* Driving colour entirely through Shadcn's CSS variable layer (`--background`, `--primary`, etc.) means every Shadcn component — buttons, badges, dialogs — automatically inherits the brand palette without per-component overrides, and the `body { @apply bg-background text-foreground }` rule in `@layer base` sets the page default with no extra markup.

- **Update `Hero.tsx` to semantic colour tokens and fix Hero → About transition** — Swapped all hardcoded `slate-950` / `violet-*` classes for `bg-background`, `text-foreground`, `text-primary`, `bg-primary`, `text-primary-foreground`, and `text-muted-foreground`. Changed the ambient glow from violet to a soft gold (`bg-primary/8 blur-[160px]`). Added a `pointer-events-none absolute h-40 bg-gradient-to-b from-transparent to-background` overlay at the section's bottom edge to feather the Hero into the About section without a visible hard cut.
  *Why:* Using semantic tokens instead of raw Tailwind palette colours ensures the Hero responds to palette changes made solely in `globals.css`; the fade-gradient fix works because both sections share `bg-background`, so the gradient blends invisibly into the next section's background.

- **Update `TechWheel.tsx` icon wrapper and labels to semantic tokens** — Changed the glassmorphism circle wrapper from `bg-white/10` to `bg-foreground/10` and icon colour from `text-white` to `text-foreground`; updated the label from `text-slate-500` to `text-muted-foreground`.
  *Why:* Aligning `TechWheel` with the same semantic token system means the wheel automatically adapts to palette changes without touching the component's animation or positioning logic.

- **Update `page.tsx` wrapper and placeholder sections to semantic tokens** — Changed the root wrapper from `bg-slate-950` to `bg-background`; updated all placeholder `<section>` headings to `text-foreground`, body text to `text-muted-foreground`, and dividers to `border-border`.
  *Why:* `page.tsx` is a Server Component — keeping it free of hardcoded colour values and relying on the CSS variable layer ensures consistent theming across all sections as they are built out.

### Fixed
- **Remove `@config` directive that broke PostCSS stylesheet compilation** — Removed `@config "../../tailwind.config.ts"` from `globals.css`. The directive caused PostCSS to attempt `require()` on the TypeScript file at build time; because Node cannot execute `.ts` without a transpiler in the PostCSS pipeline, the entire stylesheet failed to compile and the browser rendered with default white/black browser styles.
  *Why:* Tailwind v4 is configured through CSS (`@theme inline`); `@config` is a legacy v3 compatibility shim intended for plain `.js` config files and should not be used in a v4-only project.

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
