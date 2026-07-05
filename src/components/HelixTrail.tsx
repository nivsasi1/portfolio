import { useEffect, useRef, useState } from 'react'

// A tiny glowing dot that rides a vertical sine "trajectory" — as if orbiting a
// cylinder — weaving left/right and travelling top→bottom as the page scrolls.
export function HelixTrail() {
  const dot = useRef<SVGCircleElement>(null)
  const glow = useRef<SVGCircleElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cx = dims.w * 0.5
  const amp = Math.min(dims.w * 0.42, 480)
  const periods = 1.75
  const k = (periods * 2 * Math.PI) / (dims.h || 1)

  // static trajectory curve spanning the viewport height
  let path = ''
  if (dims.h) {
    const steps = 80
    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * dims.h
      const x = cx + amp * Math.sin(y * k)
      path += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1)
    }
  }

  useEffect(() => {
    if (!dims.h) return
    let raf = 0
    const render = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      const y = p * dims.h
      const phase = y * k
      const x = cx + amp * Math.sin(phase)
      // depth: cos(phase) → +1 front of cylinder, -1 back. drives size + opacity.
      const depth = (Math.cos(phase) + 1) / 2
      const r = 4 + 3.5 * depth
      const op = 0.55 + 0.45 * depth
      if (dot.current) {
        dot.current.setAttribute('cx', x.toFixed(1))
        dot.current.setAttribute('cy', y.toFixed(1))
        dot.current.setAttribute('r', r.toFixed(2))
        dot.current.setAttribute('opacity', op.toFixed(2))
      }
      if (glow.current) {
        glow.current.setAttribute('cx', x.toFixed(1))
        glow.current.setAttribute('cy', y.toFixed(1))
        glow.current.setAttribute('r', (r * 2.8).toFixed(2))
        glow.current.setAttribute('opacity', (op * 0.5).toFixed(2))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    render()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [dims, cx, amp, k])

  if (!dims.h) return null

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: -1 }} aria-hidden>
      <svg width="100%" height="100%" className="h-full w-full">
        <defs>
          <filter id="helixGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <path d={path} fill="none" stroke="var(--color-glow)" strokeOpacity="0.16" strokeWidth="2" />
        <circle ref={glow} fill="var(--color-glow)" filter="url(#helixGlow)" r="0" />
        <circle ref={dot} fill="var(--color-glow-soft)" r="0" />
      </svg>
    </div>
  )
}
