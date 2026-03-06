import { createClient } from '@/utils/supabase/server'
import { ExperienceTimeline, type ExperienceRow } from './ExperienceTimeline'

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

        <ExperienceTimeline experiences={experiences as ExperienceRow[]} />
      </div>
    </section>
  )
}
