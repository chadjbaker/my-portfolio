# Project: My Developer Portfolio
**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Supabase (SSR/Auth).
**Environment:** GitHub Codespaces (Browser-based).

## Project Goals
- Build a high-performance personal portfolio to showcase projects and blog posts.
- Use Supabase for the database (Projects, Blog, Contact form).
- Implement a private /admin dashboard for managing content.

## Coding Standards
- **Components:** Use Shadcn/UI and Tailwind CSS for styling.
- **Data Fetching:** Prefer Server Components for fetching data from Supabase.
- **Server Actions:** Use Next.js Server Actions for all database mutations (Insert/Update/Delete).
- **TypeScript:** Strict mode enabled. No `any` types.
- **File Structure:** Keep logic in `src/utils` and UI in `src/components`.

## Common Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npx supabase gen types typescript --project-id YOUR_ID` - Update DB types

## Session Start Instructions
At the beginning of every session, read `CHANGELOG.md` to get up to speed on the 
project history, recent changes, and architectural decisions made so far. Use this 
as context before making any suggestions or changes.