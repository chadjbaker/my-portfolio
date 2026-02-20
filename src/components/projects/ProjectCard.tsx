import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  tech_stack: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, image_url, tech_stack } = project

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl',
        'border border-white/20 bg-white/10 backdrop-blur-md',
        'shadow-lg shadow-black/5',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.02] hover:bg-white/20 hover:shadow-xl hover:shadow-black/10',
        'dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10',
      )}
    >
      {image_url && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tech_stack.map((tech) => (
              <span
                key={tech}
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium',
                  'bg-primary/10 text-primary',
                  'dark:bg-primary/20',
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
