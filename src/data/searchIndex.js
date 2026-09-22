import { COUNTRIES, SERVICES } from './siteContent.js'

// Every destination, plus every real practical/travel guide page built for
// it so far — kept as a plain lookup table (slug -> extra guide entries)
// rather than baked into COUNTRIES itself, since not every country has one
// yet.
const COUNTRY_GUIDES = {
  ghana: [{ label: 'Ghana Practical Guide', to: '/ghana/practical-guide' }],
  tanzania: [
    { label: 'Tanzania Practical Guide', to: '/tanzania/practical-guide' },
    { label: 'Zanzibar Culture & Practical Guide', to: '/tanzania/zanzibar-guide' },
  ],
  zambia: [{ label: 'Zambia Practical Guide', to: '/zambia/practical-guide' }],
  uganda: [{ label: 'Uganda Practical Guide', to: '/uganda/practical-guide' }],
  rwanda: [
    { label: 'Rwanda Practical Guide', to: '/rwanda/practical-guide' },
    { label: 'Rwanda Photo & Video Gallery', to: '/rwanda/gallery' },
  ],
}

const destinationEntries = COUNTRIES.map((country) => ({
  title: country.displayName ?? country.name,
  description: country.note,
  to: country.to,
  category: 'Destination',
  keywords: [country.slug, country.region],
  flag: country.flag,
}))

const guideEntries = COUNTRIES.flatMap((country) =>
  (COUNTRY_GUIDES[country.slug] ?? []).map((guide) => ({
    title: guide.label,
    description: `Practical travel guide for ${country.name}`,
    to: guide.to,
    category: 'Guide',
    keywords: [country.slug, country.name],
    flag: country.flag,
  })),
)

const serviceEntries = SERVICES.map((service) => ({
  title: service.title,
  description: service.description,
  to: service.to,
  category: 'Service',
}))

// Standalone pages that aren't a destination, a guide or one of the
// SERVICES cards, but people reasonably search for by name.
const pageEntries = [
  {
    title: 'Home',
    description: 'Navigate Africa with confidence — start here.',
    to: '/',
    category: 'Page',
  },
  {
    title: 'Explore',
    description: 'Browse every destination across East and West Africa.',
    to: '/explore',
    category: 'Page',
  },
  {
    title: 'About Us',
    description: "Our story, our founder, and why we do this work.",
    to: '/about',
    category: 'Page',
    keywords: ['founder', 'story', 'team'],
  },
  {
    title: 'Travel Planner',
    description: 'Personalized route planning for your trip across Africa.',
    to: '/travel-planner',
    category: 'Service',
    keywords: ['itinerary', 'route', 'plan a trip'],
  },
  {
    title: 'Border Crossing Guide',
    description: 'Border procedures and transport connections before you arrive.',
    to: '/travel-planner/border-crossing-guide',
    category: 'Service',
    keywords: ['border', 'crossing', 'overland'],
  },
  {
    title: 'Personal Visa Guidance',
    description: 'Personalized visa and entry guidance based on your nationality.',
    to: '/personal-visa-guidance/ghana',
    category: 'Service',
    keywords: ['visa', 'entry', 'immigration'],
  },
  {
    title: 'Find a Local Guide',
    description: 'Connect with trusted, vetted independent local guides.',
    to: '/independent-tour-guide',
    category: 'Service',
    keywords: ['tour guide', 'local guide'],
  },
  {
    title: 'Ghana Right of Abode',
    description: "Guidance for the African diaspora on Ghana's Right of Abode pathway.",
    to: '/ghana/right-of-abode-guidance',
    category: 'Service',
    keywords: ['ghana', 'residency', 'citizenship'],
  },
  {
    title: 'Ghana Land & Property Guidance',
    description: 'Practical information for buying land or property in Ghana.',
    to: '/ghana/land-property-guidance',
    category: 'Service',
    keywords: ['ghana', 'land', 'property', 'real estate'],
  },
  {
    title: 'Ghana Personalized Relocation Guidance',
    description: 'One-on-one guidance for relocating to Ghana.',
    to: '/ghana/personalized-relocation-guidance',
    category: 'Service',
    keywords: ['ghana', 'relocation', 'move'],
  },
  {
    title: 'Complete Ghana Relocation Package',
    description: 'End-to-end support for relocating to Ghana.',
    to: '/ghana/complete-relocation-package',
    category: 'Service',
    keywords: ['ghana', 'relocation', 'package'],
  },
  {
    title: 'Contact',
    description: 'Get in touch — tell us where you are traveling.',
    to: '/#contact',
    category: 'Page',
  },
]

export const SEARCH_INDEX = [
  ...destinationEntries,
  ...guideEntries,
  ...serviceEntries,
  ...pageEntries,
]

function normalize(value) {
  return value.toLowerCase().trim()
}

/**
 * Ranked substring search across the whole site: destinations, services,
 * practical guides and a handful of standalone pages. Title matches (and
 * matches right at the start of a title) rank above description/keyword
 * matches, so typing "gh" surfaces Ghana before something that merely
 * mentions Ghana in passing.
 */
export function searchSite(query, limit = 8) {
  const q = normalize(query)
  if (!q) return []

  const scored = []
  for (const entry of SEARCH_INDEX) {
    const title = normalize(entry.title)
    const description = normalize(entry.description ?? '')
    const keywords = (entry.keywords ?? []).map(normalize)

    let score = -1
    if (title === q) score = 100
    else if (title.startsWith(q)) score = 80
    else if (title.includes(q)) score = 60
    else if (keywords.some((k) => k.includes(q))) score = 40
    else if (description.includes(q)) score = 20

    if (score >= 0) scored.push({ entry, score })
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry)
}
