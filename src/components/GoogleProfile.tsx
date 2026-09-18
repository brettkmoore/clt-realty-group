import { Container } from '@/components/Container'
import { Heading, Eyebrow } from '@/components/Text'
import { Button } from '@/components/Button'
import { business, gbp, areaShort } from '@/lib/site'

/**
 * The Google Business Profile, on the page. Hours, phone, service area
 * and the two links Google cares about: the map listing and the review
 * form. The same facts the profile publishes, so the two never disagree.
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
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16">
          <div className="max-w-xl">
            <Eyebrow>Find me on Google</Eyebrow>
            <Heading id="gbp-heading" className="mt-6">
              Five stars on Google, thirty-two times over.
            </Heading>
            <p className="mt-6 text-lg/8 text-ink-soft">
              My Google profile is listed as {business.gbpName}. It carries a {gbp.rating.value} rating from{' '}
              {gbp.rating.count} reviews as of {gbp.rating.readOn.replace(/(\d{4})-(\d{2})-(\d{2})/, (_m, y, mo, d) => `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][Number(mo) - 1]} ${Number(d)}, ${y}`)}, every one of them from a client I
              worked with. I serve {areaShort} from the field rather than from a storefront, so the profile lists a
              service area instead of an address.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href={gbp.mapsUrl}>Open the Google listing</Button>
              <a href={gbp.reviewUrl} target="_blank" rel="noopener noreferrer" className="tap text-[13px] font-semibold tracking-[0.14em] uppercase text-ink border-b border-ink/25 pb-1 hover:border-ink">
                Leave a review
              </a>
            </div>
          </div>
          <div className="panel mt-12 p-8 sm:p-10 lg:mt-0">
            <dl className="divide-y divide-rule text-base/7">
              <div className="flex justify-between gap-x-6 py-4">
                <dt className="text-ink-soft">Phone</dt>
                <dd>
                  <a href={`tel:${business.phoneE164}`} className="tap text-ink figure hover:underline hover:underline-offset-4">
                    {business.phone}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-x-6 py-4">
                <dt className="text-ink-soft">Email</dt>
                <dd className="text-right">
                  <a href={`mailto:${business.email}`} className="tap text-ink hover:underline hover:underline-offset-4">
                    {business.email}
                  </a>
                </dd>
              </div>
              {gbp.hours.map((h) => (
                <div key={h.label} className="flex justify-between gap-x-6 py-4">
                  <dt className="text-ink-soft">{h.label}</dt>
                  <dd className="text-ink figure">{h.display}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-x-6 py-4">
                <dt className="text-ink-soft">Office</dt>
                <dd className="max-w-[16rem] text-right text-ink">
                  {business.brokerage.name}
                  <span className="block text-ink-soft">{business.brokerage.address}</span>
                </dd>
              </div>
              <div className="flex justify-between gap-x-6 py-4">
                <dt className="text-ink-soft">Google rating</dt>
                <dd className="text-ink figure">
                  {gbp.rating.value} from {gbp.rating.count} reviews
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}
