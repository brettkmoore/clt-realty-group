import type { MetadataRoute } from 'next'

import { areas, siteUrl } from '@/lib/site'
import { getStories } from '@/lib/stories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/buyers/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/sellers/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/stories/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/areas/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact/`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]
  for (const a of areas) {
    pages.push({ url: `${siteUrl}/areas/${a.slug}/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })
  }
  const stories = await getStories()
  for (const s of stories) {
    pages.push({ url: `${siteUrl}/stories/${s.slug}/`, lastModified: new Date(s.date), changeFrequency: 'yearly', priority: 0.6 })
  }
  return pages
}
