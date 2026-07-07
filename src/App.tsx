import { useState } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { BootSequence } from './components/BootSequence'
import { CinematicHero, type HeroVariant } from './components/hero/CinematicHero'
import { HeroToggle } from './components/hero/HeroToggle'
import { About } from './components/About'
import { ServiceRecord } from './components/ServiceRecord'
import { Projects } from './components/Projects'
import { Systems } from './components/Systems'
import { Telemetry } from './components/Telemetry'
import { Comms } from './components/Comms'
import { HelixTrail } from './components/HelixTrail'
import { profile } from './data/site'

const BOOT_KEY = 'ns-booted'

function initialVariant(): HeroVariant {
  return new URLSearchParams(window.location.search).get('hero') === 'film' ? 'film' : 'layers'
}

export default function App() {
  const [booted, setBooted] = useState(() => sessionStorage.getItem(BOOT_KEY) === '1')
  const [variant, setVariant] = useState<HeroVariant>(initialVariant)
  // lenis inertia is exactly what reduced-motion users asked to avoid
  const reducedMotion = useReducedMotion()

  function switchVariant(v: HeroVariant) {
    setVariant(v)
    const url = new URL(window.location.href)
    url.searchParams.set('hero', v)
    window.history.replaceState(null, '', url)
    // the variants only differ near the top of the hero — jump there so the switch is visible
    window.scrollTo(0, 0)
  }

  function finishBoot() {
    sessionStorage.setItem(BOOT_KEY, '1')
    setBooted(true)
  }

  if (!booted) return <BootSequence onDone={finishBoot} />

  const page = (
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

      <CinematicHero variant={variant} />
      {!reducedMotion && <HeroToggle variant={variant} onChange={switchVariant} />}
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

  return (
    <MotionConfig reducedMotion="user">
      {reducedMotion ? page : <ReactLenis root options={{ anchors: true }}>{page}</ReactLenis>}
    </MotionConfig>
  )
}
