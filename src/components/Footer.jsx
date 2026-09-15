import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT_INFO, FOOTER, REGIONS, SOCIAL_LINKS } from '../data/siteContent.js'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'
import { FacebookIcon, TiktokIcon, WhatsAppIcon, YoutubeIcon } from './social-icons.jsx'

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
  whatsapp: WhatsAppIcon,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-primary-foreground/10 bg-cocoa text-primary-foreground/70">
      <Reveal big className="absolute inset-0">
        <img
          src="/Pictures/footer.png"
          alt=""
          aria-hidden="true"
          className="size-full object-cover"
        />
      </Reveal>
      {/* A strong scrim over the photo — the footer carries a lot of small,
          low-contrast text (link lists, uppercase labels), so it needs more
          coverage than a caption-style card would. */}
      <div className="absolute inset-0 bg-cocoa/85" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-11 px-4 py-16 sm:px-6 sm:py-[70px] lg:grid-cols-[1.3fr_0.8fr_1fr_1fr] lg:gap-8 lg:divide-x lg:divide-primary-foreground/15 lg:px-8">
        <div>
          <div className="mb-4 flex items-center">
            <img src="/Logos/New_logo/Logo_White.webp" alt="East-West Africa Link" className="h-14 w-auto" />  
          </div>
          <p className="max-w-75 text-sm leading-relaxed text-primary-foreground/60">
            {FOOTER.tagline}
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-9.5 place-items-center rounded-full border border-primary-foreground/15 text-primary-foreground/75 transition-colors hover:border-copper hover:bg-copper hover:text-copper-foreground"
                >
                  <Icon className="size-4.5" aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="lg:pl-8">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/50">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {FOOTER.quickLinks.map((link) => (
              <li key={link.label}>
                <HashLink
                  to={link.to}
                  className="text-primary-foreground/65 transition-colors hover:text-gold"
                >
                  {link.label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-8">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/50">
            Destinations
          </h3>
          <ul className="grid grid-cols-2 items-start gap-6 text-sm">
            {REGIONS.map((region) => (
              <li key={region.id} className="flex min-w-0 flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.06em] text-primary-foreground/85">
                  {region.name}
                </span>
                <ul className="flex flex-col gap-2 pl-0.5">
                  {region.countries.map((country) =>
                    country.to ? (
                      <li key={country.name}>
                        <Link
                          to={country.to}
                          className="text-primary-foreground/65 transition-colors hover:text-gold"
                        >
                          {country.name}
                        </Link>
                      </li>
                    ) : (
                      <li key={country.name} className="text-primary-foreground/65">
                        {country.name}
                      </li>
                    ),
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-8">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/50">
            Contact Us
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-start gap-2.5 text-primary-foreground/65 transition-colors hover:text-gold"
              >
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li>
              <a
                href={CONTACT_INFO.emailHref}
                className="flex items-start gap-2.5 text-primary-foreground/65 transition-colors hover:text-gold"
              >
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {CONTACT_INFO.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-primary-foreground/65">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {CONTACT_INFO.address}
            </li>
          </ul>
          
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs text-primary-foreground/45">
            © {year} East-West Africa Link. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
