'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Copy, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TechWheel from '@/components/TechWheel'

const EMAIL = 'chadrickjbaker@yahoo.com'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-950 px-6 py-32"
    >
      {/* Violet/blue ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[900px] rounded-full bg-violet-600/25 blur-[140px]" />
      </div>

      {/* Foreground content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        {/* Tech stack wheel */}
        <motion.div variants={item}>
          <TechWheel />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Chad Baker
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={item}
          className="max-w-xl text-lg leading-relaxed text-slate-400"
        >
          Senior Software Engineer 
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            onClick={handleCopy}
            className="gap-2 bg-violet-600 text-white hover:bg-violet-700"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy Email'}
          </Button>

          <Button variant="secondary" asChild className="gap-2">
            <a href="/cv.pdf" download>
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
