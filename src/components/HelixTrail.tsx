import { useEffect, useRef, useState } from 'react'

const SECTION_IDS = ['about', 'experience', 'deployments', 'systems', 'telemetry', 'comms']

// A glowing beacon that marks the active section. It parks in the gap just above
// each section (alternating left/right) and eases along a connecting weave to the
// next section's corner as you scroll — a "you are here" telemetry marker.
export function HelixTrail() {
  const dot = useRef<SVGCircleElement>(null)
  const glow = useRef<SVGCircleElement>(null)
  const line = useRef<SVGPathElement>(null)
  const els = useRef<HTMLElement[]>([])
  const pos = useRef({ x: 0, y: 0, init: false })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const collect = () => {
      els.current = SECTION_IDS.map((id) => document.getElementById(id)).filter(
        (e): e is HTMLElement => !!e,
      )
      setReady(els.current.length > 1)
    }
    collect()
    const t = setTimeout(collect, 500) // re-collect after fonts/layout settle
    window.addEventListener('resize', collect)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', collect)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    let raf = 0
    let lastY = -1

    const frame = () => {
      raf = 0
      const vh = window.innerHeight
      const y = window.scrollY
      const scrolling = y !== lastY
      lastY = y
      const list = els.current

      // anchor just above each section, aligned to its box (inset from the corner),
      // alternating left/right — keeps the beacon tied to the content, not the screen edge
      const pts = list.map((el, i) => {
        const r = el.getBoundingClientRect()
        const inset = Math.min(r.width * 0.12, 110)
        return {
          x: i % 2 === 0 ? r.left + inset : r.right - inset,
          y: r.top - 22,
          top: r.top,
        }
      })

      // draw the connecting weave
      if (line.current && pts.length > 1) {
        let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1]
          const b = pts[i]
          const my = ((a.y + b.y) / 2).toFixed(1)
          d += ` C ${a.x.toFixed(1)} ${my}, ${b.x.toFixed(1)} ${my}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
        }
        line.current.setAttribute('d', d)
      }

      // active section = last one whose top has crossed 40% of the viewport
      let idx = 0
      for (let i = 0; i < pts.length; i++) {
        if (pts[i].top <= vh * 0.4) idx = i
      }
      const target = pts[idx]

      const p = pos.current
      if (!p.init) {
        p.x = target.x
        p.y = target.y
        p.init = true
      }
      p.x += (target.x - p.x) * 0.09
      p.y += (target.y - p.y) * 0.09
      const settling = Math.abs(target.x - p.x) + Math.abs(target.y - p.y) > 0.4

      const cx = p.x.toFixed(1)
      const cy = p.y.toFixed(1)
      dot.current?.setAttribute('cx', cx)
      dot.current?.setAttribute('cy', cy)
      glow.current?.setAttribute('cx', cx)
      glow.current?.setAttribute('cy', cy)

      if (scrolling || settling) kick()
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    kick()
    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ready])

  if (!ready) return null

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: -1 }} aria-hidden>
      <svg width="100%" height="100%" className="h-full w-full">
        <defs>
          <filter id="helixGlow" x="-250%" y="-250%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <path ref={line} fill="none" stroke="var(--color-glow)" strokeOpacity="0.14" strokeWidth="2" />
        <circle ref={glow} r="18" fill="var(--color-glow)" opacity="0.45" filter="url(#helixGlow)" />
        <circle ref={dot} r="5.5" fill="var(--color-glow-soft)" />
      </svg>
    </div>
  )
}
