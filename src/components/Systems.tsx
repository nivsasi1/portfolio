import { systems } from '../data/site'
import { Section, StatusDot } from './Panel'

export function Systems() {
  return (
    <Section id="systems" code="03" title="Systems">
      <div className="grid gap-5 sm:grid-cols-3">
        {systems.map((sys) => (
          <div key={sys.module} className="glass p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-mono text-sm tracking-widest text-glow-soft">{sys.module}</h3>
              <StatusDot label="OK" />
            </div>
            <ul className="space-y-2">
              {sys.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-dim">
                  <span className="text-glow">▸</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
