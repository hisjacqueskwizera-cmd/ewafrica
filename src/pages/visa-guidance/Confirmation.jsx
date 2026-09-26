import { CheckCircle2, Clock, Download, Home, Mail, MessageSquare, Phone, Search, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES, CONTACT_INFO } from '../../data/siteContent.js'
import { FLAGS } from '../../data/countryFlags.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { WhatsAppIcon } from '../../components/social-icons.jsx'
import { useVisaGuidanceFlow } from '../../context/VisaGuidanceFlowContext.jsx'

export function Confirmation() {
  const navigate = useNavigate()
  const {
    destinationSlugs,
    selectedCountries,
    count,
    price,
    country,
    isMultiCountry,
    userInfo,
    paid,
  } = useVisaGuidanceFlow()

  const referenceId = useMemo(() => {
    const randomCode = Math.floor(100000 + Math.random() * 900000)
    return `VG-${randomCode}`
  }, [])

  useEffect(() => {
    document.title = 'Request Received | Personal Visa Guidance | East-West Africa Link'
  }, [])

  return (
    <>
      <PlannerBackground />

      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Main Confirmation Box */}
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="bg-forest px-6 py-8 text-center text-primary-foreground sm:px-12 sm:py-10">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-white/20 text-white shadow-sm ring-8 ring-white/10">
                <CheckCircle2 className="size-9 stroke-[2.5]" />
              </span>
              <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-white">
                Your Request Has Been Received
              </h1>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
                Thank you, {userInfo.fullName || 'Traveler'}! Your payment of ${price} has been processed successfully and your Personal Visa Guidance request has been submitted to our research desk.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-white">
                <span>Confirmation Ref:</span>
                <span className="font-mono font-bold">{referenceId}</span>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-8">
              {/* Destinations covered */}
              <div className="rounded-2xl border border-border bg-cream/50 p-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Destinations Included in This Guidance:
                </h2>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {selectedCountries.map((c) => (
                    <span
                      key={c.slug}
                      className="inline-flex items-center gap-2 rounded-xl bg-card px-3.5 py-2 text-xs font-bold text-primary shadow-xs border border-border"
                    >
                      <img
                        src={FLAGS[c.slug]}
                        alt=""
                        className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10"
                      />
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* What happens next 3-step grid */}
              <div>
                <h2 className="text-base font-bold text-primary">What Happens Next</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-sand/30 p-4">
                    <span className="grid size-9 place-items-center rounded-xl bg-cocoa text-primary-foreground">
                      <Search className="size-4" />
                    </span>
                    <h3 className="mt-3 text-sm font-bold text-primary">1. Research &amp; Analysis</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Our advisors verify the latest official entry rules, required documents, and border protocols for your nationality.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-sand/30 p-4">
                    <span className="grid size-9 place-items-center rounded-xl bg-forest text-primary-foreground">
                      <Mail className="size-4" />
                    </span>
                    <h3 className="mt-3 text-sm font-bold text-primary">2. Email Delivery</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      You will receive your comprehensive visa guide via email at <strong className="text-primary font-semibold">{userInfo.email || 'your email'}</strong> in 3–5 business days.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-sand/30 p-4">
                    <span className="grid size-9 place-items-center rounded-xl bg-copper text-primary-foreground">
                      <Phone className="size-4" />
                    </span>
                    <h3 className="mt-3 text-sm font-bold text-primary">3. Follow-Up Clarifications</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Includes 3 follow-up clarification emails within 7 days of delivery, plus consultation scheduling if requested.
                    </p>
                  </div>
                </div>
              </div>

              {/* Help & Contact Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
                <div>
                  <h3 className="text-sm font-bold text-primary">Have an immediate question?</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Our team is here to help with any questions about your request.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-forest/90 transition-colors"
                  >
                    <WhatsAppIcon className="size-3.5" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={CONTACT_INFO.emailHref}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold text-primary hover:bg-sand/60 transition-colors"
                  >
                    <Mail className="size-3.5 text-copper" />
                    Email Support
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                >
                  <Home className="size-4" />
                  Return to Homepage
                </Link>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-bold text-primary hover:bg-sand/60 transition-all"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
