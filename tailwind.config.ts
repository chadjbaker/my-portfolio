import type { Config } from 'tailwindcss'

/**
 * Brand palette reference — Huemint #palette=2b3c49-f3c141-e9eae1-768e8e
 *
 * NOTE: This project uses Tailwind v4, which is configured via CSS only
 * (@theme inline + :root variables in src/app/globals.css). PostCSS cannot
 * execute TypeScript directly, so this file is NOT wired via @config.
 * It exists as a typed reference for the palette values.
 *
 * Shadcn semantic token mapping (globals.css :root):
 *   bg-background      / --background      →  #2B3C49  dark blue-gray
 *   bg-primary         / --primary         →  #F3C141  golden yellow
 *   text-foreground    / --foreground      →  #E9EAE1  off-white cream
 *   text-muted-foreground / --muted-fg     →  #768E8E  teal-gray
 */
const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary:    '#2B3C49',
          accent:     '#F3C141',
          fg:         '#E9EAE1',
          muted:      '#768E8E',
        },
      },
    },
  },
}

export default config
