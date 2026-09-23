import { ArrowRight, Clock, Mail, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import { CONTACT_INFO } from '../data/siteContent.js'
import { HashLink } from '../components/HashLink.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { SectionMark } from '../components/SectionMark.jsx'
import { WhatsAppIcon } from '../components/social-icons.jsx'

// One reach-us method per card: an icon, a short line of context, and the
// actual link/detail. WhatsApp leads since it's the fastest channel we
// actually monitor; email and location follow.
const CONTACT_METHODS = [
  {
    icon: WhatsAppIcon,
    title: 'WhatsApp',
    text: 'The fastest way to reach us — most messages get a reply within a day.',
    detail: 'Message us on WhatsApp',
    href: CONTACT_INFO.whatsappHref,
    external: true,
  },
  {
    icon: Mail,
    title: 'Email',
    text: 'For detailed questions, documents, or anything you\'d rather put in writing.',
    detail: CONTACT_INFO.email,
    href: CONTACT_INFO.emailHref,
    external: false,
  },
  {
    icon: MapPin,
    title: 'Based In',
    text: 'Our team works with travelers and clients across East and West Africa.',
    detail: CONTACT_INFO.address,
    href: null,
    external: false,
  },
]

// Common starting points for people who land here without a specific
// question in mind — points them at the right service page instead of
// waiting on a reply.
const QUICK_LINKS = [
  { label: 'Plan a Trip', to: '/travel-planner' },
  { label: 'Explore Destinations', to: '/explore' },
  { label: 'Ghana Relocation & Right of Abode', to: '/ghana/right-of-abode-guidance' },
  { label: 'Independent Local Guides', to: '/independent-tour-guide' },
]

export function ContactUs() {
  useEffect(() => {
    document.title = 'Contact Us | East-West Africa Link'
  }, [])

  return (
    <>
      <PageIntro
        badge="Get In Touch"
        titleLine1="Contact Us"
        description="Questions about a trip, a relocation, or one of our services? Reach out and our team will help you find the right next step."
        backgroundImage="/Pictures/Background/about_us_background.png"
      />

      <section className="px-[30px] py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-xl text-center">
            <SectionMark className="mx-auto" />
            <span className="section-eyebrow">We're Here To Help</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] font-normal leading-[1.15] text-cocoa">
              How To Reach Us
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CONTACT_METHODS.map((method, i) => {
              const Icon = method.icon
              const content = (
                <>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-cocoa text-gold">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-cocoa">
                    {method.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {method.text}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-copper">{method.detail}</p>
                </>
              )
              const cardClass =
                'flex h-full flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-transform hover:-translate-y-1'

              return (
                <Reveal key={method.title} delay={i * 100}>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.external ? '_blank' : undefined}
                      rel={method.external ? 'noopener noreferrer' : undefined}
                      className={cardClass}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={cardClass}>{content}</div>
                  )}
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={300} className="mt-10 flex items-center justify-center gap-2.5 text-sm text-muted-foreground">
            <Clock className="size-4 shrink-0 text-copper" aria-hidden="true" />
            We typically respond to inquiries within one business day.
          </Reveal>
        </div>
      </section>

      <section className="bg-cocoa px-[30px] py-[100px] text-primary-foreground lg:py-[120px]">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-xl text-center">
            <SectionMark light className="mx-auto" />
            <span className="section-eyebrow text-gold">Not Sure Where To Start?</span>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.15]">
              A Few Common Starting Points
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {QUICK_LINKS.map((link) => (
              <HashLink
                key={link.label}
                to={link.to}
                className="flex items-center justify-between gap-4 rounded-xl border border-primary-foreground/15 px-6 py-5 text-sm font-semibold transition-colors hover:border-gold hover:text-gold"
              >
                {link.label}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </HashLink>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
