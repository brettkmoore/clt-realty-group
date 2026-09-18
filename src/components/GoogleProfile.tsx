import { Container } from '@/components/Container'
import { Heading, Eyebrow } from '@/components/Text'
import { Button } from '@/components/Button'
import { FactList } from '@/components/FactList'
import { business, gbp, areaShort } from '@/lib/site'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function longDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

/**
 * The Google Business Profile, on the page. The header stacks on top on
 * the narrow measure; the facts follow below at full width as a 40/60
 * definition list with hairlines. The same facts the profile publishes,
 * so the two never disagree.
 *
 * The rating is set as type with the date it was read, because it is a
 * real number from a live profile and it is worth saying. It is never
 * put in review markup: Google discounts a rating a business publishes
 * about itself, and the profile already carries the real one.
 */
export function GoogleProfile() {
  return (
    <section aria-labelledby="gbp-heading" className="bg-field py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Find me on Google</Eyebrow>
          <Heading id="gbp-heading" className="mt-6">
            Five stars on Google, thirty-two times over.
          </Heading>
          <p className="mt-6 text-lg/8 text-ink-soft">
            My Google profile is listed as {business.gbpName}. It carries a {gbp.rating.value} rating from {gbp.rating.count} reviews as
            of {longDate(gbp.rating.readOn)}, every one of them from a client I worked with. I serve {areaShort} from the field
            rather than from a storefront, so the profile lists a service area instead of an address.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={gbp.mapsUrl}>Open the Google listing</Button>
            <a href={gbp.reviewUrl} target="_blank" rel="noopener noreferrer" className="tap text-[13px] font-semibold tracking-[0.14em] uppercase text-ink border-b border-ink/25 pb-1 hover:border-ink">
              Leave a review
            </a>
          </div>
        </div>
        <div className="mt-14">
          <FactList
            items={[
              {
                label: 'Phone',
                value: (
                  <a href={`tel:${business.phoneE164}`} className="tap text-ink figure hover:underline hover:underline-offset-4">
                    {business.phone}
                  </a>
                ),
              },
              {
                label: 'Email',
                value: (
                  <a href={`mailto:${business.email}`} className="tap text-ink hover:underline hover:underline-offset-4">
                    {business.email}
                  </a>
                ),
              },
              ...gbp.hours.map((h) => ({ label: `Hours, ${h.label.toLowerCase()}`, value: <span className="figure">{h.display}</span> })),
              { label: 'Office', value: `${business.brokerage.name}, ${business.brokerage.address}` },
              { label: 'Google rating', value: <span className="figure">{`${gbp.rating.value} from ${gbp.rating.count} reviews, read ${longDate(gbp.rating.readOn)}`}</span> },
            ]}
          />
        </div>
      </Container>
    </section>
  )
}
