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
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-background px-6 py-32"
    >
      {/* Ambient primary glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[500px] w-[800px] rounded-full bg-primary/8 blur-[160px]" />
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
        <motion.div variants={item} className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex"
          >
            <div className="h-24 w-[480px] rounded-full bg-accent/20 blur-[120px]" />
          </div>
          <h1 className="relative text-5xl font-extrabold tracking-tighter md:text-7xl">
            <span className="inline-block bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent">
              Hi, I&apos;m Chad Baker
            </span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          variants={item}
          className="max-w-xl text-lg leading-relaxed text-muted-foreground"
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
            className="gap-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/85"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy Email'}
          </Button>

          <Button
            variant="outline"
            asChild
            className="gap-2 border-muted-foreground/40 text-foreground hover:bg-muted hover:text-foreground"
          >
            <a href="/cv.pdf" download>
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom fade — blends seamlessly into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  )
}
