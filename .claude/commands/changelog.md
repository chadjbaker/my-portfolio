Update the CHANGELOG.md file at the root of this repository based on recent git history.

## Stack Context (always available — no need to re-read CLAUDE.md)

- **Framework:** Next.js (App Router), TypeScript strict mode
- **Styling:** Tailwind CSS v4, Shadcn/UI (New York style, components in `src/components/ui/`)
- **Backend:** Supabase (SSR + Auth via `@supabase/ssr`)
- **Patterns:** Server Components for data reads, Server Actions for mutations, logic in `src/utils/`, UI in `src/components/`

## Steps

1. Run `git log --no-merges --format="%H|%ad|%s" --date=short -20` to get the last 20 non-merge commits (hash, date, subject).
2. Run `git log --no-merges --format="%H%n%B%n---END---" -20` to get full commit bodies for richer context.
3. Check whether `CHANGELOG.md` already exists at the project root and read it if it does.
4. Identify which commits are **not yet recorded** in the existing CHANGELOG (match by subject or hash). On first run, include all commits.
5. Group new commits under an `## [Unreleased] – YYYY-MM-DD` header using today's date. If the project later adopts semver tags, use the tag name instead.
6. For each commit, map it to the appropriate Keep-a-Changelog section:
   - **Added** — new files, features, scaffolding, initialisation
   - **Changed** — refactors, config updates, moved files, dependency changes
   - **Fixed** — bug fixes
   - **Removed** — deleted files or features
   - **Documentation** — docs, README, comments
   - **Testing** — test files or CI changes
7. Write each entry as a bullet with two parts:
   - **What changed** — a clear, human-readable description of the commit.
   - **Why it fits the architecture** — one sentence explaining how it aligns with the Next.js App Router, Supabase SSR, Tailwind/Shadcn, or TypeScript conventions used in this project. Be specific (e.g., "Placing auth helpers in `src/utils/` keeps server-side Supabase logic out of components, matching the Server Component data-fetching pattern.").
8. If CHANGELOG.md does not exist, create it with this header before the first entry block:
   ```
   # Changelog

   All notable changes to this project will be documented here.
   Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
   ```
9. If CHANGELOG.md already exists, **prepend** the new `[Unreleased]` block directly below the header, above any existing blocks.
10. Write the updated file using the Write tool.
11. Confirm by printing: "CHANGELOG.md updated — N new commit(s) documented."

## Output Format Example

```markdown
## [Unreleased] – 2026-02-20

### Added
- **Scaffold project structure with `src/` migration and Shadcn UI init** — Moved `app/` into `src/app/`, updated `tsconfig` path alias to `./src/*`, initialised Shadcn UI (New York style), and created component directories (`layout`, `projects`, `blog`, `contact`, `admin`) plus `src/utils/`.
  *Why:* Adopting the `src/` layout is the recommended Next.js App Router convention; it cleanly separates application code from root-level config files (`next.config.ts`, `tsconfig.json`, etc.) and aligns with Shadcn's expected component paths.

### Changed
- **Initial commit** — Bootstrapped the Next.js project with TypeScript, Tailwind CSS v4, and ESLint.
  *Why:* Tailwind v4's PostCSS-first setup integrates directly with Next.js without a separate `tailwind.config.js`, reducing configuration surface area.
```
