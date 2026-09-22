import { ContactBand } from '../components/ContactBand.jsx'
import { DestinationsTicker } from '../components/DestinationsTicker.jsx'
import { ExploreRegions } from '../components/ExploreRegions.jsx'
import { FeaturedGhana } from '../components/FeaturedGhana.jsx'
import { Founder } from '../components/Founder.jsx'
import { Hero } from '../components/Hero.jsx'
import { HowItWorks } from '../components/HowItWorks.jsx'
import { Newsletter } from '../components/Newsletter.jsx'
import { Services } from '../components/Services.jsx'
import { TrustStrip } from '../components/TrustStrip.jsx'

export function Home() {
  return (
    <>
      <Hero />
      <DestinationsTicker />
      <FeaturedGhana />
      <Services />
      {/* Clips the oversized Africa map backdrop inside HowItWorks, which
          used to clip itself — it can't any more, since the journey line
          runs in the gutter just outside its own content box. */}
      <section className="overflow-hidden bg-cream pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </section>
      <ContactBand />
      <ExploreRegions />
      <Founder />
      <TrustStrip />
      <Newsletter />
    </>
  )
}
