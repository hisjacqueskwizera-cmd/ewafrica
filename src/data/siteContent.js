// Central place for site copy. Edit here rather than hunting through components.

export const NAV_LINKS = [
  { label: 'Home', to: '/#home' },
  { label: 'Explore', to: '/explore', isRoute: true },
  { label: 'Ghana', to: '/ghana', isRoute: true },
  { label: 'Travel Planner', to: '/travel-planner', isRoute: true },
  { label: 'About Us', to: '/about', isRoute: true },
  { label: 'Contact', to: '/#contact' },
]

export const CONTACT_INFO = {
  phone: '+1 (255) 555-0147',
  phoneHref: 'tel:+12555550147',
  whatsappHref:
    'https://wa.me/12555550147?text=Hi%2C%20I%27d%20like%20some%20help%20planning%20my%20trip.',
  email: 'info@eastwestafricalink.com',
  emailHref: 'mailto:info@eastwestafricalink.com',
  address: 'Seattle, Washington, USA',
}

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'TikTok', href: '#', icon: 'tiktok' },
  { label: 'WhatsApp', href: '#', icon: 'whatsapp' },
]

export const HERO = {
  badge: 'Explore Africa',
  titleLine1: 'Navigate Africa',
  titleAccent: 'With Confidence',
  description:
    'Independent travel, practical guidance, and trusted local connections across East and West Africa.',
  primaryCta: { label: 'Explore Africa', to: '/explore' },
  secondaryCta: { label: 'Our Services', to: '/#services' },
}

// Countries covered — the single source of truth. Destinations, the
// East/West region cards, the trust-strip count and the footer list all
// read from this so a new country only needs to be added once.
export const COUNTRIES = [
  {
    slug: 'ghana',
    name: 'Ghana',
    region: 'west',
    note: 'Featured destination',
    featured: true,
    to: '/ghana',
    tone: 'copper',
    image: '/Pictures/countries/Ghana.jpg',
  },
  {
    slug: 'tanzania',
    name: 'Tanzania',
    region: 'east',
    note: 'Zanzibar and the coast',
    displayName: 'Tanzania (Zanzibar)',
    to: '/tanzania',
    featured: true,
    tone: 'forest',
    image: '/Pictures/countries/Tanzania.jpg',
  },
  {
    slug: 'malawi',
    name: 'Malawi',
    region: 'east',
    note: 'Lake of stars',
    to: '/explore#malawi',
    tone: 'forest',
    image: '/Pictures/countries/Malawi.webp',
  },
  {
    slug: 'zambia',
    name: 'Zambia',
    region: 'east',
    note: 'Victoria Falls',
    to: '/explore#zambia',
    tone: 'navy',
    image: '/Pictures/countries/Zambia.jpg',
  },
  {
    slug: 'uganda',
    name: 'Uganda',
    region: 'east',
    note: 'Pearl of Africa',
    to: '/explore#uganda',
    tone: 'forest',
    image: '/Pictures/countries/Uganda.jpg',
  },
  {
    slug: 'rwanda',
    name: 'Rwanda',
    region: 'east',
    note: 'Land of a thousand hills',
    to: '/explore#rwanda',
    tone: 'navy',
    image: '/Pictures/countries/Rwanda.jpg',
  },
  {
    slug: 'senegal',
    name: 'Senegal',
    region: 'west',
    to: '/explore#senegal',
    tone: 'copper',
    image: '/Pictures/countries/Senegal.webp',
  },
  {
    slug: 'benin',
    name: 'Benin',
    region: 'west',
    to: '/explore#benin',
    tone: 'copper',
    image: '/Pictures/countries/Benin.jpg',
  },
  {
    slug: 'gambia',
    name: 'The Gambia',
    region: 'west',
    to: '/explore#gambia',
    tone: 'copper',
    image: encodeURI('/Pictures/countries/The gambia.jpg'),
  },
]

// Every country now has a photo, so the homepage ticker shows all of them
// rather than a curated subset.
export const DESTINATIONS = COUNTRIES

export const SERVICES = [
  {
    icon: 'Globe2',
    title: 'Visa & Entry',
    description: 'Expert guidance on visas, entry requirements and documentation for a smooth arrival.',
    to: '/#contact',
    image: '/Pictures/Visa_Entry.png',
  },
  {
    icon: 'Home',
    title: 'Relocation',
    description: 'End-to-end support for individuals and families relocating to a new life in Africa.',
    to: '/ghana',
    image: '/Pictures/Relocation.jpg',
  },
  {
    icon: 'FileText',
    title: 'Border Crossings',
    description: 'Navigate land borders with ease, backed by up-to-date, on-the-ground advice.',
    to: '/#contact',
    image: '/Pictures/Border_crossing.jpg',
  },
  {
    icon: 'Building2',
    title: 'Business in Africa',
    description: 'Market insight, setup support and local connections to start, invest and grow.',
    to: '/#contact',
    image: '/Pictures/Investment-Opportunities-in-Africa.webp',
  },
  {
    icon: 'Users',
    title: 'Find a Local Guide',
    description: "Connect with trusted, vetted local guides who know the places and the people.",
    to: '/#contact',
    image: '/Pictures/local_guide.jpg',
  },
]

export const TRAVEL_PLANNER_UMBRELLA = {
  title: 'Travel Planner',
  subtitle: '(Umbrella)',
  description:
    'Our Travel Planner service provides practical, personalized guidance to help you organize your trip with greater confidence. Whether you are planning a short visit, an extended journey, or travel across multiple destinations, we help you think through the important details based on your dates, interests, priorities, and travel style.',
  tag: 'Services Under This Umbrella',
  items: ['Ask a Question', 'Before You Book Check', 'Travel Planner'],
  to: '/travel-planner',
}

export const GHANA_FEATURES = [
  { icon: 'Users', title: 'Local Connections', text: 'Tap into trusted networks across Ghana.' },
  {
    icon: 'CalendarDays',
    title: 'Events & Experiences',
    text: 'Discover authentic events and cultural experiences.',
  },
  {
    icon: 'Home',
    title: 'Property & Living',
    text: 'Guidance on finding the right place to live or invest.',
  },
  {
    icon: 'Headphones',
    title: 'On-the-Ground Support',
    text: "Hands-on assistance whenever you're in Ghana.",
  },
]

export const HOW_IT_WORKS = [
  {
    icon: 'message',
    title: 'Tell Us',
    description: "Tell us where you're going, what you're planning, or where you need help.",
  },
  {
    icon: 'search',
    title: 'We Research',
    description:
      'We research the details and prepare practical, independent guidance tailored to your needs.',
  },
  {
    icon: 'handshake',
    title: 'You Connect',
    description:
      'Travel, relocate, or do business with better information and trusted local connections.',
  },
]

// `slides` are web-sized copies (max 1920px, WebP) of the photos in
// public/Explore_regions/<Region>/ — the originals run up to 8K and 5.5MB
// each, far more than a card needs. Listed by their original file numbers,
// which is also the order each card's background slideshow plays them in
// (the first slide is also the still shown for prefers-reduced-motion).
// `image` is only a fallback for an entry without slides.
const regionSlides = (folder, numbers) =>
  numbers.map((n) => `/Explore_regions/optimized/${folder}/${n}.webp`)

export const REGIONS = [
  {
    id: 'east-africa',
    name: 'East Africa',
    tone: 'forest',
    to: '/explore#east-africa',
    image: '/Pictures/countries/Tanzania.jpg',
    slides: regionSlides('east-africa', [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    countries: COUNTRIES.filter((c) => c.region === 'east').map((c) => ({
      name: c.displayName ?? c.name,
      featured: c.featured,
      to: c.featured ? c.to : undefined,
      // Where the footer links this country — every country has somewhere
      // to go (its own page, or its card on /explore).
      link: c.to,
    })),
    more: '',
  },
  {
    id: 'west-africa',
    name: 'West Africa',
    tone: 'copper',
    to: '/explore#west-africa',
    image: '/Pictures/countries/Ghana.jpg',
    slides: regionSlides('west-africa', [1, 2, 3, 4, 5, 6, 7, 8]),
    countries: COUNTRIES.filter((c) => c.region === 'west').map((c) => ({
      name: c.displayName ?? c.name,
      featured: c.featured,
      to: c.featured ? c.to : undefined,
      // Where the footer links this country — every country has somewhere
      // to go (its own page, or its card on /explore).
      link: c.to,
    })),
  },
]

export const FOUNDER = {
  eyebrow: 'Meet the founder',
  heading: 'A Personal Commitment to Connecting Africa',
  body: [
    'East-West Africa Link was founded from decades of firsthand travel and experience across the African continent from North Africa to West, East, Central and Southern Africa with a focus on practical guidance, trusted local connections, and helping people navigate Africa with confidence.',
    '',
  ],
  cta: 'Read The Full Bio',
}

export const ASSISTANCE = {
  eyebrow: 'We are here to help',
  heading: 'Need Assistance?',
  subtext:
    'Our team is ready to help you plan travel, prepare a relocation or explore business opportunities across the continent.',
  cta: 'Contact Us',
  features: [
    { icon: 'Shield', title: 'Independent', text: 'Guidance you can trust' },
    { icon: 'MessageSquare', title: 'Responsive', text: 'Answers within a day' },
    { icon: 'Handshake', title: 'Connected', text: 'Verified local partners' },
  ],
}

// Every claim here is either non-numeric or derived straight from
// COUNTRIES above — nothing here is an invented business fact.
export const TRUST = [
  {
    icon: 'Globe2',
    title: `${COUNTRIES.length} Countries`,
    text: 'Across East and West Africa',
  },
  { icon: 'Shield', title: 'Independent Advice', text: 'No hidden commissions' },
  { icon: 'Users', title: 'Trusted Local Network', text: 'Vetted guides and partners' },
  { icon: 'Handshake', title: 'Hands-On Experience', text: 'Real, on-the-ground insight' },
]

export const NEWSLETTER = {
  heading: 'Stay Informed On Africa',
  subtext:
    'Practical travel updates, relocation insight and business opportunities, straight to your inbox.',
  cta: 'Subscribe',
}

export const FOOTER = {
  tagline:
    'Your independent guide for travel, relocation and business opportunities across East and West Africa.',
  quickLinks: [
    { label: 'Home', to: '/#home' },
    { label: 'About Us', to: '/about' },
    { label: 'Destinations', to: '/explore' },
    { label: 'Services', to: '/#services' },
    { label: 'Contact', to: '/#contact' },
  ],
}

export const ABOUT_PAGE = {
  // `badge` is the hero's breadcrumb label and `titleLine1` its heading;
  // `tagline` and `description` open the dark band that follows the
  // Mission and Approach rows.
  hero: {
    badge: 'About Us',
    titleLine1: 'Who We Are',
    tagline: ['Information', 'Guidance', 'Connections'],
    description:
      'East-West Africa Link was founded from decades of firsthand travel and experience across the African continent — from North Africa to West, East, Central and Southern Africa — with a focus on practical guidance, trusted local connections, and helping people navigate Africa with confidence.',
  },
  mission: {
    lead: 'Our mission is to make independent travel and exploring opportunities across Africa easier to understand and navigate.',
    body: [
      'We provide practical research, personalized guidance, and trusted local connections to help you make better-informed decisions before and during your journey.',
      'Our focus is East and West Africa, with growing coverage across selected destinations in both regions.',
    ],
    image: '/Pictures/about/mission-nkrumah-statue.webp',
    imageAlt: 'Bronze statue of Kwame Nkrumah at the Kwame Nkrumah Memorial Park in Accra, Ghana',
  },
  approach: {
    body: [
      'We believe good guidance should be practical, transparent, and easy to understand.',
      'We combine research, regional experience, and information from local sources and professionals whenever possible.',
      'Sometimes the most valuable information is simply knowing which border to use, where a bus actually departs, what documents to prepare, or who to contact locally.',
    ],
    closing: 'Those practical details are at the heart of East-West Africa Link.',
    image: '/Pictures/countries/Tanzania.jpg',
    imageAlt: 'Safari vehicle watching lions on the East African savanna',
    // The tall photo filling the row's other column.
    featureImage: '/Pictures/about/approach-bismarck-rock.webp',
    featureImageAlt: 'Bismarck Rock rising from Lake Victoria at dusk in Mwanza, Tanzania',
  },
  // The homepage Founder teaser's "Read The Full Bio" button links here
  // (/about#founder) for the complete story.
  founder: {
    eyebrow: 'Meet The Founder',
    heading: "I'm Humphrey",
    photo: '/Pictures/CEO.jpg',
    photoAlt: 'Humphrey, founder of East-West Africa Link',
    quote: 'Africa has a way of changing you for the better.',
    quoteAttribution: 'Humphrey',
    bio: [
      'My love of travel began shortly after high school, when an airline "Buddy Pass" took me to London, Paris, and Rome. That first journey sparked a lifelong curiosity about the world and a passion for discovering places beyond the typical tourist trail.',
      'After years working in banking and the credit-card industry, travel eventually led me to spend extended periods in Europe, Asia, Latin America and across Africa. For more than 20 years, I have traveled, lived, and done business in Africa, including extended stays in Malawi, Tanzania and Zanzibar, Rwanda, and Benin.',
      'Along the way, I learned firsthand what it means to navigate a country beyond the visitor experience — from immigration and transportation to business, property, and everyday life.',
    ],
    highlights: [
      {
        icon: 'Backpack',
        title: 'My Style of Travel',
        body: [
          'My travel style is independent, curious, and adventurous. I sometimes call it "Lonely Planet Style" — getting beyond the obvious tourist destinations, figuring things out along the way, and using whatever transportation is available and headed in the right direction.',
          "That might mean a long-distance bus, bush taxi, minibus, train, ferry, fisherman's boat, airplane, boda boda — or occasionally even an elephant or ox cart.",
        ],
        closing: 'For me, the journey itself is often one of the most memorable parts of travel.',
        // Full-bleed backdrop for this highlight's feature section.
        image: '/Pictures/about/feature-dhow.webp',
        imageAlt: 'A traditional dhow under sail on the Indian Ocean',
      },
      {
        icon: 'Lightbulb',
        title: 'Why I Created East-West Africa Link',
        body: [
          'Over the years, I became the go-to friend for custom itineraries, hidden-gem recommendations, and help planning memorable journeys. I have also personally accompanied friends on trips across Africa and beyond, helping them navigate unfamiliar places and experience destinations in a more meaningful way.',
          'What began as a passion for helping friends travel became something I wanted to offer more widely.',
        ],
        closing:
          'I created East-West Africa Link to bring that same personal attention, practical knowledge, and firsthand experience to independent travelers, prospective residents, and entrepreneurs exploring Africa.',
      },
    ],
  },
  trust: [
    {
      icon: 'Globe2',
      title: 'Focused on East and West Africa',
      text: 'Growing coverage across selected destinations',
      image: '/Explore_regions/optimized/east-africa/15.webp',
      imageAlt: 'Elephants crossing the plains below Mount Kilimanjaro',
    },
    {
      icon: 'FileText',
      title: 'Practical Information You Can Use',
      text: 'Research you can act on, not generic advice',
      image: '/Explore_regions/optimized/west-africa/4.webp',
      imageAlt: 'A grand mosque with tall minarets above a busy West African town',
    },
    {
      icon: 'Handshake',
      title: 'Trusted Local Connections',
      text: 'Vetted guides and on-the-ground contacts',
      image: '/Explore_regions/optimized/west-africa/7.webp',
      imageAlt: 'Dancers and drummers at a traditional ceremony in West Africa',
    },
    {
      icon: 'ShieldCheck',
      title: 'Independent, Honest and Transparent',
      text: 'No hidden commissions, ever',
      image: '/Explore_regions/optimized/east-africa/7.webp',
      imageAlt: 'Hartebeest running past an acacia tree on the savanna',
    },
  ],
  closing: {
    heading: 'Travel Africa With Confidence',
    tagline: 'Your journey. Your decisions. Better information along the way.',
  },
}

// The first fully built destination page — /ghana is still a Placeholder
// (see PLACEHOLDER_PAGES below). Content ported from a reference
// implementation of this same page into our conventions: icons as string
// keys resolved through an ICONS map in the page component (not live
// component references), and copy centralized here rather than inline in
// the page file, matching every other page's data (ABOUT_PAGE etc.).
//
// Every image below reuses /Pictures/countries/Tanzania.jpg — the only
// Tanzania-specific photo in the project (no dedicated Zanzibar, safari-
// route, or flag-icon assets exist yet). The four service cards used one
// repeated photo in the reference too, so this isn't a step down, just a
// different repeated photo.
export const TANZANIA_PAGE = {
  // Shaped to spread straight into PageIntro — same shared hero as
  // Home/About/Travel Planner (right-aligned copy, two-line accent
  // heading, transparent-until-scroll header — see TRANSPARENT_HERO_ROUTES
  // in Header.jsx). backgroundVideos isn't set here — Tanzania.jsx passes
  // its own TZ_HERO_VIDEOS playlist directly as a prop (video playlists
  // live in their own small data files, imported by the component that
  // uses them, same as the site-wide HERO_VIDEOS).
  hero: {
    badge: 'Tanzania',
    titleLine1: 'Explore',
    titleAccent: 'Tanzania',
    tagline: ['Independent travel', 'Practical guidance', 'Local connections'],
    description:
      'Planning a journey through Tanzania? Whether you are visiting for the first time, travelling overland, crossing into a neighbouring country, or looking for a trusted independent local guide, East-West Africa Link provides practical information and personalized guidance to help you plan your journey with confidence.',
    primaryCta: { label: 'Get Personalized Guidance', to: '/#contact' },
  },
  // Each card's cta originally opened a dedicated modal (visa guidance,
  // travel planner, border crossing) that doesn't exist in this project —
  // every cta below links to /#contact instead until those are built.
  services: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      text: 'Get personalized research and practical information based on your nationality, travel dates and plans.',
      items: [
        'Visa and entry requirements',
        'Single or multiple-entry options',
        'Documentation required',
        'Entry points and arrival info',
        'Questions about your specific plans',
      ],
      cta: 'Get Visa Guidance',
    },
    {
      icon: 'Bus',
      title: 'Travel Planner',
      text: 'We research practical routes using buses, shared transport, trains, ferries and other local transportation.',
      items: [
        'Recommended routes',
        'Transport connections',
        'Departure & arrival points',
        'Journey times',
        'Border connections',
        'Practical travel tips',
      ],
      cta: 'Plan My Route',
    },
    {
      icon: 'ShieldCheck',
      title: 'Border Crossing Guide',
      text: 'Understand border procedures and transportation connections before you arrive.',
      items: [
        'Best border crossings',
        'How to reach the border',
        'Immigration procedures',
        'Transport on both sides',
        'Approx. travel times',
        'Practical tips',
      ],
      cta: 'Get Border Guide',
    },
    {
      icon: 'Users',
      title: 'Independent Tour Guides',
      text: 'Connect with trusted independent local guides for personalized assistance and authentic local experiences.',
      items: [
        'City tours & attractions',
        'Cultural experiences',
        'Day trips & excursions',
        'Transport assistance',
        'Local recommendations',
        'Custom itineraries',
      ],
      cta: 'Find a Local Guide',
    },
  ],
  guide: {
    eyebrow: 'First Time in Tanzania?',
    heading: 'A Practical Guide for First-Time Travellers to Tanzania',
    intro:
      'Our Tanzania Travel Guide covers everything you need to know before you arrive, including:',
    items: [
      'When to visit',
      'Places to visit',
      'Visa & entry information',
      'Overland transportation',
      'Money and payments',
      'Border travel',
      'SIM cards & mobile data',
      'Accommodation',
      'Getting around',
      'Practical travel tips',
    ],
    cta: { label: 'Read the Tanzania Travel Guide', to: '/#contact' },
    image: '/Pictures/countries/Tanzania.jpg',
    imageAlt: 'Safari vehicle and lions on the Tanzanian savanna',
  },
  // Unlike the reference (which fell back to an unrelated stock photo for
  // Rwanda), every route here has a real matching photo already in
  // public/Pictures/countries.
  routes: [
    {
      to: 'Malawi',
      image: '/Pictures/countries/Malawi.webp',
      text: 'Practical route planning and border-crossing information for travellers continuing south between Tanzania and Malawi.',
    },
    {
      to: 'Zambia',
      image: '/Pictures/countries/Zambia.jpg',
      text: 'Information and personalized planning for overland travel between Tanzania and Zambia.',
    },
    {
      to: 'Rwanda',
      image: '/Pictures/countries/Rwanda.jpg',
      text: 'Route research and practical information for travellers moving between Tanzania and Rwanda.',
    },
    {
      to: 'Uganda',
      image: '/Pictures/countries/Uganda.jpg',
      text: 'Planning an overland journey between Tanzania and Uganda? We can help research practical route options and connections.',
    },
  ],
  askUs: {
    eyebrow: 'Not Sure Which Service You Need?',
    heading: 'Tell Us About Your Journey',
    text: 'You do not need to know exactly which service to choose. Tell us where you are travelling, when you plan to go and what you need help with. We will help you identify the most appropriate service for your journey.',
    cta: { label: 'Get Personalized Guidance', to: '/#contact' },
  },
  trust: [
    {
      icon: 'Shield',
      title: 'Trusted Information',
      text: 'Up-to-date, researched travel information for independent travellers.',
    },
    {
      icon: 'Users',
      title: 'Local Connections',
      text: 'Access trusted local guides and on-the-ground assistance when you need it.',
    },
    {
      icon: 'Globe2',
      title: 'Travel Your Way',
      text: 'Independent travel support so you can explore Tanzania on your own terms.',
    },
    {
      icon: 'Handshake',
      title: 'Your Link to Africa',
      text: 'We connect you with the information and people you need.',
    },
  ],
  farewell: {
    heading: 'Karibu Tanzania. 🇹🇿',
    text: 'Come prepared, travel with an open mind, and give yourself enough time to experience the country beyond the famous destinations.',
  },
}

// Travel Planner landing page — /travel-planner. The destination selector
// re-labels pricing to the chosen country; flatPricing has a `default` rate
// plus a Ghana-specific override (see the note on flatPricing below) — every
// country now resolves to a real number, nothing falls back to "message us".
export const TRAVEL_PLANNER_PAGE = {
  // Shaped to spread straight into PageIntro — the same shared hero used on
  // Home/About/Tanzania, just with its own static backgroundImage instead
  // of the site's rotating video (see the backgroundImage prop on
  // PageIntro) so the page keeps its own photo and copy.
  hero: {
    badge: 'Travel Planner',
    titleLine1: 'Plan More',
    titleAccent: 'Discover Deeper',
    tagline: ['Real places. Real people. A more meaningful Africa.'],
    description:
      'From one country to multi-country adventures, get practical guidance to create your ideal Africa journey.',
    backgroundImage: '/Pictures/Travel planner hero background.PNG',
    backgroundImageAlt:
      'A map of Africa with route arrows, compass, camera and journal on a veranda table overlooking Kilimanjaro at sunrise',
  },
  intro: {
    heading: 'Choose the Support That Fits Your Trip',
    description:
      'Whether you are still deciding what to book, already have part of your trip arranged, or want help building your journey from the ground up, choose the service that best matches where you are in your planning.',
  },
  // Travel Planner's per-country-count tiers are the same everywhere,
  // Ghana included — only Before You Book Check and Travel Audit have a
  // Ghana-specific rate, `flatPricing.default` covers every other country.
  travelPlannerTiers: [
    { countries: 1, price: 65 },
    { countries: 2, price: 135 },
    { countries: 3, price: 195 },
    { countries: 4, price: 245 },
  ],
  flatPricing: {
    default: { beforeYouBook: 55, travelAudit: 45 },
    ghana: { beforeYouBook: 65, travelAudit: 55 },
  },
  services: [
    {
      key: 'travelPlanner',
      badge: 'Plan Your Route',
      icon: 'Route',
      accent: 'copper',
      title: 'Travel Planner',
      image: '/Pictures/caption.jpg',
      imageAlt: 'Aerial view of a coastal fort on the Ghanaian coast',
      description:
        'Personalized planning support based on your travel dates, interests, destinations and preferred way of travelling.',
      items: [
        'Suggested itinerary',
        'Places to visit',
        'Transportation options (including overland routes)',
        'Recommended travel sequence',
        'Approximate travel times',
        'Practical travel tips',
      ],
    },
    {
      key: 'beforeYouBook',
      badge: 'Travel With Confidence',
      icon: 'Search',
      accent: 'forest',
      title: 'Before You Book Check',
      image: null,
      description:
        'For travelers who have not yet booked and want a knowledgeable review before committing to flights, accommodation, transportation or other major parts of the trip.',
      items: [
        'Review of your proposed plans',
        'Practical feedback and recommendations',
        'Advice on timing, routes and connections',
        'Help you avoid costly mistakes',
      ],
    },
    {
      key: 'travelAudit',
      badge: 'Make Sense Of Your Plans',
      icon: 'FileText',
      accent: 'copper',
      title: 'Travel Audit',
      image: '/Pictures/countries/Tanzania.jpg',
      imageAlt: 'Safari vehicle on the Tanzanian savanna',
      description:
        'For travelers who have already booked or partially booked their trip and want an independent review of how the journey fits together.',
      items: [
        'Review of your existing bookings',
        'Check the travel sequence and connections',
        'Identify gaps or potential challenges',
        'Suggestions for improvements',
        'Focus on ground travel and overland routes',
      ],
    },
  ],
  helpBand: {
    heading: 'Need help before purchasing?',
    text: 'General questions about our services, pricing, or how the website works can be sent through WhatsApp or email at no charge.',
  },
  trust: [
    {
      icon: 'ShieldCheck',
      title: 'Secure & Encrypted',
      text: 'Your information is safe with us.',
    },
    {
      icon: 'Users',
      title: 'Independent Guidance',
      text: 'Real advice. No booking bias.',
    },
    {
      icon: 'Compass',
      title: 'Travel Further',
      text: 'A more meaningful Africa.',
    },
  ],
}

// The Travel Planner request wizard — /travel-planner/request through
// /travel-planner/confirmation. Reached only from the "View Details" button
// on the Travel Planner card (the other two cards still link to /#contact,
// since they don't have a request flow behind them yet). There used to be
// a service-details/pricing-tiles step in front of /request; it's gone —
// "View Details" now goes straight to the request form, which already has
// its own country-count question in "Your Trip".
//
// IMPORTANT: there is no payment backend wired up anywhere in this project
// (no Stripe/PayPal/mobile-money SDK, no server). The card-number/expiry/CVC
// fields on the payment step are decorative only — nothing is read from
// them, stored, or transmitted — and "Pay Securely" just advances the
// wizard's local state to the confirmation step. This flow is a real,
// working multi-step form up through Review; the "payment" is a UI
// placeholder until a real processor is integrated. See TravelPlannerFlow
// components for where that integration would go.
export const TRAVEL_PLANNER_FLOW = {
  // Flat per-country-count pricing — same 4 tiers for any country
  // combination, not looked up per destination (unlike the /travel-planner
  // landing page's per-country preview, this deeper flow's own reference
  // design prices purely by how many countries are chosen).
  tiers: [
    { countries: 1, price: 65 },
    { countries: 2, price: 135 },
    { countries: 3, price: 195 },
    { countries: 4, price: 245 },
  ],
  includes: [
    { icon: 'Map', text: 'Personalized travel planning guidance' },
    { icon: 'Settings2', text: 'Practical route and destination suggestions' },
    { icon: 'Mail', text: 'Delivered by email' },
    { icon: 'Users', text: 'Three follow-up clarification emails within 7 days' },
    { icon: 'Clock', text: 'Typical delivery 3–5 business days' },
  ],
  // Per-step banner/eyebrow micro-copy — decorative, kept short since it's
  // just the photo-strip tagline and the small italic corner line.
  steps: {
    request: {
      bannerTagline: 'Your Journey Across Africa Starts Here.',
      cornerTagline: ['Explore Today.', 'A Richer Tomorrow.'],
      heading: 'Your Travel Planner Request',
      description: 'Tell us about your trip so we can create a personalized travel plan for you.',
      back: { label: 'Back to Travel Planner', to: '/travel-planner' },
      cta: 'Continue to Review Your Answers',
      sidebarCaption: ['Extraordinary places.', 'Meaningful journeys.'],
    },
    review: {
      bannerTagline: 'Your Journey. A Brighter Africa.',
      cornerTagline: ['Travel with knowledge.', 'Travel with confidence.'],
      heading: 'Review Your Answers',
      description:
        'Please review your information before continuing to payment. You can edit any section if needed.',
      back: { label: 'Back to Your Request', to: '/travel-planner/request' },
      cta: 'Continue to Secure Payment',
      sidebarCaption: ["Real places. Deeper experiences.", "We'll help you plan the journey."],
    },
    payment: {
      bannerTagline: 'Plan Today. Explore Tomorrow.',
      cornerTagline: ['Independent travel.', 'A brighter Africa.'],
      heading: 'Secure Payment',
      description: 'Complete your payment to submit your Travel Planner request.',
      back: { label: 'Back to Review Your Answers', to: '/travel-planner/review' },
      quote: ['Extraordinary journeys begin', 'with a plan.'],
      helper:
        'After payment, you will receive a confirmation and your Travel Planner request will be submitted for preparation.',
      sidebarHeading: 'Travel with Confidence',
      sidebarCaption: ['Meaningful journeys.', 'Real connections.'],
      sidebarCaption2: ['Different places.', 'A brighter perspective.'],
    },
    confirmation: {
      bannerTagline: 'Real Places. Meaningful Journeys.',
      cornerTagline: ['Independent travel.', 'A brighter Africa.'],
      heading: 'Payment Received',
      intro: 'Your Travel Planner request has been received successfully.',
      body: "We appreciate your trust in East-West Africa Link. We're excited to help you plan your journey and look forward to sending you your personalized Travel Planner.",
      whatsNext:
        'Your information will be reviewed and your personalized Travel Planner will be prepared.',
      deliveryNote: 'You will receive your Travel Planner by email.',
      followUp:
        'Your service includes 3 follow-up clarification emails within 7 days of delivery. If we need any additional information, we will contact you by email.',
      confirmationNote: 'Please check your inbox (and spam folder) for our email.',
      secureNote: 'Your payment was processed securely using industry-standard SSL encryption.',
      secureNote2: 'Your information is safe and protected.',
      sidebarHeading: 'Travel with Confidence',
      sidebarCaption: ['New places. Broader perspectives.', "We're here to help."],
      sidebarCaption2: ['Extraordinary places.', 'A brighter tomorrow.'],
    },
  },
  // Field option lists for the request form (step "request"). Transcribed
  // from the reference design at low confidence on exact wording for the
  // longer checkbox lists — worth a proofread against the original once
  // this is live.
  interestOptions: [
    'Culture & history',
    'Beaches & coastline',
    'Local communities & everyday life',
    'Food & markets',
    'Cities & urban experiences',
    'Photography',
    'Overland travel',
    'Business or research',
    'Relaxation',
  ],
  travelStyleOptions: [
    'Independent / flexible',
    'Comfortable but practical',
    'Budget-conscious',
    'A mix of comfort and local experiences',
    'Not sure — I would like guidance',
  ],
  accommodationOptions: [
    'Budget',
    'Mid-range',
    'Higher comfort',
    'A mix of different levels',
    'I have already arranged accommodation',
    'I have not decided',
  ],
  gettingAroundOptions: [
    'Public transportation',
    'Shared transportation (minibus, shared taxi, etc.)',
    'Private driver / vehicle',
    'Rental car',
    'Domestic flights',
    'A combination of the above',
    'Overland travel between countries',
    'Not sure — I need guidance',
  ],
  bookedStatusOptions: ['No', 'Yes, partially', 'Yes, most of the trip'],

  // Fixed-choice option lists for the request form's 1/2/3-country
  // question set (RequestForm's PdfRequestSections) — wording lifted
  // verbatim from the reference "Travel Planner Questions" document, kept
  // separate from the option lists above (which remain the 4-country
  // flow's own, differently-worded lists, left as-is).
  experienceOptionsPdf: [
    'Culture and history',
    'Wildlife',
    'Beaches',
    'Nature',
    'Food',
    'Nightlife',
    'Local communities',
    'Markets',
    'Hiking',
    'Relaxation',
  ],
  travelStyleOptionsPdf: ['Budget', 'Mid-range', 'Comfortable', 'Higher-end', 'A mixture'],
  accommodationTypeOptionsPdf: [
    'Hotels',
    'Guesthouses',
    'Apartments',
    'Lodges',
    'Hostels',
    'A mixture',
  ],
  gettingAroundOptionsPdf: [
    'Private driver',
    'Public transportation',
    'Domestic flights where appropriate',
    'Taxis / ride-hailing',
    'Rental vehicle',
    'A mixture',
  ],
  // Keyed by country count (2 or 3) — the 2-country wording says "regional
  // flight" (singular) and the 3-country wording says "regional flights"
  // plus "a mixture", matching the source document exactly.
  betweenCountriesOptionsPdf: {
    2: ['Overland travel', 'Regional flight', 'Not sure — please recommend'],
    3: ['Overland travel', 'Regional flights', 'A mixture', 'Not sure — please recommend'],
  },
}

// The Explore page (/explore). Each country card reads its name, photo,
// note and link from COUNTRIES; only what's specific to this page — the
// services offered there and the featured cards' longer copy — lives here.
const EXPLORE_SERVICES = ['Personal Visa Guidance', 'Travel Planner', 'Border Crossing Guide']
const EXPLORE_SERVICES_WITH_GUIDES = [...EXPLORE_SERVICES, 'Independent Tour Guides']

export const EXPLORE_PAGE = {
  hero: {
    badge: 'Explore Africa',
    titleLine1: 'Explore',
    titleAccent: 'Africa',
    description: 'Practical guidance. Local knowledge. Your journey, your way.',
    primaryCta: { label: 'East Africa', to: '/explore#east-africa' },
    secondaryCta: { label: 'West Africa', to: '/explore#west-africa' },
  },
  intro: 'Select a Region',
  east: {
    title: 'East Africa',
    tagline: 'Trusted travel guidance and local connections across East Africa.',
    // The first country gets the featured, double-wide card.
    countries: [
      {
        slug: 'tanzania',
        services: EXPLORE_SERVICES_WITH_GUIDES,
        description: [
          "Tanzania is one of East Africa's most diverse destinations, known for its wildlife, dramatic landscapes, rich cultures, and Indian Ocean coastline. It is also home to Zanzibar, the legendary island destination just off the Tanzanian coast.",
          'Zanzibar is the ultimate Indian Ocean experience, combining white-sand beaches, turquoise waters, centuries of Swahili history, and a distinctive blend of African, Arab, and Indian influences. Explore the historic streets of Stone Town, the beaches of Nungwi and Kendwa, the marine world around Mnemba Atoll, colorful local markets, spice farms, and unforgettable Indian Ocean sunsets.',
          'East-West Africa Link offers travel guidance throughout Tanzania, with local guide services available in Zanzibar.',
        ],
      },
      { slug: 'rwanda', services: EXPLORE_SERVICES },
      { slug: 'malawi', services: EXPLORE_SERVICES },
      { slug: 'zambia', services: EXPLORE_SERVICES },
      { slug: 'uganda', services: EXPLORE_SERVICES },
    ],
  },
  west: {
    title: 'West Africa',
    tagline: 'Travel, local connections and relocation support in West Africa.',
    featured: {
      slug: 'ghana',
      badge: 'Featured Destination · Travel + Relocation',
      image: '/Pictures/about/mission-nkrumah-statue.webp',
      imageAlt: 'Kwame Nkrumah Memorial Park monument in Accra, Ghana',
      // Shown clearly behind the card's copy (Cape Coast Castle's courtyard).
      backgroundImage: '/Pictures/explore/ghana-card-background.webp',
      travelServices: EXPLORE_SERVICES_WITH_GUIDES,
      relocationServices: [
        'General Ghana Relocation Guidance',
        'Right of Abode Guidance',
        'Land & Property Information',
        'Complete Ghana Relocation Package',
      ],
      description: [
        "Ghana is one of West Africa's most welcoming and culturally rich destinations, where vibrant cities, historic coastal towns, beautiful beaches, traditional communities, and a powerful sense of heritage come together.",
        "Explore the energy of Accra, the history of Cape Coast and Elmina, the beauty of Ghana's coastline and countryside, and the traditions that make the country such a distinctive place to visit, live, and explore new opportunities.",
        'For many travelers — especially members of the African diaspora — Ghana offers something deeper: a chance to reconnect with history and heritage, build meaningful connections, and experience West Africa in a more personal way.',
      ],
    },
    countries: [
      { slug: 'senegal', services: EXPLORE_SERVICES },
      { slug: 'benin', services: EXPLORE_SERVICES_WITH_GUIDES },
      { slug: 'gambia', services: EXPLORE_SERVICES },
    ],
  },
  trust: [
    {
      icon: 'Shield',
      title: 'Practical & Reliable',
      text: 'Up-to-date information you can use to plan with confidence.',
    },
    {
      icon: 'Users',
      title: 'Local Connections',
      text: 'Connect with trusted local guides and professionals.',
    },
    {
      icon: 'MapPin',
      title: 'Travel Your Way',
      text: 'Independent travel support for your unique journey.',
    },
    {
      icon: 'Globe2',
      title: 'Across Africa',
      text: 'East and West Africa guidance in one trusted place.',
    },
  ],
  footnote: '* Independent Tour Guide service is available in selected countries.',
  closing: {
    heading: 'Need help choosing a destination or service?',
    text: "We're here to help you plan the right journey.",
    cta: 'Get Guidance',
  },
}

export const PLACEHOLDER_PAGES = {
  ghana: {
    eyebrow: 'Featured Destination',
    heading: 'Ghana Relocation & Travel Guide',
    body: "We're putting together an in-depth, independent guide to visas, relocation and travel across Ghana — from paperwork to what to expect on the ground. It isn't live yet, but our team can already help you directly.",
  },
}
