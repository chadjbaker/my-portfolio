import { createClient } from '@/utils/supabase/server'

// ─── types ──────────────────────────────────────────────────────────────────
type ExperienceRow = {
  id: string
  company_name: string
  role_title: string
  location: string | null
  start_date: string       // e.g. "2022-03" or "2022-03-01"
  end_date: string | null
  is_current: boolean
  description: string[] | null
  skills_used: string[] | null
}

// ─── helpers ────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  const [year, month] = iso.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

// ─── component ──────────────────────────────────────────────────────────────
export default async function Experience() {
  const supabase = await createClient()

  const { data: experiences } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false })

  console.log('Experience data:', experiences)

  if (!experiences?.length) return null

  return (
    <section id="experience" className="border-b border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-4xl font-bold text-foreground">
          Work <span className="text-primary">Experience</span>
        </h2>

        {/* ── Timeline ── */}
        <div className="relative ml-1.5">
          {/*
            Vertical path line — uses muted-foreground (oklch equivalent of
            brand secondary #768e8e) at low opacity to form the timeline track.
          */}
          <div className="absolute bottom-3 left-0 top-3 w-px bg-secondary/30" />

          <div className="flex flex-col gap-10">
            {(experiences as ExperienceRow[]).map((exp) => (
              <div
                key={exp.id}
                className={[
                  'relative pl-8',
                  exp.is_current ? 'shadow-[0_0_20px_rgba(243,193,65,0.15)]' : '',
                ].join(' ')}
              >
                {/*
                  Node dot — centered on the 1px path line (left: 0).
                  -left-1.5 = -6px offsets the 12px dot left by its own radius,
                  placing its centre exactly on the line.
                  Current role: filled with accent (#f3c141) + soft glow ring.
                  Past roles:   hollow ring using muted-foreground border.
                */}
                <div
                  className={[
                    'absolute -left-1.5 top-1.5 h-3 w-3 rounded-full',
                    exp.is_current
                      ? 'bg-accent ring-4 ring-accent/20'
                      : 'border border-muted-foreground/40 bg-background',
                  ].join(' ')}
                />

                {/* ── Header row: company + role title (left) / dates (right) ── */}
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  {/* Company name + role title */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{exp.company_name}</h3>
                    <h4 className="text-sm font-medium text-accent">{exp.role_title}</h4>
                  </div>

                  {/* Date range + location */}
                  <div className="text-right text-sm text-muted-foreground">
                    <p>
                      {formatDate(exp.start_date)}
                      {' – '}
                      {exp.is_current
                        ? 'Present'
                        : exp.end_date
                          ? formatDate(exp.end_date)
                          : ''}
                    </p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>

                {/* ── Description bullets ── */}
                {exp.description && exp.description.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-px shrink-0 text-accent">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* ── Skill badges ── */}
                {exp.skills_used && exp.skills_used.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.skills_used.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
