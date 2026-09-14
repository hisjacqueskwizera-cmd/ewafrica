import { Handshake, MessageSquare, Shield } from 'lucide-react'
import { ASSISTANCE, CONTACT_INFO } from '../data/siteContent.js'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'
import { WhatsAppIcon } from './social-icons.jsx'

const ICONS = {
  Shield,
  MessageSquare,
  Handshake,
}

// A true full-bleed band — no container, no rounded box, just flat cocoa
// edge to edge — the way the reference site runs every dark CTA interlude
// between its lighter, photo-led sections.
export function ContactBand() {
  return (
    <section id="contact" className="bg-cocoa py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionMark light />
            <RevealText
              as="h2"
              text={ASSISTANCE.heading}
              className="max-w-xl text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-5xl"
            />
          </div>
          <div className="max-w-sm lg:text-right">
            <p className="text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              {ASSISTANCE.subtext}
            </p>
            <a
              href={CONTACT_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light mt-6 gap-2.5"
            >
              <WhatsAppIcon className="size-4" aria-hidden="true" />
              {ASSISTANCE.cta}
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} once={false}>
          <div className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-primary-foreground/15 pt-8">
            {ASSISTANCE.features.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-bold text-primary-foreground">{item.title}</h3>
                    <p className="text-xs text-primary-foreground/60">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
