'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
] as const

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        'bg-background',
        'border-b border-border',
        'backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Chad Baker
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium',
              'bg-foreground text-background',
              'transition-colors hover:bg-foreground/80',
            )}
          >
            Contact
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className={cn(
            'border-t border-border md:hidden',
            'bg-background',
            'flex flex-col gap-4 px-6 py-4',
          )}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'inline-flex w-fit rounded-full px-4 py-1.5 text-sm font-medium',
              'bg-foreground text-background',
              'transition-colors hover:bg-foreground/80',
            )}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  )
}
