import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type StoryRole = 'Buyer story' | 'Seller story' | 'Sale and purchase' | 'Both sides'

export type Story = {
  slug: string
  title: string
  date: string
  city: string
  county: string
  state: 'NC' | 'SC'
  area: string | null
  order: number
  role: StoryRole
  summary: string
  image: string | null
  alt: string | null
  heroNote: string | null
  featured: boolean
  facts: { label: string; value: string }[]
  readMinutes: number
  body: string
  html: string
}

const DIR = path.join(process.cwd(), 'content', 'stories')

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}

async function parse(file: string): Promise<Story> {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8')
  const { data, content } = matter(raw)
  const rendered = await remark().use(html).process(content)
  return {
    slug: file.replace(/\.md$/, ''),
    title: data.title,
    date: data.date,
    city: data.city,
    county: data.county,
    state: data.state,
    order: Number(data.order ?? 99),
    area: data.area ?? null,
    role: data.role,
    summary: data.summary,
    image: data.image ?? null,
    alt: data.alt ?? null,
    heroNote: data.heroNote ?? null,
    featured: Boolean(data.featured),
    facts: Array.isArray(data.facts) ? data.facts : [],
    readMinutes: readingTime(content),
    body: content,
    html: String(rendered),
  }
}

let cache: Story[] | null = null

export async function getStories(): Promise<Story[]> {
  if (cache) return cache
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'))
  const stories = await Promise.all(files.map(parse))
  cache = stories.sort((a, b) => a.order - b.order || (a.date < b.date ? 1 : -1))
  return cache
}

export async function getStory(slug: string): Promise<Story | undefined> {
  const stories = await getStories()
  return stories.find((s) => s.slug === slug)
}

export async function getStoriesForArea(area: string): Promise<Story[]> {
  const stories = await getStories()
  return stories.filter((s) => s.area === area)
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
