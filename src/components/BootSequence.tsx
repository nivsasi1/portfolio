import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINES = [
  '> NS://MISSION-CONTROL v1.0',
  '> loading operator profile .......... OK',
  '> mounting deployments .............. OK',
  '> linking github telemetry .......... OK',
  '> all systems nominal',
]

const LINE_DELAY = 420

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(onDone, 600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShown((n) => n + 1), LINE_DELAY)
    return () => clearTimeout(t)
  }, [shown, onDone])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-void"
        onClick={onDone}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full max-w-md px-6 font-mono text-sm text-glow-soft">
          {LINES.slice(0, shown).map((line) => (
            <motion.p key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-7">
              {line}
            </motion.p>
          ))}
          <span className="inline-block h-4 w-2 animate-pulse bg-glow align-middle" />
          <p className="mt-6 text-xs text-dim">click to skip</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
