import { SectionSubNav } from './SectionSubNav.jsx'

// Every tab's target sits just under the hero + this sub-nav (not the very
// top of the hero) — see the id each page gives its first content section
// (rwanda-overview / gallery-overview / guide-overview) — so clicking a tab
// (even from another Rwanda page) lands on the actual content, not back at
// the top of a hero photo. Gallery and Practical Guide are pages of their
// own, so they stay highlighted anywhere on those pages (see SectionSubNav).
const TABS = [
  { label: 'Overview', to: '/rwanda#rwanda-overview' },
  { label: 'Services', to: '/rwanda#rwanda-services' },
  { label: 'Popular Routes', to: '/rwanda#popular-routes' },
  { label: 'Photo & Video Gallery', to: '/rwanda/gallery#gallery-overview' },
  { label: 'Practical Guide', to: '/rwanda/practical-guide#guide-overview' },
]

export function RwandaSubNav() {
  return <SectionSubNav tabs={TABS} ariaLabel="Rwanda page sections" />
}
