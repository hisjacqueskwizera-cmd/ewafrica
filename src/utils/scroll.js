export function scrollToId(id, behavior = 'smooth') {
  if (!id) return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior, block: 'start' })
}
