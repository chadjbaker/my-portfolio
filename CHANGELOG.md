# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased] – 2026-03-06

### Added
- **Add `Contact` section with Server Action and form validation** — Created `src/app/actions/contact.ts` as a Next.js Server Action that receives form data, validates required fields, and inserts a row into the Supabase `contact_messages` table via the SSR client. Created `src/components/Contact.tsx` as a `'use client'` component using `useActionState` to bind the action, display inline field errors, and show a success state after submission. Replaced the hardcoded `<section id="contact">` placeholder in `page.tsx` with `<Contact />`.
  *Why:* Mutations are handled by a Server Action (not an API route), which is the App Router's recommended pattern — the action runs on the server, keeping Supabase credentials out of the browser bundle and allowing progressive enhancement; the `'use client'` boundary is pushed to the leaf component only, so `page.tsx` remains a Server Component.

- **Add `SocialDock` component and company logos** — Created `src/components/SocialDock.tsx` as a `'use client'` Framer Motion component that renders an animated row of social/profile icon links (GitHub, LinkedIn, etc.) with hover-lift transitions. Added six company logo PNGs (`blueprint.png`, `braingu.png`, `jpmc.png`, `nasa.png`, `sma.png`, `waitr.png`) to `public/logos/` for use in the Experience timeline.
  *Why:* Static icon links require only a thin client component for animation; placing logo assets in `public/logos/` makes them directly serveable by Next.js without any image-import wiring and available to `<Image>` with a simple path string.

### Changed
- **Extract `ExperienceTimeline` from `Experience.tsx` into its own client component** — Moved all timeline rendering JSX (path line, node dots, header rows, description bullets, skill badges) out of the async `Experience` Server Component into a new `src/components/ExperienceTimeline.tsx` `'use client'` component. `Experience.tsx` now fetches data and delegates rendering to `<ExperienceTimeline experiences={…} />`. Also exported `ExperienceRow` type from `ExperienceTimeline.tsx` to keep the type co-located with the component that uses it.
  *Why:* Separating the data-fetch layer (`Experience.tsx` — Server Component) from the render layer (`ExperienceTimeline.tsx` — Client Component) is the canonical App Router composition pattern; it allows the Supabase query to run server-side while the client component can later add interactive features (expand/collapse, scroll animations) without forcing the entire section into the client bundle.

- **Replace Hero CTA buttons with `SocialDock`** — Removed the copy-email (`Copy Email` + `useState` clipboard) and Download CV buttons from `Hero.tsx` along with their `useState`, `Copy`, `Check`, `Download`, and `Button` imports. Imported `SocialDock` in their place, wrapped in the existing Framer Motion `item` variant for consistent stagger entry. Updated the `<h1>` text from `"Hi, I'm Chad Baker"` to `"Chad Baker"`.
  *Why:* Removing the clipboard `useState` call eliminates the last piece of local state in `Hero.tsx`; the component still requires `'use client'` for Framer Motion but is now leaner — social links are a better persistent CTA than a one-time copy action, and the refactor keeps the `SocialDock` concern isolated in its own file.

- **Refine skill list in `About.tsx`** — Trimmed the Frontend badge list (`'React' → 'React.js'`, removed `'Framer Motion'`), Backend list (removed `'Auth (SSR)'`), and added `'Claude Code'` to the Tools list.
  *Why:* Skill badge data is co-located as a typed `as const` array in `About.tsx`; updating it directly (no DB round-trip) is appropriate for static content and keeps the component self-contained until a CMS is wired up.

## [Unreleased] – 2026-02-26

### Added
- **Add `Experience` section as an async Server Component** — Created `src/components/Experience.tsx` as a pure Server Component that fetches all rows from the Supabase `experience` table (ordered `start_date DESC`) using the SSR client from `src/utils/supabase/server.ts`. Renders a vertical timeline: a `bg-secondary/30` 1px path line, per-entry node dots (`bg-accent ring-4 ring-accent/20` for the current role, hollow `border-muted-foreground/40` for past roles), `company_name` as an `<h3>` in `text-foreground`, `role_title` as an `<h4>` in `text-accent`, date range, description bullet points prefixed with an accent `▸`, and `skills_used` rendered as `bg-secondary/10 text-foreground` pill badges. The current role card receives a `shadow-[0_0_20px_rgba(243,193,65,0.15)]` gold ambient glow. Returns `null` when the table is empty so no broken section appears on the page.
  *Why:* Experience data is read-only at render time and requires no client interactivity, making it an ideal async Server Component — data is fetched on the server with the SSR Supabase client, keeping credentials and query logic out of the browser bundle and following the App Router pattern of pushing client boundaries to leaf nodes only.

### Changed
- **Replace Experience and Projects placeholders in `page.tsx`** — Removed the hardcoded `<section>` scaffolding for `#experience` and `#projects` and imported the real `<Experience />` and `<Projects />` Server Components in their place.
  *Why:* `page.tsx` is a Server Component; importing async Server Components directly (no `<Suspense>` wrapper needed for a simple sequential render) keeps the root page thin and delegates all data-fetching responsibility to the individual section components, matching the App Router co-location pattern.

- **Fix `About.tsx` skill-category headers — `text-accent-foreground` → `text-accent`** — Category labels (`Frontend`, `Backend`, `Tools`) were rendered with `text-accent-foreground` which resolves to the dark background colour `#2B3C49`, making them invisible. Changed to `text-accent` (gold `#F3C141`), bumped size from `text-xs` to `text-sm`, and replaced the parent `gap-3` with an explicit `mb-4` on each heading for consistent spacing between label and badge row.
  *Why:* In the Shadcn token model `--accent-foreground` is the *contrasting* text intended for use on top of an accent-coloured background surface — not for standalone coloured text. `--accent` is the correct token when applying the brand gold as a foreground colour directly on the page background.

- **Update `Hero.tsx` headline with gradient text treatment** — Replaced the flat `text-foreground` `<h1>` with a `bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent` gradient, wrapped in a `<motion.div>` that adds a blurred `bg-accent/20` glow orb behind the text on `md` and above.
  *Why:* Gradient text is applied purely with Tailwind utility classes and CSS `background-clip`, requiring no additional JavaScript or runtime cost; wrapping in the existing Framer Motion `item` variant keeps it inside the stagger sequence already established in `Hero.tsx` without introducing a new animation layer.

- **Add Unsplash image hostname to `next.config.ts` remotePatterns** — Added `{ protocol: 'https', hostname: 'images.unsplash.com' }` alongside the existing Supabase storage pattern.
  *Why:* Next.js `<Image />` requires every external hostname to be allowlisted in `remotePatterns`; adding Unsplash here enables optimised image delivery (automatic WebP conversion, lazy loading, responsive `srcset`) for any Unsplash assets used in the Projects section without weakening the allowlist to a wildcard.

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
