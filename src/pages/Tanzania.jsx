import { useState } from 'react'
import { DestinationPage } from '../components/DestinationPage.jsx'
import { MediaLightbox, MediaTile } from '../components/MediaGallery.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { TANZANIA_PAGE } from '../data/siteContent.js'
import { TZ_HERO_VIDEOS } from '../data/tanzaniaHeroVideos.js'

// One flat list, video first — the Lightbox steps through this same order
// regardless of which item a visitor opens first.
const TANZANIA_MEDIA = [
  {
    type: 'video',
    src: '/Pictures/Tanzania/Tz_Gallery/optimized/zanzibar_aerial.mp4',
    poster: '/Pictures/Tanzania/Tz_Gallery/optimized/zanzibar_aerial_poster.jpg',
    alt: 'Aerial drone footage of a dhow sailing off Zanzibar at sunset',
    title: 'Zanzibar',
    subtitle: 'An aerial view of the island at sunset',
  },
  {
    type: 'photo',
    src: '/Pictures/Tanzania/Tz_Gallery/optimized/IMG_3460_web.jpg',
    alt: 'Hot air balloon safari over the Serengeti plains, Tanzania',
    title: 'Serengeti',
    subtitle: 'Endless plains, hot-air balloon safaris',
  },
  {
    type: 'photo',
    src: '/Pictures/Tanzania/Tz_Gallery/optimized/IMG_3463_web.jpg',
    alt: 'The Rock restaurant with Maasai walking the beach in Zanzibar',
    title: 'The Rock, Zanzibar',
    subtitle: 'An iconic restaurant perched above the tide',
  },
  {
    type: 'photo',
    src: '/Pictures/Tanzania/Tz_Gallery/optimized/IMG_5184_web.jpg',
    alt: "Stone Town's historic waterfront seen from the water, Zanzibar",
    title: 'Stone Town',
    subtitle: "Zanzibar's historic waterfront",
  },
  {
    type: 'photo',
    src: '/Pictures/Tanzania/Tz_Gallery/optimized/IMG_5156_web.jpg',
    alt: 'Maasai boma overlooking the Ngorongoro Crater',
    title: 'Ngorongoro Crater',
    subtitle: 'Maasai homesteads above the crater floor',
  },
  {
    type: 'photo',
    src: '/Pictures/Tanzania/Tz_Gallery/optimized/IMG_5073_web.jpg',
    alt: "Tented camp along Lake Victoria's rocky shore near Mwanza",
    title: 'Lake Victoria',
    subtitle: "Tented camps along Mwanza's rocky shore",
  },
]

function TanzaniaGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const showNext = () => setLightboxIndex((i) => (i + 1) % TANZANIA_MEDIA.length)
  const showPrev = () => setLightboxIndex((i) => (i - 1 + TANZANIA_MEDIA.length) % TANZANIA_MEDIA.length)

  const [hero, ...rest] = TANZANIA_MEDIA

  return (
    <section id="gallery" className="scroll-mt-[140px] bg-cream py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <Reveal once={false} className="flex items-center justify-center gap-4">
          <span
            className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
            aria-hidden="true"
          />
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
            A Glimpse of Tanzania &amp; Zanzibar
          </h2>
          <span
            className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
            aria-hidden="true"
          />
        </Reveal>
        <Reveal once={false} delay={80}>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            From the endless Serengeti plains to Zanzibar&rsquo;s turquoise shores — tap any photo or
            video for a closer look.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 w-[96%] max-w-none sm:w-[92%] lg:w-[88%] xl:w-[85%]">
        <div className="grid gap-3">
          <Reveal once={false} big>
            <MediaTile
              item={hero}
              onOpen={() => setLightboxIndex(0)}
              className="aspect-video sm:aspect-[21/9]"
            />
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, i) => {
              const isLast = i === rest.length - 1
              // Sits in the same row as the double-wide Lake Victoria tile
              // (at lg) — stretched to that row's height instead of its
              // own aspect ratio, so the two line up exactly.
              const matchesLastRowHeight = i === rest.length - 2
              return (
                <Reveal
                  key={item.src}
                  once={false}
                  delay={100 + i * 100}
                  className={`${isLast ? 'sm:col-span-2 lg:col-span-2' : ''} ${matchesLastRowHeight ? 'lg:h-full' : ''}`}
                >
                  <MediaTile
                    item={item}
                    onOpen={() => setLightboxIndex(i + 1)}
                    className={
                      isLast
                        ? 'aspect-[16/9] sm:aspect-[2/1]'
                        : matchesLastRowHeight
                          ? 'aspect-[4/3] lg:aspect-auto lg:h-full'
                          : 'aspect-[4/3]'
                    }
                  />
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>

      <MediaLightbox
        items={TANZANIA_MEDIA}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={showNext}
        onPrev={showPrev}
      />
    </section>
  )
}

export function Tanzania() {
  return (
    <DestinationPage
      documentTitle="Explore Tanzania & Zanzibar | East-West Africa Link"
      countryName="Tanzania & Zanzibar"
      overlandCountryName="Tanzania"
      slug="tanzania"
      data={TANZANIA_PAGE}
      heroVideos={TZ_HERO_VIDEOS}
      gallery={<TanzaniaGallery />}
      practicalGuideTo="/tanzania/practical-guide#guide-overview"
    />
  )
}
