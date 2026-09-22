import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TOUR_GUIDE_PAGES } from '../../data/siteContent.js'
import { Reveal } from '../../components/Reveal.jsx'
import { APPLICATION_STEPS } from './stepRegistry.js'

const FORM_STRUCTURE = [
  ...APPLICATION_STEPS.map((s) => ({ name: s.title, purpose: s.purpose })),
  { name: 'Declaration, Review and Submit', purpose: 'Consent, review, signature, and final submission.' },
]

export function ApplicationStart() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const countryData = TOUR_GUIDE_PAGES[slug]

  useEffect(() => {
    if (countryData) {
      document.title = `Tour Guide Application — ${countryData.countryLabel} | East-West Africa Link`
    }
  }, [countryData])

  if (!countryData) return <Navigate to="/independent-tour-guide" replace />

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="section-eyebrow">Independent Tour Guide Network</span>
          <h1 className="mt-3 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
            Guide Application — {countryData.countryLabel}
          </h1>
        </Reveal>

        <Reveal delay={100} className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Thank you for your interest in joining the East-West Africa Link Independent Tour Guide
            Network. East-West Africa Link connects travelers with experienced independent local
            tour guides. Acceptance into the network does not constitute employment and does not
            guarantee customer referrals. Guides remain independent professionals responsible for
            their services, availability, pricing, itineraries, taxes, insurance, and compliance
            with applicable local laws.
          </p>
          <p className="mt-4 flex items-start gap-2.5 rounded-xl bg-cream p-4 text-sm font-semibold text-primary">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
            East-West Africa Link requires a minimum of three years of professional guiding
            experience. Applicants must meet applicable licensing, registration, certification, or
            other legal requirements where required in the place they operate.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-8">
          <h2 className="text-lg font-bold text-primary">What to Expect</h2>
          <ol className="mt-4 space-y-2.5">
            {FORM_STRUCTURE.map((step, i) => (
              <li key={step.name} className="flex items-start gap-3 text-sm text-primary">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cocoa text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold">{step.name}</span>
                  <span className="text-muted-foreground"> — {step.purpose}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={200} className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate(`/independent-tour-guide/${slug}/apply/step/1`)}
            className="btn-copper"
          >
            Begin Application
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            Takes about 15–20 minutes. Your answers are kept as you move between steps.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
