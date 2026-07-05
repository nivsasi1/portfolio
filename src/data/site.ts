export const profile = {
  name: 'Niv Sasi',
  title: 'Full-Stack Developer',
  location: 'Rehovot, Israel',
  email: 'nivsasi@gmail.com',
  github: 'https://github.com/nivsasi1',
  githubUser: 'nivsasi1',
  linkedin: 'https://www.linkedin.com/in/niv-sasi-906405309/',
  resumeUrl: '/resume.pdf',
  tagline: 'I build mission-critical, high-scale systems — and AI-powered tools that do real work.',
  bio: [
    'Full-stack developer with 3 years of building mission-critical, high-scale systems in the IDF — platforms serving thousands of daily users and managing hundreds of thousands of records, built with React, TypeScript, Node.js and MongoDB.',
    'Experienced across the entire stack: database architecture, secure microservices, real-time data streaming with Kafka, and modular UI. On the side I build AI tools and automation in Python — from local voice assistants that understand Hebrew and English to content pipelines that run themselves.',
    'Practical Software Engineering graduate (ORT College, 90+), currently pursuing a B.Sc. in Computer Science at the Open University of Israel.',
  ],
}

export type Experience = {
  role: string
  org: string
  period: string
  points: string[]
}

export const experience: Experience[] = [
  {
    role: 'Full Stack Developer',
    org: 'IDF — Information Systems Department',
    period: '2023 – 2026',
    points: [
      'Designed and built high-scale operational platforms for logistics and real-time personnel tracking — thousands of active users daily, hundreds of thousands of records.',
      'Developed end-to-end features in a monorepo with React, Node.js and MongoDB: database architecture, API design, and modular reusable UI.',
      'Architected scalable Node.js microservices in a classified environment — JWT auth, session management and caching under load.',
      'Containerized with Docker, deployed on OpenShift, and integrated Apache Kafka for secure real-time data streaming across distributed networks.',
    ],
  },
  {
    role: 'Independent Software Developer',
    org: 'Freelance',
    period: '2022',
    points: [
      'Built a custom OSINT automation and data-extraction tool for a private investigation agency — web scraping and local file parsing that cut manual intelligence-gathering time dramatically.',
      'Owned the full delivery cycle: requirements, architecture, implementation, client hand-off.',
    ],
  },
]

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
  {
    name: 'Automated Content Pipeline',
    codename: 'DEPLOYMENT-02',
    description:
      'End-to-end content-generation pipeline: pulls stories from Reddit APIs, narrates them with text-to-speech AI, auto-generates subtitles and programmatically edits video — eliminating most manual production work.',
    stack: ['Python', 'Reddit API', 'TTS AI', 'FFmpeg'],
    status: 'ARCHIVED',
  },
]

export const systems = [
  {
    module: 'FRONTEND',
    items: ['React', 'TypeScript', 'Material UI', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    module: 'BACKEND & DATA',
    items: ['Node.js', 'Express', 'MongoDB', 'Apache Kafka', 'Microservices', 'JWT / Sessions'],
  },
  {
    module: 'OPS, AI & AUTOMATION',
    items: ['Docker', 'OpenShift', 'Python', 'Whisper / Ollama', 'Web Scraping', 'Stripe & PSPs'],
  },
]

// shown if the GitHub API is unavailable / rate-limited
export const githubFallback = {
  publicRepos: 5,
  followers: 2,
  topLanguages: ['TypeScript', 'Python', 'Java'],
  lastActive: 'recently',
}
