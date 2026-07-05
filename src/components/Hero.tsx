import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/site'
import { StatusDot } from './Panel'

export function Hero() {
  // only stream the ambient video on desktop where motion is welcome;
  // everyone else gets the static webp poster — no video download
  const [playVideo, setPlayVideo] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
    setPlayVideo(m.matches)
  }, [])

  return (
    <header className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {playVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src="/hero-loop.mp4"
          poster="/hero-bg.webp"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url(/hero-bg.webp)' }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-5 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mb-5 flex items-center justify-center gap-4">
          <StatusDot label="STATUS: ONLINE" />
          <span className="font-mono text-xs text-dim">📍 {profile.location}</span>
        </div>

        <h1 className="glow-text text-5xl font-bold tracking-tight sm:text-7xl">{profile.name}</h1>
        <p className="mt-3 font-mono text-lg text-glow-soft sm:text-xl">{profile.title}</p>
        <p className="mx-auto mt-6 max-w-xl text-dim">{profile.tagline}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-dim">
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="inline-block">
          ▼ scroll
        </motion.span>
      </div>
    </header>
  )
}
