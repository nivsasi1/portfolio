import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { profile } from '../../data/site'
import { StatusDot } from '../Panel'
import { FilmIntro } from './FilmIntro'

export type HeroVariant = 'layers' | 'film'

export const HERO_ASSETS = {
  master: '/cinematic/master.webp',
  bg: '/cinematic/bg.webp',
  mid: '/cinematic/mid.webp',
  fg: '/cinematic/fg.webp',
  film: '/cinematic/film.mp4',
}

// staged clip reveal used for name / title / tagline / CTAs
const reveal = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function CinematicHero({ variant }: { variant: HeroVariant }) {
  const reduced = useReducedMotion()
  return reduced ? <StaticHero /> : <ScrollHero variant={variant} />
}

/* reduced-motion: one composed frame, no pin, no video */
function StaticHero() {
  return (
    <header className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${HERO_ASSETS.master})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/30 to-void" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
        <HeroCopy />
      </div>
    </header>
  )
}

function ScrollHero({ variant }: { variant: HeroVariant }) {
  const trackRef = useRef<HTMLDivElement>(null)
  // lenis already lerp-smooths the scroll itself — no extra spring, or the layers lag the scrollbar
  const { scrollYProgress: p } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // desktop gate: film video + mouse parallax only where they're welcome
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 768px)')
    const on = (e: MediaQueryListEvent) => {
      setDesktop(e.matches)
      if (!e.matches) {
        // don't leave the last mouse offset baked into the layers
        mx.set(0)
        my.set(0)
      }
    }
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])

  // scroll-driven depth separation — background barely moves, foreground sweeps past camera
  const bgY = useTransform(p, [0, 1], ['0%', '-8%'])
  const bgScale = useTransform(p, [0, 1], [1.15, 1.02])
  const midY = useTransform(p, [0, 1], ['3%', '-16%'])
  const midScale = useTransform(p, [0, 1], [1.05, 1.25])
  const fgY = useTransform(p, [0, 1], ['4%', '45%'])
  const fgScale = useTransform(p, [0, 1], [1.05, 1.65])
  const fgOpacity = useTransform(p, [0, 0.75, 1], [1, 1, 0])
  const hazeOpacity = useTransform(p, [0, 0.5, 1], [0.35, 0.55, 0.1])

  // copy parallax-exits before the scene settles
  const copyY = useTransform(p, [0.1, 0.5], [0, -160])
  const copyOpacity = useTransform(p, [0.1, 0.45], [1, 0])
  // once invisible, the CTAs must not swallow clicks for the rest of the pin
  const copyPointer = useTransform(copyOpacity, (o) => (o < 0.1 ? 'none' : 'auto'))
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0])

  // fade to void at the end so About slides over a settled scene
  const exitOpacity = useTransform(p, [0.72, 1], [0, 1])

  // secondary mouse parallax, spring-smoothed
  const smx = useSpring(mx, { stiffness: 45, damping: 18 })
  const smy = useSpring(my, { stiffness: 45, damping: 18 })
  const bgMX = useTransform(smx, (v) => v * -6)
  const bgMY = useTransform(smy, (v) => v * -4)
  const midMX = useTransform(smx, (v) => v * -14)
  const midMY = useTransform(smy, (v) => v * -8)
  const fgMX = useTransform(smx, (v) => v * -26)
  const fgMY = useTransform(smy, (v) => v * -14)

  function onMouseMove(e: React.MouseEvent) {
    if (!desktop) return
    mx.set((e.clientX / window.innerWidth - 0.5) * 2)
    my.set((e.clientY / window.innerHeight - 0.5) * 2)
  }

  const showFilm = variant === 'film' && desktop

  return (
    <header ref={trackRef} className="relative" style={{ height: '250vh' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        onMouseMove={onMouseMove}
      >
        {/* depth layers */}
        {/* scroll drives y/scale; mouse rides on x/translateY — framer keeps them as separate transform slots */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_ASSETS.bg})`, y: bgY, scale: bgScale, x: bgMX, translateY: bgMY }}
        />
        <motion.img
          src={HERO_ASSETS.mid}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          style={{ y: midY, scale: midScale, x: midMX, translateY: midMY }}
        />
        <motion.div className="hero-haze absolute inset-0" style={{ opacity: hazeOpacity }} />
        <motion.img
          src={HERO_ASSETS.fg}
          alt=""
          className="hero-fg absolute inset-0 h-full w-full object-cover object-left-bottom"
          style={{ y: fgY, scale: fgScale, opacity: fgOpacity, x: fgMX, translateY: fgMY }}
        />

        {showFilm && <FilmIntro progress={p} />}

        {/* texture + framing */}
        <div className="hero-grain absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />

        {/* copy */}
        <motion.div
          className="relative z-10 flex h-full items-center justify-center"
          style={{ y: copyY, opacity: copyOpacity, pointerEvents: copyPointer }}
        >
          <div className="hero-copy-scrim relative mx-auto max-w-3xl px-5 py-10 text-center">
            <HeroCopy />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-xs text-dim"
          style={{ opacity: hintOpacity }}
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="inline-block"
          >
            ▼ scroll to descend
          </motion.span>
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-0 z-20 bg-void" style={{ opacity: exitOpacity }} />
      </div>
    </header>
  )
}

function HeroCopy() {
  return (
    <>
      <div className="mb-5 flex items-center justify-center gap-4 overflow-hidden">
        <motion.div variants={reveal} custom={0} initial="hidden" animate="show" className="flex items-center gap-4">
          <StatusDot label="STATUS: ONLINE" />
          <span className="font-mono text-xs text-dim">📍 {profile.location}</span>
        </motion.div>
      </div>

      <div className="overflow-hidden">
        <motion.h1
          variants={reveal}
          custom={1}
          initial="hidden"
          animate="show"
          className="glow-text text-5xl font-bold tracking-tight sm:text-7xl"
        >
          {profile.name}
        </motion.h1>
      </div>
      <div className="overflow-hidden">
        <motion.p
          variants={reveal}
          custom={2}
          initial="hidden"
          animate="show"
          className="mt-3 font-mono text-lg text-glow-soft sm:text-xl"
        >
          {profile.title}
        </motion.p>
      </div>
      <div className="overflow-hidden">
        <motion.p variants={reveal} custom={3} initial="hidden" animate="show" className="mx-auto mt-6 max-w-xl text-dim">
          {profile.tagline}
        </motion.p>
      </div>

      <div className="overflow-hidden pb-1">
        <motion.div
          variants={reveal}
          custom={4}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#deployments"
            className="rounded-md bg-glow px-6 py-3 font-mono text-sm font-semibold text-void transition hover:bg-glow-soft"
          >
            VIEW WORK
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="glass rounded-md px-6 py-3 font-mono text-sm text-glow-soft transition hover:border-glow"
          >
            DOWNLOAD RESUME
          </a>
        </motion.div>
      </div>
    </>
  )
}
