'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import TechStack from '@/components/TechStack'

// ─── animation variants ────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// ─── component ─────────────────────────────────────────────────────────────
export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="about"
      ref={ref}
      className="border-b border-border bg-background px-6 py-24"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-2"
      >
        {/* ── Left column: narrative ── */}
        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-foreground">
            About <span className="text-primary">Me</span>
          </h2>

          <p className="leading-relaxed text-muted-foreground">
            I&apos;m a Senior Software Engineer with over seven years of experience
            designing and shipping production-grade web applications. I thrive at
            the intersection of clean architecture and delightful user experience —
            equally comfortable debugging a complex SQL query or polishing a
            micro-interaction in React.
          </p>

          <p className="leading-relaxed text-muted-foreground">
            My current focus is full-stack TypeScript — building fast, accessible
            frontends with Next.js and type-safe backends powered by Supabase and
            PostgreSQL. I care deeply about performance, developer experience, and
            writing code that the next engineer will be glad to inherit.
          </p>

          <p className="leading-relaxed text-muted-foreground">
            Outside of work I contribute to open-source, write about software
            architecture, and constantly experiment with new tools to keep my
            workflow sharp. If you have an interesting problem to solve, I&apos;d
            love to hear about it.
          </p>
        </motion.div>

        {/* ── Right column: tech icon grid ── */}
        <motion.div variants={fadeUp} className="flex flex-col justify-center gap-4">
          <TechStack animate={isInView} />
        </motion.div>
      </motion.div>
    </section>
  )
}
