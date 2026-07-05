import { profile } from '../data/site'
import { Section } from './Panel'

export function About() {
  return (
    <Section id="about" code="01" title="Operator Profile">
      <div className="glass p-6 sm:p-8">
        <div className="mb-4 font-mono text-xs text-dim">
          ID: {profile.githubUser} · BASE: {profile.location}
        </div>
        {profile.bio.map((p) => (
          <p key={p.slice(0, 24)} className="mb-4 max-w-3xl leading-relaxed last:mb-0">
            {p}
          </p>
        ))}
      </div>
    </Section>
  )
}
