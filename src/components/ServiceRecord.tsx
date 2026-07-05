import { experience } from '../data/site'
import { Section } from './Panel'

export function ServiceRecord() {
  return (
    <Section id="experience" code="02" title="Service Record">
      <div className="grid gap-6">
        {experience.map((e) => (
          <div key={e.org} className="glass p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{e.role}</h3>
                <p className="font-mono text-sm text-glow-soft">{e.org}</p>
              </div>
              <span className="font-mono text-xs text-dim">{e.period}</span>
            </div>
            <ul className="space-y-2.5">
              {e.points.map((p) => (
                <li key={p.slice(0, 32)} className="flex gap-3 text-sm leading-relaxed text-dim">
                  <span className="mt-0.5 shrink-0 text-glow">▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
