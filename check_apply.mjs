import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

const log = (label) => console.log(`--- ${label} --- url=${page.url()} errors=${JSON.stringify(errors)}`);

await page.goto('http://localhost:5173/independent-tour-guide/tanzania/apply', { waitUntil: 'networkidle' });
log('start page');
await page.screenshot({ path: 'C:/tmp/apply_start.png' });

await page.click('text=Begin Application');
await page.waitForTimeout(300);
log('step 1');
await page.screenshot({ path: 'C:/tmp/apply_step1.png' });

errors.length = 0;
await browser.close();
