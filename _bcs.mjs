import { chromium } from 'playwright'

const outDir = process.argv[2]
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
let fails = 0
const check = (label, cond, extra = '') => {
  if (!cond) fails++
  console.log(`  ${cond ? 'OK ' : 'XX '} ${label}${extra ? ' | ' + extra : ''}`)
}
const sidePhoto = async () => {
  const img = page.locator('aside img').first()
  await img.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }))
  await page.waitForTimeout(900)
  return img.evaluate((el) => ({ src: new URL(el.currentSrc || el.src).pathname, ok: el.naturalWidth > 0, alt: el.alt }))
}
for (const [path, expected] of [
  ['/travel-planner/border-crossing-guide?from=rwanda', '/images/services/border-crossing/rwanda.webp'],
  ['/travel-planner/border-crossing-guide?from=ghana', '/images/services/travel-planner/sidebar-coastal-fort.webp'],
  ['/travel-planner/border-crossing-guide', '/images/services/travel-planner/sidebar-coastal-fort.webp'],
]) {
  await page.goto('http://localhost:5173' + path, { waitUntil: 'load' })
  const p = await sidePhoto()
  check(path, p.ok && p.src === expected, p.src)
  if (path.endsWith('rwanda')) {
    await page.locator('aside > div').first().screenshot({ path: `${outDir}/bc_rwanda_side.png` })
  }
}
console.log(errors.length ? `\nPAGE ERRORS:\n${errors.join('\n')}` : '\nno page errors')
console.log(fails ? `${fails} FAILURES` : 'ALL CHECKS PASSED')
await b.close()
