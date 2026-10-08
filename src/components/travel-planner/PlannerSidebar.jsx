import {
  ArrowRight,
  Clock,
  FileText,
  Mail,
  Map,
  Maximize2,
  Phone,
  Route as RouteIcon,
  Search,
  Settings2,
  Shield,
  Users,
} from 'lucide-react'
import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { CONTACT_INFO, COUNTRIES, TRAVEL_PLANNER_FLOW } from '../../data/siteContent.js'
import { FLAGS } from '../../data/countryFlags.js'
import { HashLink } from '../HashLink.jsx'
import { MediaLightbox } from '../MediaGallery.jsx'
import { WhatsAppIcon } from '../social-icons.jsx'

const ICONS = { Map, Settings2, Mail, Users, Clock, Search, FileText, RouteIcon, Phone }

/**
 * The right-hand rail steps 3–6 of the request wizard share: a photo with
 * an italic caption, the "what's included" checklist, the running price
 * for whatever tier is selected, a help block, and — on the later two
 * steps — a second photo. `helpHeading`/`helpText` and the two photos are
 * the only things that actually change page to page.
 *
 * Reused as-is by the (separate) Before You Book Check/Travel Audit/Border
 * Crossing Guide flows via the `includes`/`includesHeading` and
 * `primaryCta` props — everything else about the rail is identical across
 * services. `priceLabel` overrides the `$price` display with plain text
 * (e.g. "Custom Quote") for Border Crossing Guide's 5+-crossings tier,
 * which has no fixed number — pass it alongside `price` so the "Secure &
 * Encrypted" note underneath still renders.
 *
 * `photoZoomable` makes the top photo a button that opens it full screen
 * (the galleries' MediaLightbox) on click or tap.
 */
export function PlannerSidebar({
  heading = 'Your Travel Planner',
  photo = '/images/services/travel-planner/sidebar-coastal-fort.webp',
  photoAlt = 'Aerial view of a coastal fort on the Ghanaian coast',
  photoZoomable = false,
  caption,
  price,
  priceLabel,
  includes = TRAVEL_PLANNER_FLOW.includes,
  includesHeading = 'Your Travel Planner Includes',
  // A country page's slug shows that country's name and flag under the
  // includes checklist; leave it off on pages that aren't for one country.
  countrySlug,
  primaryCta,
  helpHeading = 'Need Help?',
  helpText = 'General questions about our services, pricing, or how the website works can be sent through WhatsApp or email at no charge.',
  secondaryPhoto,
  secondaryPhotoAlt,
  secondaryCaption,
}) {
  const [photoOpen, setPhotoOpen] = useState(false)
  const closePhoto = useCallback(() => setPhotoOpen(false), [])
  const noop = useCallback(() => {}, [])
  const country = COUNTRIES.find((c) => c.slug === countrySlug)

  const photoFrame = (
    <>
      <img
        src={photo}
        alt={photoAlt}
        loading="lazy"
        className={`aspect-4/3 size-full object-cover ${
          photoZoomable ? 'transition-transform duration-500 ease-out group-hover:scale-105' : ''
        }`}
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
        aria-hidden="true"
      />
      {photoZoomable && (
        <span
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors group-hover:bg-black/65"
          aria-hidden="true"
        >
          <Maximize2 className="size-4" />
        </span>
      )}
      {caption && (
        <p className="absolute inset-x-0 bottom-3 px-4 text-center text-sm italic leading-snug text-primary-foreground">
          {caption.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      )}
    </>
  )

  return (
    <aside className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-primary">{heading}</h2>
        {photoZoomable ? (
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            aria-label={`View photo full screen: ${photoAlt}`}
            className="group relative mt-3 block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-card"
          >
            {photoFrame}
          </button>
        ) : (
          <div className="relative mt-3 overflow-hidden rounded-2xl shadow-card">{photoFrame}</div>
        )}
        {photoZoomable &&
          createPortal(
            <MediaLightbox
              items={[{ type: 'photo', src: photo, alt: photoAlt, title: caption?.join(' ') ?? heading, subtitle: photoAlt }]}
              index={photoOpen ? 0 : null}
              onClose={closePhoto}
              onNext={noop}
              onPrev={noop}
            />,
            document.body,
          )}
      </div>

      <div className="rounded-2xl bg-cream p-5">
        <h3 className="text-sm font-bold text-primary">{includesHeading}</h3>
        <ul className="mt-3 space-y-3">
          {includes.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <li key={item.text}>
                {i === includes.length - 1 && (
                  <span className="mb-3 block h-px w-full bg-border" aria-hidden="true" />
                )}
                <div className="flex items-start gap-2.5 text-sm text-primary">
                  <Icon className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                  {item.text}
                </div>
              </li>
            )
          })}
        </ul>

        {country && (
          // The country this page is for — its flag with its name — closing
          // the includes checklist the way the hero's country badge does.
          <div className="mt-4 flex items-center gap-2.5 border-t border-border pt-4">
            <img
              src={FLAGS[country.slug]}
              alt=""
              aria-hidden="true"
              className="h-6 w-8 shrink-0 rounded-[3px] object-cover ring-1 ring-inset ring-black/10"
            />
            <span className="text-sm font-bold text-primary">{country.name}</span>
          </div>
        )}

        {(price != null || priceLabel) && (
          <>
            <p className="mt-4 text-3xl font-bold text-primary">
              {priceLabel ?? `$${price}`}
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <Shield className="size-4 text-copper" aria-hidden="true" />
              Secure &amp; Encrypted
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Your information is safe with us.</p>
          </>
        )}

        {primaryCta &&
          (primaryCta.disabled ? (
            // E.g. no destination chosen yet — the service pages ask for
            // countries after the service is picked, so the CTA waits.
            <span
              aria-disabled="true"
              className="btn-copper mt-4 w-full cursor-not-allowed justify-center opacity-50"
            >
              {primaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          ) : (
            <HashLink to={primaryCta.to} className="btn-copper mt-4 w-full justify-center">
              {primaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </HashLink>
          ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-sm font-bold text-primary">{helpHeading}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{helpText}</p>
        <HashLink
          to="/#contact"
          className="mt-4 flex items-center justify-center rounded-full border border-copper px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-copper transition-colors hover:bg-copper hover:text-copper-foreground"
        >
          Contact Us
        </HashLink>
        <div className="mt-4 space-y-2">
          <a
            href={CONTACT_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-copper"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-forest text-primary-foreground">
              <WhatsAppIcon className="size-3" aria-hidden="true" />
            </span>
            WhatsApp
          </a>
          <a
            href={CONTACT_INFO.emailHref}
            className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-copper"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
              <Mail className="size-3" aria-hidden="true" />
            </span>
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>

      {secondaryPhoto && (
        <div className="relative overflow-hidden rounded-2xl shadow-card">
          <img
            src={secondaryPhoto}
            alt={secondaryPhotoAlt}
            loading="lazy"
            className="aspect-4/3 size-full object-cover"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
            aria-hidden="true"
          />
          {secondaryCaption && (
            <p className="absolute inset-x-0 bottom-3 px-4 text-center text-sm italic leading-snug text-primary-foreground">
              {secondaryCaption.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          )}
        </div>
      )}
    </aside>
  )
}
