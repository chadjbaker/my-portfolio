'use client'

import { useRef } from 'react'
import { useActionState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { submitContact, type ContactActionResult } from '@/app/actions/contact'

// ─── animation variants ────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// ─── field wrapper ─────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

// ─── success card ──────────────────────────────────────────────────────────
function SuccessCard({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-accent/30 bg-accent/10 px-8 py-12 text-center shadow-[0_0_32px_rgba(243,193,65,0.12)]"
    >
      {/* checkmark circle */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 text-accent"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{message}</p>
    </motion.div>
  )
}

// ─── shared input classes ──────────────────────────────────────────────────
const inputBase =
  'w-full rounded-lg border bg-secondary/20 px-4 py-2.5 text-sm text-foreground ' +
  'placeholder:text-muted-foreground/50 ' +
  // secondary brand color (#768e8e) borders via muted-foreground token
  'border-muted-foreground/40 ' +
  'focus:border-muted-foreground focus:outline-none focus:ring-0 ' +
  'transition-colors duration-150 ' +
  'disabled:opacity-50'

// ─── component ─────────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  const [state, formAction, isPending] = useActionState<ContactActionResult | null, FormData>(
    submitContact,
    null,
  )

  const fieldErrors =
    state && !state.success ? (state.errors ?? {}) : {}

  return (
    <section
      id="contact"
      ref={ref}
      className="border-t border-border bg-background px-6 py-24"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-2"
      >
        {/* ── Left column: copy ── */}
        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-foreground">
            Get In <span className="text-primary">Touch</span>
          </h2>

          <p className="leading-relaxed text-muted-foreground">
            Have a project in mind, a role you think I&apos;d be a great fit for, or
            just want to say hello? I&apos;d love to hear from you — fill out the form
            and I&apos;ll get back to you as soon as I can.
          </p>

          <p className="leading-relaxed text-muted-foreground">
            Whether it&apos;s a quick question or a big idea, don&apos;t hesitate to reach
            out. My inbox is always open.
          </p>

          {/* decorative accent line */}
          <div className="mt-2 h-px w-16 bg-accent" />
        </motion.div>

        {/* ── Right column: form / success ── */}
        <motion.div variants={fadeUp}>
          {state?.success ? (
            <SuccessCard message={state.message} />
          ) : (
            <form action={formAction} noValidate className="flex flex-col gap-5">
              {/* global error */}
              {state && !state.success && !state.errors && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
                  {state.message}
                </p>
              )}

              <Field label="Name" error={fieldErrors.name}>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  disabled={isPending}
                  className={inputBase}
                />
              </Field>

              <Field label="Email" error={fieldErrors.email}>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  disabled={isPending}
                  className={`${inputBase} ${fieldErrors.email ? 'border-destructive focus:border-destructive' : ''}`}
                />
              </Field>

              <Field label="Message" error={fieldErrors.message}>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or just say hi…"
                  disabled={isPending}
                  className={`${inputBase} resize-none`}
                />
              </Field>

              {/* submit — accent yellow (#F3C141) */}
              <button
                type="submit"
                disabled={isPending}
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-150 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending…
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
