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
    'https://wa.me/12555550147?text=Hello%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20more%20information.',
  email: 'info@eastwestafricalink.com',
  emailHref: 'mailto:info@eastwestafricalink.com',
  address: 'Seattle, Washington, USA',
}

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'TikTok', href: '#', icon: 'tiktok' },
  // Unlike the other three (real profiles that don't exist yet), a real
  // WhatsApp link already exists — reuse it rather than a dead '#'.
  { label: 'WhatsApp', href: CONTACT_INFO.whatsappHref, icon: 'whatsapp' },
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
    tone: 'forest',
    image: '/Pictures/countries/Tanzania.jpg',
  },
  {
    slug: 'malawi',
    name: 'Malawi',
    region: 'east',
    note: 'Lake of stars',
    to: '/malawi',
    tone: 'forest',
    image: '/Pictures/countries/Malawi.webp',
  },
  {
    slug: 'zambia',
    name: 'Zambia',
    region: 'east',
    note: 'Victoria Falls',
    to: '/zambia',
    tone: 'navy',
    image: '/Pictures/countries/Zambia.jpg',
  },
  {
    slug: 'uganda',
    name: 'Uganda',
    region: 'east',
    note: 'Pearl of Africa',
    to: '/uganda',
    tone: 'forest',
    image: '/Pictures/countries/Uganda.jpg',
  },
  {
    slug: 'rwanda',
    name: 'Rwanda',
    region: 'east',
    note: 'Land of a thousand hills',
    to: '/rwanda',
    tone: 'navy',
    image: '/Pictures/countries/Rwanda.jpg',
  },
  {
    slug: 'senegal',
    name: 'Senegal',
    region: 'west',
    to: '/senegal',
    tone: 'copper',
    image: '/Pictures/countries/Senegal.webp',
  },
  {
    slug: 'benin',
    name: 'Benin',
    region: 'west',
    to: '/benin',
    tone: 'copper',
    image: '/Pictures/countries/Benin.jpg',
  },
  {
    slug: 'gambia',
    name: 'The Gambia',
    region: 'west',
    to: '/gambia',
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
    to: '/independent-tour-guide',
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

// The first fully built destination page. Content ported from a reference
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
    titleLine1: 'Explore',
    titleAccent: 'Tanzania',
    description:
      'From the wildlife-filled plains of the Serengeti and the slopes of Mount Kilimanjaro to the historic streets and turquoise waters of Zanzibar, Tanzania offers an extraordinary mix of safari, culture, coastline and adventure.',
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

// The trust row's copy is genuinely country-agnostic (only the "Travel
// Your Way" line swaps in the country name), so every bespoke *_PAGE
// below shares this one helper rather than re-typing near-identical text
// eight times.
const trustFor = (country) => [
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
    text: `Independent travel support so you can explore ${country} on your own terms.`,
  },
  {
    icon: 'Handshake',
    title: 'Your Link to Africa',
    text: 'We connect you with the information and people you need.',
  },
]

// Every *_PAGE below (Tanzania is the exception — see the comment above
// TANZANIA_PAGE) is bespoke, matching its own reference design rather
// than one shared template, but all of them keep two conventions from
// Tanzania: every service `cta` links to /#contact except Travel Planner,
// which each page deep-links to /travel-planner?destination=<slug> (the
// visa/border-crossing modals these were originally written against don't
// exist in this project); and route-card photos reuse another tracked
// country's real photo where the neighbour is one of our own COUNTRIES
// entries, falling back to a generic West/East Africa regional photo
// (already used elsewhere on the site, e.g. REGIONS' own images) for
// neighbours we have no dedicated photo for — never a fabricated or
// mismatched country photo.
// Zambia is bespoke (see src/pages/Zambia.jsx) rather than the shared
// DestinationPage template: its reference leads with a country wordmark
// hero (not a small badge), a season-by-season "When to Visit" grid, a
// three-panel Before You Go / Where to Go / Money & Getting Around
// section, an overland panel with plain neighbour name-badges (no border
// exists between Zambia and most West African countries, so unlike
// Tanzania's route cards these stay text, not photo links), and a
// six-card first-timer tips grid — none of which the generic template
// has room for.
export const ZAMBIA_PAGE = {
  // The page now opens with a services "landing" section (matching every
  // other country's Personal Visa Guidance / Travel Planner / Border
  // Crossing Guide grid) ahead of the deeper practical guide below —
  // landingHero/services/servicesIntro/landingTrust/closing drive that
  // top-and-tail; everything from `hero` (the old wordmark hero) onward is
  // the original practical-guide content, now living under the services
  // section instead of leading the page.
  landingHero: {
    eyebrow: 'Travel Services For',
    title: 'Zambia',
    tagline: 'Explore. Plan. Travel with Confidence.',
    description:
      'Practical information and personalized support to help you travel, explore, and navigate opportunities in Zambia.',
    image: '/Pictures/countries/Zambia.jpg',
    imageAlt: 'Victoria Falls with a rainbow arcing over the gorge in Zambia',
    watermark: 'Zambia',
    watermarkCaption: ['Stunning Landscapes.', 'Welcoming People.', 'Real Possibilities.'],
  },
  servicesIntro: {
    heading: 'Explore Our Services',
    eyebrow: 'Practical Guidance for Your Zambia Journey',
    description:
      'Choose the service that fits your needs. Each one provides clear, reliable information and personalized guidance informed by practical research, local sources, and first-hand experience in Zambia.',
  },
  services: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      description:
        'Get clear, up-to-date information on visa requirements, entry rules, and the application process for Zambia.',
      image: '/Pictures/Visa_Entry.png',
      to: '/#contact',
    },
    {
      icon: 'Bus',
      title: 'Travel Planner',
      description:
        'Personalized overland travel planning to help you explore Zambia and combine it with nearby countries.',
      image: '/Pictures/Travel planner.PNG',
      to: '/travel-planner?destination=zambia',
    },
    {
      icon: 'RouteIcon',
      title: 'Border Crossing Guide',
      description:
        'Get practical guidance for crossing into and out of Zambia, including key border points, requirements, and what to expect.',
      image: '/Pictures/Border_crossing.jpg',
      to: '/#contact',
    },
  ],
  landingTrust: [
    { icon: 'BookOpen', title: 'Accurate', title2: 'Information' },
    { icon: 'Users', title: 'Personalized', title2: 'Support' },
    { icon: 'Signpost', title: 'Independent', title2: 'Travel Focus' },
    { icon: 'ShieldCheck', title: 'Trusted', title2: 'Local Connections' },
  ],
  closing: {
    watermark: 'Zambia',
    heading: 'A Land of Natural Beauty and Opportunity',
    body: 'From the mighty Zambezi to welcoming communities, Zambia offers unforgettable experiences for travelers, prospective residents, and entrepreneurs.',
    quote: ['Explore new places.', 'Discover new possibilities.'],
    image: '/Pictures/countries/Zambia.jpg',
    imageAlt: 'The Zambezi River at sunset in Zambia',
  },
  hero: {
    image: '/Pictures/countries/Zambia.jpg',
    imageAlt: 'Victoria Falls with a rainbow arcing over the gorge in Zambia',
    description:
      'From the thundering waters of Victoria Falls and the wildlife-rich plains of South Luangwa to the vast landscapes of the Lower Zambezi, Zambia offers an unforgettable mix of nature, adventure and authentic African travel.',
  },
  seasons: [
    {
      icon: 'Sun',
      period: 'May – August',
      title: 'Cool & Dry',
      text: 'The most comfortable time to travel. Days are generally dry and pleasant, making it great for sightseeing, wildlife trips and overland travel.',
    },
    {
      icon: 'Thermometer',
      period: 'September – October',
      title: 'Hot & Dry',
      text: 'Temperatures rise, especially in lower-lying areas. Wildlife viewing can be excellent as animals gather near permanent water sources.',
    },
    {
      icon: 'CloudRain',
      period: 'November – April',
      title: 'Green / Rainy Season',
      text: "This is Zambia's main rainy season. The countryside is lush and green, though some roads in remote areas can be more challenging.",
    },
    {
      icon: 'Waves',
      period: 'Victoria Falls',
      title: 'Changes Year-Round',
      text: 'Water levels vary throughout the year. The falls are at their most powerful during the rainy season.',
    },
  ],
  beforeYouGo: [
    'Visa requirements depend on your nationality. Some travelers can enter without a visa, others may get a visa on arrival, or need to apply before traveling. Zambia also offers an eVisa system.',
    'Your passport should be valid for at least 6 months with enough blank pages.',
    'Always confirm the latest requirements before you travel.',
  ],
  places: [
    {
      name: 'Livingstone & Victoria Falls',
      text: 'Home of Victoria Falls (Mosi-oa-Tunya) and a hub for adventure and culture.',
    },
    { name: 'Lusaka', text: 'The capital city and major business center.' },
    {
      name: 'South Luangwa National Park',
      text: 'Famous for walking safaris and amazing wildlife encounters.',
    },
    {
      name: 'Lower Zambezi',
      text: 'Scenic river landscapes, wildlife and great safari experiences.',
    },
    {
      name: 'Lake Kariba',
      text: 'Vast lake on the Zambia–Zimbabwe border, perfect for relaxing and fishing.',
    },
  ],
  currency:
    'The local currency is the Zambian kwacha (ZMW). Cash is important for markets, local transport and small businesses. Cards are widely accepted in major towns, hotels and larger stores.',
  simCards:
    'SIM cards are inexpensive and data is generally available in towns and cities. Bring your passport to register.',
  gettingAround: [
    'Long-distance buses',
    'Shared minibuses',
    'Taxis and private vehicles',
    'Domestic flights',
    'Trains on selected routes',
  ],
  overland: {
    image: '/Pictures/countries/Zambia.jpg',
    imageAlt: 'Victoria Falls Bridge over the Zambezi gorge, the border crossing between Zambia and Zimbabwe',
    text: 'Zambia shares borders with several countries and is an important link between Southern and East Africa. Popular connections include:',
    neighbours: ['Tanzania', 'Malawi', 'Zimbabwe', 'Botswana', 'Namibia', 'Mozambique'],
    note: 'Routes, transport connections and border procedures vary depending on your journey.',
  },
  tips: [
    {
      icon: 'Clock',
      title: 'Give yourself enough time',
      text: 'Zambia is large. Travel between destinations can take longer than expected.',
    },
    {
      icon: 'Banknote',
      title: 'Carry some cash',
      text: 'Cards are useful, but cash is essential for everyday transactions.',
    },
    {
      icon: 'Signpost',
      title: 'Stay flexible',
      text: 'Transport times, schedules and road conditions can change.',
    },
    {
      icon: 'Waves',
      title: 'Falls change with the seasons',
      text: 'Victoria Falls looks very different throughout the year.',
    },
    {
      icon: 'PawPrint',
      title: 'Respect wildlife',
      text: 'Never approach or feed wild animals, even if they appear accustomed to people.',
    },
    {
      icon: 'Heart',
      title: 'Keep an open mind',
      text: "Some of Zambia's best experiences are off the beaten path.",
    },
  ],
  helpWith: [
    { icon: 'FileText', label: 'Personal Visa Guidance' },
    { icon: 'Bus', label: 'Travel Planner' },
    { icon: 'RouteIcon', label: 'Border Crossing Guides' },
  ],
  helpPhoto: '/Pictures/countries/Tanzania.jpg',
  trust: trustFor('Zambia'),
  farewell: {
    heading: 'Takulandirani ku Zambia. ❤️',
    text: 'Come prepared, take your time, and experience Zambia beyond the familiar.',
  },
}

// Malawi is bespoke (see src/pages/Malawi.jsx): its reference guide is an
// accordion of 8 real topic summaries (not a flat checklist), its routes
// are side-by-side photo+text cards rather than a 4-up grid, and it closes
// with two side-by-side CTAs instead of the generic "not sure which
// service" banner.
export const MALAWI_PAGE = {
  hero: {
    backgroundImage: '/Pictures/countries/Malawi.webp',
    backgroundImageAlt: 'Traditional fishing boat on the shore of Lake Malawi',
    heading: 'Explore Malawi',
    description:
      'The Warm Heart of Africa, Malawi stretches from the beautiful shores of Lake Malawi to the highlands of Mulanje and the wildlife of Liwonde, offering a relaxed blend of scenery, culture, nature and genuine warmth.',
  },
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
      image: '/Pictures/countries/Malawi.webp',
    },
    {
      icon: 'Bus',
      title: 'Travel Planner',
      text: 'We research practical routes using buses, shared transport and other local transportation.',
      items: [
        'Recommended routes',
        'Transport connections',
        'Departure & arrival points',
        'Journey times',
        'Border connections',
        'Practical travel tips',
      ],
      cta: 'Plan My Route',
      image: '/Pictures/countries/Malawi.webp',
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
      cta: 'Get Border Crossing Guide',
      image: '/Pictures/countries/Malawi.webp',
    },
  ],
  routes: [
    {
      from: 'Tanzania',
      image: '/Pictures/countries/Tanzania.jpg',
      text: 'Via Kasumulu or Karonga border — a scenic route along Lake Malawi.',
    },
    {
      from: 'Zambia',
      image: '/Pictures/countries/Zambia.jpg',
      text: 'Via Mchinji or Mwami border, a popular crossing for travelers and traders.',
    },
    {
      from: 'Mozambique',
      image: '/Explore_regions/optimized/east-africa/4.webp',
      text: 'Via Dedza or Mwanza border, with beautiful countryside views.',
    },
  ],
  guide: {
    eyebrow: 'First Time in Malawi?',
    heading: 'A Practical Guide for First-Time Travellers to Malawi',
    intro:
      'Our Malawi Travel Guide covers everything you need to know before you arrive — open a topic to read more.',
    topics: [
      {
        icon: 'CalendarDays',
        label: 'When to Visit',
        text: 'Best time is May to October (dry season) — warm, pleasant days with low humidity. November to April is the rainy season: lush landscapes, but heavier rain.',
      },
      {
        icon: 'MapPin',
        label: 'Places to Visit',
        text: "Lake Malawi's beaches and water activities, peaceful Likoma Island, snorkeling and diving at Cape Maclear, wildlife at Nyika National Park, hiking the Zomba Plateau, and Mount Mulanje — Malawi's highest mountain.",
      },
      {
        icon: 'FileText',
        label: 'Visa & Entry Information',
        text: 'Most nationalities get a visa on arrival for up to 90 days. Your passport must be valid for at least 6 months beyond your entry date, and a Yellow Fever certificate is required if arriving from a risk country. Extensions are available at the Department of Immigration in Lilongwe.',
      },
      {
        icon: 'Plane',
        label: 'Getting to Malawi',
        text: 'Kamuzu International Airport (LLW) in Lilongwe receives direct flights from Ethiopia, Kenya, South Africa and other regional hubs. Taxis and hotel shuttles are readily available from the airport.',
      },
      {
        icon: 'Wallet',
        label: 'Money & SIM Cards',
        text: 'The currency is the Malawian Kwacha (MWK). ATMs are available in major cities (Lilongwe, Blantyre, Mzuzu) — carry cash for rural areas. Airtel, TNM and Telekom Networks Malawi are the main mobile providers, and mobile money (TNM Mpamba) is widely used.',
      },
      {
        icon: 'Bus',
        label: 'Getting Around',
        text: "Minibuses (dala-dala) connect major towns and are affordable, though they can be crowded. Taxis are available in cities, and car rental is possible with a valid driver's license. Roads outside main towns can be rough during the rainy season (November–April).",
      },
      {
        icon: 'ShieldCheck',
        label: 'Health & Safety',
        text: 'Malaria risk exists year-round — use protection and drink bottled or filtered water. General safety is good; use common sense and stay aware of your surroundings.',
      },
      {
        icon: 'Lightbulb',
        label: 'First-Time Traveller Tips',
        text: 'Malawians are friendly and welcoming. Respect local customs and dress modestly, especially in rural areas. Bargaining is normal in markets. A few words of Chichewa go a long way: "Moni" (hello) and "Zikomo" (thank you).',
      },
    ],
    image: '/Pictures/countries/Malawi.webp',
    imageAlt: 'Turquoise waters and sandy beach along Lake Malawi',
  },
  ctas: [
    {
      icon: 'RouteIcon',
      eyebrow: 'Planning an Overland Journey?',
      text: 'Routes, transport options and border conditions can change. Plan ahead and check the latest information before you travel.',
      cta: { label: 'Plan My Route', to: '/travel-planner?destination=malawi' },
    },
    {
      icon: 'IdCard',
      eyebrow: 'Need a Border Crossing Guide?',
      text: 'Get up-to-date, step-by-step information for border crossings and procedures on your journey.',
      cta: { label: 'Get a Border Crossing Guide', to: '/#contact' },
    },
  ],
  trust: trustFor('Malawi'),
  farewell: {
    heading: 'Takulandirani ku Malawi. ❤️',
    text: 'Come prepared, travel with an open mind, and take time to experience the Warm Heart of Africa.',
  },
}

// Uganda is bespoke (see src/pages/Uganda.jsx): its reference skips the
// checklist bullets under each service card, repeats the "Explore Uganda"
// intro as its own banner beside a plain (non-accordion) Practical Guide,
// has no trust row, and closes with a plain tagline instead of a farewell.
export const UGANDA_PAGE = {
  hero: {
    backgroundImage: '/Pictures/countries/Uganda.jpg',
    backgroundImageAlt: 'Boats on a river winding through green hills at golden hour in Uganda',
    heading: 'Explore Uganda',
    description:
      'The Pearl of Africa, Uganda is home to the source of the Nile, the mountain gorillas of Bwindi, the wildlife of Queen Elizabeth National Park and the beautiful shores of Lake Victoria, offering an extraordinary mix of nature, adventure and culture.',
  },
  services: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      text: 'Get personalized research and practical information based on your nationality, travel dates and plans.',
      cta: 'Get Visa Guidance',
      image: '/Pictures/countries/Uganda.jpg',
    },
    {
      icon: 'Bus',
      title: 'Travel Planner',
      text: 'We research practical routes using buses, shared transport and other local connections.',
      cta: 'Plan My Route',
      image: '/Pictures/countries/Uganda.jpg',
    },
    {
      icon: 'Car',
      title: 'Border Crossing Guide',
      text: 'Understand border procedures and transportation connections before you arrive.',
      cta: 'Get Border Guide',
      image: '/Pictures/countries/Uganda.jpg',
    },
  ],
  routes: [
    {
      from: 'Rwanda',
      image: '/Pictures/countries/Rwanda.jpg',
      text: 'A scenic and popular route through beautiful highlands and rolling hills.',
    },
    {
      from: 'Tanzania',
      image: '/Pictures/countries/Tanzania.jpg',
      text: 'A well-traveled route with good transport options and stunning landscapes.',
    },
    {
      from: 'South Sudan',
      image: '/Explore_regions/optimized/east-africa/5.webp',
      text: 'An overland journey through diverse landscapes and welcoming communities.',
    },
  ],
  guideItems: [
    'When to visit',
    'Visa & entry information',
    'Money & SIM cards',
    'Getting around',
    'Health & travel tips',
  ],
  helpWith: [
    { icon: 'FileText', label: 'Visa Guidance' },
    { icon: 'Bus', label: 'Travel Planner' },
    { icon: 'Car', label: 'Border Crossing Guides' },
  ],
  closingLine: 'Your Link to Africa',
}

// Rwanda is bespoke (see src/pages/Rwanda.jsx): its reference has no
// first-timer guide section at all, a "benefits" row instead of the trust
// row every other page uses, and closes with a centered italic quote
// banner rather than a farewell strip.
export const RWANDA_PAGE = {
  hero: {
    image: '/Pictures/countries/Rwanda.jpg',
    imageAlt: 'Misty green hills and terraced farmland at sunrise in Rwanda',
    subheading: 'Land of a Thousand Hills',
    description:
      'From the lively streets of Kigali and the shores of Lake Kivu to the mist-covered mountains of Volcanoes National Park and the forests of Nyungwe, Rwanda offers a striking mix of scenery, wildlife, culture and easy overland travel.',
  },
  services: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      text: 'Get personalized practical guidance for traveling to Rwanda based on your nationality, travel plans, intended length of stay, and purpose of visit.',
      items: [
        'Entry and visa requirements',
        'Required documents',
        'Visa extension information',
        'Answers to your specific questions',
      ],
      image: '/Pictures/countries/Rwanda.jpg',
    },
    {
      icon: 'Map',
      title: 'Travel Planner',
      text: "Get personalized travel planning for Rwanda based on your interests, travel style, timing, and budget. We'll help you organize the key details of your journey so you can travel with confidence.",
      items: [
        'Route and transportation planning',
        'Recommended places to visit',
        'Timing between destinations',
        'Practical travel tips and logistics',
      ],
      image: '/Pictures/countries/Rwanda.jpg',
    },
    {
      icon: 'Signpost',
      title: 'Border Crossing Guide',
      text: 'Get practical guidance for crossing into or out of Rwanda, including entry requirements at land borders, what to expect, and tips for a smoother journey.',
      items: [
        'Border entry requirements',
        'Required documents',
        'What to expect at the border',
        'Tips for a smoother crossing',
      ],
      image: '/Pictures/countries/Rwanda.jpg',
    },
  ],
  routes: [
    {
      from: 'Uganda',
      image: '/Pictures/countries/Uganda.jpg',
      text: 'A popular route through beautiful highlands, connecting Kigali with southwestern Uganda.',
    },
    {
      from: 'Tanzania',
      image: '/Pictures/countries/Tanzania.jpg',
      text: 'Overland connections through the Kagera region, linking Rwanda with northwestern Tanzania.',
    },
    {
      from: 'Burundi',
      image: '/Explore_regions/optimized/east-africa/7.webp',
      text: 'A short overland route south to Bujumbura, sharing similar landscapes and culture.',
    },
    {
      from: 'DR Congo',
      image: '/Explore_regions/optimized/east-africa/8.webp',
      text: 'Crossings near Lake Kivu connect Rwanda with the eastern DR Congo.',
    },
  ],
  benefits: [
    {
      icon: 'Users',
      title: 'Personalized Guidance',
      text: 'Real answers for your specific travel plans',
    },
    {
      icon: 'ShieldCheck',
      title: 'Secure & Encrypted',
      text: 'Your information stays private',
    },
    {
      icon: 'Mail',
      title: 'Expert Support',
      text: 'Clear, practical advice from people who care',
    },
    {
      icon: 'Plane',
      title: 'Travel with Confidence',
      text: 'Plan smarter. Travel easier. Experience more.',
    },
  ],
  closing: {
    quote: "Rwanda is waiting — Let's get you there.",
    cta: { label: 'Start Your Journey', to: '/#contact' },
  },
}

// Senegal is bespoke (see src/pages/Senegal.jsx): its reference guide is
// an accordion of 7 real topic summaries, not a flat checklist, and it
// closes with a photo-backdrop banner rather than the generic "not sure
// which service" banner.
export const SENEGAL_PAGE = {
  hero: {
    backgroundImage: '/Pictures/countries/Senegal.webp',
    backgroundImageAlt: 'Colorful pirogue boats beside a coastal fort in Senegal',
    heading: 'Explore Senegal',
    description:
      'Senegal is a country rich in history, culture and character. From vibrant Dakar and historic Gorée Island, to the beautiful beaches of Casamance and the colonial charm of Saint-Louis, where horse-drawn carriages still move through the streets, Senegal offers travelers a memorable introduction to West Africa.',
  },
  services: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      text: 'Get personalized research and practical information based on your nationality, travel dates and plans.',
      items: [
        'Visa & entry requirements',
        'Single or multiple-entry options',
        'Documentation required',
        'Entry points & arrival info',
      ],
      cta: 'Get Visa Guidance',
      image: '/Pictures/countries/Senegal.webp',
    },
    {
      icon: 'Bus',
      title: 'Travel Planner',
      text: 'We research practical routes using buses, shared transport and other local connections.',
      items: [
        'Recommended routes',
        'Transport connections',
        'Departure & arrival points',
        'Journey times',
        'Practical travel tips',
      ],
      cta: 'Plan My Route',
      image: '/Pictures/explore/ghana-card-background.webp',
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
      ],
      cta: 'Get Border Guide',
      image: '/Pictures/countries/Senegal.webp',
    },
  ],
  routes: [
    {
      from: 'The Gambia',
      image: encodeURI('/Pictures/countries/The gambia.jpg'),
      text: 'A popular route with frequent crossings at Farafenni.',
    },
    {
      from: 'Mali',
      image: '/Explore_regions/optimized/west-africa/2.webp',
      text: 'Common entry through Kidira or Kayes.',
    },
    {
      from: 'Mauritania',
      image: '/Explore_regions/optimized/west-africa/3.webp',
      text: 'Overland route via Rosso with regular transport.',
    },
    {
      from: 'Guinea',
      image: '/Explore_regions/optimized/west-africa/4.webp',
      text: 'Route via Kolda or Mako with shared transport.',
    },
  ],
  guide: {
    heading: 'Practical Guide',
    intro: 'A quick introduction for first-time travelers to Senegal — open a topic to read more.',
    topics: [
      {
        icon: 'CalendarDays',
        label: 'When to Visit',
        text: 'November–May is the dry season and the most popular time to visit, with sunny weather and comfortable conditions. June–October is the rainy season — travel remains possible and the countryside is greener. December–February is cool and pleasant (the Harmattan can bring a light haze), and March–May is warmer but still good for coastal travel.',
      },
      {
        icon: 'Bus',
        label: 'Getting Around',
        text: 'Long-distance buses, shared minibuses, taxis and private vehicles cover most journeys, with domestic flights for longer distances — travel times can vary.',
      },
      {
        icon: 'FileText',
        label: 'Visa & Entry Information',
        text: 'Visa requirements depend on your nationality — some travelers are visa-exempt while others should confirm official requirements before departure. Check current entry requirements before you travel.',
      },
      {
        icon: 'MapPin',
        label: 'Where to Go',
        text: 'Dakar — the vibrant capital, with markets, museums, music and nightlife. Île de Gorée — a historic island with powerful heritage and beautiful views. Lac Rose (Retba) — the famous pink lake, with unique landscapes and local culture. Saint-Louis — a UNESCO-listed city with colonial charm and river life. Casamance — a lush region with beaches, culture and laid-back vibes.',
      },
      {
        icon: 'HeartPulse',
        label: 'Health & Travel Documents',
        text: "Health-entry requirements can depend on your nationality and where you're arriving from. Check current official health requirements before you travel.",
      },
      {
        icon: 'Landmark',
        label: 'Money & SIM Cards',
        text: 'Currency is the West African CFA franc (XOF); cash remains useful, and cards are accepted in many hotels and larger businesses. Local SIM cards and mobile data are widely available — bring your passport.',
      },
      {
        icon: 'Compass',
        label: 'Travel Tips',
        text: 'Give yourself enough time, carry some cash, and keep your itinerary flexible. Respect local customs, protect the environment, and travel with an open mind.',
      },
    ],
    image: '/Pictures/countries/Senegal.webp',
    imageAlt: 'Historic Île de Gorée off the coast of Senegal',
  },
  closing: {
    eyebrow: 'Need Personalized Guidance?',
    text: 'Tell us where you are traveling, when you plan to go and what you need help with.',
    cta: { label: 'Get Personalized Guidance', to: '/#contact' },
    image: '/Pictures/countries/Senegal.webp',
    helpWith: [
      { icon: 'FileText', label: 'Personal Visa Guidance' },
      { icon: 'Bus', label: 'Travel Planner' },
      { icon: 'ShieldCheck', label: 'Border Crossing Guides' },
    ],
  },
  trust: trustFor('Senegal'),
  farewell: {
    heading: "You're welcome in Senegal!",
    text: 'Come prepared, travel with an open mind, and experience the Land of Teranga beyond the familiar.',
  },
}

// Benin is bespoke (see src/pages/Benin.jsx): its reference guide is an
// accordion of 5 real topic summaries, and it has a "Where to Go in
// Benin" destinations grid the generic template has no room for.
export const BENIN_PAGE = {
  hero: {
    backgroundImage: '/Pictures/countries/Benin.jpg',
    backgroundImageAlt: 'Colorful pirogue boats beside a coastal fort in Benin',
    heading: 'Explore Benin',
    description:
      'From the historic streets of Ouidah and the stilt village of Ganvié to the energy of Cotonou and the royal heritage of Abomey, Benin offers a fascinating journey through history, culture, tradition and everyday West African life.',
  },
  services: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      text: 'We research visa requirements based on your nationality, travel dates and plans to give you clear, personalized guidance.',
      items: [
        'Visa and entry requirements',
        'Single or multiple-entry options',
        'Documentation required',
        'Entry points and arrival info',
      ],
      cta: 'Get Visa Guidance',
      image: '/Pictures/countries/Benin.jpg',
    },
    {
      icon: 'Bus',
      title: 'Travel Planner',
      text: 'We research and plan practical overland routes using buses, shared transport and other local connections.',
      items: [
        'Recommended routes',
        'Transport connections',
        'Departure & arrival points',
        'Journey times',
        'Practical travel tips',
      ],
      cta: 'Plan My Route',
      image: '/Pictures/explore/ghana-card-background.webp',
    },
    {
      icon: 'Signpost',
      title: 'Border Crossing Guide',
      text: 'We help you understand border procedures and transportation connections before your arrival.',
      items: [
        'Best border crossings',
        'How to reach the border',
        'Immigration procedures',
        'Transport on both sides',
        'Approx. travel times',
      ],
      cta: 'Get Border Guide',
      image: '/Pictures/countries/Benin.jpg',
    },
    {
      icon: 'Users',
      title: 'Independent Tour Guides *',
      text: 'We connect you with trusted independent local guides for personalized experiences in Benin.',
      items: [
        'City tours & attractions',
        'Cultural experiences',
        'Day trips & excursions',
        'Local recommendations',
        'Custom itineraries',
      ],
      cta: 'Find a Local Guide',
      image: '/Pictures/countries/Ghana.jpg',
    },
  ],
  places: [
    {
      name: 'Ouidah',
      text: 'Historic city and birthplace of Vodun (Voodoo). Visit the Door of No Return and its museums.',
    },
    { name: 'Ganvié', text: 'The "Venice of Africa" — a stilt village on Lake Nokoué.' },
    { name: 'Abomey', text: 'Home to the Royal Palaces, a UNESCO World Heritage Site.' },
    {
      name: 'Parakou & Atacora',
      text: "Discover northern Benin's culture, landscapes, and traditional villages.",
    },
    {
      name: 'Grand-Popo',
      text: 'Relax on beautiful beaches and enjoy a laid-back coastal atmosphere.',
    },
  ],
  routes: [
    {
      from: 'Togo',
      image: '/Explore_regions/optimized/west-africa/5.webp',
      text: 'Frequent taxis and buses via Saint-Jean/Hillacondji or Aflao/Séva.',
    },
    {
      from: 'Nigeria',
      image: '/Explore_regions/optimized/west-africa/6.webp',
      text: 'Via Seme (Porto-Novo/Cotonou) — a busy border with document and vehicle checks.',
    },
    {
      from: 'Burkina Faso',
      image: '/Explore_regions/optimized/west-africa/7.webp',
      text: 'Routes through Malanville — check security updates before traveling.',
    },
    {
      from: 'Ghana (via Togo)',
      image: '/Pictures/countries/Ghana.jpg',
      text: 'A popular multi-country route along the coast.',
    },
  ],
  guide: {
    heading: 'Practical Guide Preview',
    intro: 'A quick introduction for first-time travelers to Benin — open a topic to read more.',
    topics: [
      {
        icon: 'CalendarDays',
        label: 'When to Visit',
        text: 'Benin has a tropical climate with two main seasons. Dry season (Nov–Mar) is the best time to visit — sunny, pleasant, and great for travel. Rainy season (Apr–Oct) brings lush landscapes and fewer crowds, but expect heavy rains.',
      },
      {
        icon: 'FileText',
        label: 'Visa & Entry',
        text: 'Most travelers need a visa to enter Benin. An eVisa is available for many nationalities (30-day single entry) — apply online before your trip at evisa.gouv.bj. Visa on arrival may be available for some nationalities. Entry points: Cotonou Airport, land borders, and seaports.',
      },
      {
        icon: 'HeartPulse',
        label: 'Health & Travel Documents',
        text: 'A Yellow Fever vaccination certificate is required if arriving from a risk country. Routine vaccines (Hepatitis A, Typhoid, Tetanus) are recommended, and malaria risk exists in some areas — consult your doctor about prevention. Drink bottled or filtered water and eat at clean, reputable places.',
      },
      {
        icon: 'Landmark',
        label: 'Money, SIM Cards & Getting Around',
        text: 'Currency is the CFA Franc (XOF); ATMs are available in major cities, but carry cash for rural areas. Local SIM cards (MTN, Moov Africa, Celtiis) are available at the airport and in shops with a passport. Getting around means taxis and moto-taxis (agree on price before riding), buses (SOTRACO) between major towns, shared taxis (Zémidjan), and car rentals with a valid license.',
      },
      {
        icon: 'Compass',
        label: 'First-Time Traveller Tips',
        text: 'Learn a few words in French, the official language. Dress modestly, especially in rural and religious areas. Bargaining is common in markets — do it politely. Respect local customs and traditions, and keep your belongings safe.',
      },
    ],
    image: '/Pictures/explore/ghana-card-background.webp',
    imageAlt: 'Cape Coast Castle on the Ghanaian coast',
  },
  closing: {
    eyebrow: 'Need Personalized Guidance?',
    text: "Tell us about your trip and we'll provide tailored support to help you travel across Africa with confidence.",
    cta: { label: 'Get Personalized Guidance', to: '/#contact' },
    helpWith: [
      { icon: 'FileText', label: 'Personal Visa Guidance' },
      { icon: 'Bus', label: 'Travel Planner' },
      { icon: 'Signpost', label: 'Border Crossing Guides' },
      { icon: 'Users', label: 'Independent Tour Guides' },
    ],
  },
  trust: trustFor('Benin'),
  farewell: {
    heading: "You're welcome in Benin!",
  },
}

// The Gambia is bespoke (see src/pages/Gambia.jsx): its reference hero is
// a light two-column intro (text panel beside a masked photo) rather than
// a full-bleed photo with overlay, and its guide is an accordion of 8
// real topic summaries.
export const GAMBIA_PAGE = {
  hero: {
    subheading: ['Small Country. Big Hospitality.', 'Natural Beauty. Real Experiences.'],
    description:
      'The Smiling Coast of Africa, The Gambia unfolds along both the north and south banks of the Gambia River, from lively Banjul and the Atlantic beaches to riverside towns, wildlife reserves and traditional communities — a small country with two sides to discover and plenty of character in between.',
    image: encodeURI('/Pictures/countries/The gambia.jpg'),
    imageAlt: 'Colorful pirogue boats on the water in The Gambia',
  },
  services: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      text: 'Get personalized visa research and practical information based on your nationality and travel plans.',
      items: [
        'Visa & entry requirements',
        'Single or multiple-entry visas',
        'Documentation checklist',
        'Entry points & stay regulations',
      ],
      cta: 'Get Visa Guidance',
      image: encodeURI('/Pictures/countries/The gambia.jpg'),
    },
    {
      icon: 'Bus',
      title: 'Travel Planner',
      text: 'We research practical routes using buses, shared transport and other local connections.',
      items: [
        'Recommended routes',
        'Transport connections',
        'Departure & arrival points',
        'Journey times & options',
        'Practical travel tips',
      ],
      cta: 'Plan My Route',
      image: '/Pictures/explore/ghana-card-background.webp',
    },
    {
      icon: 'Users',
      title: 'Border Crossing Guide',
      text: 'Understand border procedures and transportation connections before you arrive.',
      items: [
        'Best border crossings',
        'How to reach the border',
        'Immigration procedures',
        'Transport on both sides',
        'Approx. travel times',
      ],
      cta: 'Get Border Guide',
      image: encodeURI('/Pictures/countries/The gambia.jpg'),
    },
  ],
  routes: [
    {
      from: 'Senegal (Dakar)',
      image: '/Pictures/countries/Senegal.webp',
      text: 'Travel south from Dakar through central Senegal toward The Gambia, with onward road connections to Banjul and the coastal areas.',
    },
    {
      from: 'Senegal (Ziguinchor)',
      image: '/Explore_regions/optimized/west-africa/8.webp',
      text: "A practical route from Senegal's Casamance region, traveling north by road toward The Gambia and the main coastal destinations.",
    },
    {
      from: 'Guinea-Bissau via Senegal',
      image: '/Explore_regions/optimized/west-africa/1.webp',
      text: 'Travel north from Guinea-Bissau through southern Senegal before continuing across the border into The Gambia.',
    },
    {
      from: 'Guinea via Senegal',
      image: '/Explore_regions/optimized/west-africa/2.webp',
      text: 'Overland travelers from Guinea generally continue through Senegal before entering The Gambia, with several possible road connections depending on the route.',
    },
  ],
  guide: {
    heading: 'Practical Guide',
    intro: 'A quick introduction for first-time travelers to The Gambia — open a topic to read more.',
    topics: [
      {
        icon: 'CalendarDays',
        label: 'When to Visit',
        text: 'Best time is November to May (dry season) — warm, sunny days with low humidity. June to October is the rainy season: lush and green, with fewer tourists.',
      },
      {
        icon: 'Bus',
        label: 'Getting Around',
        text: "Bush taxis (shared minibuses) connect major towns and tourist areas; gelly-gellys are local shared taxis for shorter routes — agree on the fare before getting in. Car rental is available with a valid driver's license, though roads outside main towns can be rough.",
      },
      {
        icon: 'FileText',
        label: 'Visa & Entry Information',
        text: 'Most nationalities get a visa on arrival for up to 90 days. Your passport must be valid for at least 6 months beyond your entry date, and a Yellow Fever vaccination certificate is required if arriving from a risk country. Extensions are available at the Department of Immigration in Banjul.',
      },
      {
        icon: 'MapPin',
        label: 'Top Places to Visit',
        text: 'Banjul — the capital, home to Albert Market and Kachikally Crocodile Pool. Serrekunda — the vibrant heart of shopping and nightlife. Tanji Village — a fishing village with beautiful beaches. Abuko Nature Reserve — monkeys, antelopes and birds. River Gambia — boat cruises, birdwatching and sunset views. Juffureh & Albreda — rich history and culture along the river.',
      },
      {
        icon: 'Landmark',
        label: 'Money & SIM Cards',
        text: 'Currency is the Gambian Dalasi (GMD). ATMs are available in Banjul, Serrekunda and major towns; carry cash for rural areas. Local SIMs from QCell, Africell and Comium are affordable, and mobile money (Wave) is widely used.',
      },
      {
        icon: 'Globe2',
        label: 'Traveling Overland',
        text: 'The Gambia connects with Senegal and Guinea-Bissau. Cross from Senegal (Ziguinchor) at the Fantarinï or Karantaba border, or from Guinea-Bissau at the Karantaba/Sindjan border. Routes, connections and border procedures vary depending on your journey.',
      },
      {
        icon: 'HeartPulse',
        label: 'Health & Travel Documents',
        text: 'A Yellow Fever vaccination certificate is required if arriving from a risk country, and malaria risk exists year-round — use protection. Drink bottled or filtered water and keep a copy of your passport and important documents in a separate place.',
      },
      {
        icon: 'Compass',
        label: 'First-Time Traveler Tips',
        text: 'Gambians are warm and welcoming — you\'ll feel at home. Respect local customs and dress modestly, especially in rural areas. Bargaining is normal in markets. Learn a few words in Wolof: "Salaam" (hello), "Jërëjéf" (thank you).',
      },
    ],
    image: '/Pictures/explore/ghana-card-background.webp',
    imageAlt: 'Snorkeller in clear turquoise ocean water',
  },
  closing: {
    eyebrow: 'Need Personalized Guidance?',
    text: 'Tell us where you are traveling, when you plan to go and what you need help with.',
    cta: { label: 'Get Personalized Guidance', to: '/#contact' },
    image: encodeURI('/Pictures/countries/The gambia.jpg'),
    helpWith: [
      { icon: 'FileText', label: 'Personal Visa Guidance' },
      { icon: 'Bus', label: 'Travel Planner' },
      { icon: 'Users', label: 'Border Crossing Guides' },
    ],
  },
  trust: trustFor('The Gambia'),
  farewell: {
    heading: "You're welcome in The Gambia!",
    text: 'Come with an open mind and leave with memories that will last a lifetime.',
  },
}

// Ghana is the one destination with its own bespoke page (GhanaBespoke —
// see src/pages/Ghana.jsx) rather than the shared DestinationPage template
// every other country uses: it's the only country offering both travel
// *and* relocation guidance, with real content (a Right of Abode pathway,
// priced relocation packages, a living-in-Ghana guide) that doesn't fit
// the generic services/routes/guide shape. Unlike the other countries,
// Ghana actually has several distinct real photos in public/Pictures
// (not just one repeated), so each section below gets its own rather than
// reusing a single image throughout.
export const GHANA_PAGE = {
  hero: {
    titleLine1: 'Travel & Relocation',
    titleAccent: 'in Ghana',
    subheading: 'Considering a trip to Ghana, an extended stay, or relocation?',
    description:
      'Akwaaba — welcome to Ghana, where the energy of Accra meets the historic castles of Cape Coast and Elmina, vibrant markets, beautiful coastline and rich cultural traditions. Ghana offers a memorable blend of history, heritage, everyday life and warm West African hospitality.',
    backgroundImage: '/Pictures/explore/ghana-card-background.webp',
    backgroundImageAlt: 'Cape Coast Castle on the Ghanaian coast',
  },
  // Personal Visa Guidance, Travel Planner and Border Crossing Guide route
  // to /#contact (or the real Travel Planner flow) — see the note on
  // TANZANIA_PAGE.services; the same modals this was originally written
  // against don't exist in this project.
  travelServices: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      text: 'Personalized visa and entry guidance for Ghana based on your nationality and travel plans.',
      cta: 'Get Visa Guidance',
      image: '/Pictures/countries/Ghana.jpg',
    },
    {
      icon: 'Bus',
      title: 'Travel Planner',
      text: 'Personalized route planning for your trip to Ghana, alone or combined with other countries.',
      cta: 'Plan My Route',
      image: '/Pictures/image_Ghana.webp',
    },
    {
      icon: 'ShieldCheck',
      title: 'Border Crossing Guide',
      text: 'Practical guidance for crossing into or out of Ghana at its land borders.',
      cta: 'Get Border Guide',
      image: '/Pictures/explore/ghana-card-background.webp',
    },
    {
      icon: 'Users',
      title: 'Independent Tour Guides',
      text: 'Connect with trusted independent local guides for personalized assistance and authentic experiences in Ghana.',
      cta: 'Find a Local Guide',
      image: '/Pictures/about/mission-nkrumah-statue.webp',
    },
  ],
  residency: {
    heading: 'Residency & Immigration',
    intro: 'Explore your options for living, working or investing in Ghana.',
    image: '/Pictures/countries/Ghana.jpg',
    imageAlt: 'Coastal Ghana landscape',
    featured: {
      badge: 'Featured',
      title: 'Right of Abode',
      text: "Practical guidance for eligible members of the African diaspora who want to understand Ghana's Right of Abode pathway.",
      image: '/Pictures/image_Ghana.webp',
      cta: { label: 'Explore Right of Abode Guidance', to: '/#contact' },
    },
    pathways: [
      {
        icon: 'IdCard',
        title: 'Residence Permits',
        text: 'Learn about long-stay and residence permit options.',
      },
      {
        icon: 'Briefcase',
        title: 'Work & Business Permits',
        text: 'Information for professionals, entrepreneurs and investors.',
      },
      {
        icon: 'Users',
        title: 'Other Immigration Pathways',
        text: 'Explore additional options based on your goals.',
      },
    ],
  },
  // Three purchasable Ghana packages — previewed here and routed to
  // /#contact for a real follow-up, same as every other "doesn't have its
  // own checkout flow yet" CTA on the site.
  servicePackages: [
    {
      image: '/Pictures/image_Ghana.webp',
      title: 'Personalized Relocation Guidance',
      text: 'Get practical, personalized information to help you plan your move to Ghana.',
      price: '$39.95',
      items: [
        'Housing and neighborhoods',
        'Everyday costs and practical tips',
        'Residency and local requirements',
        'Written guidance based on your goals',
      ],
    },
    {
      image: '/Pictures/countries/Ghana.jpg',
      title: 'Land & Property Information Package',
      text: 'Learn about land and property options in Ghana with practical guidance.',
      price: '$39.95',
      items: [
        'Property search tips and due diligence',
        'Key considerations and local processes',
        'Helpful contacts and resources',
      ],
    },
    {
      image: '/Pictures/explore/ghana-card-background.webp',
      title: 'Complete Ghana Relocation Package',
      text: 'A comprehensive package combining the key information you need.',
      price: '$79.95',
      items: [
        'Residency and immigration guidance',
        'Housing, property and everyday living',
        'Practical tips for getting established',
        'Written guidance tailored to your plans',
      ],
    },
  ],
  livingGuide: {
    heading: 'Ghana Living Guide',
    intro: 'Practical information on everyday life in Ghana — open a topic to read more.',
    topics: [
      {
        icon: 'Wallet',
        label: 'Cost of Living',
        text: 'Costs vary widely by location and lifestyle — Accra is generally more expensive than the rest of the country, especially in neighborhoods popular with expatriates and returning members of the diaspora. Housing is usually the largest expense; food and transport can be affordable if you shop locally and use public transport rather than imported goods and private drivers.',
      },
      {
        icon: 'HeartPulse',
        label: 'Healthcare & Insurance',
        text: "Care is available through public hospitals, private hospitals, clinics and pharmacies, with quality and cost varying by location. Private facilities in Accra offer more convenience but at higher cost. Ghana's National Health Insurance Scheme doesn't cover every need, so many residents also carry private, international or travel medical coverage.",
      },
      {
        icon: 'Home',
        label: 'Housing & Where to Live',
        text: 'Accra has the widest range of housing but is the most expensive; areas like Cantonments, Airport Residential, Labone, East Legon, Osu and Spintex are popular with expatriates and returning residents, while Kumasi, Takoradi, Cape Coast and Tema offer lower costs. Confirm lease length, payment terms, furnishings and security before committing.',
      },
      {
        icon: 'Bus',
        label: 'Getting Around',
        text: 'Tro-tros (shared minibuses) are the most affordable way to travel locally, alongside taxis and ride-hailing apps in Accra and other cities. Traffic can be heavy and road conditions vary outside major towns. For longer distances, domestic flights connect Accra with Kumasi, Tamale and Takoradi.',
      },
      {
        icon: 'Landmark',
        label: 'Banking & Money',
        text: "Ghana uses the Ghana cedi (GHS); cash, cards and mobile money are all common, with mobile money especially important for everyday transactions. Opening a bank account requires ID and supporting documents that vary by institution. Exchange foreign currency only through banks or Bank of Ghana–licensed bureaux.",
      },
      {
        icon: 'Briefcase',
        label: 'Working & Starting a Business',
        text: "Foreign nationals generally need the appropriate work and residence authorization before taking up employment — an ownership stake in a business doesn't itself grant permission to work. Starting a business requires proper registration, with requirements differing for locally owned, foreign-owned and joint ventures.",
      },
    ],
    cta: { label: 'Ask a Ghana-Specific Question', to: '/#contact' },
    sidePhotos: [
      {
        image: '/Pictures/about/mission-nkrumah-statue.webp',
        alt: 'Kwame Nkrumah statue at the Memorial Park in Accra, Ghana',
        label: 'Culture & Heritage',
      },
      {
        image: '/Pictures/explore/ghana-card-background.webp',
        alt: 'Cape Coast Castle on the Ghanaian coast',
        label: 'History & Heritage',
      },
    ],
  },
  trust: [
    {
      icon: 'Shield',
      title: 'Practical & Reliable',
      text: 'Up-to-date guidance you can use to plan with confidence.',
    },
    {
      icon: 'Users',
      title: 'Local Connections',
      text: 'Access trusted local knowledge and resources in Ghana.',
    },
    {
      icon: 'Globe2',
      title: 'Travel or Relocate',
      text: 'Guidance for visiting, living, and settling in Ghana.',
    },
    {
      icon: 'Handshake',
      title: 'Your Link to Ghana',
      text: 'Connecting you with the information and people you need.',
    },
  ],
  farewell: {
    heading: 'Akwaaba to Ghana. 🇬🇭',
    text: 'Come with an open mind, take time to explore beyond the capital, and discover the warmth and heritage that make Ghana special.',
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
    badgeImage: '/Pictures/umbrella.PNG',
    badgeImageAlt: 'Travel Planner',
    titleLine1: 'Plan Your',
    titleAccent: 'Africa Journey',
    tagline: ['One country or multi-country, travel with confidence.'],
    description:
      'Get personalized, practical guidance to help you build a smoother, smarter trip across East and West Africa.',
    backgroundImage: '/Pictures/Hero_Trv_PLNR.PNG',
    backgroundImageAlt:
      'A veranda table with a map of Africa, compass and journal overlooking Mount Kilimanjaro at sunrise',
    // This photo's sky is naturally light/blue rather than the site's usual
    // darker backdrops — the default cocoa-tinted scrim reads as an
    // unwanted brown cast on it, so this hero uses a neutral black one.
    overlayTone: 'neutral',
    trustItems: [
      { icon: 'User', title: 'Expert Guidance', text: 'From people who know Africa' },
      { icon: 'Map', title: 'Custom Itineraries', text: 'Tailored to your interests' },
      { icon: 'Users', title: 'Real Local Connections', text: 'Authentic. Trusted. Meaningful.' },
    ],
  },
  intro: {
    heading: 'Choose the Support That Fits Your Trip',
    description:
      'Whether you are still deciding what to book, already have part of your trip arranged, or want help building your journey from the ground up, choose the service that best matches where you are in your planning.',
  },
  // Travel Planner's per-country-count tiers are the same everywhere,
  // Ghana included. Before You Book Check and Travel Audit no longer use a
  // flat-rate model either — see priceForSelection()/BEFORE_YOU_BOOK_FLOW
  // and priceForTravelAudit()/TRAVEL_AUDIT_FLOW below, which price each by
  // country count plus their own flat Ghana surcharge, and neither card
  // shows a price here any more anyway.
  travelPlannerTiers: [
    { countries: 1, price: 65 },
    { countries: 2, price: 135 },
    { countries: 3, price: 195 },
    { countries: 4, price: 245 },
  ],
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

// The Travel Planner service's own details page —
// /travel-planner/service-details. Reached from the Travel Planner card's
// "View Details" (carrying forward whatever the landing page's picker had
// selected, same ?destinations= convention as every other card). If
// nothing was carried over, this is where a visitor picks how many
// countries they're planning — the same "always give them a place to
// choose, never dead-end them" logic Before You Book Check uses in its own
// request form, just one step earlier here since the reference design
// puts the count tiles on this page rather than inside the request form.
export const TRAVEL_PLANNER_DETAILS_PAGE = {
  hero: {
    badge: 'Travel Planner',
    titleLine1: 'Plan More',
    titleAccent: 'Discover Deeper',
    tagline: ['Real places. Real people. A more meaningful Africa.'],
    description: 'Personalized planning support to help you create your ideal Africa journey — your way.',
    backgroundImage: '/Pictures/Hero_Trv_PLNR.PNG',
    backgroundImageAlt:
      'A map of Africa with route arrows, compass, camera and journal on a veranda table overlooking Kilimanjaro at sunrise',
    overlayTone: 'neutral',
  },
  // Body copy below is transcribed verbatim from the "Travel Planner
  // DETAILS" reference document. That document also carries a pricing/UX
  // reminder (Ghana/Benin/Senegal need their own rates and follow-up
  // variants, and a locked arrival should show its starting country plus
  // room to add more) that is NOT applied yet — this page still uses the
  // uniform travelPlannerTiers from TRAVEL_PLANNER_PAGE above and the
  // existing locked/unlocked picker behavior. That's a separate, larger
  // change to confirm before building.
  intro: {
    heading: 'Plan Your Journey With Practical, Personalized Guidance',
    paragraphs: [
      'Our Travel Planner is for travelers who want help building a trip from the ground up.',
      'You tell us where you want to go, your travel dates, interests, preferred pace, transportation preferences, and the type of experience you are looking for. We then help you turn those ideas into a practical journey that works on the ground.',
    ],
  },
  countPicker: {
    heading: 'How many countries are you planning to visit?',
    subtext: 'Select an option below to see the price.',
  },
  whatWeHelpPlan: {
    heading: 'What We Help You Plan',
    items: [
      { icon: 'Map', text: 'A suggested travel route and itinerary' },
      { icon: 'ListOrdered', text: 'The best order in which to visit your destinations' },
      { icon: 'Heart', text: 'Places and experiences that fit your interests' },
      { icon: 'Bus', text: 'Transportation options between destinations' },
      { icon: 'Milestone', text: 'Overland routes and border connections where relevant' },
      { icon: 'Clock', text: 'Approximate travel times' },
      { icon: 'Route', text: 'Practical routing advice to reduce unnecessary backtracking' },
      { icon: 'CalendarClock', text: 'Suggestions based on the amount of time you have available' },
      { icon: 'ClipboardCheck', text: 'General travel tips and country-specific considerations' },
    ],
  },
  whatYouReceive: {
    heading: 'What You Receive',
    paragraphs: [
      'You will receive a personalized written Travel Planner by email based on the information you provide in your request.',
      'The planner is designed to give you a clear, practical framework for your journey while allowing you to make your own bookings and travel decisions.',
    ],
  },
  followUpSupport: {
    heading: 'Follow-Up Support',
    items: [
      {
        label: 'Most countries',
        text: 'Your Travel Planner includes 3 clarification emails within 7 days after delivery.',
      },
      {
        label: 'Ghana',
        text: 'Includes 3 clarification emails within 7 days plus an optional phone consultation.',
      },
      {
        label: 'Benin and Senegal',
        text: 'Includes 3 clarification emails in English or French within 7 days plus a phone consultation.',
      },
    ],
  },
  delivery: 'Typical delivery: 3–5 business days.',
  importantToKnow: {
    heading: 'Important to Know',
    paragraphs: [
      'East-West Africa Link provides independent travel guidance. We do not make bookings or act as a travel agency.',
    ],
  },
  closingPhoto: '/Pictures/countries/Tanzania.jpg',
  closingPhotoAlt: 'A safari vehicle on a dirt road through the savanna near a lake and mountains',
  closingTagline: ['Different Journeys', 'A Richer You'],
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

// The Before You Book Check service — its own detail page
// (/travel-planner/before-you-book-check) plus a 4-step request wizard
// (.../request through .../confirmation), a second, independent flow
// alongside the Travel Planner wizard above. Same shape (request → review →
// payment → confirmation) and the same shared step components
// (PlannerBackground, PlannerStepHero, PlannerSidebar, PlannerStepper), but
// its own question set and its own pricing: tiered by how many countries
// are selected, plus a flat surcharge whenever Ghana is anywhere in the
// list (a Ghana request includes a 20-minute follow-up phone call the other
// countries don't) — see priceForSelection() below, the one place that
// turns a selection into a number for this service.
export const BEFORE_YOU_BOOK_PAGE = {
  // Body copy below is transcribed verbatim from the "Travel Planner
  // DETAILS" reference document's Before You Book Check section. That
  // document doesn't call for any pricing/UX change on this service (its
  // "Just A Note" reminder is scoped to Travel Planner only) — this page's
  // existing tiered-plus-Ghana-surcharge pricing (priceForSelection below)
  // already matches what the document describes.
  hero: {
    badge: 'Travel Planner',
    titleLine1: 'Before You Book',
    titleAccent: 'Check',
    tagline: ['Check your trip before you commit.'],
    description:
      'The Before You Book Check is for travelers who already have an idea of where they want to go but have not yet committed to the major bookings.',
    backgroundImage: '/Pictures/Hero_Trv_PLNR.PNG',
    backgroundImageAlt:
      'A map of Africa with route arrows, compass, camera and journal on a veranda table overlooking Kilimanjaro at sunrise',
    overlayTone: 'neutral',
  },
  intro: {
    heading: 'Check Your Trip Before You Commit',
    paragraphs: [
      'The Before You Book Check is for travelers who already have an idea of where they want to go but have not yet committed to the major bookings.',
      'You may already know your countries, destinations, approximate dates, and preferred route. We review those plans before you spend money on flights, accommodation, transportation, or other major parts of the trip.',
    ],
  },
  whatWeReview: {
    heading: 'What We Review',
    items: [
      'Your proposed travel dates',
      'The countries and destinations you plan to visit',
      'The order of your destinations',
      'Whether the route is realistic within the time available',
      'Transportation options between destinations',
      'Overland routes and border crossings where relevant',
      'Approximate travel times',
      'Tight or difficult connections',
      'Unnecessary backtracking',
      'Parts of the journey that may be impractical or difficult to arrange',
      'Opportunities to simplify or improve the overall route',
    ],
  },
  whyItHelps: {
    heading: 'Why This Service Can Help',
    paragraphs: [
      'A trip may look simple on a map but work very differently on the ground.',
      'Distances, road conditions, transportation schedules, border procedures, and actual travel times can affect whether a route is practical.',
      'The Before You Book Check gives you an independent review before you commit your money.',
    ],
  },
  whatYouReceive: {
    heading: 'What You Receive',
    paragraphs: [
      'You will receive a written review of your proposed journey by email.',
      'We will point out any areas that may need attention and, where appropriate, suggest practical changes to the route, timing, transportation, or sequence of destinations.',
    ],
  },
  followUpSupport: {
    heading: 'Follow-Up Support',
    items: [
      {
        label: 'Most countries',
        text: 'Your Before You Book Check includes 3 clarification emails within 7 days after delivery.',
      },
      {
        label: 'Ghana',
        text: 'Includes 3 clarification emails within 7 days plus an optional 20-minute phone consultation.',
      },
      {
        label: 'Benin and Senegal',
        text: 'Includes 3 clarification emails within 7 days in English or French.',
      },
    ],
  },
  delivery: 'Typical delivery: 3–5 business days.',
  importantToKnow: {
    heading: 'Important to Know',
    paragraphs: [
      'This service is for a trip that is still in the planning stage and has not yet been substantially booked.',
      'East-West Africa Link provides independent travel guidance. We do not make reservations or purchase travel services on your behalf.',
    ],
  },
  sidebar: {
    title: 'Before You Book Check',
    tagline: 'Expert feedback. Better decisions. A smoother journey.',
  },
  stats: [
    { icon: 'Clock', title: 'Typical Delivery', text: '3–5 business days' },
    { icon: 'Mail', title: 'Delivered by Email', text: 'Clear, personalized guidance' },
    { icon: 'ShieldCheck', title: 'Secure & Encrypted', text: 'Your information is safe with us.' },
    { icon: 'Users', title: 'Local Knowledge', text: 'Real experience. Practical advice.' },
  ],
  closing: 'Better Planning. A More Rewarding Africa.',
}

export const BEFORE_YOU_BOOK_FLOW = {
  // 1 country: $55, 2: $95, 3: $120, 4: $140 — the same tiers no matter
  // which countries are picked. Ghana adds a flat $10 on top of whichever
  // tier applies (not its own tier) because a Ghana request includes a
  // 20-minute phone call follow-up the other countries don't.
  tiers: [
    { countries: 1, price: 55 },
    { countries: 2, price: 95 },
    { countries: 3, price: 120 },
    { countries: 4, price: 140 },
  ],
  ghanaSurcharge: 10,
  includes: [
    { icon: 'Search', text: 'Review of your proposed travel plans' },
    { icon: 'Map', text: 'Practical, up-to-date advice before you book' },
    { icon: 'Mail', text: 'Delivered by email' },
    { icon: 'Users', text: '3 clarification emails within 7 days of delivery' },
    { icon: 'Clock', text: 'Typical delivery 3–5 business days' },
  ],
  bookingOptions: [
    'Flights (international or within Africa)',
    'Accommodation (hotels, guesthouses, etc.)',
    'Ground transport (buses, trains, private drivers, etc.)',
    'Tours or activities',
  ],
  durationOptions: [
    '1 week or less',
    'About 2 weeks',
    'About 3 weeks',
    'About 1 month',
    'More than 1 month',
    'Not sure yet',
  ],
  stepLabels: ['Your Request', 'Review Your Answers', 'Secure Payment', 'Payment Received'],
  steps: {
    request: {
      bannerTagline: 'Plan Smarter. Travel with Confidence.',
      cornerTagline: ['Explore Today.', 'A Richer Tomorrow.'],
      heading: 'Start Your Request',
      description:
        "Tell us about your planned trip and we'll review your plans before you book or pay. All fields marked with * are required.",
      back: { label: 'Back to Service Details', to: '/travel-planner/before-you-book-check' },
      cta: 'Review Your Answers',
      sidebarCaption: ['Expert feedback.', 'Better decisions.'],
    },
    review: {
      bannerTagline: 'Travel with knowledge. Travel with confidence.',
      cornerTagline: ['Travel with knowledge.', 'Travel with confidence.'],
      heading: 'Review Your Answers',
      description:
        'Please review your answers below. If you need to make changes, click Edit for the relevant section. When you are ready, click Continue to Secure Payment.',
      back: { label: 'Back to Make Changes', to: '/travel-planner/before-you-book-check/request' },
      cta: 'Continue to Secure Payment',
      sidebarCaption: ['Expert feedback.', 'Better decisions.'],
    },
    payment: {
      bannerTagline: "You're Almost Done.",
      cornerTagline: ['Independent travel.', 'A brighter Africa.'],
      heading: 'Secure Payment',
      description: "You're almost done! Complete your payment below to submit your request.",
      back: {
        label: 'Back to Review Your Answers',
        to: '/travel-planner/before-you-book-check/review',
      },
      quote: ['Better planning.', 'A more rewarding Africa.'],
      helper:
        'After payment, you will receive a confirmation and your Before You Book Check request will be submitted for review.',
      sidebarHeading: 'Before You Book Check',
      sidebarCaption: ['Expert feedback.', 'Better decisions.'],
      sidebarCaption2: ['Extraordinary places.', 'A brighter tomorrow.'],
    },
    confirmation: {
      bannerTagline: 'Extraordinary places. A brighter tomorrow.',
      cornerTagline: ['Independent travel.', 'A brighter Africa.'],
      heading: 'Your Payment Has Been Received',
      intro: 'Your request for the Before You Book Check has been successfully submitted.',
      body: "We'll review your information and be in touch soon.",
      whatsNext: 'Our team will carefully review your plans and questions.',
      deliveryNote: 'Your personalized Before You Book Check will be delivered by email.',
      followUp:
        'You have 3 clarification emails within 7 days of delivery (plus an optional 20-minute phone consultation for Ghana). If we need any additional information, we will contact you by email.',
      confirmationNote: 'Please check your inbox (and spam folder) for our email.',
      secureNote: 'Your payment was processed securely using industry-standard SSL encryption.',
      secureNote2: 'Your information is safe and protected.',
      sidebarHeading: 'Before You Book Check',
      sidebarCaption: ['Expert feedback. Better decisions.', "We're here to help."],
      sidebarCaption2: ['Extraordinary places.', 'A brighter tomorrow.'],
    },
  },
}

// Turns a destination selection into this service's price — used
// everywhere the price is shown (detail page, request/review/payment/
// confirmation sidebars, the payment Order Summary and the confirmation
// Order Details) so the tiered-plus-Ghana-surcharge rule only lives once.
// Returns null when nothing is selected yet (nothing to price).
export function priceForSelection(destinationSlugs) {
  const count = destinationSlugs.length
  if (count === 0) return null
  const base = BEFORE_YOU_BOOK_FLOW.tiers.find((t) => t.countries === count)?.price ?? null
  if (base == null) return null
  return base + (destinationSlugs.includes('ghana') ? BEFORE_YOU_BOOK_FLOW.ghanaSurcharge : 0)
}

// The Travel Audit service — its own detail page
// (/travel-planner/travel-audit) plus a 4-step request wizard (.../request
// through .../confirmation), a third independent flow alongside Travel
// Planner and Before You Book Check above. Same shape (request → review →
// payment → confirmation) and the same shared step components
// (PlannerBackground, PlannerStepHero, PlannerSidebar, PlannerStepper), its
// own question set (for travelers who have already booked, or partially
// booked, and want an independent review), and its own pricing — tiered by
// country count, plus a flat Ghana surcharge, same hybrid model as Before
// You Book Check just with this service's own numbers.
//
// Body copy on the detail page is transcribed verbatim from the "Travel
// Planner DETAILS" reference document's Travel Audit section (the same
// document Travel Planner's and Before You Book Check's detail pages
// already draw from).
export const TRAVEL_AUDIT_PAGE = {
  hero: {
    badge: 'Travel Planner',
    titleLine1: 'Travel',
    titleAccent: 'Audit',
    tagline: ['Already booked? Let us review how it fits together.'],
    description:
      'The Travel Audit is for travelers who have already booked — or partially booked — their trip and want an independent review before they travel.',
    backgroundImage: '/Pictures/Hero_Trv_PLNR.PNG',
    backgroundImageAlt:
      'A map of Africa with route arrows, compass, camera and journal on a veranda table overlooking Kilimanjaro at sunrise',
    overlayTone: 'neutral',
  },
  intro: {
    heading: 'Already Booked? Let Us Review How the Journey Fits Together.',
    paragraphs: [
      'The Travel Audit is for travelers who have already booked—or partially booked—their trip and want an independent review before they travel.',
      'It can be used for a single-country trip or a multi-country journey, with particular attention to overland travel, border crossings, ground transportation, and how the different parts of the trip connect.',
      'We review how the journey works as a whole and identify possible gaps, difficult connections, unnecessary backtracking, unrealistic travel times, or transportation issues.',
    ],
  },
  whatWeReview: {
    heading: 'What We Review',
    items: [
      'Your existing flight and accommodation bookings',
      'The sequence of your destinations',
      'Transportation between locations',
      'Multi-country routing',
      'Overland travel through one or several countries',
      'Border crossings and connections between countries',
      'Approximate travel times',
      'Difficult or tight connections',
      'Gaps in your itinerary',
      'Unnecessary backtracking',
      'Parts of the journey that may be impractical',
      'Areas where the trip may be simplified or improved',
    ],
  },
  whyItMatters: {
    heading: 'Why a Travel Audit Matters',
    paragraphs: [
      'A trip can look complete because the flights, hotels, and major activities are already booked, but problems often appear in the details between those bookings.',
      'This can be especially valuable on multi-country journeys, where overland travel, border crossings, transportation schedules, route sequence, and realistic travel times can affect the entire trip.',
      'The Travel Audit looks at how the journey works as a whole and can help identify difficult connections, unrealistic travel days, unnecessary backtracking, or gaps that may be easier to correct before you travel.',
    ],
  },
  whatYouReceive: {
    heading: 'What You Receive',
    paragraphs: [
      'You will receive a written review by email outlining any concerns we identify, together with practical suggestions for improving the trip where possible.',
      'If your existing arrangements already make good practical sense, we will tell you that as well.',
    ],
  },
  followUpSupport: {
    heading: 'Follow-Up Support',
    items: [
      {
        label: 'Most countries',
        text: 'Your Travel Audit includes 3 clarification emails within 7 days after delivery.',
      },
      {
        label: 'Ghana',
        text: 'Includes 3 clarification emails within 7 days plus an optional 20-minute phone consultation.',
      },
      {
        label: 'Benin and Senegal',
        text: 'Includes 3 clarification emails within 7 days in English or French.',
      },
    ],
  },
  delivery: 'Typical delivery: 3–5 business days.',
  importantToKnow: {
    heading: 'Important to Know',
    paragraphs: [
      'East-West Africa Link does not make, cancel, or change bookings on your behalf.',
      'Any changes remain your decision and must be arranged directly with the airline, hotel, transportation provider, or other supplier.',
    ],
  },
  sidebar: {
    title: 'Travel Audit',
    tagline: 'Plan wisely. Travel with confidence.',
  },
  stats: [
    { icon: 'Clock', title: 'Typical Delivery', text: '3–5 business days' },
    { icon: 'Mail', title: 'Delivered by Email', text: 'Your full report sent to you securely' },
    { icon: 'ShieldCheck', title: 'Secure & Encrypted', text: 'Your information is always protected' },
    { icon: 'Users', title: 'Expert Guidance', text: 'Country-specific. Up-to-date. Trusted.' },
  ],
  closing: 'Plan wisely. Travel with confidence.',
}

export const TRAVEL_AUDIT_FLOW = {
  // 1 country: $40, 2: $70, 3: $90, 4: $105 — the same tiers no matter
  // which countries are picked. Ghana adds a flat $5 on top of whichever
  // tier applies (not its own tier), matching the standalone "Ghana Travel
  // Audit is $45" ($40 + $5) rate.
  tiers: [
    { countries: 1, price: 40 },
    { countries: 2, price: 70 },
    { countries: 3, price: 90 },
    { countries: 4, price: 105 },
  ],
  ghanaSurcharge: 5,
  includes: [
    { icon: 'FileText', text: 'Review of your existing bookings and itinerary' },
    { icon: 'Search', text: 'Identify gaps, issues or better options' },
    { icon: 'Mail', text: 'Delivered by email' },
    { icon: 'Users', text: '3 clarification emails within 7 days' },
    { icon: 'Clock', text: 'Typical delivery 3–5 business days' },
  ],
  bookedOptions: [
    'International flights',
    'Regional or domestic flights',
    'Accommodation (hotels, guesthouses, etc.)',
    'Ground transport (buses, trains, private drivers, etc.)',
    'Tours or activities',
  ],
  durationOptions: [
    '1 week or less',
    'About 2 weeks',
    'About 3 weeks',
    'About 1 month',
    'More than 1 month',
    'Not sure yet',
  ],
  stepLabels: ['Your Request', 'Review Your Answers', 'Secure Payment', 'Payment Received'],
  steps: {
    request: {
      bannerTagline: 'Real Places. Meaningful Journeys.',
      cornerTagline: ['Independent travel.', 'A brighter Africa.'],
      heading: 'Start Your Request',
      description:
        "Tell us about your trip. We'll review your existing bookings and plans to help you identify potential issues, improve your route, and make the most of your journey. All fields marked with * are required.",
      back: { label: 'Back to Service Details', to: '/travel-planner/travel-audit' },
      cta: 'Review Your Answers',
      sidebarCaption: ['Plan wisely.', 'Travel with confidence.'],
    },
    review: {
      bannerTagline: 'Real Places. Meaningful Journeys.',
      cornerTagline: ['Independent travel.', 'A brighter Africa.'],
      heading: 'Review Your Answers',
      description:
        'Please review your answers below. If you need to make changes, click Edit for the relevant section. When you are ready, click Continue to Secure Payment.',
      back: { label: 'Back to Make Changes', to: '/travel-planner/travel-audit/request' },
      cta: 'Continue to Secure Payment',
      sidebarCaption: ['Plan wisely.', 'Travel with confidence.'],
    },
    payment: {
      bannerTagline: 'Real Places. Meaningful Journeys.',
      cornerTagline: ['Independent travel.', 'A brighter Africa.'],
      heading: 'Secure Payment',
      description:
        'Please review your order details below and complete your payment to submit your request. Your payment is processed securely using industry-standard encryption.',
      back: { label: 'Back to Review Your Answers', to: '/travel-planner/travel-audit/review' },
      quote: ['Plan wisely.', 'Travel with confidence.'],
      helper:
        'After payment, you will receive a confirmation and your Travel Audit request will be submitted for review.',
      sidebarHeading: 'Your Payment Is Secure',
      sidebarCaption: ['Plan wisely.', 'Travel with confidence.'],
      sidebarCaption2: ['Extraordinary places.', 'A brighter tomorrow.'],
    },
    confirmation: {
      bannerTagline: 'Real Places. Meaningful Journeys.',
      cornerTagline: ['Independent travel.', 'A brighter Africa.'],
      heading: 'Your Payment Has Been Received',
      intro: 'Your request for the Travel Audit has been successfully submitted.',
      body: "We'll review your information and be in touch soon.",
      whatsNext: 'Our team will carefully review your existing bookings and questions.',
      deliveryNote: 'Your personalized Travel Audit will be delivered by email.',
      followUp:
        'You have 3 clarification emails within 7 days of delivery (plus an optional 20-minute phone consultation for Ghana). If we need any additional information, we will contact you by email.',
      confirmationNote: 'Please check your inbox (and spam folder) for our email.',
      secureNote: 'Your payment was processed securely using industry-standard SSL encryption.',
      secureNote2: 'Your information is safe and protected.',
      sidebarHeading: 'Travel Audit',
      sidebarCaption: ['Plan wisely. Travel with confidence.', "We're here to help."],
      sidebarCaption2: ['Extraordinary places.', 'A brighter tomorrow.'],
    },
  },
}

// Turns a destination selection into the Travel Audit price — mirrors
// priceForSelection above (tiered by count, plus a flat Ghana surcharge),
// just against TRAVEL_AUDIT_FLOW's own tiers/surcharge. Returns null when
// nothing is selected yet.
export function priceForTravelAudit(destinationSlugs) {
  const count = destinationSlugs.length
  if (count === 0) return null
  const base = TRAVEL_AUDIT_FLOW.tiers.find((t) => t.countries === count)?.price ?? null
  if (base == null) return null
  return base + (destinationSlugs.includes('ghana') ? TRAVEL_AUDIT_FLOW.ghanaSurcharge : 0)
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

// Independent Tour Guide — a generic landing page (/independent-tour-guide)
// plus one detail page per country that actually has the service
// (/independent-tour-guide/ghana|benin|tanzania — the same three countries
// EXPLORE_SERVICES_WITH_GUIDES already covers above). The landing page is
// only for a visitor arriving with no country context yet — every card on
// it (and every "Independent Tour Guide" link on Ghana.jsx/Benin.jsx/
// DestinationPage.jsx's own service grids) skips straight to that
// country's own detail page instead, mirroring how Travel Planner treats a
// locked vs. unlocked arrival.
export const TOUR_GUIDE_LANDING_PAGE = {
  hero: {
    badge: 'Independent Tour Guides',
    titleLine1: 'Find a Local',
    titleAccent: 'Guide',
    tagline: ['More than a trip. A deeper connection.'],
    description:
      'Independent local guides. Authentic experiences. Real insights from people who know their country best.',
    backgroundImage: '/Pictures/countries/Tanzania.jpg',
    backgroundImageAlt: 'Safari vehicle watching wildlife on the Tanzanian savanna',
  },
  trust: [
    {
      icon: 'Users',
      title: 'Experienced Local Guides',
      text: 'Knowledgeable, professional, and passionate about their communities.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Travel with Confidence',
      text: 'Guides are carefully vetted for experience, reliability, and communication.',
    },
    {
      icon: 'Compass',
      title: 'Support Local Communities',
      text: 'Travel that creates positive impact.',
    },
  ],
  intro: {
    heading: 'Choose Your Destination',
    description:
      'Select a destination below to learn more about our local guide service and its current availability.',
  },
  destinationBadge: 'Guide network in development',
  destinations: [
    {
      slug: 'ghana',
      description: 'Explore vibrant cities, rich history, and warm hospitality with a local guide.',
    },
    {
      slug: 'benin',
      description: 'Discover history, culture, and unique traditions with a local guide.',
    },
    {
      slug: 'tanzania',
      label: 'Tanzania / Zanzibar',
      description: 'From wildlife adventures to island escapes, explore with a local guide.',
    },
  ],
  comingSoon: {
    heading: 'Our Guide Network is Coming Soon',
    body: 'We are currently developing our network of independent local guides in selected destinations. Check back soon or contact us if you would like to be notified when this service becomes available.',
    contactHeading: 'Be the First to Know',
    contactBody: "Contact us by WhatsApp or email and we'll keep you updated.",
  },
}

// Per-country Independent Tour Guide detail pages, keyed by the same
// COUNTRIES slug used everywhere else (ghana/benin/tanzania). Tanzania's
// own copy talks about "Zanzibar" specifically (matching how the guide
// service is already scoped on /explore — "local guide services available
// in Zanzibar" — and COUNTRIES' own `displayName: 'Tanzania (Zanzibar)'")
// even though its route/slug stays "tanzania" for consistency with every
// other Tanzania link on the site.
export const TOUR_GUIDE_PAGES = {
  ghana: {
    countryLabel: 'Ghana',
    hero: {
      badge: 'Independent Tour Guides',
      titleLine1: 'Find a Local Guide',
      titleAccent: 'in Ghana',
      tagline: ['Local People. Deeper Experiences.'],
      description:
        'Rich history, vibrant communities, and beautiful places — explore Ghana with a trusted independent local guide.',
      backgroundImage: '/Pictures/countries/Ghana.jpg',
      backgroundImageAlt: 'Cape Coast Castle on the Ghanaian coast at sunset',
    },
    stats: [
      { icon: 'Landmark', title: 'Rich History', text: 'Living Culture' },
      { icon: 'Leaf', title: 'Vibrant Communities', text: 'Real Connections' },
      { icon: 'Palmtree', title: 'Beautiful Places', text: 'Meaningful Travel' },
      { icon: 'Users', title: 'Local Guides', text: 'A Deeper Ghana' },
    ],
    intro: {
      eyebrow: 'Independent Guide Network in Development',
      heading:
        'We are currently building and vetting our network of independent local guides in Ghana.',
      body: "Our goal is to connect travelers with experienced local guides who offer strong local knowledge, reliable communication, professionalism, and a deeper understanding of Ghana's history, culture, communities, and everyday life.",
      image: '/Pictures/about/mission-nkrumah-statue.webp',
      imageAlt: 'Kwame Nkrumah Memorial Park monument in Accra, Ghana',
    },
    offer: {
      heading: 'What the Service Will Offer',
      intro:
        'When available, our Guide Match service will help connect travelers with independent local guides based on their interests and the type of experience you are looking for.',
      lead: 'The service may include:',
      items: [
        { icon: 'Users', text: 'Local guide matching based on your interests' },
        { icon: 'Landmark', text: 'Accra and city experiences' },
        {
          icon: 'Landmark',
          text: 'Historical and cultural experiences (Cape Coast, Elmina and beyond)',
        },
        { icon: 'Leaf', text: 'Nature, national parks and rural communities' },
        { icon: 'Store', text: 'Markets, food and local neighborhoods' },
        { icon: 'Waves', text: 'Coastal and beach experiences' },
        { icon: 'Handshake', text: 'Community-based and responsible travel' },
        { icon: 'ClipboardCheck', text: 'Guide profiles to review before deciding whether to proceed' },
      ],
    },
    vetting: {
      heading: 'Our Vetting Approach',
      intro: 'Guides considered for the East-West Africa Link network are reviewed for:',
      items: [
        'Relevant guiding experience',
        'Local knowledge',
        'Communication skills',
        'Professionalism and reliability',
        'References',
        'Understanding of independent travelers and their needs',
        'English language ability (and other languages where applicable)',
        'Compliance with applicable government requirements, including licenses, permits, registrations, or other credentials where required',
      ],
    },
    howItWorks: {
      heading: 'How Guide Match Will Work',
      paragraphs: [
        'When the service becomes available, you will tell us what you would like to experience in Ghana and the type of guide you are looking for.',
        'We will then identify suitable independent guides from our network and provide you with matching options.',
      ],
      feeNoteLead: 'The East-West Africa Link Guide Match fee is',
      feeNoteRest: "separate from the guide's own guiding fee. The guide's fee will be agreed separately.",
      image: '/Pictures/explore/ghana-card-background.webp',
      imageAlt: "Cape Coast Castle's courtyard in Ghana",
    },
    comingSoon: {
      title: 'Our Ghana Guide Match service is currently in development.',
      body: 'Guide profiles and the full request process will be added as our vetted guide network becomes available.',
      cta: 'Contact Us for Updates',
      subtext: 'Be the first to know when our Ghana Guide Match service is available.',
    },
  },
  benin: {
    countryLabel: 'Benin',
    hero: {
      badge: 'Independent Tour Guides',
      titleLine1: 'Find a Local Guide',
      titleAccent: 'in Benin',
      tagline: ['Local People. Deeper Experiences.'],
      description:
        'Rich history, unique communities, and beautiful places — explore Benin with a trusted independent local guide.',
      backgroundImage: '/Pictures/countries/Benin.jpg',
      backgroundImageAlt: 'A traditional pirogue boat on the water beside a coastal fort in Benin',
    },
    stats: [
      { icon: 'Landmark', title: 'Rich History', text: 'Vibrant Culture' },
      { icon: 'Leaf', title: 'Unique', text: 'Communities' },
      { icon: 'Palmtree', title: 'Beautiful Places', text: 'Coastal & Nature' },
      { icon: 'Users', title: 'Local Guides', text: 'A Deeper Benin' },
    ],
    intro: {
      eyebrow: 'Independent Guide Network in Development',
      heading:
        'We are currently building and vetting our network of independent local guides in Benin.',
      body: "Our goal is to connect travelers with experienced local guides who offer strong local knowledge, reliable communication, professionalism, and a deeper understanding of Benin's history, culture, communities, and everyday life.",
      image: '/Pictures/countries/Benin.jpg',
      imageAlt: 'A traditional pirogue boat on the water beside a coastal fort in Benin',
    },
    offer: {
      heading: 'What the Service Will Offer',
      intro:
        'When available, our Guide Match service will help connect travelers with independent local guides based on their interests and the type of experience you are looking for.',
      lead: 'The service may include:',
      items: [
        { icon: 'Users', text: 'Local guide matching based on your interests' },
        { icon: 'Landmark', text: 'Historic sites and cultural experiences' },
        { icon: 'Leaf', text: 'Nature and outdoor experiences' },
        { icon: 'Store', text: 'Local markets and artisan communities' },
        { icon: 'Waves', text: 'Coastal and village experiences' },
        { icon: 'Binoculars', text: 'Local insight beyond the major tourist sites' },
        { icon: 'ClipboardCheck', text: 'Guide profiles to review before deciding whether to proceed' },
      ],
    },
    vetting: {
      heading: 'Our Vetting Approach',
      intro: 'Guides considered for the East-West Africa Link network are reviewed for:',
      items: [
        'Relevant guiding experience',
        'Local knowledge',
        'Communication skills',
        'Professionalism and reliability',
        'References',
        'Understanding of independent travelers and their needs',
        'English and/or French communication ability, depending on the guide and service',
        'Compliance with applicable government requirements, including licenses, permits, registrations, or other credentials where required',
      ],
    },
    howItWorks: {
      heading: 'How Guide Match Will Work',
      paragraphs: [
        'When the service becomes available, you will tell us what you would like to experience in Benin and the type of guide you are looking for.',
        'We will then identify suitable independent guides from our network and provide you with matching options.',
      ],
      feeNoteLead: 'The East-West Africa Link Guide Match fee is',
      feeNoteRest: "separate from the guide's own guiding fee. The guide's fee will be agreed separately.",
      image: '/Pictures/countries/Benin.jpg',
      imageAlt: 'A traditional pirogue boat on the water beside a coastal fort in Benin',
    },
    comingSoon: {
      title: 'Our Benin Guide Match service is currently in development.',
      body: 'Guide profiles and the full request process will be added as our vetted guide network becomes available.',
      cta: 'Contact Us for Updates',
      subtext: 'Be the first to know when our Benin Guide Match service is available.',
    },
  },
  tanzania: {
    countryLabel: 'Zanzibar',
    hero: {
      badge: 'Independent Tour Guides',
      titleLine1: 'Find a Local Guide',
      titleAccent: 'in Zanzibar',
      tagline: ['Local People. Deeper Experiences.'],
      description:
        'Rich history, vibrant communities, and beautiful places — explore Zanzibar with a trusted independent local guide.',
      backgroundImage: '/Pictures/countries/Tanzania.jpg',
      backgroundImageAlt: 'Safari vehicle watching wildlife on the Tanzanian savanna',
    },
    stats: [
      { icon: 'Landmark', title: 'Rich History', text: 'Living Culture' },
      { icon: 'Leaf', title: 'Vibrant Communities', text: 'Real Connections' },
      { icon: 'Palmtree', title: 'Beautiful Places', text: 'Meaningful Travel' },
      { icon: 'Users', title: 'Local Guides', text: 'A Deeper Zanzibar' },
    ],
    intro: {
      eyebrow: 'Independent Guide Network in Development',
      heading:
        'We are currently building and vetting our network of independent local guides in Zanzibar.',
      body: "Our goal is to connect travelers with experienced local guides who offer strong local knowledge, reliable communication, professionalism, and a deeper understanding of Zanzibar's history, culture, communities, and everyday life.",
      image: '/Pictures/countries/Tanzania.jpg',
      imageAlt: 'Safari vehicle watching wildlife on the Tanzanian savanna',
    },
    offer: {
      heading: 'What the Service Will Offer',
      intro:
        'When available, our Guide Match service will help connect travelers with independent local guides based on their interests and the type of experience you are looking for.',
      lead: 'The service may include:',
      items: [
        { icon: 'Users', text: 'Local guide matching based on your interests' },
        { icon: 'Landmark', text: 'Stone Town and historical experiences' },
        { icon: 'Handshake', text: 'Cultural and community-based experiences' },
        { icon: 'Store', text: 'Local markets and neighborhoods' },
        { icon: 'Waves', text: 'Coastal and village experiences' },
        { icon: 'Binoculars', text: 'Local insight beyond the major tourist sites' },
        { icon: 'ClipboardCheck', text: 'Guide profiles to review before deciding whether to proceed' },
      ],
    },
    vetting: {
      heading: 'Our Vetting Approach',
      intro: 'Guides considered for the East-West Africa Link network are reviewed for:',
      items: [
        'Relevant guiding experience',
        'Local knowledge',
        'Communication skills',
        'Professionalism and reliability',
        'References',
        'Understanding of independent travelers and their needs',
        'English and/or French communication ability, depending on the guide and service',
        'Compliance with applicable government requirements, including licenses, permits, registrations, or other credentials where required',
      ],
    },
    howItWorks: {
      heading: 'How Guide Match Will Work',
      paragraphs: [
        'When the service becomes available, you will tell us what you would like to experience in Zanzibar and the type of guide you are looking for.',
        'We will then identify suitable independent guides from our network and provide you with matching options.',
      ],
      feeNoteLead: 'The East-West Africa Link Guide Match fee is',
      feeNoteRest: "separate from the guide's own guiding fee. The guide's fee will be agreed separately.",
      image: '/Pictures/countries/Tanzania.jpg',
      imageAlt: 'Safari vehicle watching wildlife on the Tanzanian savanna',
    },
    comingSoon: {
      title: 'Our Zanzibar Guide Match service is currently in development.',
      body: 'Guide profiles and the full request process will be added as our vetted guide network becomes available.',
      cta: 'Contact Us for Updates',
      subtext: 'Be the first to know when our Zanzibar Guide Match service is available.',
    },
  },
}
