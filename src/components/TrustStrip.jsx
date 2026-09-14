import { Globe2, Handshake, Shield, Users } from 'lucide-react'
import { TRUST } from '../data/siteContent.js'
import { Reveal } from './Reveal.jsx'

const ICONS = {
  Globe2,
  Shield,
  Users,
  Handshake,
}

export function TrustStrip() {
  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <h2 className="shrink-0 text-2xl leading-[1.15] text-primary sm:max-w-40">
            Trust,
            <br />
            <span className="italic font-medium">Built Over Time</span>
          </h2>

          <span className="hidden h-14 w-px shrink-0 bg-border sm:block" aria-hidden="true" />

          <div className="flex flex-1 flex-wrap gap-x-10 gap-y-6">
            {TRUST.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex min-w-0 items-center gap-3">
                  <Icon className="size-5 shrink-0 text-copper" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                    <p className="truncate text-xs text-muted-foreground">{item.text}</p>
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
