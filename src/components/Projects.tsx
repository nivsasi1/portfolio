import { projects } from '../data/site'
import { Section } from './Panel'

export function Projects() {
  return (
    <Section id="deployments" code="03" title="Featured Deployments">
      <div className="grid gap-6">
        {projects.map((p) => (
          <article key={p.name} className="glass overflow-hidden transition hover:border-glow/60">
            <div className={p.image ? 'grid sm:grid-cols-2' : ''}>
              {p.image && (
                <a href={p.liveUrl ?? p.repoUrl} target="_blank" rel="noreferrer" className="block">
                  <img
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    className="h-full min-h-52 w-full object-cover object-top"
                    loading="lazy"
                  />
                </a>
              )}
              <div className="p-6 sm:p-8">
                <div className="mb-2 flex items-center justify-between font-mono text-xs">
                  <span className="text-dim">{p.codename}</span>
                  <span className="rounded border border-glow/40 px-2 py-0.5 text-glow">{p.status}</span>
                </div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dim">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded bg-line/50 px-2 py-1 font-mono text-xs text-glow-soft">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-4 font-mono text-sm">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-glow hover:underline">
                      LIVE ↗
                    </a>
                  )}
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-dim hover:text-glow-soft">
                      SOURCE ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
