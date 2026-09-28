// Same shape/rotation approach as heroVideos.js, but this playlist is
// scoped to the Tanzania page's own hero only (see HeroVideoBackground's
// `videos` prop) rather than the site-wide rotation.
const FILENAMES = ['hero-01.mp4', 'hero-02.mp4', 'hero-03.mp4']

export const TZ_HERO_VIDEOS = FILENAMES.map((name) => ({
  src: `/videos/tanzania/${name}`,
  capSeconds: null,
}))
