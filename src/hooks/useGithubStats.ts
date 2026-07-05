import { useEffect, useState } from 'react'
import { githubFallback, profile } from '../data/site'

export type GithubStats = {
  publicRepos: number
  followers: number
  topLanguages: string[]
  lastActive: string
  live: boolean
}

const fallback: GithubStats = { ...githubFallback, live: false }

export function useGithubStats(): GithubStats {
  const [stats, setStats] = useState<GithubStats>(fallback)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${profile.githubUser}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=30`, {
            signal: controller.signal,
          }),
        ])
        if (!userRes.ok || !reposRes.ok) return
        const user = await userRes.json()
        const repos: { language: string | null; pushed_at: string }[] = await reposRes.json()

        const langCount = new Map<string, number>()
        for (const r of repos) {
          if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1)
        }
        const topLanguages = [...langCount.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([lang]) => lang)

        const lastPush = repos[0]?.pushed_at
        const lastActive = lastPush
          ? new Date(lastPush).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : fallback.lastActive

        setStats({
          publicRepos: user.public_repos ?? fallback.publicRepos,
          followers: user.followers ?? fallback.followers,
          topLanguages: topLanguages.length ? topLanguages : fallback.topLanguages,
          lastActive,
          live: true,
        })
      } catch {
        // keep fallback values
      }
    }
    load()
    return () => controller.abort()
  }, [])

  return stats
}
