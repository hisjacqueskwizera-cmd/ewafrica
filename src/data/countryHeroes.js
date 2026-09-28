import {
  BENIN_PAGE,
  GAMBIA_PAGE,
  GHANA_PAGE,
  MALAWI_PAGE,
  RWANDA_PAGE,
  SENEGAL_PAGE,
  UGANDA_PAGE,
} from './siteContent.js'
import { TZ_HERO_VIDEOS } from './tanzaniaHeroVideos.js'
import { ZAMBIA_DATA } from './zambiaContent.js'

// Each country's hero backdrop and styling, keyed by COUNTRIES slug, in
// DestinationHero's own prop names — spread straight into it. Shared by the
// country's own page and its Travel Planner landing page
// (/travel-planner?destination=<slug>), so the two heroes always use the
// same media and look the same. Only the heading and description differ.
export const COUNTRY_HEROES = {
  ghana: {
    backgroundImage: GHANA_PAGE.hero.backgroundImage,
    backgroundImageAlt: GHANA_PAGE.hero.backgroundImageAlt,
    // Bright white castle photo — needs the soft dark fade to read over.
    mist: true,
  },
  tanzania: {
    // The only destination with its own footage.
    backgroundVideos: TZ_HERO_VIDEOS,
  },
  zambia: {
    backgroundImage: ZAMBIA_DATA.hero.image,
    backgroundImageAlt: 'Victoria Falls, Zambia',
    headingClassName:
      'font-display text-[1.65rem] font-normal leading-[1.05] text-balance text-white sm:text-[2.2rem] lg:text-[3rem]',
  },
  malawi: {
    backgroundImage: MALAWI_PAGE.hero.backgroundImage,
    backgroundImageAlt: MALAWI_PAGE.hero.backgroundImageAlt,
  },
  uganda: {
    backgroundImage: UGANDA_PAGE.hero.backgroundImage,
    backgroundImageAlt: UGANDA_PAGE.hero.backgroundImageAlt,
  },
  rwanda: {
    backgroundImage: RWANDA_PAGE.hero.image,
    backgroundImageAlt: RWANDA_PAGE.hero.imageAlt,
  },
  senegal: {
    backgroundImage: SENEGAL_PAGE.hero.backgroundImage,
    backgroundImageAlt: SENEGAL_PAGE.hero.backgroundImageAlt,
  },
  benin: {
    backgroundImage: BENIN_PAGE.hero.backgroundImage,
    backgroundImageAlt: BENIN_PAGE.hero.backgroundImageAlt,
  },
  gambia: {
    backgroundImage: GAMBIA_PAGE.hero.image,
    backgroundImageAlt: GAMBIA_PAGE.hero.imageAlt,
  },
}

// The country a Travel Planner service page should take its hero from:
// set only when the page is for exactly one country that has a hero here.
// With several countries (or none), the page keeps its own hero.
export const heroCountrySlug = (slugs) =>
  slugs.length === 1 && COUNTRY_HEROES[slugs[0]] ? slugs[0] : null
