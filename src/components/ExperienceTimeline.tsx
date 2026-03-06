'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useSpring } from 'framer-motion'

// ─── types ───────────────────────────────────────────────────────────────────
export type ExperienceRow = {
  id: string
  company_name: string
  role_title: string
  logo_url: string | null
  logo_bg_color: string | null   // hex — fills letter-box gaps; use "#ffffff" for logos with white margins
  logo_scale: number | null      // CSS scale multiplier e.g. 1.25 or 1.4 to zoom past white margins
  logo_object_fit: string | null // "cover" | "contain" — overrides default object-contain
  location: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
}

// ─── companies that need a white container to avoid letterbox gaps ────────────
const WHITE_BG_COMPANIES = new Set(['SMA Technologies', 'NASA'])

// ─── helpers ─────────────────────────────────────────────────────────────────
function yearRange(exp: ExperienceRow): string {
  const start = exp.start_date.split('-')[0]
  const end = exp.is_current ? 'Present' : (exp.end_date?.split('-')[0] ?? '')
  return `${start} – ${end}`
}

// ─── viewport band ───────────────────────────────────────────────────────────
const vp = { once: false, margin: '-20% 0px -20% 0px' } as const

// ─── component ───────────────────────────────────────────────────────────────
export function ExperienceTimeline({ experiences }: { experiences: ExperienceRow[] }) {
  const ref = useRef<HTMLDivElement>(null)

  // Fill the horizontal line as the section scrolls into view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.25'],
  })

  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  return (
    <div ref={ref} className="relative">
      {/*
        Horizontal connector lines — pinned at top-14 (3.5 rem = 56 px).
        Circles are w-28 h-28 (7 rem = 112 px) so their vertical centre is
        exactly at 56 px, keeping the line perfectly centred through them.
      */}

      {/* ── Secondary background track ── */}
      <div className="absolute left-0 right-0 top-14 h-px bg-secondary/40" />

      {/* ── Accent fill line (scroll-driven, left → right) ── */}
      <motion.div
        className="absolute left-0 right-0 top-14 h-px origin-left bg-accent"
        style={{ scaleX }}
      />

      {/* ── Logo entries ── */}
      <div className="flex flex-row flex-wrap items-start justify-center gap-x-10 gap-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex flex-col items-center gap-3">

            {/* Circle + glow wrapper */}
            <div className="relative z-10">
              {/* Accent glow halo */}
              <motion.div
                className="pointer-events-none absolute -inset-5 rounded-full bg-accent/20 blur-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.45 }}
              />

              {/*
                Logo circle:
                  - bg-foreground/10 is the Tailwind fallback when logo_bg_color is absent.
                  - When logo_bg_color is present (e.g. "#003087") the inline style
                    overrides the class, filling the letter-box areas with the brand colour.
                  - object-contain keeps the logo proportional inside the circle.
              */}
              <motion.div
                className="relative h-28 w-28 overflow-hidden rounded-full border border-foreground/10 bg-foreground/10"
                style={{
                  backgroundColor:
                    exp.logo_bg_color ??
                    (WHITE_BG_COMPANIES.has(exp.company_name) ? '#ffffff' : undefined),
                }}
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.08 }}
                viewport={vp}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                {exp.logo_url ? (
                  <Image
                    src={exp.logo_url}
                    alt={`${exp.company_name} logo`}
                    fill
                    sizes="112px"
                    className={
                      exp.logo_object_fit === 'cover'
                        ? 'object-cover object-center'
                        : 'object-contain object-center'
                    }
                    style={
                      exp.logo_scale && exp.logo_scale !== 1
                        ? { transform: `scale(${exp.logo_scale})` }
                        : undefined
                    }
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-foreground">
                    {exp.company_name.charAt(0)}
                  </span>
                )}
              </motion.div>
            </div>

            {/* Company name + year range — centred below circle */}
            <motion.div
              className="flex flex-col items-center gap-0.5 text-center"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
            >
              <p className="text-sm font-bold text-foreground">{exp.company_name}</p>
              <p className="text-xs text-muted-foreground">{yearRange(exp)}</p>
            </motion.div>

          </div>
        ))}
      </div>
    </div>
  )
}
