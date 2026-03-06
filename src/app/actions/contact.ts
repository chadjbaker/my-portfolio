'use server'

import { createClient } from '@/utils/supabase/server'

// ─── return type ─────────────────────────────────────────────────────────────
export type ContactActionResult =
  | { success: true;  message: string }
  | { success: false; message: string; errors?: Partial<Record<'name' | 'email' | 'message', string>> }

// ─── action ──────────────────────────────────────────────────────────────────
export async function submitContact(
  _prevState: ContactActionResult | null,
  formData: FormData,
): Promise<ContactActionResult> {
  const name    = (formData.get('name')    as string | null)?.trim() ?? ''
  const email   = (formData.get('email')   as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  // ── field validation ──────────────────────────────────────────────────────
  const errors: Partial<Record<'name' | 'email' | 'message', string>> = {}

  if (!name)    errors.name    = 'Name is required.'
  if (!email)   errors.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                errors.email   = 'Please enter a valid email address.'
  if (!message) errors.message = 'Message is required.'

  if (Object.keys(errors).length > 0) {
    return { success: false, message: 'Please fix the errors below.', errors }
  }

  // ── insert into Supabase ──────────────────────────────────────────────────
  const supabase = await createClient()

  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, message })

  if (error) {
    console.error('Contact insert error:', error.message)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }

  return { success: true, message: "Thanks for reaching out — I'll be in touch soon." }
}
