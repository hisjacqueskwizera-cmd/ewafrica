export const ZAMBIA_DATA = {
  // --- Zambia Landing Page (Image 3) ---
  hero: {
    eyebrow: 'ZAMBIA',
    title: 'A Land of Natural Beauty and Opportunity',
    description:
      'From the mighty Zambezi and world-famous Victoria Falls to welcoming communities, Zambia offers unforgettable experiences for travelers, prospective residents, and entrepreneurs.',
    cta: 'Explore Zambia',
    watermarkQuote: ['Explore new places.', 'Discover new possibilities.'],
    locationBadge: 'Victoria Falls, Zambia',
    image: '/Pictures/Hero_Zambia.jpeg',
  },

  travelInZambia: {
    heading: 'Travel in Zambia',
    eyebrow: 'A REWARDING DESTINATION FOR NATURE, WILDLIFE, AND INDEPENDENT OVERLAND TRAVEL',
    paragraphs: [
      'Zambia is home to the spectacular Victoria Falls, one of the world’s great natural wonders, and vast wilderness areas such as South Luangwa and Lower Zambezi, renowned for exceptional wildlife and authentic safari experiences.',
      'Lusaka, the friendly capital, serves as a convenient gateway for exploring the country, while Zambia’s central location makes it an ideal base for overland travel to neighboring countries. Whether you’re seeking breathtaking landscapes, rich culture, or cross-border adventures, Zambia offers a truly rewarding travel experience.',
    ],
    cta: 'Why Visit Zambia',
    backgroundSilhouette: '/Pictures/Background/zambia_travel_section_bg.png',
    cards: [
      {
        id: 'victoria-falls',
        title: 'Victoria Falls',
        description:
          'Experience the awe-inspiring Victoria Falls, a UNESCO World Heritage Site and one of the world’s great wonders.',
        image: '/Pictures/zambia/victoria_falls.jpg',
        to: '/zambia/practical-guide#victoria-falls',
      },
      {
        id: 'wildlife-safaris',
        title: 'Wildlife & Safaris',
        description:
          'Explore world-class safari regions such as South Luangwa and Lower Zambezi, home to diverse wildlife and pristine wilderness.',
        image: '/Pictures/zambia/leopard.jpg',
        to: '/zambia/practical-guide#south-luangwa',
      },
      {
        id: 'overland-routes',
        title: 'Overland Routes',
        description:
          'Discover Zambia’s central location and excellent overland links to Tanzania, Malawi, Zimbabwe and beyond.',
        image: '/Pictures/zambia/overland_4x4.jpg',
        to: '/travel-planner?destination=zambia',
      },
    ],
  },

  servicesIntro: {
    heading: 'Explore Our Services',
    eyebrow: 'PRACTICAL GUIDANCE FOR YOUR ZAMBIA JOURNEY',
    description:
      'Choose the service that fits your needs. Each one provides clear, reliable information and personalized guidance informed by practical research, local sources, and first-hand experience in Zambia.',
  },

  services: [
    {
      icon: 'FileText',
      title: 'Personal Visa Guidance',
      description:
        'Get clear, up-to-date information on visa requirements, entry rules, and the application process for Zambia.',
      items: [
        'Visa and entry requirements',
        'Single or multiple-entry options',
        'Documentation required',
        'Entry points and arrival info',
        'Questions about your specific plans',
      ],
      image: '/Pictures/Visa_Entry.png',
      to: '/personal-visa-guidance/zambia',
    },
    {
      icon: 'Compass',
      title: 'Travel Planner',
      description:
        'Personalized overland travel planning to help you explore Zambia and combine it with nearby countries.',
      items: [
        'Recommended routes',
        'Transport connections',
        'Departure & arrival points',
        'Journey times',
        'Border connections',
        'Practical travel tips',
      ],
      image: '/Pictures/Travel planner.PNG',
      to: '/travel-planner?destination=zambia',
    },
    {
      icon: 'ShieldCheck',
      title: 'Border Crossing Guide',
      description:
        'Get practical guidance for crossing into and out of Zambia, including key border points, requirements, and what to expect.',
      items: [
        'Best border crossings',
        'How to reach the border',
        'Immigration procedures',
        'Transport on both sides',
        'Approx. travel times',
        'Practical tips',
      ],
      image: '/Pictures/Border_crossing.jpg',
      to: '/travel-planner/border-crossing-guide?from=zambia',
    },
  ],

  overlandRoutesIntro: {
    heading: 'POPULAR OVERLAND ROUTES',
    subtitle:
      'Travelling beyond Zambia? We can help you research routes between Zambia and neighbouring countries.',
  },

  routes: [
    {
      to: 'Tanzania',
      image: '/Pictures/countries/Tanzania.jpg',
      text: 'Via Tunduma/Nakonde, a busy crossing linking Zambia with southern Tanzania.',
    },
    {
      to: 'Malawi',
      image: '/Pictures/countries/Malawi.webp',
      text: 'Via Mchinji or Mwami border, a popular crossing for travellers and traders.',
    },
    {
      to: 'Zimbabwe',
      image: '/Pictures/countries/Zambia.jpg',
      text: 'Cross the Zambezi at Victoria Falls Bridge or Chirundu, linking the two countries.',
    },
    {
      to: 'Mozambique',
      image: '/Pictures/zambia/traveling_overland_falls.jpg',
      text: 'Via Cassacatiza or Zumbo, a quieter overland route into northern Mozambique.',
    },
  ],

  travelingOverland: {
    image: '/Pictures/zambia/traveling_overland_leopard.jpg',
    title: 'Traveling Overland?',
    description:
      'Zambia shares borders with several countries and is an important link between Southern and East Africa. Popular connections include:',
    neighbours: ['Tanzania', 'Malawi', 'Zimbabwe', 'Botswana', 'Namibia', 'Mozambique'],
    note: 'Routes, transport connections and border procedures vary depending on your journey.',
    researchText:
      '',
    planRouteTo: '/travel-planner?destination=zambia',
    borderGuideTo: '/travel-planner/border-crossing-guide?from=zambia',
    tourGuideUnavailable: '',
  },

  practicalGuideBanner: {
    title: 'Practical Guide',
    eyebrow: 'PRACTICAL INFORMATION FOR YOUR ZAMBIA JOURNEY',
    description:
      'Our separate Zambia Practical Guide brings together everything you need to know for a smooth and rewarding trip, longer stays, or business ventures in Zambia.',
    cta: 'Read the Zambia Practical Guide',
    to: '/zambia/practical-guide',
    backgroundSilhouette: '/Pictures/Background/zambia_practical_guide_bg.png',
  },

  // --- Zambia Practical Guide Page (Image 4) ---
  topPlaces: {
    heading: 'Top Places to Experience in Zambia',
    subheading:
      'From iconic natural wonders to incredible wildlife and serene lakes, Zambia offers unforgettable experiences for every kind of traveler.',
    places: [
      {
        id: 'victoria-falls',
        name: 'Victoria Falls',
        description:
          'One of the world’s great natural wonders, Victoria Falls is a top highlight for its breathtaking scenic views, thrilling adventure activities, and unforgettable photography.',
        image: '/Pictures/zambia/victoria_falls.jpg',
        tag: 'UNESCO World Heritage',
        details: {
          highlight:
            'Known locally as Mosi-oa-Tunya ("The Smoke That Thunders"), this UNESCO World Heritage Site spans 1,708 meters across and plunges over 100 meters into the Zambezi gorge.',
          bestSeason:
            'Peak spray from March to May; low water with Devil’s Pool access from September to December.',
          activities: [
            'Devil’s Pool Swim & Livingstone Island Tour',
            'Helicopter "Flight of Angels" over the falls',
            'Zambezi Sunset Cruises & Wildlife Watching',
            'Whitewater rafting in the Batoka Gorge',
            'Walking across the Knife-Edge Bridge in the mist',
          ],
          practicalTip:
            'Expect to get thoroughly drenched during high water seasons — waterproof gear and phone pouches are essential.',
        },
      },
      {
        id: 'south-luangwa',
        name: 'South Luangwa National Park',
        description:
          'Famous for walking safaris, abundant wildlife encounters, and an immersive safari atmosphere, South Luangwa offers some of Africa’s most authentic and rewarding wildlife experiences.',
        image: '/Pictures/zambia/leopard.jpg',
        tag: 'Premier Safari Haven',
        details: {
          highlight:
            'Widely celebrated as the birthplace of the walking safari and one of Africa’s premier wildlife sanctuaries, boasting exceptional leopard density and Luangwa river oxbow lagoons.',
          bestSeason:
            'Dry season (June to October) offers prime game viewing as animals congregate near the river; green season (November to April) is paradise for birding.',
          activities: [
            'Expert-led Walking Safaris on foot tracking big game',
            'Night Game Drives for leopards and nocturnal predators',
            'Thornicroft’s Giraffe and Cookson’s Wildebeest viewing',
            'Birdwatching with over 400 recorded migratory & resident species',
          ],
          practicalTip:
            'Night drives are permitted here, unlike many other African national parks, providing extraordinary opportunities to witness big cats on the prowl.',
        },
      },
      {
        id: 'lower-zambezi',
        name: 'Lower Zambezi National Park',
        description:
          'A beautiful river-based wilderness area known for boating, canoeing, exceptional wildlife viewing, and dramatic landscapes along the Zambezi River.',
        image: '/Pictures/zambia/lower_zambezi.jpg',
        tag: 'Riverine Wilderness',
        details: {
          highlight:
            'Directly opposite Zimbabwe’s Mana Pools, Lower Zambezi combines dramatic escarpment backdrops with serene river channels frequented by elephant herds, hippos, and buffalo.',
          bestSeason:
            'May to October brings pleasant dry weather and prime game activity along the riverbanks.',
          activities: [
            'Multi-day and half-day canoe safaris along quiet river channels',
            'Boat safaris and catch-and-release tiger fishing',
            'Open vehicle game drives through riverine mahogany forests',
            'Walking safaris with experienced scouts',
          ],
          practicalTip:
            'Canoeing down the gentle channels offers an unmatched, silent perspective for observing elephant herds drinking right at water level.',
        },
      },
      {
        id: 'lake-kariba',
        name: 'Lake Kariba',
        description:
          'A vast man-made lake offering excellent fishing, houseboat safaris, stunning sunsets, and a peaceful lakeside escape surrounded by natural beauty.',
        image: '/Pictures/zambia/lake_kariba.jpg',
        tag: 'Tranquil Lake Escape',
        details: {
          highlight:
            'One of the world’s largest artificial reservoirs, famous for petrified mopane tree skeletons rising from the water, dramatic thunderheads, and world-class freshwater angling.',
          bestSeason:
            'Year-round destination; sunset cruises and tiger fishing are phenomenal from September to November during the annual Tiger Fish Tournament.',
          activities: [
            'Private houseboat charters with onboard chef and plunge pool',
            'Freshwater tiger fishing and bream angling',
            'Spectacular golden hour sunset photography',
            'Relaxed birdwatching and crocodile/hippo spotting',
          ],
          practicalTip:
            'Siavonga is the main Zambian lakeside resort town, located just 2.5 to 3 hours’ drive from Lusaka, making it an easy weekend retreat.',
        },
      },
    ],
  },

  planJourney: {
    heading: 'Plan Your Zambia Journey',
    subheading:
      'Get the practical information you need to plan a smooth, safe, and rewarding trip to Zambia.',
    cards: [
      {
        id: 'best-time-to-visit',
        icon: 'Calendar',
        title: 'Best Time to Visit',
        description:
          'Find out about Zambia’s seasons, weather patterns, and the best times for wildlife viewing, Victoria Falls, and outdoor activities.',
        buttonText: 'Read More',
        details: {
          overview:
            'Zambia enjoys a pleasant tropical climate with three marked seasons across the year.',
          points: [
            {
              label: 'May – August (Cool & Dry)',
              text: 'The most comfortable time for travel. Daytime temperatures are mild (20–25°C) and nights are crisp. Excellent for game drives, sightseeing, and overland journeys.',
            },
            {
              label: 'September – October (Hot & Dry)',
              text: 'Temperatures peak (30–38°C). Sparse vegetation and shrinking water sources make wildlife congregate densely around rivers, offering supreme predator action.',
            },
            {
              label: 'November – April (Green / Emerald Season)',
              text: 'Rains bring lush green landscapes, newborn animals, and migrating birds. Victoria Falls flows with tremendous thunderous power.',
            },
            {
              label: 'Victoria Falls Flow Variations',
              text: 'High water and maximum spray occur from March to May; water levels drop in November, uncovering rock faces on the Zambian side and allowing safe swims in Devil’s Pool.',
            },
          ],
        },
      },
      {
        id: 'getting-around',
        icon: 'Car',
        title: 'Getting Around',
        description:
          'Learn about transport options including domestic flights, road travel, public transportation, and tips for getting around safely and efficiently.',
        buttonText: 'Read More',
        details: {
          overview:
            'Zambia is a vast country with well-connected transit hubs and scenic overland routes.',
          points: [
            {
              label: 'Domestic Aviation',
              text: 'Scheduled domestic flights link Lusaka (Kenneth Kaunda International) with Livingstone, Mfuwe (South Luangwa), Ndola, and Solwezi via carriers like Proflight Zambia.',
            },
            {
              label: 'Long-Distance Coaches',
              text: 'Reliable coach operators connect Lusaka with Livingstone, Chipata (for South Luangwa/Malawi border), and Ndola. Book tickets ahead at central bus stations.',
            },
            {
              label: 'Self-Drive & 4x4 Rental',
              text: 'Driving is on the left. Main highways (T2, T1, Great East Road) are tarred. Visiting national parks requires a well-equipped 4WD with high clearance, spare tires, and GPS.',
            },
            {
              label: 'Taxis & Ride-Hailing',
              text: 'Yango and Ulendo operate in Lusaka. For standard taxis, negotiate fares beforehand or ask your hotel to arrange a trusted driver.',
            },
          ],
        },
      },
      {
        id: 'money-payments',
        icon: 'Coins',
        title: 'Money & Payments',
        description:
          'Get information on the local currency, payment methods, ATM availability, budgeting tips, and what to expect for costs in Zambia.',
        buttonText: 'Read More',
        details: {
          overview:
            'The official currency is the Zambian Kwacha (ZMW). A blend of card and cash is recommended.',
          points: [
            {
              label: 'Local Currency (ZMW)',
              text: 'Prices for domestic goods, food, and local transport are billed in Kwacha. Safari lodges, park conservation fees, and tourist activities are frequently quoted in USD.',
            },
            {
              label: 'Card Acceptance & ATMs',
              text: 'Visa and Mastercard are accepted at major hotels, supermarkets, and upscale restaurants in Lusaka and Livingstone. ATMs are widely present in urban centers.',
            },
            {
              label: 'Mobile Money',
              text: 'Airtel Money and MTN Mobile Money are ubiquitous across Zambia and accepted by informal vendors, fuel stations, and markets.',
            },
            {
              label: 'Tipping Norms',
              text: 'In safari camps, $10–$15 per guest per day for guides and $10 for camp staff is customary. In casual city restaurants, 10% is standard.',
            },
          ],
        },
      },
      {
        id: 'health-safety',
        icon: 'ShieldCheck',
        title: 'Health, Safety & Practical Tips',
        description:
          'Stay informed with essential health advice, safety tips, entry requirements, travel insurance and other practical information for a hassle-free journey.',
        buttonText: 'See Tips',
        details: {
          overview:
            'Zambia is consistently rated as one of Africa’s most peaceful and politically stable nations.',
          points: [
            {
              label: 'Malaria Precautions',
              text: 'Zambia is in a malaria-endemic zone. Consult your physician regarding prophylaxis (Malarone, Doxycycline) and use insect repellent in the evenings.',
            },
            {
              label: 'Yellow Fever & Vaccinations',
              text: 'A Yellow Fever certificate is required if arriving from an endemic country. Routine boosters (Tetanus, Hepatitis A, Typhoid) are recommended.',
            },
            {
              label: 'General Safety & Friendly Locals',
              text: 'Zambians are exceptionally welcoming and polite. Standard travel awareness applies: avoid walking isolated streets after dark and keep valuables discreet.',
            },
            {
              label: 'SIM Cards & Connectivity',
              text: 'Airtel, MTN, and Zamtel offer prepaid SIMs with 4G/5G data packages. Register your SIM at the airport or official shop with your passport.',
            },
          ],
        },
      },
    ],
  },

  whyExplore: {
    heading: 'Why Explore Zambia?',
    subheading:
      'More than a destination, Zambia is a place of extraordinary wildlife, stunning natural beauty, and genuine connections.',
    cards: [
      {
        title: 'Incredible Wildlife',
        description:
          'Home to abundant wildlife, from elephants and lions to hippos and rare antelope, Zambia offers authentic and uncrowded safari experiences in spectacular natural settings.',
        image: '/Pictures/zambia/elephants_savanna.jpg',
      },
      {
        title: 'Breathtaking Landscapes',
        description:
          'From the mighty Zambezi River and dramatic waterfalls to vast national parks and tranquil lakes, Zambia’s diverse landscapes inspire adventure at every turn.',
        image: '/Pictures/zambia/zambezi_landscapes.jpg',
      },
      {
        title: 'Authentic Experiences',
        description:
          'Warm and welcoming people, rich cultures, and vibrant local communities make Zambia a place for meaningful travel experiences and lasting connections.',
        image: '/Pictures/zambia/authentic_people.jpg',
      },
    ],
  },

  readyToExplore: {
    heading: 'Ready to Explore Zambia?',
    description:
      'Get personalized guidance for a visit, an overland adventure, or a longer stay in Zambia. We’re here to help you plan a journey that’s right for you.',
    primaryBtn: {
      text: 'Start Your Request',
      to: '/travel-planner?destination=zambia',
    },
    secondaryBtn: {
      text: 'View Travel Planner',
      to: '/travel-planner',
    },
    leftWatermark: ['Zambia', 'More to Explore'],
    rightWatermark: ['People', 'Nature', 'Culture', 'Opportunity', 'Zambia'],
    backgroundImage: '/Pictures/zambia/cta_banner_sunset.jpg',
  },
}
