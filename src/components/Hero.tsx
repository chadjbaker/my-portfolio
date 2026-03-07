'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import TechWheel from '@/components/TechWheel'
import SocialDock from '@/components/SocialDock'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-background px-6 py-32"
    >
      {/* Foreground content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        {/* Tech stack wheel */}
        {/* <motion.div variants={item}>
          <TechWheel />1
        </motion.div> */}

        {/* Avatar */}
        <motion.div variants={item}>
          <div className="relative h-56 w-56 overflow-hidden rounded-3xl">
            <Image
              src="/avatar.jpeg"
              alt="Chad Baker"
              fill
              sizes="224px"
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div variants={item} className="relative">
          <h1 className="relative text-5xl font-extrabold tracking-tighter md:text-7xl">
            <span className="inline-block bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent">
              Chad Baker
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

        {/* Social links */}
        <motion.div variants={item}>
          <SocialDock />
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
