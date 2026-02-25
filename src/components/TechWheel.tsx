'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'

// ─── Brand SVG icons ──────────────────────────────────────────────────────────

type SvgProps = React.SVGProps<SVGSVGElement>

const BrandIcons = {
  nextjs: (props: SvgProps) => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M114.731 139.282L67.1654 80.7226V139.282H52.2031V41.7188H67.1654L124.904 113.14V41.7188H139.867V139.282H114.731Z"
        fill="currentColor"
      />
      <path
        d="M90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0ZM90 165.231C48.4526 165.231 14.7692 131.547 14.7692 90C14.7692 48.4526 48.4526 14.7692 90 14.7692C131.547 14.7692 165.231 48.4526 165.231 90C165.231 131.547 131.547 165.231 90 165.231Z"
        fill="currentColor"
      />
    </svg>
  ),
  supabase: (props: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21.362 9.354H12V3L2.638 14.646H12V21L21.362 9.354Z" fill="#3ECF8E" />
    </svg>
  ),
  vercel: (props: SvgProps) => (
    <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M256 48L496 464H16L256 48Z" fill="currentColor" />
    </svg>
  ),
  tailwind: (props: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.001 6.002c-2.774 0-4.161 1.388-4.161 4.161 0 2.774 1.387 4.161 4.161 4.161 2.775 0 4.162-1.387 4.162-4.161 0-2.773-1.387-4.161-4.162-4.161zM6.453 10.163c0-2.774 1.388-4.162 4.162-4.162 2.774 0 4.161 1.388 4.161 4.162 0 2.774-1.387 4.161-4.161 4.161-2.774 0-4.162-1.387-4.162-4.161z"
        fill="#06B6D4"
      />
      <path
        d="M12 11.667c-2.774 0-4.162 1.387-4.162 4.161 0 2.774 1.388 4.162 4.162 4.162 2.774 0 4.161-1.388 4.161-4.162 0-2.774-1.387-4.161-4.161-4.161zM6.452 15.828c0-2.774 1.388-4.161 4.162-4.161 2.774 0 4.162 1.387 4.162 4.161 0 2.774-1.388 4.162-4.162 4.162-2.774 0-4.162-1.388-4.162-4.162z"
        fill="#06B6D4"
      />
    </svg>
  ),
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RADIUS = 110   // px — distance from circle center to icon center
const ICON_BOX = 40  // px — width/height of each icon square
const LABEL_H = 20   // px — space reserved for the label below each icon
const PAD_TOP = 14   // px — breathing room above the topmost icon
const CONTAINER_H = PAD_TOP + ICON_BOX + LABEL_H + RADIUS

// ─── Tech definitions ─────────────────────────────────────────────────────────

interface TechDef {
  label: string
  // angle: 0 = rightmost, 90 = topmost, 180 = leftmost
  initialAngle: number
  Icon: (props: SvgProps) => React.JSX.Element
}

// 4 icons evenly spaced across the 180° arch
const TECHS: TechDef[] = [
  { label: 'Next.js',  initialAngle: 0,   Icon: BrandIcons.nextjs  },
  { label: 'Supabase', initialAngle: 60,  Icon: BrandIcons.supabase },
  { label: 'Vercel',   initialAngle: 120, Icon: BrandIcons.vercel  },
  { label: 'Tailwind', initialAngle: 180, Icon: BrandIcons.tailwind },
]

// ─── TechIcon sub-component ───────────────────────────────────────────────────
// Separate component so hooks (useTransform) can be called per-instance.

interface TechIconProps {
  tech: TechDef
  rotation: MotionValue<number>
}

function TechIcon({ tech, rotation }: TechIconProps) {
  const { label, initialAngle, Icon } = tech

  function proximity(r: number): number {
    const eff = ((initialAngle + r) % 360 + 360) % 360
    const dist = Math.min(Math.abs(eff - 90), 360 - Math.abs(eff - 90))
    return Math.max(0, 1 - dist / 55)
  }

  const x = useTransform(rotation, (r) => {
    const rad = ((initialAngle + r) * Math.PI) / 180
    return RADIUS * Math.cos(rad) - ICON_BOX / 2
  })

  const y = useTransform(rotation, (r) => {
    const rad = ((initialAngle + r) * Math.PI) / 180
    return -RADIUS * Math.sin(rad) - ICON_BOX / 2 - LABEL_H / 2
  })

  const scale = useTransform(rotation, (r) => 1 + 0.25 * proximity(r))
  const opacity = useTransform(rotation, (r) => 0.35 + 0.65 * proximity(r))

  return (
    <motion.div
      style={{ position: 'absolute', x, y, scale, opacity }}
      className="flex flex-col items-center"
    >
      {/* Glassmorphism circle wrapper */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 p-2 backdrop-blur-sm">
        <Icon className="h-full w-full text-foreground" />
      </div>
      <p className="mt-1 text-center text-[10px] font-medium text-muted-foreground">
        {label}
      </p>
    </motion.div>
  )
}

// ─── TechWheel ────────────────────────────────────────────────────────────────

export default function TechWheel() {
  const rotation = useMotionValue(0)
  const animRef = useRef<ReturnType<typeof animate> | null>(null)

  useEffect(() => {
    animRef.current = animate(rotation, 360, {
      duration: 20,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })
    return () => animRef.current?.stop()
  }, [rotation])

  return (
    <div
      className="relative mx-auto cursor-default select-none"
      style={{
        width: 300,
        height: CONTAINER_H,
        maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
      }}
      onMouseEnter={() => animRef.current?.pause()}
      onMouseLeave={() => animRef.current?.play()}
    >
      {/* Zero-size origin point at the bottom-center — all icon offsets are relative to this */}
      <div style={{ position: 'absolute', left: '50%', top: '100%' }}>
        {TECHS.map((tech) => (
          <TechIcon key={tech.label} tech={tech} rotation={rotation} />
        ))}
      </div>
    </div>
  )
}
