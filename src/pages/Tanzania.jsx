import { DestinationPage } from '../components/DestinationPage.jsx'
import { TANZANIA_PAGE } from '../data/siteContent.js'
import { TZ_HERO_VIDEOS } from '../data/tanzaniaHeroVideos.js'

const TANZANIA_GALLERY = {
  heading: 'A Glimpse of Tanzania',
  subheading:
    'From the endless Serengeti plains to Zanzibar’s turquoise shores — a first look at the sights and stories waiting across Tanzania.',
  variant: 'mosaic',
  tiles: [
    {
      src: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3460.JPG',
      alt: 'Hot air balloon safari over the Serengeti plains, Tanzania',
      title: 'Serengeti',
      subtitle: 'Endless plains, hot-air balloon safaris',
    },
    {
      src: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3496.JPG',
      alt: 'Traditional dhow sailboat on a Zanzibar beach',
      title: 'Zanzibar',
      subtitle: 'Turquoise waters, timeless charm',
    },
    {
      src: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3635.JPG',
      alt: 'Aerial view of Stone Town, Zanzibar',
      title: 'Stone Town',
      subtitle: 'History, culture and Swahili charm',
    },
    {
      src: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3497.JPG',
      alt: 'Women in colorful kangas foraging on a Zanzibar beach',
      title: 'Zanzibar Shores',
      subtitle: 'Colorful daily life by the sea',
    },
    {
      src: '/Pictures/Tanzania/TZ_Hero_Section/IMG_3501.JPG',
      alt: 'Herder walking cattle along the shore at sunset, Zanzibar',
      title: 'Coastal Sunset',
      subtitle: 'Golden hour along the shore',
    },
  ],
}

export function Tanzania() {
  return (
    <DestinationPage
      documentTitle="Explore Tanzania | East-West Africa Link"
      countryName="Tanzania"
      slug="tanzania"
      data={TANZANIA_PAGE}
      heroVideos={TZ_HERO_VIDEOS}
      gallery={TANZANIA_GALLERY}
    />
  )
}
