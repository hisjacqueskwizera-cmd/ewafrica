export const TANZANIA_DATA = {
  // --- Tanzania Practical Guide Page ---
  seasons: {
    heading: 'When to Visit',
    subheading:
      "Tanzania can be visited year-round, but each season offers a different experience across the country's parks, coast and islands.",
    items: [
      {
        icon: 'Sun',
        label: 'June – October',
        tag: 'Dry Season',
        description:
          'One of the most popular times to visit Tanzania. The weather is generally dry, wildlife is easier to see and conditions are often excellent for travel.',
      },
      {
        icon: 'CloudRain',
        label: 'November – December',
        tag: 'Short Rains',
        description:
          'Rainfall increases in many areas, but travel remains easy. Landscapes are green and there are fewer crowds.',
      },
      {
        icon: 'Sun',
        label: 'January – February',
        tag: 'Warm & Dry',
        description:
          'A good period for northern Tanzania, wildlife travel and Zanzibar. Weather is pleasant with warm days and many events.',
      },
      {
        icon: 'CloudRain',
        label: 'March – May',
        tag: 'Long Rains',
        description:
          "This is Tanzania's main rainy season. Some roads and remote areas can be more difficult to reach, landscapes are lush and beautiful.",
      },
    ],
  },

  topPlaces: {
    heading: 'Where to Go',
    subheading:
      'From the wildlife-filled plains of the Serengeti to the historic streets of Zanzibar, choose a route that matches your interests and time.',
    places: [
      {
        id: 'arusha',
        name: 'Arusha',
        description: 'Gateway to northern Tanzania and safari adventures.',
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_4452.JPG',
        tag: 'Safari Gateway',
        details: {
          highlight:
            'The starting point for most northern-circuit safaris, Arusha sits at the foot of Mount Meru and within easy reach of the Serengeti, Ngorongoro and Tarangire.',
          bestSeason:
            'Year-round base for safaris; June to October and January to February give the driest, easiest travel conditions.',
          activities: [
            'Arranging and launching northern-circuit safaris',
            'Arusha National Park day trips (Mount Meru, giraffes, flamingos)',
            'Cultural tourism visits to nearby Maasai communities',
            'Coffee lodge stays on the slopes above town',
          ],
          practicalTip:
            'Most travelers pass through Arusha rather than linger — pair it with a night before or after your safari rather than a standalone stop.',
        },
      },
      {
        id: 'serengeti-ngorongoro',
        name: 'Serengeti & Ngorongoro',
        description: 'Iconic wildlife areas and incredible natural landscapes.',
        image: '/Pictures/Tanzania/Tz_Gallery/optimized/IMG_3460_web.jpg',
        tag: 'Wildlife & Safari',
        details: {
          highlight:
            'The Serengeti’s endless plains and the Ngorongoro Crater’s dense wildlife make this Tanzania’s signature safari pairing, home to the Great Migration and the Big Five.',
          bestSeason:
            'June to October for the dry-season migration river crossings; December to March for calving season on the southern plains.',
          activities: [
            'Game drives across the Serengeti’s endless plains',
            'Descending into the Ngorongoro Crater for dense wildlife viewing',
            'Hot-air balloon safaris over the Serengeti at dawn',
            'Following the Great Migration, season depending',
          ],
          practicalTip:
            'Book migration-season safaris well in advance — accommodation near the migration route fills up months ahead.',
        },
      },
      {
        id: 'mount-kilimanjaro',
        name: 'Mount Kilimanjaro',
        description: "Africa's highest peak and a bucket-list experience.",
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_4453.JPG',
        tag: 'Highest Peak',
        details: {
          highlight:
            'Africa’s tallest mountain and the world’s highest free-standing peak, Kilimanjaro can be climbed without technical experience via several established routes.',
          bestSeason:
            'June to October and December to February offer the clearest, driest summit conditions.',
          activities: [
            'Multi-day treks via Machame, Marangu or Lemosho routes',
            'Acclimatization day hikes on the lower slopes',
            'Kilimanjaro National Park forest and moorland zones',
            'Sunrise summit push to Uhuru Peak',
          ],
          practicalTip:
            'Choose a longer route (7+ days) over a shorter one — the extra acclimatization days significantly improve summit success and comfort.',
        },
      },
      {
        id: 'zanzibar',
        name: 'Zanzibar',
        description: 'Beautiful beaches, Stone Town and a unique island culture.',
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3635.JPG',
        tag: 'Island & Culture',
        details: {
          highlight:
            'A short flight or ferry from the mainland, Zanzibar blends UNESCO-listed Stone Town, spice plantations and some of East Africa’s best beaches.',
          bestSeason:
            'June to October and December to February for the driest, sunniest beach weather.',
          activities: [
            'Stone Town walking tours and spice farm visits',
            'Beach time on the north and east coasts',
            'Snorkeling and diving among coral reefs',
            'Dhow sunset cruises off the coast',
          ],
          practicalTip:
            'See our dedicated Zanzibar guide below for full culture, etiquette, transport and food details before you go.',
        },
      },
      {
        id: 'dar-es-salaam',
        name: 'Dar es Salaam',
        description: "Tanzania's largest city and a major transport hub.",
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3462.JPG',
        tag: 'Major City',
        details: {
          highlight:
            'Tanzania’s largest city and commercial capital, Dar es Salaam is a practical stopover and transport hub rather than a headline destination — with a lively waterfront and growing food scene.',
          bestSeason:
            'Year-round; June to October avoids the heaviest coastal humidity and rain.',
          activities: [
            'Kariakoo Market for everyday city life',
            'Ferry connections to Zanzibar from the harbor',
            'National Museum and House of Culture',
            'Waterfront dining along the Msasani Peninsula',
          ],
          practicalTip:
            'Most travelers use Dar as a transit point to Zanzibar or the parks rather than a multi-day stop — plan accordingly.',
        },
      },
      {
        id: 'mafia',
        name: 'Mafia',
        description: 'A quieter island with outstanding marine life.',
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3465.JPG',
        tag: 'Marine Reserve',
        details: {
          highlight:
            'Far quieter than Zanzibar, Mafia Island and its marine park are known for whale shark encounters, pristine reefs and a genuinely laid-back pace of life.',
          bestSeason:
            'October to February is the best window for whale shark sightings off Mafia’s coast.',
          activities: [
            'Swimming with whale sharks, season depending',
            'Diving and snorkeling in Mafia Island Marine Park',
            'Traditional dhow trips between fishing villages',
            'Quiet, undeveloped beaches away from crowds',
          ],
          practicalTip:
            'Flights are limited — book Mafia transport well ahead, and plan a few unhurried days rather than a quick stop.',
        },
      },
    ],
  },

  planJourney: {
    heading: 'Before You Travel',
    subheading: 'Practical information to help you prepare for Tanzania with confidence.',
    cards: [
      {
        id: 'before-you-go',
        icon: 'FileText',
        title: 'Before You Go',
        description:
          'Entry requirements depend on your nationality and travel plans. Some travelers may need a visa before arrival.',
        buttonText: 'Get Personal Visa Guidance',
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3462.JPG',
        imageAlt: 'Stone Town waterfront, Zanzibar, Tanzania',
        details: {
          overview:
            'Entry requirements depend on your nationality and travel plans. Some travelers may need to obtain a visa before arrival, while others can visa on arrival — it is important to check the entry requirements and any additional documents.',
          points: [
            {
              label: 'Visa Requirements',
              text: 'Requirements vary by nationality; many travelers can obtain a visa on arrival, but checking ahead avoids delays at entry points.',
            },
            {
              label: 'Documentation',
              text: 'Keep your passport, visa, onward travel details and accommodation information easily accessible on arrival.',
            },
          ],
        },
        cta: { label: 'Get Personal Visa Guidance', to: '/personal-visa-guidance/tanzania' },
      },
      {
        id: 'health-documents',
        icon: 'ShieldCheck',
        title: 'Health & Travel Documents',
        description:
          'Health safety is important when traveling in Tanzania. Vaccinations such as yellow fever may be required, and malaria is present in many areas.',
        buttonText: 'See Tips',
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_4452.JPG',
        imageAlt: 'A Maasai traveler watching zebras on the savannah',
        details: {
          overview:
            'Vaccinations such as yellow fever may be required, and malaria is present in many areas. Travel insurance, a basic first-aid kit and copies of important documents are also recommended.',
          points: [
            {
              label: 'Yellow Fever & Malaria',
              text: 'A yellow fever certificate may be required depending on your routing; malaria prophylaxis is worth discussing with a doctor before travel.',
            },
            {
              label: 'Travel Insurance & First Aid',
              text: 'Travel insurance, a basic first-aid kit and digital copies of your important documents are recommended for the whole trip.',
            },
          ],
        },
      },
      {
        id: 'money-payments',
        icon: 'Coins',
        title: 'Money & Payments',
        description:
          'The Tanzanian shilling (TZS) is the local currency. ATMs are available in cities and towns, and credit cards are accepted in many hotels and larger businesses.',
        buttonText: 'Read More',
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_4233.JPG',
        imageAlt: 'Stone Town waterfront with dhows moored offshore',
        details: {
          overview:
            'The Tanzanian shilling (TZS) is the local currency for everyday purchases, while cards and ATMs cover most cities, towns and larger hotels.',
          points: [
            {
              label: 'Local Currency (TZS)',
              text: 'Carry Tanzanian shillings in smaller denominations for markets, tips and rural areas.',
            },
            {
              label: 'Cards & ATMs',
              text: 'ATMs are available in cities and towns; credit cards are accepted in many hotels and larger businesses, less so in rural areas.',
            },
          ],
        },
      },
      {
        id: 'sim-data',
        icon: 'Globe2',
        title: 'SIM Cards & Data',
        description:
          'Local SIM cards are widely available from Vodacom, Tigo and Airtel. Data is affordable and useful for navigation and communication.',
        buttonText: 'Read More',
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_4453.JPG',
        imageAlt: 'A Maasai community procession in traditional dress',
        details: {
          overview:
            'Local SIM cards are widely available from Vodacom, Tigo and Airtel — data is affordable and useful for navigation and staying in touch.',
          points: [
            {
              label: 'Local SIM Cards',
              text: 'Vodacom, Tigo and Airtel all sell prepaid SIMs at airports and shops; a passport is typically needed for registration.',
            },
            {
              label: 'Coverage',
              text: 'Coverage is strong in cities and towns but can be limited in remote parks and on some islands.',
            },
          ],
        },
      },
      {
        id: 'getting-around',
        icon: 'Bus',
        title: 'Getting Around Tanzania',
        description:
          'Travel options include domestic flights, buses, private drivers, taxis and rideshare, connecting cities, parks and the islands.',
        buttonText: 'Travel Planner',
        image: '/Pictures/Tanzania/Tz_Gallery/optimized/IMG_5073_web.jpg',
        imageAlt: "A tented camp along Lake Victoria's shore near Mwanza",
        details: {
          overview:
            'Domestic flights, buses, private drivers, taxis and rideshare services connect Tanzania’s cities, parks and islands.',
          points: [
            {
              label: 'Domestic Flights',
              text: 'The fastest way to reach the parks and Zanzibar from Dar es Salaam or Arusha, especially over long distances.',
            },
            {
              label: 'Buses, Drivers & Rideshare',
              text: 'Intercity buses and private drivers cover overland routes; taxis and rideshare apps work well within cities.',
            },
          ],
        },
        cta: { label: 'Plan My Route', to: '/travel-planner?destination=tanzania' },
      },
    ],
  },

  travelSmarter: {
    heading: 'Travel Smarter',
    subheading: 'Practical advice for combining Tanzania with a wider East Africa journey.',
    cards: [
      {
        id: 'traveling-overland',
        icon: 'RouteIcon',
        title: 'Traveling Overland?',
        description:
          'Tanzania connects well with several neighboring countries, making it easy to combine destinations.',
        cta: { label: 'Plan My Route', to: '/travel-planner?destination=tanzania' },
        image: '/Pictures/Tanzania/Tz_Gallery/optimized/IMG_5156_web.jpg',
        imageAlt: 'Maasai homesteads overlooking the Ngorongoro Crater',
        details: {
          overview:
            'Tanzania connects overland with several neighboring countries, making it easy to combine destinations on a wider East and Southern Africa journey.',
          points: [
            {
              label: 'Popular Overland Routes',
              text: 'Popular routes include Kenya, Uganda, Rwanda, Zambia and Malawi.',
            },
            {
              label: 'Border Crossings',
              text: 'For more information on routes, border crossings and practical tips, check our Border Crossing Guide.',
            },
          ],
        },
      },
      {
        id: 'first-time-tips',
        icon: 'Lightbulb',
        title: 'First-Time Traveler Tips',
        description:
          'Practical, easy-to-follow tips to help first-time visitors travel with confidence across Tanzania.',
        image: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3496.JPG',
        imageAlt: 'A traditional dhow sailing off the coast of Zanzibar',
        details: {
          overview:
            'A few simple habits make a first visit to Tanzania noticeably smoother, from packing to pacing your itinerary.',
          points: [
            {
              label: 'Pack & Prepare',
              text: 'Be prepared for different climates and pack layers; keep a copy of your passport and important documents saved digitally as well.',
            },
            {
              label: 'Respect, Reliability & Openness',
              text: 'Respect local customs and dress modestly, travel with reliable operators and guides, stay aware of your surroundings, and be open to new experiences.',
            },
          ],
        },
      },
    ],
  },

  zanzibarCta: {
    heading: 'Zanzibar',
    subheading: 'Culture, Island Etiquette & Practical Tips',
    tagline: 'Stone Town, Spices & Island Life',
    description:
      'Continue to our Zanzibar guide for detailed information on culture and etiquette, getting around the island, tours and local guides, food and more practical advice.',
    cta: { label: 'Continue to Zanzibar', to: '/tanzania/zanzibar-guide' },
    watermark: 'More Than a Beach, a Way of Life',
    backgroundImage: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3635.JPG',
  },
}
