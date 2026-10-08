import { COUNTRIES, SERVICES } from './siteContent.js'

// Every destination plus the practical guide content or route that is most
// relevant for that country. For countries without a dedicated page, the
// country page itself remains the best match for a practical-guide search.
const COUNTRY_GUIDES = {
  benin: [{ label: 'Benin Practical Guide', to: '/benin', country: 'Benin' }],
  gambia: [{ label: 'The Gambia Practical Guide', to: '/gambia', country: 'The Gambia' }],
  ghana: [{ label: 'Ghana Practical Guide', to: '/ghana/practical-guide', country: 'Ghana' }],
  malawi: [{ label: 'Malawi Practical Guide', to: '/malawi', country: 'Malawi' }],
  rwanda: [
    { label: 'Rwanda Practical Guide', to: '/rwanda/practical-guide', country: 'Rwanda' },
    { label: 'Rwanda Photo & Video Gallery', to: '/rwanda/gallery', country: 'Rwanda' },
  ],
  senegal: [{ label: 'Senegal Practical Guide', to: '/senegal', country: 'Senegal' }],
  tanzania: [
    { label: 'Tanzania Practical Guide', to: '/tanzania/practical-guide', country: 'Tanzania' },
    { label: 'Zanzibar Culture & Practical Guide', to: '/tanzania/zanzibar-guide', country: 'Zanzibar' },
  ],
  uganda: [{ label: 'Uganda Practical Guide', to: '/uganda/practical-guide', country: 'Uganda' }],
  zambia: [{ label: 'Zambia Practical Guide', to: '/zambia/practical-guide', country: 'Zambia' }],
}

const normalize = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9\s&-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const tokenize = (value) =>
  normalize(value)
    .split(/\s+/)
    .filter(Boolean)
    .filter((part) => part.length > 1)

const COUNTRY_TERM_MAP = Object.fromEntries(
  COUNTRIES.map((country) => [
    country.slug,
    [...new Set([country.slug, ...tokenize(country.name), ...tokenize(country.displayName ?? country.name)])],
  ]),
)

const dedupeByKey = (items) => {
  const seen = new Map()
  for (const item of items) {
    const key = item.to ?? `${item.title}-${item.category}`
    if (!seen.has(key)) seen.set(key, item)
  }
  return [...seen.values()]
}

const withCountryContext = (entry, relatedCountries = []) => ({
  ...entry,
  keywords: [
    ...new Set([
      ...(entry.keywords ?? []),
      ...relatedCountries.flatMap((slug) => COUNTRY_TERM_MAP[slug] ?? []),
    ]),
  ],
})

const destinationEntries = COUNTRIES.map((country) => ({
  title: country.displayName ?? country.name,
  description: country.note,
  to: country.to,
  category: 'Destination',
  keywords: [country.slug, country.name, country.region, 'travel', 'visit', 'destination'],
  country: country.name,
  flag: country.flag,
}))

const guideEntries = COUNTRIES.flatMap((country) =>
  (COUNTRY_GUIDES[country.slug] ?? []).map((guide) => ({
    title: guide.label,
    description: `Practical travel guidance for ${guide.country ?? country.name}`,
    to: guide.to,
    category: 'Guide',
    keywords: [country.slug, country.name, 'practical', 'travel guide', 'guide', 'planning'],
    country: guide.country ?? country.name,
    flag: country.flag,
  })),
)

const serviceEntries = SERVICES.map((service) =>
  withCountryContext(
    {
      title: service.title,
      description: service.description,
      to: service.to,
      category: 'Service',
      keywords: [
        ...tokenize(service.title),
        ...tokenize(service.description),
        'service',
        'travel',
        'guide',
        'support',
      ],
    },
    COUNTRIES.map((country) => country.slug),
  ),
)

// Standalone pages that aren't a destination, a guide or one of the
// SERVICES cards, but people reasonably search for by name.
const pageEntries = [
  {
    title: 'Home',
    description: 'Navigate Africa with confidence — start here.',
    to: '/',
    category: 'Page',
    keywords: ['home', 'start', 'africa', 'beginning'],
  },
  {
    title: 'Explore',
    description: 'Browse every destination across East and West Africa.',
    to: '/explore',
    category: 'Page',
    keywords: ['explore', 'destinations', 'countries', 'browse'],
  },
  {
    title: 'About Us',
    description: "Our story, our founder, and why we do this work.",
    to: '/about',
    category: 'Page',
    keywords: ['about', 'founder', 'story', 'team', 'company'],
  },
  {
    title: 'Travel Planner',
    description: 'Personalized route planning for your trip across Africa.',
    to: '/travel-planner',
    category: 'Service',
    keywords: ['travel planner', 'travel', 'planner', 'itinerary', 'route', 'trip', 'journey'],
  },
  {
    title: 'Before You Book Check',
    description: 'Review your trip details before you commit to a destination or booking.',
    to: '/travel-planner/before-you-book-check',
    category: 'Service',
    keywords: ['before you book', 'check', 'travel', 'trip review', 'booking', 'itinerary'],
  },
  {
    title: 'Travel Audit',
    description: 'Audit an itinerary and catch potential issues before you travel.',
    to: '/travel-planner/travel-audit',
    category: 'Service',
    keywords: ['travel audit', 'audit', 'review', 'itinerary', 'trip review', 'checklist'],
  },
  {
    title: 'Border Crossing Guide',
    description: 'Border procedures and transport connections before you arrive.',
    to: '/travel-planner/border-crossing-guide',
    category: 'Service',
    keywords: ['border', 'crossing', 'overland', 'land border', 'transport', 'entry'],
  },
  {
    title: 'Personal Visa Guidance',
    description: 'Personalized visa and entry guidance based on your nationality.',
    to: '/personal-visa-guidance',
    category: 'Service',
    keywords: ['visa', 'visas', 'visa guidance', 'entry', 'immigration', 'permit', 'passport'],
  },
  {
    title: 'Find a Local Guide',
    description: 'Connect with trusted, vetted independent local guides.',
    to: '/independent-tour-guide',
    category: 'Service',
    keywords: ['local guide', 'tour guide', 'guide', 'tour', 'independent guide'],
  },
  {
    title: 'Contact',
    description: 'Get in touch — tell us where you are traveling.',
    to: '/#contact',
    category: 'Page',
    keywords: ['contact', 'talk', 'message', 'email', 'whatsapp'],
  },
]

const countryAwarePageEntries = pageEntries
  .filter((entry) =>
    ['Travel Planner', 'Before You Book Check', 'Travel Audit', 'Border Crossing Guide', 'Personal Visa Guidance', 'Find a Local Guide'].includes(entry.title),
  )
  .map((entry) => withCountryContext(entry, COUNTRIES.map((country) => country.slug)))

const COUNTRY_SPECIFIC_SERVICE_ENTRIES = COUNTRIES.flatMap((country) => {
  const countryName = country.displayName ?? country.name
  const flag = country.flag
  const baseEntries = [
    {
      title: `${countryName} Travel Planner`,
      description: `Travel Planner tailored to ${country.name}.`,
      to: `/travel-planner?destination=${country.slug}`,
      category: 'Service',
      keywords: ['travel planner', 'travel', 'planner', 'itinerary', 'route', country.slug, country.name],
      country: country.name,
      flag,
    },
    {
      title: `${countryName} Before You Book Check`,
      description: `Before You Book Check for ${country.name}.`,
      to: `/travel-planner/before-you-book-check?destinations=${country.slug}`,
      category: 'Service',
      keywords: ['before you book', 'check', 'travel', 'itinerary', 'booking', country.slug, country.name],
      country: country.name,
      flag,
    },
    {
      title: `${countryName} Travel Audit`,
      description: `Travel Audit guidance for ${country.name}.`,
      to: `/travel-planner/travel-audit?destinations=${country.slug}`,
      category: 'Service',
      keywords: ['travel audit', 'audit', 'review', 'itinerary', 'trip review', country.slug, country.name],
      country: country.name,
      flag,
    },
    {
      title: `${countryName} Border Crossing Guide`,
      description: `Border crossing help and route planning for ${country.name}.`,
      to: `/travel-planner/border-crossing-guide?from=${country.slug}`,
      category: 'Service',
      keywords: ['border crossing', 'land border', 'crossing', 'transport', 'entry', country.slug, country.name],
      country: country.name,
      flag,
    },
    {
      title: `${countryName} Visa Guidance`,
      description: `Visa and entry guidance tailored to ${country.name}.`,
      to: `/personal-visa-guidance/${country.slug}`,
      category: 'Service',
      keywords: ['visa', 'visas', 'entry', 'permit', 'passport', country.slug, country.name],
      country: country.name,
      flag,
    },
    {
      title: `${countryName} Local Guide`,
      description: `Find a local guide for ${country.name}.`,
      to: `/independent-tour-guide/${country.slug}`,
      category: 'Service',
      keywords: ['local guide', 'tour guide', 'guide', country.slug, country.name],
      country: country.name,
      flag,
    },
  ]

  if (country.slug === 'ghana') {
    baseEntries.push(
      {
        title: 'Ghana Right of Abode',
        description: "Guidance for the African diaspora on Ghana's Right of Abode pathway.",
        to: '/ghana/right-of-abode-guidance',
        category: 'Service',
        keywords: ['ghana', 'right of abode', 'residency', 'citizenship', 'diaspora'],
        country: 'Ghana',
        flag: '🇬🇭',
      },
      {
        title: 'Ghana Land & Property Guidance',
        description: 'Practical information for buying land or property in Ghana.',
        to: '/ghana/land-property-guidance',
        category: 'Service',
        keywords: ['ghana', 'land', 'property', 'real estate', 'property guide'],
        country: 'Ghana',
        flag: '🇬🇭',
      },
      {
        title: 'Ghana Personalized Relocation Guidance',
        description: 'One-on-one guidance for relocating to Ghana.',
        to: '/ghana/personalized-relocation-guidance',
        category: 'Service',
        keywords: ['ghana', 'relocation', 'move', 'settle', 'move abroad'],
        country: 'Ghana',
        flag: '🇬🇭',
      },
      {
        title: 'Complete Ghana Relocation Package',
        description: 'End-to-end support for relocating to Ghana.',
        to: '/ghana/complete-relocation-package',
        category: 'Service',
        keywords: ['ghana', 'relocation', 'package', 'move', 'settle'],
        country: 'Ghana',
        flag: '🇬🇭',
      },
    )
  }

  return baseEntries
})

export const SEARCH_INDEX = dedupeByKey([
  ...destinationEntries,
  ...guideEntries,
  ...serviceEntries,
  ...pageEntries.filter((entry) => !countryAwarePageEntries.some((aware) => aware.to === entry.to)),
  ...countryAwarePageEntries,
  ...COUNTRY_SPECIFIC_SERVICE_ENTRIES,
])

/**
 * Search across the entire site for destinations, services, guides, and
 * standalone content using flexible partial matching, relevant terms, and
 * keyword synonyms. The ranking rewards exact and start-of-title matches,
 * then broader phrase and keyword matches so a typed term like "travel",
 * "visa", or "guide" surfaces the widest useful set of results without
 * requiring an exact keyword match.
 */
export function searchSite(query, limit = 12) {
  const q = normalize(query)
  if (!q) return []

  const terms = q.split(/\s+/).filter(Boolean)
  const scored = []

  for (const entry of SEARCH_INDEX) {
    const title = normalize(entry.title)
    const description = normalize(entry.description ?? '')
    const category = normalize(entry.category ?? '')
    const keywords = (entry.keywords ?? []).map(normalize)
    const searchableText = [title, description, category, ...keywords].join(' ')

    const exactTitle = title === q
    const titleStarts = title.startsWith(q)
    const titleContains = title.includes(q)
    const phraseMatch = searchableText.includes(q)
    const keywordMatch = keywords.some((keyword) => keyword.includes(q) || q.includes(keyword))
    const tokenCoverage = terms.every((term) => title.includes(term) || description.includes(term) || keywords.some((keyword) => keyword.includes(term) || term.includes(keyword)))

    let score = 0

    if (exactTitle) score += 1200
    if (titleStarts) score += 500
    if (titleContains) score += 300
    if (phraseMatch) score += 200
    if (keywordMatch) score += 150
    if (tokenCoverage) score += 80
    if (terms.some((term) => category.includes(term))) score += 40
    if (terms.some((term) => description.includes(term))) score += 60
    if (terms.some((term) => title.split(/\s+/).some((word) => word.startsWith(term)))) score += 70

    if (score > 0) {
      scored.push({ entry, score })
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .reduce((results, current) => {
      const key = current.entry.to ?? current.entry.title
      if (!results.some((result) => (result.entry.to ?? result.entry.title) === key)) {
        results.push(current)
      }
      return results
    }, [])
    .slice(0, limit)
    .map((item) => item.entry)
}
