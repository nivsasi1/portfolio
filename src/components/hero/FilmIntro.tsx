import { useRef } from 'react'
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { HERO_ASSETS } from './CinematicHero'

/**
 * Variant B opening: the Higgsfield film plays full-bleed, then scales back
 * and dissolves into the still layers as scrolling begins.
 */
export function FilmIntro({ progress }: { progress: MotionValue<number> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const opacity = useTransform(progress, [0, 0.28], [1, 0])
  const scale = useTransform(progress, [0, 0.28], [1, 1.12])

  // once fully faded the loop would keep decoding invisibly — pause it
  useMotionValueEvent(opacity, 'change', (o) => {
    const v = videoRef.current
    if (!v) return
    if (o <= 0.01 && !v.paused) v.pause()
    else if (o > 0.01 && v.paused) v.play().catch(() => {})
  })

  return (
    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity, scale }}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={HERO_ASSETS.film}
        poster={HERO_ASSETS.master}
        autoPlay
        muted
        loop
        playsInline
      />
    </motion.div>
  )
}
