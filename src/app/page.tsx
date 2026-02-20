export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section id="hero" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold text-foreground">Hero</h2>
          <p className="mt-3 text-muted-foreground">Hero section placeholder</p>
        </div>
      </section>

      <section id="about" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold text-foreground">About</h2>
          <p className="mt-3 text-muted-foreground">About section placeholder</p>
        </div>
      </section>

      <section id="experience" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold text-foreground">Experience</h2>
          <p className="mt-3 text-muted-foreground">
            Experience section placeholder
          </p>
        </div>
      </section>

      <section id="projects" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold text-foreground">Projects</h2>
          <p className="mt-3 text-muted-foreground">
            Projects section placeholder
          </p>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold text-foreground">Contact</h2>
          <p className="mt-3 text-muted-foreground">Contact section placeholder</p>
        </div>
      </section>
    </div>
  )
}
