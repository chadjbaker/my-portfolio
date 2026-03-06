import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <About />

      <Experience />

      <Projects />

      <Contact />
    </div>
  )
}
