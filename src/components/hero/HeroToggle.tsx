import type { HeroVariant } from './CinematicHero'

/* fork-only comparison chip — removed once a variant wins */
export function HeroToggle({
  variant,
  onChange,
}: {
  variant: HeroVariant
  onChange: (v: HeroVariant) => void
}) {
  const btn = (v: HeroVariant, label: string) => (
    <button
      onClick={() => onChange(v)}
      className={`rounded px-3 py-1.5 font-mono text-xs transition ${
        variant === v ? 'bg-glow text-void' : 'text-dim hover:text-glow-soft'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="glass fixed bottom-5 right-5 z-50 flex items-center gap-1 p-1">
      {btn('layers', 'LAYERS')}
      {btn('film', 'FILM')}
    </div>
  )
}
