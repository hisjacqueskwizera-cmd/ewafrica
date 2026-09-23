import { ArrowLeft, CreditCard, HelpCircle, Lock, Map, Shield, Smartphone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES, TRAVEL_PLANNER_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useTravelPlannerFlow } from '../../context/TravelPlannerFlowContext.jsx'

// Original, generic SVG badges — a rounded-rect chip in each brand's
// approximate color with its name set in plain type — not the providers'
// actual logo artwork (no interlocking-circles mark, no wordmark styling).
// This project has no Stripe/PayPal/mobile-money integration yet (see the
// note on TRAVEL_PLANNER_FLOW in siteContent.js), so showing their real
// logos would both reproduce trademarked marks without authorization and
// imply this site can already process a real charge through them, neither
// of which is true. Swap these for the real logos once a processor is
// wired up — most give you brand assets when you sign up.
const BRAND_COLORS = {
  Visa: { bg: '#1A1F71', fg: '#FFFFFF' },
  Mastercard: { bg: '#242424', fg: '#FFFFFF' },
  Amex: { bg: '#2E77BC', fg: '#FFFFFF' },
  Discover: { bg: '#E57200', fg: '#FFFFFF' },
  PayPal: { bg: '#003087', fg: '#FFFFFF' },
  'MTN MoMo': { bg: '#FFCC08', fg: '#241A10' },
  'Airtel Money': { bg: '#ED1C24', fg: '#FFFFFF' },
}

function BrandBadge({ name }) {
  const { bg, fg } = BRAND_COLORS[name]
  const width = 40 + name.length * 11
  return (
    <svg
      width={width}
      height={34}
      viewBox={`0 0 ${width} 34`}
      role="img"
      aria-label={name}
      className="shrink-0"
    >
      <rect width={width} height={34} rx={6} fill={bg} />
      <text
        x={width / 2}
        y={22}
        textAnchor="middle"
        fontSize={14}
        fontWeight={800}
        letterSpacing={0.4}
        fill={fg}
        fontFamily="var(--font-sans)"
      >
        {name.toUpperCase()}
      </text>
    </svg>
  )
}

const METHODS = [
  {
    id: 'card',
    icon: CreditCard,
    label: 'Credit or Debit Card',
    brands: ['Visa', 'Mastercard', 'Amex', 'Discover'],
    note: 'Pay with any major card.',
  },
  {
    id: 'paypal',
    icon: null,
    label: 'PayPal',
    brands: ['PayPal'],
    note: 'Pay securely with your PayPal account.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'Mobile Money (where available)',
    brands: ['MTN MoMo', 'Airtel Money'],
    note: 'Pay using Mobile Money (MoMo) in supported countries.',
  },
]

export function Payment() {
  useEffect(() => {
    document.title = 'Secure Payment | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, tier, setPaid } = useTravelPlannerFlow()
  const copy = TRAVEL_PLANNER_FLOW.steps.payment
  const [method, setMethod] = useState('card')

  const destinationNames = request.destinationSlugs
    .filter(Boolean)
    .map((slug) => COUNTRIES.find((c) => c.slug === slug)?.name)
    .filter(Boolean)
    .join(', ')

  // No payment processor is integrated anywhere in this project (see the
  // comment on TRAVEL_PLANNER_FLOW in siteContent.js). The card fields
  // below are visual only — nothing reads their values — and submitting
  // just marks the request "paid" locally and moves to the confirmation
  // step. Wire a real processor (Stripe/PayPal/mobile-money SDK) here
  // before this collects a real payment.
  const handleSubmit = (event) => {
    event.preventDefault()
    setPaid(true)
    navigate('/travel-planner/confirmation')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        badge="Travel Planner"
        badgeImage="/Pictures/umbrella.PNG"
        badgeImageAlt="Travel Planner"
        backgroundImage="/Pictures/TRV_HR.PNG"
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              <Lock className="size-6 text-copper" aria-hidden="true" />
              {copy.heading}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.description}
            </p>
          </Reveal>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-2.5 bg-cream px-5 py-3.5 sm:px-6">
                  <Map className="size-4 text-copper" aria-hidden="true" />
                  <h2 className="text-sm font-bold text-primary sm:text-base">Your Travel Planner</h2>
                </div>
                <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto_auto] sm:p-6">
                  <dl className="space-y-2.5">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground">
                        Countries selected
                      </dt>
                      <dd className="text-sm font-semibold text-primary">
                        {destinationNames || 'Not provided'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground">
                        Service
                      </dt>
                      <dd className="text-sm font-semibold text-primary">
                        {request.destinationSlugs.length}-Country Travel Planner
                      </dd>
                      <p className="text-xs text-muted-foreground">
                        Personalized travel planning for your selected destinations.
                      </p>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground">
                        Price
                      </dt>
                      <dd className="text-lg font-bold text-primary">${tier?.price ?? '—'}</dd>
                    </div>
                  </dl>
                  <span className="hidden w-px bg-border sm:block" aria-hidden="true" />
                  <p className="self-center text-sm italic leading-snug text-muted-foreground sm:max-w-[10rem]">
                    {copy.quote.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-2.5 bg-cream px-5 py-3.5 sm:px-6">
                  <CreditCard className="size-4 text-copper" aria-hidden="true" />
                  <div>
                    <h2 className="text-sm font-bold text-primary sm:text-base">
                      Choose a Payment Method
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Select your preferred payment option. All payments are secure and encrypted.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 p-5 sm:p-6">
                  {METHODS.map((m) => (
                    <div
                      key={m.id}
                      className={`rounded-xl border-2 p-4 transition-colors ${
                        method === m.id ? 'border-copper' : 'border-border'
                      }`}
                    >
                      <label className="flex flex-wrap items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={method === m.id}
                          onChange={() => setMethod(m.id)}
                          className="size-4 accent-copper"
                        />
                        {m.icon && <m.icon className="size-5 text-primary" aria-hidden="true" />}
                        <span className="text-sm font-bold text-primary">{m.label}</span>
                        <span className="ml-auto flex flex-wrap gap-2">
                          {m.brands.map((brand) => (
                            <BrandBadge key={brand} name={brand} />
                          ))}
                        </span>
                      </label>
                      <p className="mt-1.5 pl-7 text-xs text-muted-foreground">{m.note}</p>

                      {method === m.id && m.id === 'card' && (
                        <div className="mt-4 space-y-3 pl-7">
                          <label className="block">
                            <span className="text-xs font-semibold text-primary">Card number *</span>
                            <input
                              placeholder="1234 5678 9012 3456"
                              autoComplete="off"
                              className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-copper"
                            />
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <label className="block">
                              <span className="text-xs font-semibold text-primary">
                                Expiration date *
                              </span>
                              <input
                                placeholder="MM / YY"
                                autoComplete="off"
                                className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-copper"
                              />
                            </label>
                            <label className="block">
                              <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                                Security code *
                                <HelpCircle className="size-3 text-muted-foreground" aria-hidden="true" />
                              </span>
                              <input
                                placeholder="CVC"
                                autoComplete="off"
                                className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-copper"
                              />
                            </label>
                          </div>
                          <label className="block">
                            <span className="text-xs font-semibold text-primary">Name on card *</span>
                            <input
                              placeholder={request.fullName || 'John Doe'}
                              autoComplete="off"
                              className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-copper"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex items-start gap-2.5 rounded-xl bg-cream p-4 text-xs text-primary">
                    <Shield className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                    <div>
                      <p className="font-bold">Secure &amp; Encrypted</p>
                      <p className="mt-0.5 text-muted-foreground">
                        Your payment information is protected using industry-standard SSL encryption.
                      </p>
                    </div>
                  </div>

                  <button type="submit" className="btn-copper w-full justify-center gap-2">
                    <Lock className="size-4" aria-hidden="true" />
                    Pay ${tier?.price ?? '—'} Securely
                  </button>
                  <p className="text-center text-xs text-muted-foreground">{copy.helper}</p>
                </div>
              </Reveal>

              <Link
                to={copy.back.to}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-copper"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                {copy.back.label}
              </Link>
            </div>

            <PlannerSidebar
              heading={copy.sidebarHeading}
              caption={copy.sidebarCaption}
              helpHeading="Need Help With Payment?"
              helpText="If you have any questions about payment options or are experiencing issues, please contact us."
              secondaryPhoto="/Pictures/countries/Zambia.jpg"
              secondaryPhotoAlt="Victoria Falls with a rainbow arcing over the gorge"
              secondaryCaption={copy.sidebarCaption2}
            />
          </form>
        </div>
      </section>
    </>
  )
}
