// Same shape/rotation approach as heroVideos.js, but this playlist is
// scoped to the Tanzania page's own hero only (see HeroVideoBackground's
// `videos` prop) rather than the site-wide rotation.
const FILENAMES = [
  'TZ_Hero_Videos (1).MP4',
  'TZ_Hero_Videos (2).MP4',
  'TZ_Hero_Videos (3).MP4',
]

export const TZ_HERO_VIDEOS = FILENAMES.map((name) => ({
  src: encodeURI(`/Videos/TZ_Hero_Videos/${name}`),
  capSeconds: null,
}))
