import { useEffect, useRef, useState } from 'react'

const SECTION_IDS = ['about', 'experience', 'deployments', 'systems', 'telemetry', 'comms']

// A glowing beacon that rides a weave threading every section. The weave spans the
// whole page (top → footer); the dot's position is the scroll progress mapped onto
// the path, so it glides *along* the line as you scroll — no jumps.
export function HelixTrail() {
  const pathEl = useRef<SVGPathElement>(null)
  const dot = useRef<SVGCircleElement>(null)
  const glow = useRef<SVGCircleElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [d, setD] = useState('')

  // build the weave through every section, in document coordinates
  useEffect(() => {
    const build = () => {
      const w = document.documentElement.clientWidth
      const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
        (e): e is HTMLElement => !!e,
      )
      if (els.length < 2) return
      // measure real content height from the footer, NOT scrollHeight — an absolute
      // overlay sized to scrollHeight inflates the page and feeds back on itself
      const footer = document.querySelector('footer')
      const bottomEl: Element = footer ?? els[els.length - 1]
      const h = Math.round(bottomEl.getBoundingClientRect().bottom + window.scrollY)
      const sy = window.scrollY
      const anchors = els.map((el, i) => {
        const r = el.getBoundingClientRect()
        const inset = Math.min(r.width * 0.12, 110)
        return { x: i % 2 === 0 ? r.left + inset : r.right - inset, y: r.top + sy - 24 }
      })
      // extend from near the top of the page down past the last section to the footer
      const pts = [
        { x: anchors[0].x, y: 130 },
        ...anchors,
        { x: anchors[anchors.length - 1].x, y: h - 40 },
      ]
      let str = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1]
        const b = pts[i]
        const my = ((a.y + b.y) / 2).toFixed(1)
        str += ` C ${a.x.toFixed(1)} ${my}, ${b.x.toFixed(1)} ${my}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
      }
      setDims({ w, h })
      setD(str)
    }
    build()
    const t = setTimeout(build, 500) // re-measure after fonts / async content settle
    const ro = new ResizeObserver(build)
    ro.observe(document.body)
    window.addEventListener('resize', build)
    return () => {
      clearTimeout(t)
      ro.disconnect()
      window.removeEventListener('resize', build)
    }
  }, [])

  // ride the dot along the path by scroll progress
  useEffect(() => {
    let raf = 0
    const frame = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (pathEl.current) {
        const len = pathEl.current.getTotalLength()
        const pt = pathEl.current.getPointAtLength(p * len)
        const cx = pt.x.toFixed(1)
        const cy = pt.y.toFixed(1)
        dot.current?.setAttribute('cx', cx)
        dot.current?.setAttribute('cy', cy)
        glow.current?.setAttribute('cx', cx)
        glow.current?.setAttribute('cy', cy)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    frame()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [d])

  if (!dims.h) return null

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0"
      style={{ height: dims.h, zIndex: -1 }}
      aria-hidden
    >
      <svg width={dims.w} height={dims.h}>
        <defs>
          <filter id="helixGlow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <path ref={pathEl} d={d} fill="none" stroke="var(--color-glow)" strokeOpacity="0.16" strokeWidth="2" />
        <circle ref={glow} r="28" fill="var(--color-glow)" opacity="0.5" filter="url(#helixGlow)" />
        <circle ref={dot} r="6.5" fill="var(--color-glow-soft)" />
      </svg>
    </div>
  )
}
