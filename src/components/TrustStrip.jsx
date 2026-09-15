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
    <section className="pb-10 lg:pb-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <Reveal className="flex flex-col gap-1">
          <h2 className="shrink-0 whitespace-nowrap text-2xl leading-[1.15] text-primary">
            Trust,
            <span className="italic font-medium"> Built Over Time</span>
          </h2>
          <h2 className="shrink-0 whitespace-nowrap text-2xl leading-[1.15] text-primary">
            Experience and knowledge you can trust.
          </h2>
          
        </Reveal>
      </div>
    </section>
  )
}
