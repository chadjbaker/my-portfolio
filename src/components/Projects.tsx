import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

type Project = {
  id: number
  title: string
  description: string
  tech_stack: string[]
  image_url: string | null
  link: string | null
}

export default async function Projects() {
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, description, tech_stack, image_url, link')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[Projects] Supabase fetch error:', error.message, error.details)
  }

  return (
    <section id="projects" className="border-b border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-foreground">
          My <span className="text-primary">Projects</span>
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          A selection of things I&apos;ve built — from side experiments to production apps.
        </p>

        {/* Grid */}
        {projects && projects.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            {error ? `Could not load projects: ${error.message}` : 'Projects coming soon.'}
          </p>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-accent">
      {/* Image / placeholder */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-muted-foreground">No preview available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Title + external link */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-foreground/90">{project.title}</h3>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="shrink-0 text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tech stack badges */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-muted-foreground/20 bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
