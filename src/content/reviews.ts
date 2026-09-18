/**
 * Three reviews from her Google Business Profile, read through Outscraper
 * on 2026-09-18 (place ID in src/lib/site.ts). Quoted verbatim except
 * for trailing cuts at a sentence boundary, marked with the ellipsis.
 * Attributed as the reviewer signed the review. Chosen because each one
 * says something specific about how she works rather than that she is
 * great. Candace should confirm she is comfortable with the three names
 * appearing here; any can be swapped for another from the profile.
 */
export type Review = { quote: string; author: string; when: string; context: string }

export const reviews: Review[] = [
  {
    quote:
      'She fought hard to negotiate the best deal, pushed for a comprehensive home inspection, and successfully renegotiated after the inspection to make sure my interests were protected. As a first-time homebuyer, I really appreciated her patience.',
    author: 'Zachary Thomas',
    when: 'July 2026',
    context: 'First-time buyer.',
  },
  {
    quote:
      'In less than 48 hours of speaking to us and getting our home search criteria Candace had homes lined up with detailed comps. I was blown away. I had never experienced that level of service.',
    author: 'Didi Aboyeji',
    when: 'July 2024',
    context: 'Buyers who first met her when another agent was unavailable.',
  },
  {
    quote:
      'Candace works as if you are her only client to the point you do not even realize the million other things she has going on. She is personable, professional, has up to date knowledge on what is happening in the market, prompt, efficient in her business as well as her communication.',
    author: 'Reba Jones',
    when: 'November 2023',
    context: 'Referred by her sister, a past client.',
  },
]
