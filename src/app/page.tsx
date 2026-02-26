import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <About />

      <Experience />

      <Projects />

      <section id="contact" className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold text-foreground">Contact</h2>
          <p className="mt-3 text-muted-foreground">Contact section placeholder</p>
        </div>
      </section>
    </div>
  )
}
