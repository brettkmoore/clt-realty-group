/*
 * The review flag lives in src/lib/site.ts as TypeScript; next.config
 * cannot import it, so it is read from the file's text here. One source.
 */
import { readFileSync } from 'node:fs'
const HIDE_FROM_SEARCH_ENGINES = /export const HIDE_FROM_SEARCH_ENGINES = true/.test(
  readFileSync(new URL('./src/lib/site.ts', import.meta.url), 'utf8'),
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  /*
   * PREVIEW HOSTS ARE NOINDEXED AT THE HEADER. Any host other than the
   * canonical domain (a *.vercel.app deployment, a preview branch URL)
   * answers with X-Robots-Tag: noindex, nofollow, so a review link that
   * gets passed around cannot end up in Google. The rule keys on the
   * request host, so it falls away by itself the day cltrealtygroup.net
   * is attached and nothing has to be remembered at launch. The second rule
   * covers every host while the review flag in src/lib/site.ts is on.
   */
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
    const rules = [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?!(www\\.)?cltrealtygroup\\.net$).*' }],
        headers: noindex,
      },
    ]
    if (HIDE_FROM_SEARCH_ENGINES) rules.push({ source: '/:path*', headers: noindex })
    return rules
  },
  async redirects() {
    return [
      /* The case studies live at /stories/. /blog/ is the name people guess. */
      { source: '/blog', destination: '/stories/', permanent: true },
      { source: '/blog/:slug*', destination: '/stories/:slug*', permanent: true },
      { source: '/case-studies', destination: '/stories/', permanent: true },
      { source: '/case-studies/:slug*', destination: '/stories/:slug*', permanent: true },
      { source: '/neighborhoods', destination: '/areas/', permanent: true },
      { source: '/neighborhoods/:slug*', destination: '/areas/:slug*', permanent: true },
    ]
  },
}

export default nextConfig
