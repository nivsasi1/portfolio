import { useGithubStats } from '../hooks/useGithubStats'
import { profile } from '../data/site'
import { Section } from './Panel'

export function Telemetry() {
  const stats = useGithubStats()

  const cells = [
    { label: 'PUBLIC REPOS', value: String(stats.publicRepos) },
    { label: 'FOLLOWERS', value: String(stats.followers) },
    { label: 'TOP LANGUAGES', value: stats.topLanguages.join(' · ') },
    { label: 'LAST PUSH', value: stats.lastActive },
  ]

  return (
    <Section id="telemetry" code="04" title="Telemetry">
      <div className="glass p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between font-mono text-xs text-dim">
          <span>SOURCE: api.github.com/{profile.githubUser}</span>
          <span className={stats.live ? 'text-glow' : ''}>{stats.live ? '● LIVE' : '○ CACHED'}</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-4">
          {cells.map((c) => (
            <div key={c.label}>
              <div className="font-mono text-xs text-dim">{c.label}</div>
              <div className="mt-1 text-xl font-semibold text-glow-soft">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
