import { motion, useTransform, type MotionValue } from 'framer-motion'
import { HERO_ASSETS } from './CinematicHero'

/**
 * Variant B opening: the Higgsfield film plays full-bleed, then scales back
 * and dissolves into the still layers as scrolling begins.
 */
export function FilmIntro({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.28], [1, 0])
  const scale = useTransform(progress, [0, 0.28], [1, 1.12])

  return (
    <motion.div className="pointer-events-none absolute inset-0 will-change-transform" style={{ opacity, scale }}>
      <video
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
