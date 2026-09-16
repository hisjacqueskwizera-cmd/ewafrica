import { DestinationPage } from '../components/DestinationPage.jsx'
import { TANZANIA_PAGE } from '../data/siteContent.js'
import { TZ_HERO_VIDEOS } from '../data/tanzaniaHeroVideos.js'

export function Tanzania() {
  return (
    <DestinationPage
      documentTitle="Explore Tanzania | East-West Africa Link"
      countryName="Tanzania"
      slug="tanzania"
      data={TANZANIA_PAGE}
      heroVideos={TZ_HERO_VIDEOS}
    />
  )
}
