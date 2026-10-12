// Prints the observable behaviour behind each review finding (lines starting with "D-").
// Run against v0.1.0 to reproduce the defects and against v0.2.0 to confirm the fixes:
//   SITE_DIR=... node e2e/repro-findings.mjs
import { BASE, FIXTURES, OUT, launch, watch, login, setFlag, clearFlags, wpEval } from './lib.mjs';
import fs from 'node:fs';

const fixtures = FIXTURES;
clearFlags();
wpEval("delete_option('cm_zip_checker_records');");
const out = (k, v) => console.log(`${k}: ${v}`);
const browser = await launch();
const logs = [];

// --- Admin: activation, sample import, save records ---
const admin = await (await browser.newContext()).newPage();
watch(admin, logs);
await login(admin);
await admin.goto(BASE + '/wp-admin/plugins.php');
const row = admin.locator('tr[data-plugin="cm-zip-checker/cm-zip-checker.php"]');
if (await row.locator('.activate a').count()) {
  await Promise.all([admin.waitForNavigation(), row.locator('.activate a').click()]);
}
out('activated', await row.locator('.deactivate a').count() === 1);

await admin.goto(BASE + '/wp-admin/admin.php?page=cm-zip-checker');
// Each version's own bundled sample file.
await admin.setInputFiles('input[name=csv]', process.env.SITE_DIR + '/wp-content/plugins/cm-zip-checker/sample-zips.csv');
await Promise.all([admin.waitForNavigation(), admin.click('form:has(input[value=cm_zip_import]) [type=submit]')]);
out('D-import sample CSV on non-production host', await admin.locator('.notice p').innerText());

async function save(zip, city, status, landing = '') {
  await admin.goto(BASE + '/wp-admin/admin.php?page=cm-zip-checker');
  await admin.fill('input[name=zip]', zip);
  await admin.fill('input[name=city]', city);
  await admin.selectOption('select[name=status]', status);
  await admin.fill('input[name=landing_page]', landing);
  await admin.fill('input[name=note]', '-call first');
  await Promise.all([admin.waitForNavigation(), admin.click('form:has(input[value=cm_zip_save]) [type=submit]')]);
  return admin.locator('.notice p').innerText();
}
out('save 60601 served', await save('60601', 'Chicago', 'served', BASE + '/tv-installation-in-chicago/'));
out('save 60025 conditional', await save('60025', 'Glenview', 'conditional'));

// Message spoofing via cm_msg
await admin.goto(BASE + '/wp-admin/admin.php?page=cm-zip-checker&cm_msg=' + encodeURIComponent('Session expired. Re-enter your password at https://evil.example'));
out('D-cm_msg spoofing (text shown in admin notice)', (await admin.locator('.wrap .notice p').count()) ? await admin.locator('.wrap .notice p').innerText() : '(no notice)');

// Export / re-import round trip
const [dl] = await Promise.all([admin.waitForEvent('download'), admin.click('form:has(input[value=cm_zip_export]) [type=submit]')]);
const csv = fs.readFileSync(await dl.path(), 'utf8');
out('export CSV', JSON.stringify(csv));
fs.writeFileSync(OUT + '/exported.csv', csv);
await admin.goto(BASE + '/wp-admin/admin.php?page=cm-zip-checker');
await admin.setInputFiles('input[name=csv]', OUT + '/exported.csv');
await Promise.all([admin.waitForNavigation(), admin.click('form:has(input[value=cm_zip_import]) [type=submit]')]);
const noteCell = await admin.locator('tr:has(td:text-is("60601")) td').nth(5).innerText();
out('D-note after export->import round trip (was "-call first")', JSON.stringify(noteCell));

// --- Front end ---
const ctx = await browser.newContext();
const page = await ctx.newPage();
watch(page, logs);
await page.goto(BASE + '/zip-test/');
const html = await page.content();
out('D-CMZipCheckerConfig localized N times in HTML', (html.match(/var CMZipCheckerConfig/g) || []).length);
const popupSrc = page.locator('[data-cm-zip][data-variant=popup]');
out('D-popup variant visible inline before opening', await popupSrc.isVisible());
out('instances on page', await page.locator('[data-cm-zip]').count());

// served / conditional / unlisted / invalid in different instances
const inst = page.locator('[data-cm-zip]');
async function check(i, zip) {
  const r = inst.nth(i).locator('.cm-zip__result');
  await inst.nth(i).locator('.cm-zip__input').fill(zip);
  await inst.nth(i).locator('.cm-zip__button').click();
  await page.waitForFunction(el => !/Checking/.test(el.textContent) && el.textContent.trim() !== '', await r.elementHandle());
  return (await r.innerText()).replace(/\s+/g, ' ');
}
await page.evaluate(() => { window.dataLayer = []; });
out('served (full)', await check(0, '60601'));
out('unlisted (compact)', await check(1, '99999'));
out('quote href (full)', await inst.nth(0).locator('.cm-zip__cta').getAttribute('href'));
await inst.nth(0).locator('.cm-zip__cta').evaluate(a => a.addEventListener('click', e => e.preventDefault(), { once: true }));
await inst.nth(0).locator('.cm-zip__cta').click();
const dl1 = await page.evaluate(() => window.dataLayer);
out('dataLayer events', dl1.map(e => e.event).join(','));
out('D-quote_click from "served" instance reports coverage_status', dl1.find(e => e.event === 'cm_zip_quote_click')?.coverage_status);

// Raw error shown on non-JSON response (WAF/challenge page)
await page.route('**/admin-ajax.php', r => r.fulfill({ status: 403, contentType: 'text/html', body: '<!DOCTYPE html><html>Blocked</html>' }));
out('D-message on HTML 403 response', await check(2, '60025'));
await page.unroute('**/admin-ajax.php');

// Stale "Checking…" when input changes during request
await page.route('**/admin-ajax.php', async r => { await new Promise(s => setTimeout(s, 800)); await r.continue(); });
const r2 = inst.nth(2).locator('.cm-zip__result');
await inst.nth(2).locator('.cm-zip__input').fill('60025');
await inst.nth(2).locator('.cm-zip__button').click();
await page.waitForTimeout(100);
await inst.nth(2).locator('.cm-zip__input').fill('6060');
await page.waitForTimeout(1500);
out('D-result text after input changed mid-request', JSON.stringify(await r2.innerText()));
await page.unroute('**/admin-ajax.php');

// Popup trigger without popup source on the page
await page.goto(BASE + '/trigger-only/');
await page.click('[data-cm-zip-open]');
out('D-trigger-only page: modal exists after click', await page.locator('#cm-zip-modal').count());

// Popup on zip-test page
await page.goto(BASE + '/zip-test/');
await page.click('[data-cm-zip-open]');
out('modal visible after click', await page.locator('#cm-zip-modal').isVisible());
out('focus in modal input', await page.evaluate(() => document.activeElement?.matches('#cm-zip-modal input')));
await page.keyboard.press('Escape');
out('modal hidden after Escape', await page.locator('#cm-zip-modal').isHidden());

// Page-cached HTML: logged-in visitor, and a nonce older than its lifetime (4 s life simulates >24 h).
const cached = await (await fetch(BASE + '/zip-test/')).text();
const nonce = (cached.match(/"nonce":"([a-f0-9]+)"/) || [])[1] || '';
const cookies = (await admin.context().cookies(BASE)).map(c => `${c.name}=${c.value}`).join('; ');
const ask = async headers => { const r = await fetch(BASE + '/wp-admin/admin-ajax.php', { method: 'POST', headers, body: new URLSearchParams({ action: 'cm_zip_lookup', nonce, zip: '60601' }) }); return `HTTP ${r.status} ${await r.text()}`; };
out('D-logged-in visitor using cached page', await ask({ cookie: cookies }));
setFlag('short-nonce');
const cached2 = await (await fetch(BASE + '/zip-test/')).text();
const nonce2 = (cached2.match(/"nonce":"([a-f0-9]+)"/) || [])[1] || '';
await new Promise(s => setTimeout(s, 6000));
const expired = await fetch(BASE + '/wp-admin/admin-ajax.php', { method: 'POST', body: new URLSearchParams({ action: 'cm_zip_lookup', nonce: nonce2, zip: '60601' }) });
out('D-cached page after nonce lifetime', `HTTP ${expired.status} ${await expired.text()}`);
clearFlags();
// Elementor element-cache hit: handles enqueued by name only.
if (wpEval("echo get_page_by_path('elementor-cache-sim')->post_content;").includes('[cm_zip_checker')) throw new Error('cache-sim page must not contain a shortcode');
const sim = await (await fetch(BASE + '/elementor-cache-sim/')).text();
out('D-Elementor cache hit loads script+config', sim.includes('zip-checker.js') && sim.includes('CMZipCheckerConfig'));
out('console/page errors', JSON.stringify(logs));
await browser.close();
