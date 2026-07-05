import { useState } from 'react'
import { BootSequence } from './components/BootSequence'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { ServiceRecord } from './components/ServiceRecord'
import { Projects } from './components/Projects'
import { Systems } from './components/Systems'
import { Telemetry } from './components/Telemetry'
import { Comms } from './components/Comms'
import { HelixTrail } from './components/HelixTrail'
import { profile } from './data/site'

const BOOT_KEY = 'ns-booted'

export default function App() {
  const [booted, setBooted] = useState(() => sessionStorage.getItem(BOOT_KEY) === '1')

  function finishBoot() {
    sessionStorage.setItem(BOOT_KEY, '1')
    setBooted(true)
  }

  if (!booted) return <BootSequence onDone={finishBoot} />

  return (
    <div className="grid-bg relative min-h-screen">
      <HelixTrail />
      <nav className="fixed top-0 z-40 w-full border-b border-line/60 bg-void/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 font-mono text-sm">
          <a href="#" className="flex items-center gap-2 text-glow">
            <img src="/emblem.png" alt="" className="h-6 w-6" />
            NS://
          </a>
          <div className="flex gap-5 text-xs text-dim sm:gap-7 sm:text-sm">
            <a href="#about" className="transition hover:text-glow-soft">ABOUT</a>
            <a href="#experience" className="transition hover:text-glow-soft">EXPERIENCE</a>
            <a href="#deployments" className="transition hover:text-glow-soft">WORK</a>
            <a href="#systems" className="transition hover:text-glow-soft">SYSTEMS</a>
            <a href="#comms" className="transition hover:text-glow-soft">CONTACT</a>
          </div>
        </div>
      </nav>

      <Hero />
      <About />
      <ServiceRecord />
      <Projects />
      <Systems />
      <Telemetry />
      <Comms />

      <footer className="border-t border-line/60 py-8 text-center font-mono text-xs text-dim">
        © {new Date().getFullYear()} {profile.name} · built with React, Tailwind & too much coffee
      </footer>
    </div>
  )
}
