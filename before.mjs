import { chromium } from 'playwright'
const b = await chromium.launch()
const page = await b.newPage({ viewport:{ width:1440, height:900 } })
for (const [name,url] of [['ghana','/ghana'],['benin','/benin']]) {
  await page.goto('http://localhost:5320'+url,{waitUntil:'domcontentloaded'})
  await page.waitForTimeout(1500)
  const g = page.locator('#gallery').first()
  await g.scrollIntoViewIfNeeded(); await page.waitForTimeout(700)
  const box = await g.boundingBox()
  console.log(`${name}: gallery height = ${Math.round(box.height)}px (viewport 900)`)
  await g.screenshot({ path:`before_${name}.png` })
}
await b.close()
