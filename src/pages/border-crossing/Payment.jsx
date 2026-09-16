import { ArrowLeft, CreditCard, HelpCircle, Lock, Receipt, Shield, Smartphone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BORDER_CROSSING_FLOW, COUNTRIES } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useBorderCrossingFlow } from '../../context/BorderCrossingFlowContext.jsx'

// See the matching note in pages/travel-planner/Payment.jsx — no payment
// processor is integrated anywhere in this project, these are generic
// brand-colored chips, not the providers' real logo artwork.
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
    label: 'Mobile Money (MoMo)',
    brands: ['MTN MoMo', 'Airtel Money'],
    note: 'Pay using Mobile Money (MoMo) in supported countries.',
  },
]

export function Payment() {
  useEffect(() => {
    document.title = 'Secure Payment | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, price, isCustomQuote, setPaid } = useBorderCrossingFlow()
  const copy = BORDER_CROSSING_FLOW.steps.payment
  const [method, setMethod] = useState('card')

  const fromName = COUNTRIES.find((c) => c.slug === request.fromCountrySlug)?.name
  const toName = COUNTRIES.find((c) => c.slug === request.toCountrySlug)?.name
  const route = [fromName, toName].filter(Boolean).join(' → ')
  const amountLabel = isCustomQuote ? 'Custom Quote' : `$${price ?? '—'} USD`

  // No payment processor is integrated anywhere in this project (see the
  // matching note on the Travel Planner Payment page). Submitting just
  // marks the request "paid" locally and moves to the confirmation step.
  // A custom-quote request (5+ crossings) has no fixed amount to charge
  // here — submitting still moves the request forward; the real quote and
  // payment happen after our team reviews the route by email.
  const handleSubmit = (event) => {
    event.preventDefault()
    setPaid(true)
    navigate('/travel-planner/border-crossing-guide/confirmation')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={BORDER_CROSSING_FLOW.stepLabels} current={3} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              Border Crossing Guide
            </p>
            <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
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
                  <Receipt className="size-4 text-copper" aria-hidden="true" />
                  <h2 className="text-sm font-bold text-primary sm:text-base">Order Summary</h2>
                </div>
                <dl className="space-y-2.5 p-5 sm:p-6">
                  <div className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">Service</dt>
                    <dd className="font-semibold text-primary">Border Crossing Guide</dd>
                  </div>
                  <div className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">Route</dt>
                    <dd className="text-right font-semibold text-primary">{route || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">Border Crossings</dt>
                    <dd className="font-semibold text-primary">
                      {request.crossingCount === '5' ? '5 or more' : request.crossingCount || '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">Price</dt>
                    <dd className="font-semibold text-primary">{amountLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-border pt-2.5 text-base">
                    <dt className="font-bold text-primary">Total Due</dt>
                    <dd className="font-bold text-primary">{amountLabel}</dd>
                  </div>
                </dl>
              </Reveal>

              {isCustomQuote ? (
                <Reveal delay={100} className="rounded-2xl border border-border bg-cream p-5 sm:p-6">
                  <p className="text-sm font-bold text-primary">Custom Quote Requested</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Your route involves 5 or more border crossings, so it needs a custom quote rather
                    than a fixed price. Submit your request below and we'll follow up by email with
                    your quote before any payment is taken.
                  </p>
                  <button type="submit" className="btn-copper mt-4 w-full justify-center gap-2">
                    <Lock className="size-4" aria-hidden="true" />
                    Submit Request
                  </button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">{copy.helper}</p>
                </Reveal>
              ) : (
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
                      Pay {amountLabel}
                    </button>
                    <p className="text-center text-xs text-muted-foreground">{copy.helper}</p>
                  </div>
                </Reveal>
              )}

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
              includes={BORDER_CROSSING_FLOW.includes}
              includesHeading="Border Crossing Guide Includes"
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
