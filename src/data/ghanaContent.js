export const GHANA_DATA = {
  // --- Ghana Practical Guide Page ---
  topPlaces: {
    heading: 'Where to Go in Ghana',
    subheading:
      'Ghana offers very different experiences from region to region. Rather than trying to see everything in one trip, choose a route that matches your interests and available time.',
    places: [
      {
        id: 'accra',
        name: 'Accra',
        description:
          "Ghana's capital is energetic and modern, with markets, restaurants, nightlife, beaches, museums and historic neighborhoods.",
        image: '/Pictures/Ghana_Landing_Hero.JPG',
        tag: "Ghana's Capital",
        details: {
          highlight:
            "Accra blends coastal energy with a fast-growing creative and business scene — it's also the main starting point for travel to the rest of the country.",
          bestSeason:
            'Year-round destination; the drier months (November to March) bring the most comfortable temperatures for exploring on foot.',
          activities: [
            'Independence Square and Kwame Nkrumah Memorial Park',
            'Jamestown’s colorful streets and lighthouse',
            'Makola Market for fabrics, produce and everyday city life',
            'Live music, rooftop dining and Osu’s nightlife',
          ],
          practicalTip:
            'Traffic can be heavy at peak hours — build extra time into any cross-city plans, especially around Circle and the Kwame Nkrumah Interchange.',
        },
      },
      {
        id: 'cape-coast-elmina',
        name: 'Cape Coast & Elmina',
        description:
          "These coastal towns are among Ghana's most historically significant destinations, home to Cape Coast Castle and Elmina Castle.",
        image: '/Pictures/Ghana_Abode.JPG',
        tag: 'Coastal Heritage',
        details: {
          highlight:
            'Cape Coast Castle and Elmina Castle are central to understanding the transatlantic slave trade, while the surrounding coast offers fishing communities, beaches and easy access to Kakum National Park.',
          bestSeason:
            'November to March offers the driest, most comfortable conditions for walking the castles and coastline.',
          activities: [
            'Guided tours of Cape Coast Castle and Elmina Castle',
            'Fishing harbor visits at Elmina at first light',
            'Coastal beach time between historical stops',
            'Day trips to nearby Kakum National Park',
          ],
          practicalTip:
            'Allow a full day if combining both castles with Kakum — the drive between Cape Coast and Elmina is short, but each site rewards unhurried time.',
        },
      },
      {
        id: 'kumasi-ashanti',
        name: 'Kumasi & the Ashanti Region',
        description:
          'Kumasi is the cultural heart of the Ashanti people, with markets, traditional crafts, royal history and important cultural sites.',
        image: '/Pictures/Ghana/Gallery/ashanti_durbar.jpg',
        tag: 'Ashanti Kingdom',
        details: {
          highlight:
            'Home to the Ashanti King and the Manhyia Palace, Kumasi carries centuries of royal history alongside Kejetia Market, one of West Africa’s largest markets.',
          bestSeason:
            'Best visited during the dry season (November to March); durbar and festival dates vary by year and are worth checking ahead.',
          activities: [
            'Manhyia Palace Museum and Ashanti royal history',
            'Kejetia Market for crafts, kente cloth and everyday trade',
            'Bonwire village for traditional kente weaving',
            'Ashanti cultural festivals and durbars, where timing allows',
          ],
          practicalTip:
            'Kumasi is a working city rather than a tourist town — a local guide makes the palace, market and craft villages far easier to navigate.',
        },
      },
      {
        id: 'kakum-national-park',
        name: 'Kakum National Park',
        description:
          "Known for its tropical rainforest and canopy walkway, Kakum is one of Ghana's best-known nature experiences.",
        image: '/Pictures/Ghana/Gallery/kakum_canopy.jpg',
        tag: 'Canopy Walkway',
        details: {
          highlight:
            'Suspended high above the forest floor, Kakum’s canopy walkway gives a rare view over undisturbed rainforest, and can be combined easily with Cape Coast and Elmina.',
          bestSeason:
            'Early morning visits (before the heat and crowds build) offer the best wildlife sounds and cooler walking conditions, year-round.',
          activities: [
            'The canopy walkway, suspended above the forest canopy',
            'Rainforest nature trails and guided walks',
            'Birdwatching among the park’s forest species',
            'Combined day trips with Cape Coast and Elmina',
          ],
          practicalTip:
            'Arrive early — the walkway is popular with tour groups, and mornings are quieter, cooler and better for wildlife spotting.',
        },
      },
      {
        id: 'volta-region',
        name: 'Volta Region',
        description:
          'The Volta Region offers mountains, waterfalls, lakeside communities, hiking and a quieter side of Ghana.',
        image: '/Pictures/Ghana/Gallery/fishing_boats.jpg',
        tag: 'Mountains & Waterfalls',
        details: {
          highlight:
            'Especially attractive to travelers looking for scenery and outdoor experiences, the Volta Region is greener and quieter than Ghana’s more visited south-coast route.',
          bestSeason:
            'November to March for the clearest hiking conditions; waterfalls run fullest just after the rainy season.',
          activities: [
            'Wli Waterfalls, Ghana’s tallest, with lower and upper trail options',
            'Mount Afadjato hikes for panoramic views',
            'Tafi Atome monkey sanctuary',
            'Lakeside villages along the Volta shoreline',
          ],
          practicalTip:
            'Roads in the Volta Region can be slower than distances suggest — a private driver or guided trip helps make the most of a short visit.',
        },
      },
      {
        id: 'mole-national-park',
        name: 'Mole National Park',
        description:
          "Located in northern Ghana, Mole offers one of the country's best wildlife experiences, with elephants, antelope and monkeys.",
        image: '/Pictures/Ghana/Gallery/mole_elephants.jpg',
        tag: 'Wildlife Safari',
        details: {
          highlight:
            'Ghana’s largest wildlife refuge, Mole is best known for its resident elephants, which can often be seen up close on walking safaris around the park’s watering holes.',
          bestSeason:
            'Dry season (December to April) gives the best game viewing, as animals gather near remaining water sources.',
          activities: [
            'Walking safaris with armed park rangers',
            'Game drives across the park’s savannah',
            'Elephant sightings at the park’s watering holes',
            'Birdwatching among Mole’s recorded species',
          ],
          practicalTip:
            'Mole is remote from Accra — flying to Tamale and driving on from there cuts a long road journey down considerably.',
        },
      },
      {
        id: 'lake-volta',
        name: 'Lake Volta',
        description:
          "One of the world's largest artificial lakes, Lake Volta is surrounded by towns and communities where travelers can experience a slower pace of life.",
        image: '/Pictures/Ghana_card_Background.JPG',
        tag: 'Lakeside Scenery',
        details: {
          highlight:
            'Formed by the Akosombo Dam, Lake Volta stretches through much of eastern Ghana, offering calm waterside scenery and a genuinely slower pace of travel.',
          bestSeason:
            'Year-round destination; the dry season (November to March) gives the clearest lake views and easiest travel.',
          activities: [
            'Boat trips on the lake from Akosombo',
            'Akosombo Dam viewpoints',
            'Lakeside towns and fishing communities',
            'Combined stops with the Volta Region',
          ],
          practicalTip:
            'Distances around the lake are larger than they look on a map — plan for a relaxed pace rather than a packed itinerary.',
        },
      },
      {
        id: 'northern-ghana',
        name: 'Northern Ghana',
        description:
          'Northern Ghana has a distinctly different landscape and cultural character from the south, with historic mosques and open savannah.',
        image: '/Pictures/Ghana/Gallery/larabanga_mosque.jpg',
        tag: 'History & Savannah',
        details: {
          highlight:
            'Historic mosques, traditional villages, markets and open savannah make the region well worth considering for travelers with more time, including the centuries-old Larabanga Mosque.',
          bestSeason:
            'November to April, avoiding the heaviest of the rainy season and its less passable rural roads.',
          activities: [
            'Larabanga Mosque, one of West Africa’s oldest',
            'Traditional village visits across the savannah',
            'Local markets and craft communities',
            'Combined trips with Mole National Park',
          ],
          practicalTip:
            'The north is best combined with Mole National Park given the travel distances involved — plan them together rather than as separate trips.',
        },
      },
    ],
  },

  planJourney: {
    heading: 'Before You Travel',
    subheading:
      'Practical travel information to help you prepare for Ghana with confidence.',
    cards: [
      {
        id: 'welcome',
        icon: 'Sparkles',
        title: 'Welcome to Ghana',
        description:
          "Ghana is one of West Africa's most welcoming and accessible destinations, with something meaningful for every traveler.",
        buttonText: 'Read More',
        image: '/Pictures/Ghana_Landing_Hero.JPG',
        imageAlt: 'Independence Arch in Accra',
        details: {
          overview:
            "Ghana is one of West Africa's most welcoming and accessible destinations. From vibrant cities and coastal towns to rich history, diverse wildlife and a proud cultural heritage, there's something meaningful for every traveler.",
          points: [
            {
              label: 'A Warm First Impression',
              text: 'Akwaaba — welcome — is more than a greeting here; visitors consistently find Ghanaians among the most welcoming hosts in the region.',
            },
            {
              label: 'A Country of Contrasts',
              text: 'Modern Accra, historic coastal castles, forest canopy walks and northern savannah all sit within a few hours of one another.',
            },
          ],
        },
      },
      {
        id: 'when-to-visit',
        icon: 'CalendarDays',
        title: 'When to Visit',
        description:
          'Ghana can be visited year-round. The drier months are ideal for most travelers, while the green season brings lusher landscapes and fewer crowds.',
        buttonText: 'Read More',
        image: '/Pictures/Ghana/Gallery/fishing_boats.jpg',
        imageAlt: "Fishing boats along Ghana's Atlantic coastline",
        details: {
          overview:
            'Ghana can be visited year-round. The drier months (November to March) are ideal for most travelers, while the green season (April to October) brings lusher landscapes, fewer crowds and great value.',
          points: [
            {
              label: 'November – March (Dry Season)',
              text: 'The most popular window for travel, with comfortable temperatures and easier road conditions across the country.',
            },
            {
              label: 'April – October (Green Season)',
              text: 'Lush landscapes and lower prices, with intermittent rain — a good option for travelers who don’t mind the occasional shower.',
            },
          ],
        },
      },
      {
        id: 'before-you-go',
        icon: 'Briefcase',
        title: 'Before You Go',
        description:
          "Check your passport validity, visa requirements, recommended vaccinations, travel insurance, and onward travel arrangements.",
        buttonText: 'Read More',
        image: '/Pictures/image_Ghana.webp',
        imageAlt: 'The Kwame Nkrumah statue at the Memorial Park in Accra',
        details: {
          overview:
            'A few basic checks before you fly make everything else about the trip go more smoothly.',
          points: [
            {
              label: 'Passport & Documents',
              text: 'Your passport should have at least six months of validity remaining, and it is worth keeping digital and printed copies of key documents.',
            },
            {
              label: 'Insurance & Onward Travel',
              text: 'Confirm travel insurance coverage and have proof of onward or return travel ready, since it is sometimes requested on arrival.',
            },
          ],
        },
      },
      {
        id: 'visa-entry',
        icon: 'FileText',
        title: 'Visa & Entry Basics',
        description:
          'Most travelers need a visa to enter Ghana. Requirements vary by nationality and purpose of travel.',
        buttonText: 'Get Personal Visa Guidance',
        image: '/Pictures/Ghana_Landing_Hero.JPG',
        imageAlt: 'Independence Arch in Accra, marking Ghana’s 1957 independence',
        details: {
          overview:
            'Requirements vary by nationality and purpose of travel — check the latest entry requirements before you travel and allow time for processing.',
          points: [
            {
              label: 'Visa Requirements',
              text: 'Most nationalities require a visa before arrival; requirements and processing times vary, so check well ahead of travel.',
            },
            {
              label: 'Documentation',
              text: 'Keep your passport, visa approval, onward travel details and accommodation information easily accessible on arrival.',
            },
          ],
        },
        cta: { label: 'Get Personal Visa Guidance', to: '/personal-visa-guidance/ghana' },
      },
      {
        id: 'health',
        icon: 'HeartPulse',
        title: 'Health for Travelers',
        description:
          'Yellow fever vaccination is required for entry, and routine vaccinations are recommended.',
        buttonText: 'See Tips',
        image: '/Pictures/image_Ghana.webp',
        imageAlt: 'The Kwame Nkrumah statue at the Memorial Park in Accra',
        details: {
          overview:
            'Yellow fever vaccination is required for entry, and routine vaccinations are recommended. Travel insurance, personal medications and access to quality medical care are important considerations, especially in remote areas.',
          points: [
            {
              label: 'Yellow Fever Certificate',
              text: 'A valid yellow fever vaccination certificate is required for entry into Ghana — carry it with your travel documents.',
            },
            {
              label: 'Travel Insurance & Medication',
              text: 'Bring routine medications and travel insurance that covers medical care, particularly if venturing outside major cities.',
            },
          ],
        },
      },
      {
        id: 'money-payments',
        icon: 'Wallet',
        title: 'Money & Payments',
        description:
          'Ghana uses the Ghanaian cedi (GHS). Cash is useful outside major cities, while cards and mobile money are widely accepted.',
        buttonText: 'Read More',
        image: '/Pictures/Ghana_card_Background.JPG',
        imageAlt: 'The courtyard of Cape Coast Castle',
        details: {
          overview:
            'Cash is useful, especially outside major cities, while cards are widely accepted in hotels, restaurants, and larger stores. Mobile money is commonly used.',
          points: [
            {
              label: 'Local Currency (GHS)',
              text: 'The Ghanaian cedi is used for everyday purchases — carry smaller denominations for markets and rural areas.',
            },
            {
              label: 'Cards & Mobile Money',
              text: 'Cards are widely accepted in hotels, restaurants and larger stores; mobile money is commonly used for smaller transactions.',
            },
          ],
        },
      },
      {
        id: 'sim-connectivity',
        icon: 'Globe2',
        title: 'SIM Cards & Connectivity',
        description:
          'Mobile internet is widely available. Local SIM cards are affordable and easy to buy, with good coverage in cities and most towns.',
        buttonText: 'Read More',
        image: '/Pictures/Ghana/Gallery/festival_dancers.jpg',
        imageAlt: 'Festival dancers in traditional dress in Ghana',
        details: {
          overview:
            'Local SIM cards are affordable and easy to buy, with good coverage in cities and most towns. eSIM options are also available.',
          points: [
            {
              label: 'Local SIM Cards',
              text: 'MTN, Vodafone and AirtelTigo all offer prepaid SIMs at airports and shops — a passport is typically needed for registration.',
            },
            {
              label: 'Backup Connectivity',
              text: 'Consider having both mobile data and an alternative connection plan for more remote areas with weaker coverage.',
            },
          ],
        },
      },
      {
        id: 'getting-around',
        icon: 'Bus',
        title: 'Getting Around Ghana',
        description:
          'Travel options include domestic flights, intercity buses, shared taxis, ride-hailing services and private drivers.',
        buttonText: 'Travel Planner',
        image: '/Pictures/Ghana_Abode.JPG',
        imageAlt: 'Elmina Castle on the coastline, seen from the water',
        details: {
          overview:
            'Distances can be longer than expected, so plan ahead, especially when traveling between regions.',
          points: [
            {
              label: 'Domestic Flights & Buses',
              text: 'Domestic flights connect Accra with Kumasi and Tamale; intercity buses (STC and private lines) cover most major routes.',
            },
            {
              label: 'Taxis, Ride-Hailing & Private Drivers',
              text: 'Shared taxis and ride-hailing apps work well in cities; a private driver gives the most flexibility for regional trips.',
            },
          ],
        },
        cta: { label: 'Plan My Route', to: '/travel-planner?destination=ghana' },
      },
    ],
  },

  travelSmarter: {
    heading: 'Travel Smarter',
    subheading: 'Practical advice for moving around Ghana with confidence.',
    cards: [
      {
        id: 'staying-safe',
        icon: 'Shield',
        title: 'Staying Safe',
        description:
          'Ghana is generally straightforward for travelers, but normal precautions still matter.',
        image: '/Pictures/Ghana/Gallery/ashanti_durbar.jpg',
        imageAlt: 'A crowded Ashanti durbar procession in Kumasi',
        details: {
          overview:
            'Ghana is generally straightforward for travelers, but normal precautions still matter — especially when moving between cities and regions.',
          points: [
            {
              label: 'Everyday Precautions',
              text: 'Keep valuables secure, be cautious with phones and bags in crowded places, avoid displaying large amounts of cash, and use trusted transportation at night.',
            },
            {
              label: 'Stay Informed',
              text: 'Stay aware of current local conditions, especially when traveling far from major cities.',
            },
          ],
        },
      },
      {
        id: 'traveling-overland',
        icon: 'RouteIcon',
        title: 'Traveling Overland',
        description:
          "Ghana connects overland with Côte d'Ivoire, Burkina Faso and Togo, useful for a wider West Africa journey.",
        cta: { label: 'Get a Border Crossing Guide', to: '/travel-planner/border-crossing-guide?from=ghana' },
        image: '/Pictures/Ghana_Background_22.jpg',
        imageAlt: 'A stone archway and passage inside a coastal Ghanaian fort',
        details: {
          overview:
            'Border procedures, transport options, road conditions, and travel times can vary depending on the crossing.',
          points: [
            {
              label: 'Before You Cross',
              text: 'Check visa requirements for the next country before departure and allow extra time for border formalities.',
            },
            {
              label: 'Main Overland Routes',
              text: "Ghana connects overland with Côte d'Ivoire, Burkina Faso and Togo — useful when planning a wider West Africa journey.",
            },
          ],
        },
      },
      {
        id: 'first-time-tips',
        icon: 'Lightbulb',
        title: 'First-Time Ghana Tips',
        description:
          'A first visit is easier when you avoid trying to fit too much into one itinerary.',
        image: '/Pictures/Ghana_card_Background.JPG',
        imageAlt: 'The historic courtyard of Cape Coast Castle',
        details: {
          overview:
            'Distances can look manageable on a map but still take longer than expected — build flexibility into your plans.',
          points: [
            {
              label: 'Pace Your Itinerary',
              text: 'Avoid trying to fit too much into one trip; allow extra time when moving between regions.',
            },
            {
              label: 'Cash & Patience',
              text: 'Carry cash, keep smaller denominations available, allow flexibility for transportation, and go in with patience and a friendly approach.',
            },
          ],
        },
      },
      {
        id: 'what-to-pack',
        icon: 'Users',
        title: 'What to Pack',
        description:
          'Lightweight breathable clothing is suitable for most of Ghana, with a few extras for religious and traditional sites.',
        image: '/Pictures/Ghana/Gallery/kakum_canopy.jpg',
        imageAlt: 'The rainforest canopy walkway at Kakum National Park',
        details: {
          overview:
            'Lightweight breathable clothing is suitable for most of Ghana, along with a few practical extras.',
          points: [
            {
              label: 'Everyday Essentials',
              text: 'Comfortable walking shoes, sun protection, insect repellent, a reusable water bottle, rain protection and a portable power bank.',
            },
            {
              label: 'Cultural & Religious Sites',
              text: 'Travelers visiting religious sites, traditional communities, or more conservative areas should also carry clothing that provides a little more coverage.',
            },
          ],
        },
      },
      {
        id: 'responsible-travel',
        icon: 'Handshake',
        title: 'Responsible Travel',
        description:
          'Support locally owned businesses, ask before photographing people, and approach historical sites with respect.',
        image: '/Pictures/Ghana_Card.JPG',
        imageAlt: 'A memorial statue commemorating the transatlantic slave trade in Ghana',
        details: {
          overview:
            'Support locally owned businesses where possible, ask before photographing people, respect traditional customs, and avoid activities that exploit people, wildlife, or communities.',
          points: [
            {
              label: 'Historical Sites',
              text: 'At historical sites connected to slavery and the transatlantic slave trade, visitors should approach the experience with respect and sensitivity.',
            },
            {
              label: 'Photography',
              text: 'Be respectful when photographing people, places of worship, traditional ceremonies, government facilities and sensitive historical sites — always ask for permission when appropriate.',
            },
          ],
        },
      },
    ],
  },

  taste: {
    heading: 'A Taste of Ghana',
    subheading:
      "Ghanaian food is flavorful, varied and deeply connected to the country's culture. Here are some popular dishes to try during your visit.",
    image: '/Pictures/Ghana/Ghana_Foods/IMG_5418.jpeg',
    imageAlt: "Kelewele — spiced fried plantain served with roasted peanuts on banana leaves",
    dishes: [
      {
        title: 'Jollof Rice',
        description:
          "One of Ghana's most popular dishes, made with rice cooked in a flavorful tomato, pepper, onion, and spice sauce.",
        image: '/Pictures/Ghana/Ghana_Foods/IMG_5135.jpeg',
        imageAlt: 'A plate of Ghanaian jollof rice with coleslaw and pepper sauce',
      },
      {
        title: 'Red Red',
        description:
          'A hearty bean stew, traditionally made with black-eyed peas and red palm oil, commonly served with fried ripe plantain.',
        image: '/Pictures/Ghana/Ghana_Foods/IMG_5402.jpeg',
        imageAlt: 'Red red bean stew served with fried plantain and sautéed spinach',
      },
      {
        title: 'Waakye',
        description:
          'A popular Ghanaian rice-and-beans dish, traditionally cooked together and served with a variety of sauces and accompaniments.',
        image: '/Pictures/Ghana/Ghana_Foods/IMG_5416.jpeg',
        imageAlt: 'Waakye rice and beans served with a boiled egg, pepper sauce and salad',
      },
      {
        title: 'Fufu',
        description:
          'A smooth, soft staple made by pounding cooked cassava, plantain, or yam, usually served with a flavorful soup or stew.',
        image: '/Pictures/Ghana/Ghana_Foods/IMG_5412.jpeg',
        imageAlt: 'A ball of fufu served with a green soup',
      },
      {
        title: 'Spinach Stew',
        description:
          'A rich Ghanaian-style stew made with leafy greens, tomatoes, onions, peppers, and seasonings, often served with rice, plantain, or beans.',
        image: '/Pictures/Ghana/Ghana_Foods/IMG_5124.jpeg',
        imageAlt: 'Spinach stew served with rice, black-eyed beans and fried plantain',
      },
      {
        title: 'Kelewele',
        description:
          "Spiced fried plantain, often served with roasted peanuts. Naturally vegan and one of Ghana's most popular street foods.",
        image: '/Pictures/Ghana/Ghana_Foods/IMG_5418.jpeg',
        imageAlt: 'Kelewele spiced fried plantain served with roasted peanuts',
      },
    ],
    note: 'Many Ghanaian staples can work well for vegetarian travelers, but sauces and stews may contain fish, meat stock, or other animal ingredients — ask before ordering.',
  },

  cultureEtiquette: {
    icon: 'Handshake',
    heading: 'Culture & Etiquette',
    paragraphs: [
      'Ghanaians are generally warm and sociable, and greetings are an important part of everyday interaction. Taking a moment to greet someone before asking a question or beginning a transaction is always appreciated.',
      'The right hand is traditionally used when giving or receiving items, eating or greeting someone. Dress is generally relaxed, but more modest clothing is appropriate in villages, religious settings and some traditional communities.',
    ],
  },

  photography: {
    icon: 'Camera',
    heading: 'Photography',
    paragraphs: [
      'Ghana is extremely photogenic, from coastal fishing communities and historic architecture to markets, landscapes, festivals and everyday street life.',
      'Be respectful when photographing people, places of worship, traditional ceremonies, government facilities and sensitive historical sites. Always ask for permission when appropriate.',
    ],
  },

  readyToExplore: {
    heading: 'Need Help Planning Ghana?',
    description:
      'Travelers who want more personalized assistance can use EWAL services for visa guidance, travel planning, and border crossings.',
    primaryBtn: {
      text: 'Travel Planner',
      to: '/travel-planner?destination=ghana',
    },
    secondaryBtn: {
      text: 'Visa Guidance',
      to: '/personal-visa-guidance/ghana',
    },
    tertiaryBtn: {
      text: 'Border Crossing Guide',
      to: '/travel-planner/border-crossing-guide?from=ghana',
    },
    leftWatermark: ['Ghana', 'People, Places'],
    rightWatermark: ['People', 'Places', 'Possibilities', 'Ghana'],
    backgroundImage: '/Pictures/countries/Ghana.jpg',
  },
}
