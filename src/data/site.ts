export const profile = {
  name: 'Niv Sasi',
  title: 'Full-Stack Developer',
  location: 'Rehovot, Israel',
  email: 'nivsasi@gmail.com',
  github: 'https://github.com/nivsasi1',
  githubUser: 'nivsasi1',
  linkedin: '', // add when ready; link hidden while empty
  resumeUrl: '/resume.pdf',
  tagline: 'I build full-stack products and AI-powered tools that do real work.',
  bio: [
    'Full-stack developer from Rehovot, Israel, working across React, TypeScript and Node on the web side, and Python for AI and automation.',
    'I like shipping things people actually use — from a live e-commerce site for a real shop to local voice assistants that understand Hebrew and English. Most of my projects start with "this should be automated" and end deployed.',
  ],
}

export type Project = {
  name: string
  codename: string
  description: string
  stack: string[]
  liveUrl?: string
  repoUrl?: string
  image?: string
  status: 'DEPLOYED' | 'IN DEVELOPMENT' | 'ARCHIVED'
}

export const projects: Project[] = [
  {
    name: 'Lev Hatahbiv',
    codename: 'DEPLOYMENT-01',
    description:
      'Production e-commerce site built for a real shop — full storefront, product management and orders. React + TypeScript front end with a Node backend, live on Vercel and actively maintained.',
    stack: ['React', 'TypeScript', 'Node.js', 'Vercel'],
    liveUrl: 'https://lev-hatahbiv.vercel.app',
    repoUrl: 'https://github.com/nivsasi1/lev-hatahbiv',
    image: '/projects/lev-hatahbiv.png',
    status: 'DEPLOYED',
  },
]

export const systems = [
  {
    module: 'FRONTEND',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    module: 'BACKEND',
    items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    module: 'AI & AUTOMATION',
    items: ['Python', 'Whisper', 'Ollama', 'OpenCV', 'Claude Code'],
  },
]

// shown if the GitHub API is unavailable / rate-limited
export const githubFallback = {
  publicRepos: 5,
  followers: 2,
  topLanguages: ['TypeScript', 'Python', 'Java'],
  lastActive: 'recently',
}
