import { HERO } from '../data/siteContent.js'
import { PageIntro } from './PageIntro.jsx'

export function Hero() {
  return <PageIntro id="home" {...HERO} />
}
