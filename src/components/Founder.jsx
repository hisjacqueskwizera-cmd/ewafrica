import { ArrowRight } from 'lucide-react'
import { FOUNDER } from '../data/siteContent.js'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

export function Founder() {
  return (
    <section id="about" className="pb-2 lg:pb-3">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src="/Pictures/CEO.jpg"
              alt="Founder of East-West Africa Link"
              className="aspect-4/5 w-full object-cover"
            />
          </div>
          <span
            className="absolute -bottom-4 -right-4 -z-10 hidden size-40 rounded-3xl bg-sand lg:block"
            aria-hidden="true"
          />
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <SectionMark />
          <span className="section-eyebrow">{FOUNDER.eyebrow}</span>
          <RevealText
            as="h2"
            text={FOUNDER.heading}
            className="mt-2 text-3xl font-semibold text-primary sm:text-4xl lg:text-[2.75rem]"
          />
          <div className="mt-4 w-16">
            <SectionMark orientation="horizontal" className="mb-0" />
          </div>
          <div className="mt-6 space-y-4">
            {FOUNDER.body.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
          <HashLink to="/about#founder" className="btn-outline-dark mt-8">
            {FOUNDER.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </HashLink>
        </Reveal>
      </div>
    </section>
  )
}
