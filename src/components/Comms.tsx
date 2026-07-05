import { useState } from 'react'
import type { FormEvent } from 'react'
import { profile } from '../data/site'
import { Section } from './Panel'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type SendState = 'idle' | 'sending' | 'sent' | 'error'

export function Comms() {
  const [state, setState] = useState<SendState>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!WEB3FORMS_KEY) {
      setState('error')
      return
    }
    setState('sending')
    const data = new FormData(e.currentTarget)
    data.append('access_key', WEB3FORMS_KEY)
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <Section id="comms" code="06" title="Comms">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="glass p-6 sm:p-8">
          <p className="mb-6 text-sm text-dim">
            Open channel — for work, collaboration or anything interesting.
          </p>
          <ul className="space-y-3 font-mono text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="text-glow hover:underline">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-glow hover:underline">
                github.com/{profile.githubUser}
              </a>
            </li>
            {profile.linkedin && (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-glow hover:underline">
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
          <a
            href={profile.resumeUrl}
            download
            className="mt-8 inline-block rounded-md border border-glow/50 px-5 py-2.5 font-mono text-sm text-glow-soft transition hover:border-glow"
          >
            DOWNLOAD RESUME ↓
          </a>
        </div>

        <form onSubmit={onSubmit} className="glass space-y-4 p-6 sm:p-8">
          <input
            name="name"
            required
            placeholder="NAME"
            className="w-full rounded-md border border-line bg-void/60 px-4 py-2.5 font-mono text-sm outline-none transition focus:border-glow"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="EMAIL"
            className="w-full rounded-md border border-line bg-void/60 px-4 py-2.5 font-mono text-sm outline-none transition focus:border-glow"
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="MESSAGE"
            className="w-full resize-none rounded-md border border-line bg-void/60 px-4 py-2.5 font-mono text-sm outline-none transition focus:border-glow"
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="w-full rounded-md bg-glow px-5 py-2.5 font-mono text-sm font-semibold text-void transition hover:bg-glow-soft disabled:opacity-50"
          >
            {state === 'sending' ? 'TRANSMITTING…' : 'TRANSMIT'}
          </button>
          {state === 'sent' && <p className="font-mono text-xs text-glow">✓ Message received. I’ll get back to you.</p>}
          {state === 'error' && (
            <p className="font-mono text-xs text-red-400">
              {WEB3FORMS_KEY ? 'Transmission failed — try email instead.' : 'Form not configured yet — use email above.'}
            </p>
          )}
        </form>
      </div>
    </Section>
  )
}
