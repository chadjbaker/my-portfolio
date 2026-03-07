'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiVercel,
  SiOpenai,
  SiAnthropic,
  SiPython,
} from 'react-icons/si'
import { TbBrandVscode } from 'react-icons/tb'
import type { IconType } from 'react-icons'

// ─── tech items ────────────────────────────────────────────────────────────
// `color` is the official brand colour applied on hover
const TECH: { icon: IconType; name: string; color: string }[] = [
  { icon: SiReact,       name: 'React',       color: '#61DAFB' },
  { icon: SiNextdotjs,   name: 'Next.js',     color: '#FFFFFF' },
  { icon: SiTypescript,  name: 'TypeScript',  color: '#3178C6' },
  { icon: SiTailwindcss, name: 'Tailwind CSS',color: '#06B6D4' },
  { icon: SiNodedotjs,   name: 'Node.js',     color: '#339933' },
  { icon: SiSupabase,    name: 'Supabase',    color: '#3ECF8E' },
  { icon: SiPostgresql,  name: 'PostgreSQL',  color: '#4169E1' },
  { icon: SiPython,      name: 'Python',      color: '#3776AB' },
  { icon: SiGit,         name: 'Git',         color: '#F05032' },
  { icon: SiDocker,      name: 'Docker',      color: '#2496ED' },
  { icon: SiVercel,      name: 'Vercel',      color: '#FFFFFF' },
  { icon: TbBrandVscode, name: 'VS Code',     color: '#007ACC' },
  { icon: SiOpenai,      name: 'Codex',       color: '#FFFFFF' },
  { icon: SiAnthropic,   name: 'Claude Code', color: '#D97757' },
]

// ─── animation variants ────────────────────────────────────────────────────
const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemVariant: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
}

// ─── single tech icon card ─────────────────────────────────────────────────
function TechItem({
  icon: Icon,
  name,
  color,
}: {
  icon: IconType
  name: string
  color: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={itemVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={[
          'flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-200',
          hovered
            ? 'border-transparent bg-secondary/30 scale-110'
            : 'border-border bg-secondary/10',
        ].join(' ')}
      >
        <Icon
          size={26}
          style={{ color: hovered ? color : undefined }}
          className="text-muted-foreground transition-colors duration-200"
          aria-label={name}
        />
      </div>
      <span className="text-center text-[10px] leading-tight text-muted-foreground/70">
        {name}
      </span>
    </motion.div>
  )
}

// ─── grid component ────────────────────────────────────────────────────────
export default function TechStack({ animate }: { animate: boolean }) {
  return (
    <motion.div
      variants={grid}
      initial="hidden"
      animate={animate ? 'show' : 'hidden'}
      className="grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-5"
    >
      {TECH.map((tech) => (
        <TechItem key={tech.name} {...tech} />
      ))}
    </motion.div>
  )
}
