import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

const base = 'http://localhost:5173/independent-tour-guide/ghana/apply';

await page.goto(`${base}/step/1`, { waitUntil: 'networkidle' });

// --- Step 1 ---
await page.fill('input[placeholder=""]', '').catch(() => {});
await page.locator('text=Full legal name').locator('..').locator('input').fill('Kwame Mensah').catch(() => {});
// Use more robust selectors via label text proximity instead.
async function fillByLabel(labelText, value, { type = 'text' } = {}) {
  const field = page.locator('label', { hasText: labelText }).first();
  const input = field.locator('input, textarea, select').first();
  if (type === 'select') await input.selectOption(value);
  else await input.fill(String(value));
}
async function clickRadio(labelText, optionText) {
  const field = page.locator('label', { hasText: labelText }).first();
  await field.locator(`label:has-text("${optionText}")`).first().click();
}
async function checkCheckbox(labelText, optionText) {
  const field = page.locator('label', { hasText: labelText }).first();
  await field.locator(`label:has-text("${optionText}")`).first().click();
}

await fillByLabel('Full legal name', 'Kwame Mensah');
await clickRadio('Are you at least 18 years old', 'Yes');
await fillByLabel('Nationality', 'Ghanaian');
await fillByLabel('Country of residence', 'Ghana', { type: 'select' });
await clickRadio('Where do you primarily provide tour guide services', 'Ghana');
await fillByLabel('City or primary guiding location', 'Accra');
await fillByLabel('Mobile or WhatsApp number', '+233200000000');
await fillByLabel('Email address', 'kwame@example.com');
await page.click('text=Continue >> nth=0');
await page.waitForTimeout(300);
console.log('after step1 url', page.url(), 'errors', errors);

// --- Step 2 ---
await fillByLabel('How many years have you worked professionally as a tour guide', 5);
await fillByLabel('Year you began professional guiding', 2018);
await clickRadio('Have you guided international travelers', 'No');
await fillByLabel('Organization name', 'Accra City Tours');
await fillByLabel('Position or professional relationship', 'Lead Guide');
await fillByLabel('Dates associated', '2018-2024');
await page.click('text=Continue >> nth=0');
await page.waitForTimeout(300);
console.log('after step2 url', page.url(), 'errors', errors);

// --- Step 3 ---
await page.locator('label:has-text("City and neighborhood tours")').first().click();
await fillByLabel('Place 1', 'Independence Square');
await fillByLabel('Place 2', 'Jamestown');
await fillByLabel('Place 3', 'Kwame Nkrumah Mausoleum');
await fillByLabel('Place 4', 'Makola Market');
await fillByLabel('Place 5', 'Labadi Beach');
await fillByLabel('What makes your guiding service different from other guides in your area', 'Deep local knowledge and storytelling.');
await page.locator('label:has-text("Weekdays")').first().click();
await fillByLabel('How far in advance do you normally require bookings', '1 to 2 days', { type: 'select' });
await page.click('text=Continue >> nth=0');
await page.waitForTimeout(300);
console.log('after step3 url', page.url(), 'errors', errors);

// --- Step 4 ---
await clickRadio('Rate your spoken English', 'Fluent');
await clickRadio('Can you comfortably conduct an entire private tour in English', 'Yes');
await clickRadio('Rate your spoken French', 'None');
await clickRadio('Can you comfortably conduct an entire private tour in French', 'No');
await page.click('text=Continue >> nth=0');
await page.waitForTimeout(300);
console.log('after step4 url', page.url(), 'errors', errors);

// --- Step 5 ---
await clickRadio('Are you legally permitted to provide paid tour guiding services', 'Yes');
await clickRadio('Are tour guides required to be licensed, registered, or certified', 'No');
await clickRadio('Are you a member of a recognized professional tour guide or tourism association', 'No');
await clickRadio('Do you maintain professional public liability or tour guide insurance', 'No');
await page.click('text=Continue >> nth=0');
await page.waitForTimeout(300);
console.log('after step5 url', page.url(), 'errors', errors);

// --- Step 6 ---
await clickRadio('Do you currently hold First Aid or CPR certification', 'No');
await fillByLabel('A customer becomes seriously ill during your tour', 'Call emergency services and assist immediately.');
await fillByLabel("A customer's passport or telephone is lost or stolen", 'Help contact authorities and the embassy.');
await clickRadio('Do you personally transport customers', 'No');
await clickRadio('Do you use third party drivers or vehicles', 'No');
await page.click('text=Continue >> nth=0');
await page.waitForTimeout(300);
console.log('after step6 url', page.url(), 'errors', errors);

// --- Step 7 ---
async function fillRef(n, vals) {
  const card = page.locator(`text=Professional Reference ${n}`).locator('..').locator('..');
  await card.locator('label:has-text("Name")').first().locator('input').fill(vals.name);
  await card.locator('label:has-text("Company or organization")').first().locator('input').fill(vals.company);
  await card.locator('label:has-text("Position")').first().locator('input').fill(vals.position);
  await card.locator('label:has-text("Relationship to applicant")').first().locator('input').fill(vals.relationship);
  await card.locator('label:has-text("Telephone or WhatsApp")').first().locator('input').fill(vals.phone);
  await card.locator('label:has-text("Email")').first().locator('input').fill(vals.email);
  await card.locator('label:has-text("How long they have known you professionally")').first().locator('input').fill(vals.duration);
}
await fillRef(1, { name: 'Ama Owusu', company: 'Ghana Tours Ltd', position: 'Manager', relationship: 'Employer', phone: '+233201111111', email: 'ama@example.com', duration: '5 years' });
await fillRef(2, { name: 'Kofi Boateng', company: 'Accra Heritage', position: 'Director', relationship: 'Colleague', phone: '+233202222222', email: 'kofi@example.com', duration: '4 years' });
await page.locator('text=I authorize East-West Africa Link to contact the references').click();
await clickRadio('Do you have previous customer reviews available online', 'No');
await clickRadio('Have you ever been suspended, disciplined', 'No');
await clickRadio('Have you ever been removed or permanently banned', 'No');
await page.click('text=Continue >> nth=0');
await page.waitForTimeout(300);
console.log('after step7 url', page.url(), 'errors', errors);

await browser.close();
