import { ArrowRight, Compass, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT_INFO } from '../data/siteContent.js'

export function Placeholder({ eyebrow, heading, body }) {
  return (
    <section className="flex min-h-screen items-center bg-linear-to-b from-card to-cream pt-[84px]">
      <div className="mx-auto flex max-w-160 flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mb-5 grid size-17 place-items-center rounded-[20px] bg-forest text-gold">
          <Compass className="size-8" aria-hidden="true" />
        </div>
        <span className="section-eyebrow">{eyebrow}</span>
        <h1 className="mt-3.5 text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-primary">
          {heading}
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">{body}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href={CONTACT_INFO.emailHref} className="btn-copper">
            <Mail className="size-4" aria-hidden="true" />
            Contact Us Directly
          </a>
          <Link to="/" className="btn-outline-dark">
            Back to Home
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
