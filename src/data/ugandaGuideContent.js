export const UGANDA_DATA = {
  // --- Uganda Practical Guide Page ---
  hero: {
    heading: 'Uganda',
    tagline: 'A Practical Guide for First-Time Travelers',
    intro:
      'Welcome to Uganda — the Pearl of Africa. Uganda is a country of dramatic landscapes, warm people, rich culture, and remarkable wildlife.',
    backgroundImage: '/Pictures/countries/Uganda.jpg',
    backgroundImageAlt: 'Misty highlands and a volcano at sunrise in southwestern Uganda',
  },

  seasons: {
    heading: 'When to Visit',
    note: 'Weather patterns vary by region, altitude, and year.',
    items: [
      {
        icon: 'Sun',
        label: 'June – August',
        tag: 'Dry Season',
        description:
          'One of the most popular times to visit. Lower rainfall and good conditions for wildlife viewing and outdoor activities.',
      },
      {
        icon: 'Sun',
        label: 'December – February',
        tag: 'Warm & Relatively Dry',
        description:
          'Another popular period for traveling in Uganda. Days are generally warm and conditions are good for safaris, sightseeing and exploring the country.',
      },
      {
        icon: 'CloudRain',
        label: 'March – May',
        tag: 'Rainy Season',
        description:
          'Rainfall increases, particularly during April and May. The countryside becomes especially green, although some roads and activities can be affected.',
      },
      {
        icon: 'CloudRain',
        label: 'September – November',
        tag: 'Short Rains',
        description:
          'Rainfall increases again in many areas, but traveling remains possible. This can be a quieter time for visitors who prefer fewer crowds.',
      },
    ],
  },

  prepare: {
    cards: [
      {
        id: 'before-you-go',
        icon: 'FileText',
        title: 'Before You Go',
        paragraphs: [
          'Your passport should have at least six months’ validity from your date of entry into Uganda.',
          'Keep digital and printed copies of important documents.',
          'It’s a good idea to check the latest entry requirements before you go.',
        ],
      },
      {
        id: 'visa-entry',
        icon: 'FileText',
        title: 'Visa & Entry',
        paragraphs: [
          'Visa requirements depend on your nationality. Most travelers must apply online before traveling through Uganda’s official immigration portal.',
          'Uganda’s standard tourist visa is a single-entry visa valid for up to three months. Some nationalities are visa-exempt.',
          'Travelers visiting Uganda, Rwanda and Kenya may explore the East Africa Tourist Visa and should confirm eligibility and entry conditions.',
        ],
        cta: { label: 'Get Personal Visa Guidance', to: '/personal-visa-guidance/uganda' },
      },
      {
        id: 'health-vaccinations',
        icon: 'Syringe',
        title: 'Health & Vaccinations',
        paragraphs: [
          'Proof of yellow-fever vaccination may be required depending on the type of visa and your circumstances.',
          'Take precautions against malaria, including using insect repellent, sleeping under mosquito nets and, where appropriate, taking antimalarial medication.',
          'Consider travel insurance that includes coverage for medical treatment and evacuation.',
          'Check current official health and entry requirements before you travel.',
        ],
      },
      {
        id: 'staying-safe',
        icon: 'ShieldCheck',
        title: 'Staying Safe',
        paragraphs: [
          'Uganda offers extraordinary travel experiences, but visitors should remain vigilant throughout their journey.',
          'Keep valuables discreet, use trusted transportation, avoid demonstrations and large political gatherings, and exercise additional caution after dark and near sensitive border areas.',
          'Security conditions can change, so review the latest official travel advice from your own government before departure.',
        ],
      },
    ],
  },

  topPlaces: {
    heading: 'Where to Go',
    places: [
      {
        id: 'kampala',
        name: 'Kampala',
        description: "Uganda's capital and largest city. A busy, energetic hub and main gateway to the country.",
        image: '/Pictures/countries/Uganda.jpg',
      },
      {
        id: 'bwindi-impenetrable-forest',
        name: 'Bwindi Impenetrable Forest',
        description:
          'Home to mountain gorillas. Gorilla trekking is one of Uganda’s signature wildlife experiences.',
        image: '/Pictures/Uganda/Gallery/highland_road.jpg',
      },
      {
        id: 'queen-elizabeth-national-park',
        name: 'Queen Elizabeth National Park',
        description:
          'Known for diverse wildlife, beautiful landscapes and rewarding safari experiences.',
        image: '/Pictures/Uganda/Gallery/lake_victoria_cormorants.jpg',
      },
      {
        id: 'murchison-falls-national-park',
        name: 'Murchison Falls National Park',
        description: 'A dramatic park centered around the Nile and the powerful Murchison Falls.',
        image: '/Pictures/Uganda/Gallery/murchison_falls_wide.jpg',
      },
      {
        id: 'kibale-national-park',
        name: 'Kibale National Park',
        description: 'Renowned for chimpanzee tracking and rich primate diversity.',
        image: '/Pictures/Uganda/Gallery/nile_cliffs.jpg',
      },
      {
        id: 'jinja-and-the-nile',
        name: 'Jinja & the Nile',
        description: 'Popular for river activities, outdoor adventure and a relaxed atmosphere.',
        image: '/Pictures/Uganda/Gallery/murchison_boat_safari.jpg',
      },
      {
        id: 'lake-bunyonyi',
        name: 'Lake Bunyonyi',
        description: 'A scenic highland lake surrounded by steep hills and islands. A perfect place to slow down.',
        image: '/Pictures/Uganda/Gallery/heron_sunset.jpg',
      },
    ],
  },

  currency: {
    icon: 'Coins',
    title: 'Currency',
    paragraphs: [
      'The local currency is the Ugandan shilling (UGX).',
      'Cash is important for local transport, markets and smaller businesses. Mobile Money is widely used; cash remains useful for smaller everyday transactions.',
    ],
  },

  sim: {
    icon: 'Smartphone',
    title: 'SIM Cards & Data',
    paragraphs: [
      'Local SIM cards and mobile data are widely available.',
      'Bring your passport when purchasing and registering a SIM.',
    ],
  },

  gettingAround: {
    icon: 'Bus',
    title: 'Getting Around',
    intro: 'Traveling within Uganda can involve a mix of:',
    modes: [
      { icon: 'Bus', label: 'Long-distance buses' },
      { icon: 'Bus', label: 'Shared minibuses' },
      { icon: 'Bike', label: 'Taxis' },
      { icon: 'Bike', label: 'Boda bodas (motorbikes)' },
      { icon: 'Car', label: 'Private vehicles' },
      { icon: 'Plane', label: 'Domestic flights' },
    ],
    note:
      'Road conditions and travel times vary considerably. Use a trusted operator, wear a proper helmet, and avoid unnecessary high-speed or nighttime journeys.',
  },

  travelingOverland: {
    icon: 'Signpost',
    title: 'Traveling Overland?',
    intro: 'Uganda connects with several countries in East and Central Africa.',
    label: 'Popular overland connections include:',
    neighbours: [
      { flag: '🇰🇪', name: 'Kenya' },
      { flag: '🇷🇼', name: 'Rwanda' },
      { flag: '🇹🇿', name: 'Tanzania' },
      { flag: '🇸🇸', name: 'South Sudan' },
    ],
    note:
      'Routes, transportation connections and border procedures vary depending on your journey. Routes toward South Sudan require careful checking of current border and security conditions.',
    image: '/Pictures/Uganda/Gallery/highland_road.jpg',
    imageAlt: "A road winding through Uganda's tea-covered western highlands",
    ctas: [
      { label: 'Plan My Route', to: '/travel-planner?destination=uganda' },
      { label: 'Get a Border Crossing Guide', to: '/travel-planner/border-crossing-guide?from=uganda' },
    ],
  },

  firstTimeTips: {
    heading: 'First-Time Traveler Tips',
    items: [
      {
        icon: 'Clock',
        title: 'Give yourself enough time',
        text: 'Distances can be longer and travel slower than expected.',
      },
      {
        icon: 'Wallet',
        title: 'Carry some cash',
        text: 'Cards are useful, but cash remains important for many everyday transactions.',
      },
      {
        icon: 'Backpack',
        title: 'Keep your itinerary flexible',
        text: 'Road conditions, traffic and transport schedules can change.',
      },
      {
        icon: 'Users',
        title: 'Respect local customs',
        text: 'Ugandans are generally friendly and welcoming. A little courtesy goes a long way.',
      },
      {
        icon: 'Leaf',
        title: 'Protect the environment',
        text: "Uganda's wildlife and natural landscapes are among its greatest treasures.",
      },
      {
        icon: 'Camera',
        title: 'Travel with an open mind',
        text: 'Some of the most memorable experiences may happen away from the best-known spots.',
      },
    ],
  },

  closing: {
    icon: 'Users',
    heading: 'Not Sure Where to Start?',
    text: 'Tell us where you are traveling, when you plan to go and what you need help with.',
    cta: { label: 'Get Personalized Guidance', to: '/travel-planner?destination=uganda' },
    helpWithLabel: 'East-West Africa Link can help with:',
    helpWith: [
      { icon: 'FileText', label: 'Personal Visa Guidance' },
      { icon: 'RouteIcon', label: 'Overland Travel Route Planning' },
      { icon: 'MapPin', label: 'Border Crossing Guide' },
    ],
    backgroundImage: '/Pictures/Uganda/Gallery/heron_sunset.jpg',
  },

  farewell: {
    heading: "You're welcome in Uganda.",
    text: 'Come prepared, travel with an open mind, and experience the Pearl of Africa beyond the familiar.',
  },
}
