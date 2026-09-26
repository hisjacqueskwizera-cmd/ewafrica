import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  FileText,
  Lock,
  Mail,
  Phone,
  Search,
  Shield,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES } from '../../data/siteContent.js'
import { FLAGS } from '../../data/countryFlags.js'
import { MULTI_COUNTRY_STEP_LABELS, SINGLE_COUNTRY_STEP_LABELS, VISA_PRICING_PER_COUNTRY } from '../../data/visaGuidanceData.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { VisaGuidanceStepper } from '../../components/visa-guidance/VisaGuidanceStepper.jsx'
import { useVisaGuidanceFlow } from '../../context/VisaGuidanceFlowContext.jsx'

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
  const { bg, fg } = BRAND_COLORS[name] || { bg: '#333333', fg: '#FFFFFF' }
  const width = 40 + name.length * 10
  return (
    <svg
      width={width}
      height={30}
      viewBox={`0 0 ${width} 30`}
      role="img"
      aria-label={name}
      className="shrink-0"
    >
      <rect width={width} height={30} rx={5} fill={bg} />
      <text
        x={width / 2}
        y={20}
        textAnchor="middle"
        fontSize={12}
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
    note: 'Pay with any major credit or debit card.',
  },
  {
    id: 'paypal',
    icon: null,
    label: 'PayPal',
    brands: ['PayPal'],
    note: 'Pay securely using your PayPal balance or account.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'Mobile Money (MoMo)',
    brands: ['MTN MoMo', 'Airtel Money'],
    note: 'Pay using Mobile Money in supported African countries.',
  },
]

export function Payment() {
  const navigate = useNavigate()
  const {
    destinationSlugs,
    selectedCountries,
    count,
    price,
    country,
    isMultiCountry,
    userInfo,
    setPaid,
  } = useVisaGuidanceFlow()

  const [method, setMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    document.title = 'Secure Payment | Visa Guidance | East-West Africa Link'
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate short secure processing delay
    setTimeout(() => {
      setPaid(true)
      setIsProcessing(false)
      if (isMultiCountry) {
        navigate('/personal-visa-guidance/multi/confirmation')
      } else {
        navigate(`/personal-visa-guidance/${destinationSlugs[0] ?? country.slug}/confirmation`)
      }
    }, 600)
  }

  const handleBack = () => {
    if (isMultiCountry) {
      navigate('/personal-visa-guidance/multi/review')
    } else {
      navigate(`/personal-visa-guidance/${destinationSlugs[0] ?? country.slug}/review`)
    }
  }

  return (
    <>
      <PlannerBackground />

      {/* Top Stepper */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm">
        {isMultiCountry ? (
          <VisaGuidanceStepper steps={MULTI_COUNTRY_STEP_LABELS} currentStep={5} />
        ) : (
          <VisaGuidanceStepper steps={SINGLE_COUNTRY_STEP_LABELS} currentStep={3} />
        )}
      </div>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-copper">
              {isMultiCountry ? 'Multi-Country Package' : `${country?.name ?? 'Africa'} Guidance`}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              Secure Payment
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Complete your payment below to submit your request for personalized research and guidance.
            </p>
          </Reveal>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Payment Options Column */}
            <div className="space-y-6">
              {/* Payment Method Selector */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-base font-bold text-primary">Select Payment Method</h2>
                <div className="mt-4 space-y-3">
                  {METHODS.map((m) => {
                    const isSelected = method === m.id
                    const Icon = m.icon
                    return (
                      <label
                        key={m.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-copper bg-copper/5 shadow-xs'
                            : 'border-border bg-card hover:bg-sand/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={m.id}
                            checked={isSelected}
                            onChange={() => setMethod(m.id)}
                            className="size-4 accent-copper"
                          />
                          {Icon && <Icon className="size-5 text-copper shrink-0" />}
                          <div>
                            <span className="text-sm font-bold text-primary block">{m.label}</span>
                            <span className="text-xs text-muted-foreground">{m.note}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          {m.brands.map((b) => (
                            <BrandBadge key={b} name={b} />
                          ))}
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Card Details / Method Details */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h3 className="text-sm font-bold text-primary">
                    {method === 'card'
                      ? 'Cardholder Details'
                      : method === 'paypal'
                        ? 'PayPal Checkout'
                        : 'Mobile Money Phone'}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-forest font-semibold">
                    <Lock className="size-3.5" />
                    256-Bit SSL Encrypted
                  </div>
                </div>

                {method === 'card' && (
                  <div className="mt-5 space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Name on Card *
                      </span>
                      <input
                        required
                        type="text"
                        defaultValue={userInfo.fullName}
                        placeholder="e.g. John Doe"
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-primary focus-visible:outline-copper"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Card Number *
                      </span>
                      <div className="relative mt-1.5">
                        <input
                          required
                          type="text"
                          maxLength={19}
                          placeholder="•••• •••• •••• ••••"
                          defaultValue="4242 •••• •••• 4242"
                          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-primary font-mono focus-visible:outline-copper pl-10"
                        />
                        <CreditCard className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          Expiry Date *
                        </span>
                        <input
                          required
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          defaultValue="12/28"
                          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-primary font-mono focus-visible:outline-copper"
                        />
                      </label>

                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          CVC / CVV *
                        </span>
                        <input
                          required
                          type="text"
                          maxLength={4}
                          placeholder="CVC"
                          defaultValue="•••"
                          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-primary font-mono focus-visible:outline-copper"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {method === 'paypal' && (
                  <div className="mt-5 rounded-2xl bg-cream/60 p-5 text-center">
                    <p className="text-sm text-primary font-medium">
                      You will be directed to PayPal to complete your purchase safely.
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      No card details will be entered on our site.
                    </p>
                  </div>
                )}

                {method === 'mobile' && (
                  <div className="mt-5 space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Mobile Money Number *
                      </span>
                      <input
                        required
                        type="tel"
                        defaultValue={userInfo.phone}
                        placeholder="e.g. +233 24 123 4567"
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-primary focus-visible:outline-copper"
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">
                      A prompt will be sent directly to your phone to approve the transaction.
                    </p>
                  </div>
                )}
              </div>

              {/* Trust & Guarantee Banner */}
              <div className="rounded-3xl border border-forest/20 bg-forest/5 p-5 text-xs text-primary flex items-start gap-3.5">
                <ShieldCheck className="size-5 shrink-0 text-forest mt-0.5" />
                <div>
                  <strong className="block font-bold text-forest">100% Secure &amp; Protected Checkout</strong>
                  <span className="text-muted-foreground leading-relaxed">
                    Your personal information and travel questionnaire details are kept confidential and used solely for research by our East-West Africa Link visa advisory team.
                  </span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-primary hover:bg-sand/60 transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  Back to Review
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-forest/90 active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Lock className="size-4" />
                  {isProcessing ? 'Processing Secure Payment...' : `Pay $${price} Securely`}
                </button>
              </div>
            </div>

            {/* Right Rail Sidebar Column */}
            <aside className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
                <div className="border-b border-border pb-4">
                  <h3 className="text-sm font-bold text-primary">Order Summary</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {count} {count === 1 ? 'Country' : 'Countries'} Visa Guidance
                  </p>

                  <div className="mt-3 space-y-2">
                    {selectedCountries.map((c) => (
                      <div
                        key={c.slug}
                        className="flex items-center justify-between rounded-xl bg-cream/70 px-3 py-2 text-xs font-semibold text-primary"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={FLAGS[c.slug]}
                            alt=""
                            className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10"
                          />
                          <span>{c.name}</span>
                        </div>
                        <span className="font-bold text-muted-foreground">${VISA_PRICING_PER_COUNTRY}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-b border-border py-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Included with Guidance
                  </h4>
                  <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Search className="size-3.5 shrink-0 text-copper mt-0.5" />
                      <span>Individual country entry analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="size-3.5 shrink-0 text-copper mt-0.5" />
                      <span>Requirements checklist &amp; procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="size-3.5 shrink-0 text-copper mt-0.5" />
                      <span>Delivered by email (typically 3–5 days)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone className="size-3.5 shrink-0 text-copper mt-0.5" />
                      <span>3 follow-up clarification emails (within 7 days)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Total Amount
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {count} × ${VISA_PRICING_PER_COUNTRY}
                      </p>
                    </div>
                    <p className="text-3xl font-extrabold text-primary">${price}</p>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <ShieldCheck className="size-4 text-forest" />
                    <span>Secure Payment · SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </section>
    </>
  )
}
