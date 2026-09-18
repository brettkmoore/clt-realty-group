import type { MetadataRoute } from 'next'

import { siteUrl, HIDE_FROM_SEARCH_ENGINES } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (HIDE_FROM_SEARCH_ENGINES) {
    return { rules: [{ userAgent: '*', disallow: '/' }], sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl }
  }
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl }
}
