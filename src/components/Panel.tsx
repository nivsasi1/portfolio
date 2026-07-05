import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Section({
  id,
  code,
  title,
  children,
}: {
  id: string
  code: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-widest text-glow">[{code}]</span>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          <div className="ml-2 h-px flex-1 bg-line" />
        </div>
        {children}
      </motion.div>
    </section>
  )
}

export function StatusDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-dim">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
      </span>
      {label}
    </span>
  )
}
