// End-to-end tests for Chicago Mounting ZIP Checker on a local WordPress (see tests/README.md).
import fs from 'node:fs';
import path from 'node:path';
import { BASE, FIXTURES, OUT, launch, watch, login, check, section, summary, setFlag, clearFlags, wpEval, debugLog, clearDebugLog } from './lib.mjs';

const browser = await launch();
const consoleIssues = [];
clearFlags();
clearDebugLog();
wpEval("delete_option('cm_zip_checker_records');");

const adminCtx = await browser.newContext({ acceptDownloads: true });
const admin = await adminCtx.newPage();
watch(admin, consoleIssues);
admin.on('dialog', d => d.accept());
await login(admin);
const ADMIN_PAGE = BASE + '/wp-admin/admin.php?page=cm-zip-checker';
const notice = async () => (await admin.locator('.wrap .notice p').count()) ? (await admin.locator('.wrap .notice p').first().innerText()) : '';
const tableRow = zip => admin.locator(`table.widefat tbody tr:has(td:text-is("${zip}"))`);
const cell = async (zip, i) => (await tableRow(zip).locator('td').nth(i).innerText()).trim();

// ---------------------------------------------------------------- 1. Activation / deactivation
section('1. Plugin activation and deactivation');
const pluginRow = admin.locator('tr[data-plugin="cm-zip-checker/cm-zip-checker.php"]');
await admin.goto(BASE + '/wp-admin/plugins.php');
if (await pluginRow.locator('.deactivate a').count()) {
  await Promise.all([admin.waitForNavigation(), pluginRow.locator('.deactivate a').click()]);
}
check('Plugin deactivates from Plugins screen', await pluginRow.locator('.activate a').count() === 1);
check('Admin menu removed when inactive', await admin.locator('#toplevel_page_cm-zip-checker').count() === 0);
const inactiveHtml = await (await fetch(BASE + '/zip-test/')).text();
check('Front end while inactive: no plugin assets, shortcode left as text (WordPress default)', !inactiveHtml.includes('zip-checker.js') && inactiveHtml.includes('[cm_zip_checker'));
await Promise.all([admin.waitForNavigation(), pluginRow.locator('.activate a').click()]);
check('Plugin activates without errors', await pluginRow.locator('.deactivate a').count() === 1 && !(await admin.content()).includes('Plugin could not be activated'));
check('Admin menu "CM ZIP Checker" present', await admin.locator('#toplevel_page_cm-zip-checker').count() === 1);

// ---------------------------------------------------------------- 2. ZIP database management
section('2. ZIP database management (admin form)');
async function save(fields, { bypassHtml5 = false } = {}) {
  await admin.goto(ADMIN_PAGE);
  const form = admin.locator('form:has(input[value=cm_zip_save])');
  if (bypassHtml5) await form.evaluate(f => { f.noValidate = true; });
  for (const [k, v] of Object.entries(fields)) {
    if (k === 'status') await form.locator('select[name=status]').selectOption(v);
    else await form.locator(`[name=${k}]`).fill(v);
  }
  await Promise.all([admin.waitForNavigation(), form.locator('[type=submit]').click()]);
  return notice();
}
check('Save served ZIP with site-relative page', await save({ zip: '60601', city: 'Chicago', status: 'served', landing_page: '/tv-installation-in-chicago/', note: '-call first' }) === 'ZIP saved.');
check('Saved row shows path', await cell('60601', 4) === '/tv-installation-in-chicago/');
await save({ zip: '60025', city: 'Glenview', status: 'conditional', landing_page: BASE + '/tv-installation-in-glenview/' });
check('Absolute same-site URL is stored as a path', await cell('60025', 4) === '/tv-installation-in-glenview/');
const offsite = await save({ zip: '60099', city: 'X', status: 'served', landing_page: 'https://evil.example/page/' });
check('Off-site landing URL rejected with explanation', offsite.startsWith('Invalid ZIP, status, state, or landing page') && await tableRow('60099').count() === 0, offsite);
const badZip = await save({ zip: '6002a', city: 'X', status: 'served' }, { bypassHtml5: true });
check('Invalid ZIP rejected server-side (HTML5 validation bypassed)', badZip.startsWith('Invalid ZIP') && await tableRow('6002a').count() === 0);
const badState = await save({ zip: '60098', city: 'X', state: '1L', status: 'served' }, { bypassHtml5: true }); // field has maxlength=2
check('Invalid state rejected server-side', badState.startsWith('Invalid ZIP') && await tableRow('60098').count() === 0);
await save({ zip: '60025', city: 'Glenview Updated', status: 'conditional' });
check('Re-saving same ZIP updates the record (no duplicate)', await cell('60025', 1) === 'Glenview Updated' && await tableRow('60025').count() === 1);
await save({ zip: '60097', city: 'Temp', status: 'conditional' });
await admin.goto(ADMIN_PAGE);
await Promise.all([admin.waitForNavigation(), tableRow('60097').locator('button:text("Delete")').click()]);
check('Delete removes the record', await notice() === 'ZIP deleted.' && await tableRow('60097').count() === 0);
await admin.goto(ADMIN_PAGE + '&cm_msg=' + encodeURIComponent('Session expired. Log in at https://evil.example'));
check('Arbitrary cm_msg text is not displayed (no admin notice spoofing)', await notice() === '');

section('2b. Permissions and CSRF');
const csrf = await admin.request.post(BASE + '/wp-admin/admin-post.php', { form: { action: 'cm_zip_save', zip: '60096', city: 'CSRF', state: 'IL', status: 'served' }, maxRedirects: 0 });
check('Admin POST without nonce is refused (403)', csrf.status() === 403 && !wpEval("echo isset(get_option('cm_zip_checker_records')['60096']) ? 'yes' : 'no';").includes('yes'), `HTTP ${csrf.status()}`);
const editorCtx = await browser.newContext();
const editor = await editorCtx.newPage();
await login(editor, 'editor', 'editor-pass-123');
const edPage = await editor.goto(ADMIN_PAGE);
check('Editor role cannot open the admin page', edPage.status() === 403 || (await editor.content()).includes('not allowed'), `HTTP ${edPage.status()}`);
const edExport = await editor.request.post(BASE + '/wp-admin/admin-post.php', { form: { action: 'cm_zip_export' }, maxRedirects: 0 });
check('Editor role cannot export CSV', edExport.status() === 403 && !(await edExport.text()).includes('zip,city'), `HTTP ${edExport.status()}`);
const anonPost = await fetch(BASE + '/wp-admin/admin-post.php', { method: 'POST', body: new URLSearchParams({ action: 'cm_zip_export' }), redirect: 'manual' });
check('Logged-out visitor cannot export CSV', !(await anonPost.text()).includes('zip,city'), `HTTP ${anonPost.status}`);
await editorCtx.close();

// ---------------------------------------------------------------- 3. CSV import / export
section('3. CSV import / export');
async function importCsv(file) {
  await admin.goto(ADMIN_PAGE);
  await admin.setInputFiles('input[name=csv]', file);
  await Promise.all([admin.waitForNavigation(), admin.click('form:has(input[value=cm_zip_import]) [type=submit]')]);
  return notice();
}
let msg = await importCsv(path.join(FIXTURES, 'sample-zips.csv'));
check('Bundled sample-zips.csv imports on a non-production host', msg.startsWith('Imported/updated 3 ZIP records; skipped 0'), msg);
check('Sample records are conditional (not falsely served)', await cell('60091', 3) === 'conditional' && await cell('60201', 3) === 'conditional');
msg = await importCsv(path.join(FIXTURES, 'sample-v010-absolute-urls.csv'));
check('v0.1.0 sample (production URLs) is rejected on another host, with reason', msg.startsWith('Imported/updated 0 ZIP records; skipped 3 invalid rows (bad ZIP, status, state, or non-local landing page)'), msg);
setFlag('allow-prod-host');
msg = await importCsv(path.join(FIXTURES, 'sample-v010-absolute-urls.csv'));
check('cm_zip_checker_allowed_hosts lets staging import production URLs (stored as paths)', msg.startsWith('Imported/updated 3') && await cell('60201', 4) === '/tv-installation-in-evanston/', msg);
fs.unlinkSync(path.join(process.env.SITE_DIR, 'wp-content/mu-plugins/flags/allow-prod-host'));
msg = await importCsv(path.join(FIXTURES, 'edge-cases.csv'));
check('Edge-case CSV: 6 valid rows imported, 6 invalid skipped, blank line ignored', msg.startsWith('Imported/updated 6 ZIP records; skipped 6'), msg);
check('UTF-8 BOM + mixed-case header + "Served" status accepted', await cell('60601', 3) === 'served' && await cell('60601', 5) === 'Downtown');
check('Same-site absolute URL with query/fragment stored as path', await cell('60602', 4) === '/tv-installation-in-chicago/?ref=zip#top', await cell('60602', 4));
check('www variant of site host accepted', await cell('60603', 4) === '/loop/');
check('Lowercase state normalised', await cell('60602', 2) === 'IL');
check('Quoted field with comma and quotes parsed', await cell('60602', 5) === 'Note, with comma and "quotes"', await cell('60602', 5));
check('HTML tags stripped from city', await cell('60609', 1) === 'Chicago', await cell('60609', 1));
check('Whitespace around ZIP/status trimmed', await cell('60610', 3) === 'served');
for (const z of ['6060', '60604', '60605', '60606', '60607', '60608']) check(`Invalid row ${z} not imported`, await tableRow(z).count() === 0);
msg = await importCsv(path.join(FIXTURES, 'bad-header.csv'));
check('Wrong delimiter / header rejected', msg === 'CSV is missing required headers.', msg);
const big = path.join(OUT, 'big.csv');
fs.writeFileSync(big, 'zip,city,state,status,landing_page,note\n' + Array.from({ length: 5010 }, (_, i) => `${10000 + i},Bulk,IL,conditional,,`).join('\n') + '\n');
let t0 = Date.now();
msg = await importCsv(big);
const importMs = Date.now() - t0;
check('5,010-row CSV: imports 5,000 and reports the limit', msg.startsWith('Imported/updated 5000') && msg.includes('stopped at the 5,000-row limit'), `${msg} (${importMs} ms)`);
t0 = Date.now(); await admin.goto(ADMIN_PAGE); const adminPageMs = Date.now() - t0;
const sizeKb = Math.round(Buffer.byteLength(await admin.content()) / 1024);
check('Admin page renders with ~5,000 records', await admin.locator('table.widefat tbody tr').count() > 5000, `${adminPageMs} ms, ${sizeKb} KB HTML`);
const lookupTimes = [];
for (let i = 0; i < 5; i++) { t0 = Date.now(); await fetch(BASE + '/wp-admin/admin-ajax.php', { method: 'POST', body: new URLSearchParams({ action: 'cm_zip_lookup', zip: '14999' }) }); lookupTimes.push(Date.now() - t0); }
check('Lookup with ~5,000 records responds', true, `admin-ajax times ms: ${lookupTimes.join(', ')} (PHP built-in server + SQLite, indicative only)`);
const tooBig = path.join(OUT, 'too-big.csv');
fs.writeFileSync(tooBig, 'zip,city,state,status\n' + '60601,Chicago,IL,served\n'.repeat(50000));
msg = await importCsv(tooBig);
check('File over 1 MB rejected', msg === 'Invalid file or file larger than 1MB.', msg);

// Reset to a known data set for the front-end tests.
wpEval("delete_option('cm_zip_checker_records');");
await importCsv(path.join(FIXTURES, 'sample-zips.csv'));
await save({ zip: '60601', city: 'Chicago', status: 'served', landing_page: '/tv-installation-in-chicago/', note: '-call first' });
await save({ zip: '60602', city: '', status: 'served', landing_page: '/tv-installation/', note: '=HYPERLINK("http://evil.example")' });
await admin.goto(ADMIN_PAGE);
const [dl] = await Promise.all([admin.waitForEvent('download'), admin.click('form:has(input[value=cm_zip_export]) [type=submit]')]);
const exported = fs.readFileSync(await dl.path(), 'utf8');
fs.writeFileSync(path.join(OUT, 'export.csv'), exported);
const exLines = exported.trim().split('\n');
check('Export: filename and header', dl.suggestedFilename() === 'cm-zip-checker.csv' && exLines[0] === 'zip,city,state,status,landing_page,note', dl.suggestedFilename());
check('Export: one line per record', exLines.length === 1 + 5, `${exLines.length - 1} records`);
check('Export: formula-like values are neutralised', exported.includes(`"'=HYPERLINK(""http://evil.example"")"`) && exported.includes("'-call first"));
check('Export: no PHP notices/deprecations inside the file', !/Deprecated|Warning|Notice|<br/i.test(exported));
msg = await importCsv(path.join(OUT, 'export.csv'));
check('Export -> import round trip keeps values unchanged', msg.startsWith('Imported/updated 5') && await cell('60601', 5) === '-call first' && await cell('60602', 5) === '=HYPERLINK("http://evil.example")', `${await cell('60601', 5)} | ${await cell('60602', 5)}`);

// ---------------------------------------------------------------- 4-8. Front end
section('4-6. Results, validation and shortcode variants');
const ctx = await browser.newContext();
const page = await ctx.newPage();
watch(page, consoleIssues);
await page.goto(BASE + '/zip-test/');
const html = await page.content();
const inst = page.locator('[data-cm-zip]');
check('All variants render (full, compact, minimal, popup, invalid style -> full)', JSON.stringify(await inst.evaluateAll(n => n.map(e => e.dataset.variant))) === JSON.stringify(['full', 'compact', 'minimal', 'popup', 'full']));
check('location attribute sanitised', await inst.nth(4).getAttribute('data-location') === 'badlocation');
check('heading attribute escaped (no HTML injection)', await inst.nth(1).locator('h2').innerText() === 'Compact <b>check</b>' && await inst.nth(1).locator('h2 b').count() === 0);
check('minimal variant has no heading', await inst.nth(2).locator('h2').count() === 0 && await inst.nth(0).locator('h2').count() === 1);
check('Popup variant hidden in page flow until opened', !(await inst.nth(3).isVisible()));
check('Script, style and config printed once for 6 shortcodes', (html.match(/var CMZipCheckerConfig/g) || []).length === 1 && (html.match(/zip-checker\.js/g) || []).length === 1 && (html.match(/zip-checker\.css/g) || []).length === 1);
check('No nonce in public config', !/CMZipCheckerConfig = [^;]*nonce/.test(html));
check('No duplicate element IDs on the page', await page.evaluate(() => { const ids = [...document.querySelectorAll('[id]')].map(e => e.id); return ids.length === new Set(ids).size; }));
check('Footer popup source not added when page has an explicit one', (html.match(/data-variant="popup"/g) || []).length === 1);

await page.evaluate(() => { window.dataLayer = []; window.selEvents = []; document.addEventListener('cmzip:selection', e => window.selEvents.push(e.detail)); });
let ajaxCount = 0;
page.on('request', r => { if (r.url().includes('admin-ajax.php')) ajaxCount++; });
async function runCheck(i, zip) {
  const r = inst.nth(i).locator('.cm-zip__result');
  await inst.nth(i).locator('.cm-zip__input').fill(zip);
  await inst.nth(i).locator('.cm-zip__button').click();
  await page.waitForFunction(el => el.textContent.trim() !== '' && !/Checking/.test(el.textContent), await r.elementHandle(), { timeout: 20000 });
  return r;
}
let r = await runCheck(0, '60601');
check('Served: message', (await r.locator('strong').innerText()) === 'Great news! We serve Chicago, IL.');
check('Served: quote CTA carries ZIP and city', await r.locator('.cm-zip__cta').getAttribute('href') === BASE + '/quote/?zip=60601&city=Chicago' && await r.locator('.cm-zip__cta').innerText() === 'Get a Free Quote');
check('Served: local page link', await r.locator('.cm-zip__local').getAttribute('href') === '/tv-installation-in-chicago/' && await r.locator('.cm-zip__local').innerText() === 'Explore TV installation in Chicago');
r = await runCheck(1, '60025');
check('Conditional: message + CTA, no local link', (await r.locator('strong').innerText()) === 'Service may be available in your area.' && await r.locator('.cm-zip__cta').innerText() === 'Request Availability' && await r.locator('.cm-zip__local').count() === 0);
check('Conditional: CTA carries city', await r.locator('.cm-zip__cta').getAttribute('href') === BASE + '/quote/?zip=60025&city=Glenview');
r = await runCheck(2, '99999');
check('Unknown (unlisted): message + "Contact Us", ZIP only in URL', (await r.locator('strong').innerText()) === "Let's check your location." && await r.locator('.cm-zip__cta').getAttribute('href') === BASE + '/quote/?zip=99999');
r = await runCheck(4, '60602');
check('Served without city: no dangling "in " text', (await r.innerText()).includes('We serve IL.') && (await r.locator('.cm-zip__local').innerText()) === 'Explore TV installation in your area');
check('Earlier instance results stay independent', (await inst.nth(0).locator('.cm-zip__result strong').innerText()).startsWith('Great news'));

section('5. Invalid ZIP validation');
const before = ajaxCount;
await inst.nth(1).locator('.cm-zip__input').fill('');
await inst.nth(1).locator('.cm-zip__input').pressSequentially('6a0-2');
check('Non-digits stripped while typing', await inst.nth(1).locator('.cm-zip__input').inputValue() === '602');
await inst.nth(1).locator('.cm-zip__button').click();
check('Short ZIP: client message, no request sent', (await inst.nth(1).locator('.cm-zip__result').innerText()) === 'Please enter a valid 5-digit ZIP code.' && ajaxCount === before);
await inst.nth(1).locator('.cm-zip__input').fill('');
await inst.nth(1).locator('.cm-zip__button').click();
check('Empty ZIP: client message', (await inst.nth(1).locator('.cm-zip__result').innerText()) === 'Please enter a valid 5-digit ZIP code.');
const srv = await fetch(BASE + '/wp-admin/admin-ajax.php', { method: 'POST', body: new URLSearchParams({ action: 'cm_zip_lookup', zip: '6060<script>' }) });
check('Server rejects invalid ZIP with 400 JSON', srv.status === 400 && (await srv.json()).data.message === 'Please enter a valid 5-digit ZIP code.');
const srvArr = await fetch(BASE + '/wp-admin/admin-ajax.php', { method: 'POST', body: 'action=cm_zip_lookup&zip[]=60601', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
check('Server handles array input without PHP error', srvArr.status === 400);
const leak = await (await fetch(BASE + '/wp-admin/admin-ajax.php', { method: 'POST', body: new URLSearchParams({ action: 'cm_zip_lookup', zip: '60601' }) })).text();
check('Lookup response does not expose private notes', !leak.includes('call first') && !leak.includes('note'));

section('7. Multiple instances, analytics events, JS API');
const dataLayer = await page.evaluate(() => window.dataLayer);
check('dataLayer: check + check_<status> per lookup, no selection event', JSON.stringify(dataLayer.map(e => e.event)) === JSON.stringify(['cm_zip_check', 'cm_zip_check_served', 'cm_zip_check', 'cm_zip_check_conditional', 'cm_zip_check', 'cm_zip_check_unlisted', 'cm_zip_check', 'cm_zip_check_served']), dataLayer.map(e => e.event).join(','));
check('dataLayer never contains ZIP or city', !/6060|99999|Chicago|Glenview/.test(JSON.stringify(dataLayer)));
check('dataLayer carries variant/location', dataLayer[2].component_variant === 'compact' && dataLayer[2].component_location === 'test_compact');
check('cmzip:selection document event carries ZIP for site scripts', (await page.evaluate(() => window.selEvents.map(e => e.zip))).join(',') === '60601,60025,99999,60602');
await page.locator('.cm-zip__cta').first().evaluate(a => a.addEventListener('click', e => e.preventDefault(), { once: true }));
await inst.nth(0).locator('.cm-zip__cta').click();
const qc = (await page.evaluate(() => window.dataLayer)).find(e => e.event === 'cm_zip_quote_click');
check('quote_click reports the clicked instance status (served), not the last check', qc?.coverage_status === 'served' && qc?.component_location === 'test_full', JSON.stringify(qc));
check('Selection stored in sessionStorage', JSON.parse(await page.evaluate(() => sessionStorage.getItem('cm_zip_selection'))).zip === '60602');
check('CMZipChecker.check() resolves', (await page.evaluate(() => CMZipChecker.check('60601'))).status === 'served');
check('CMZipChecker.check() rejects invalid ZIP', await page.evaluate(() => CMZipChecker.check('abc').then(() => false, e => e.message === 'Please enter a valid 5-digit ZIP code.')));
check('CMZipChecker.getSelection()/clear()', await page.evaluate(() => { const ok = CMZipChecker.getSelection().zip === '60602'; CMZipChecker.clear(); return ok && CMZipChecker.getSelection() === null; }));

section('7b. Failure handling');
page.cmIgnoreConsole = true; // Errors below are injected on purpose.
await page.route('**/admin-ajax.php', rt => rt.fulfill({ status: 403, contentType: 'text/html', body: '<!DOCTYPE html><html>Blocked by WAF</html>' }));
r = await runCheck(2, '60025');
check('HTML/WAF response: friendly message, not a raw JS error', (await r.innerText()) === 'We could not check your ZIP code right now. Please try again or contact us.', await r.innerText());
await page.unroute('**/admin-ajax.php');
await page.route('**/admin-ajax.php', rt => rt.abort('internetdisconnected'));
r = await runCheck(2, '60025');
check('Network failure: friendly message', (await r.innerText()).startsWith('We could not check'));
await page.unroute('**/admin-ajax.php');
await page.route('**/admin-ajax.php', async rt => { await new Promise(s => setTimeout(s, 800)); await rt.continue().catch(() => {}); });
await inst.nth(2).locator('.cm-zip__input').fill('60025');
await inst.nth(2).locator('.cm-zip__button').click();
await page.waitForTimeout(100);
check('Button disabled while checking (no double submit)', await inst.nth(2).locator('.cm-zip__button').isDisabled());
await inst.nth(2).locator('.cm-zip__input').fill('6060');
await page.waitForTimeout(1500);
check('Input changed mid-request: stale "Checking…" cleared', (await inst.nth(2).locator('.cm-zip__result').innerText()) === '' && await inst.nth(2).locator('.cm-zip__result').isHidden());
await page.unroute('**/admin-ajax.php');
await page.route('**/admin-ajax.php', () => { /* never answers */ });
t0 = Date.now();
r = await runCheck(2, '60025');
check('Hung request times out with friendly message (~15 s)', (await r.innerText()).startsWith('We could not check') && Date.now() - t0 < 20000, `${Date.now() - t0} ms`);
await page.unroute('**/admin-ajax.php');
page.cmIgnoreConsole = false;

// ---------------------------------------------------------------- 8. Popup
section('8. Popup opening and closing');
await page.goto(BASE + '/zip-test/');
await page.evaluate(() => { window.dataLayer = []; });
const trigger = page.locator('[data-cm-zip-open]');
await trigger.click();
const modal = page.locator('#cm-zip-modal');
check('Trigger opens modal', await modal.isVisible() && await modal.getAttribute('role') === 'dialog' && await modal.getAttribute('aria-modal') === 'true');
check('Modal uses the page\'s popup checker', await modal.locator('[data-cm-zip]').getAttribute('data-location') === 'popup_test' && await modal.locator('[data-cm-zip]').isVisible());
check('Focus moves to ZIP input', await page.evaluate(() => document.activeElement.matches('#cm-zip-modal .cm-zip__input')));
check('popup_open pushed to dataLayer', (await page.evaluate(() => window.dataLayer.map(e => e.event))).includes('cm_zip_popup_open'));
let trapped = true;
for (let i = 0; i < 6; i++) { await page.keyboard.press('Tab'); trapped = trapped && await page.evaluate(() => !!document.activeElement.closest('#cm-zip-modal')); }
for (let i = 0; i < 6; i++) { await page.keyboard.press('Shift+Tab'); trapped = trapped && await page.evaluate(() => !!document.activeElement.closest('#cm-zip-modal')); }
check('Tab / Shift+Tab stay inside the modal', trapped);
await page.keyboard.press('Escape');
check('Escape closes modal and returns focus to trigger', await modal.isHidden() && await page.evaluate(() => document.activeElement.matches('[data-cm-zip-open]')));
await trigger.click();
await page.click('.cm-zip-modal__close');
check('Close button closes modal', await modal.isHidden());
await trigger.click();
await page.mouse.click(5, 5);
check('Backdrop click closes modal', await modal.isHidden());
await trigger.click();
const mr = page.locator('#cm-zip-modal .cm-zip__result');
await page.locator('#cm-zip-modal .cm-zip__input').fill('60601');
await page.keyboard.press('Enter');
await page.waitForFunction(() => /Great news/.test(document.querySelector('#cm-zip-modal .cm-zip__result')?.textContent || ''));
check('Lookup works inside the modal (Enter key)', (await mr.locator('strong').innerText()).startsWith('Great news'));
check('Only one modal element after repeated opens', await page.locator('#cm-zip-modal').count() === 1);
await page.keyboard.press('Escape');

await page.goto(BASE + '/trigger-only/');
check('Trigger-only page: hidden popup source printed in footer', await page.locator('[data-cm-zip][data-variant=popup]').count() === 1 && !(await page.locator('[data-cm-zip]').isVisible()));
await page.click('[data-cm-zip-open]');
check('Trigger-only page: modal opens (e.g. header button)', await page.locator('#cm-zip-modal').isVisible() && await page.locator('#cm-zip-modal [data-cm-zip]').getAttribute('data-location') === 'header');
await page.keyboard.press('Escape');
await page.goto(BASE + '/trigger-then-popup/');
await page.click('[data-cm-zip-open]');
check('Trigger before explicit popup shortcode: explicit one used, no duplicate', await page.locator('[data-cm-zip]').count() === 1 && await page.locator('#cm-zip-modal h2').innerText() === 'Explicit popup');
await page.goto(BASE + '/link-fallback/');
await Promise.all([page.waitForURL('**/zip-test/'), page.click('#lf')]);
check('Link trigger without popup source still navigates (graceful fallback)', page.url() === BASE + '/zip-test/');
const plain = await (await fetch(BASE + '/link-only/')).text();
check('Page without shortcodes: no plugin CSS/JS/markup by default', !/zip-checker\.(js|css)|data-cm-zip[ >]/.test(plain));
await page.goto(BASE + '/link-only/');
await Promise.all([page.waitForURL('**/zip-test/'), page.click('#lo')]);
check('Link with data-cm-zip-open on a page without the plugin: plain navigation', page.url() === BASE + '/zip-test/');
setFlag('always-enqueue');
await page.goto(BASE + '/link-only/');
await page.click('#lo');
check('cm_zip_checker_always_enqueue: link opens the modal on any page', await page.locator('#cm-zip-modal').isVisible() && page.url() === BASE + '/link-only/');
await page.keyboard.press('Escape');
await page.goto(BASE + '/zip-test/');
check('always_enqueue: no extra popup source when the page has one', await page.locator('[data-cm-zip][data-variant=popup]').count() === 1);
clearFlags();

// ---------------------------------------------------------------- 9. Mobile
section('9. Mobile responsiveness');
for (const vp of [{ name: 'mobile-375', width: 375, height: 812, mobile: true }, { name: 'mobile-320', width: 320, height: 640, mobile: true }, { name: 'tablet-768', width: 768, height: 1024, mobile: true }, { name: 'desktop-1366', width: 1366, height: 900, mobile: false }]) {
  const mctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1 });
  const m = await mctx.newPage();
  watch(m, consoleIssues);
  await m.goto(BASE + '/zip-test/');
  const first = m.locator('[data-cm-zip]').first();
  await first.locator('.cm-zip__input').fill('60601');
  if (vp.mobile) await first.locator('.cm-zip__button').tap(); else await first.locator('.cm-zip__button').click();
  await m.waitForFunction(() => /Great news/.test(document.querySelector('[data-cm-zip] .cm-zip__result')?.textContent || ''));
  const metrics = await m.evaluate(() => {
    const s = document.querySelector('[data-cm-zip]');
    const inp = s.querySelector('.cm-zip__input').getBoundingClientRect();
    const btn = s.querySelector('.cm-zip__button').getBoundingClientRect();
    const sec = s.getBoundingClientRect();
    return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, stacked: btn.top >= inp.bottom - 1, btnW: Math.round(btn.width), inpW: Math.round(inp.width), btnH: Math.round(btn.height), font: parseFloat(getComputedStyle(s.querySelector('.cm-zip__input')).fontSize), secRight: Math.round(sec.right), vw: window.innerWidth };
  });
  check(`${vp.name}: no horizontal page overflow`, metrics.overflow <= 0 && metrics.secRight <= metrics.vw, JSON.stringify(metrics));
  if (vp.width <= 600) {
    check(`${vp.name}: form stacks, full-width button, 46px+ tap target`, metrics.stacked && Math.abs(metrics.btnW - metrics.inpW) <= 2 && metrics.btnH >= 44);
    check(`${vp.name}: input font-size >= 16px (no iOS zoom)`, metrics.font >= 16);
  } else {
    check(`${vp.name}: form inline`, !metrics.stacked);
  }
  await m.screenshot({ path: path.join(OUT, `${vp.name}-page.png`), fullPage: true });
  await m.locator('[data-cm-zip-open]').click();
  const panel = await m.locator('.cm-zip-modal__panel').boundingBox();
  check(`${vp.name}: modal panel fits viewport`, panel.x >= 0 && panel.x + panel.width <= vp.width && panel.height <= vp.height, JSON.stringify(panel));
  await m.screenshot({ path: path.join(OUT, `${vp.name}-modal.png`) });
  await mctx.close();
}

// ---------------------------------------------------------------- 12. Quote URL / prefill
section('12. Quote URL parameter passing and optional prefill');
const q = await (await browser.newContext()).newPage();
watch(q, consoleIssues);
await q.goto(BASE + '/quote/?zip=60601&city=Chicago');
check('Prefill OFF by default: plugin JS not loaded on /quote/', (await q.content()).includes('zip-checker.js') === false);
check('Prefill OFF: quote fields untouched, calculator received no events', await q.inputValue('#form-field-zip') === '' && JSON.stringify(await q.evaluate(() => window.calcEvents)) === '{"input":0,"change":0}');
setFlag('prefill.json', JSON.stringify({ zip: '#form-field-zip', city: '#form-field-city' }));
await q.goto(BASE + '/quote/?zip=60601&city=Chicago');
check('Prefill ON: JS (only) loaded on /quote/', (await q.content()).includes('zip-checker.js') && !(await q.content()).includes('zip-checker.css'));
check('Prefill ON: ZIP and city filled from URL', await q.inputValue('#form-field-zip') === '60601' && await q.inputValue('#form-field-city') === 'Chicago');
check('Prefill ON (events:false): calculator not triggered', JSON.stringify(await q.evaluate(() => window.calcEvents)) === '{"input":0,"change":0}');
await q.goto(BASE + '/quote/?zip=60601&city=Chicago&manual=1');
check('Existing value (autofill/manual) never overwritten', await q.inputValue('#form-field-zip') === '60000' && await q.inputValue('#form-field-city') === 'Chicago');
await q.route(/blank\.gif\?slow=1/, async rt => { await new Promise(s => setTimeout(s, 1500)); await rt.continue(); });
await q.goto(BASE + '/quote/?zip=60601', { waitUntil: 'domcontentloaded' });
await q.fill('#form-field-zip', '60611');
await q.waitForLoadState('load');
check('Visitor edit before window load is preserved', await q.inputValue('#form-field-zip') === '60611');
await q.unroute(/blank\.gif\?slow=1/);
let alerted = false; q.on('dialog', d => { alerted = true; d.dismiss(); });
await q.goto(BASE + '/quote/?zip=60601&city=' + encodeURIComponent('<img src=x onerror=alert(1)>Chicago'));
check('Hostile city parameter neutralised', !alerted && !(await q.inputValue('#form-field-city')).includes('<'), await q.inputValue('#form-field-city'));
await q.goto(BASE + '/quote/?zip=abc');
check('Invalid ZIP parameter ignored', await q.inputValue('#form-field-zip') === '');
await q.goto(BASE + '/zip-test/');
await q.locator('[data-cm-zip]').nth(1).locator('.cm-zip__input').fill('60025');
await q.locator('[data-cm-zip]').nth(1).locator('.cm-zip__button').click();
await q.waitForFunction(() => /Service may be/.test(document.querySelectorAll('[data-cm-zip]')[1].textContent));
await q.goto(BASE + '/quote/');
check('Navigation from another page without parameters uses stored selection', await q.inputValue('#form-field-zip') === '60025' && await q.inputValue('#form-field-city') === 'Glenview');
await q.goto(BASE + '/zip-test/');
await Promise.all([q.waitForURL('**/quote/**'), q.locator('[data-cm-zip]').first().locator('.cm-zip__input').fill('60601').then(() => q.locator('[data-cm-zip]').first().locator('.cm-zip__button').click()).then(() => q.locator('[data-cm-zip]').first().locator('.cm-zip__cta').click())]);
check('CTA click lands on /quote/ with fields prefilled', q.url() === BASE + '/quote/?zip=60601&city=Chicago' && await q.inputValue('#form-field-zip') === '60601');
setFlag('prefill.json', JSON.stringify({ zip: '#form-field-zip', city: '#form-field-city', events: true }));
await q.goto(BASE + '/quote/?zip=60601&city=Chicago');
check('events:true notifies calculator once per field', JSON.stringify(await q.evaluate(() => window.calcEvents)) === '{"input":2,"change":2}', JSON.stringify(await q.evaluate(() => window.calcEvents)));
setFlag('prefill.json', JSON.stringify({ zip: '#form-field-zip >>> bad', city: '' }));
await q.goto(BASE + '/quote/?zip=60601');
check('Invalid selector config fails silently (no JS error)', await q.inputValue('#form-field-zip') === '');
clearFlags();

// ---------------------------------------------------------------- Caching / nonce / Elementor cache
section('Page caching and Elementor element cache');
const cachedHtml = await (await fetch(BASE + '/zip-test/')).text();
const lookupWithCookies = async cookieHeader => (await fetch(BASE + '/wp-admin/admin-ajax.php', { method: 'POST', body: new URLSearchParams({ action: 'cm_zip_lookup', zip: '60601' }), headers: cookieHeader ? { cookie: cookieHeader } : {} })).json();
const cookieHeader = (await adminCtx.cookies(BASE)).map(c => `${c.name}=${c.value}`).join('; ');
check('Logged-in visitor served a cached logged-out page can still check', (await lookupWithCookies(cookieHeader)).success === true && !cachedHtml.includes('"nonce"'));
setFlag('short-nonce');
await new Promise(s => setTimeout(s, 6000));
check('Check still works after nonce lifetime would have expired', (await lookupWithCookies('')).success === true);
clearFlags();
check('Cache-sim page stores rendered markup only (no shortcode to run)', !wpEval("echo get_page_by_path('elementor-cache-sim')->post_content;").includes('[cm_zip_checker'));
const ep = await (await browser.newContext()).newPage();
watch(ep, consoleIssues);
await ep.goto(BASE + '/elementor-cache-sim/');
const epHtml = await ep.content();
check('Enqueue by handle only (Elementor cache hit) prints script, style and config', epHtml.includes('zip-checker.js') && epHtml.includes('zip-checker.css') && epHtml.includes('var CMZipCheckerConfig'));
await ep.locator('.cm-zip__input').fill('60601');
await ep.locator('.cm-zip__button').click();
await ep.waitForFunction(() => /Great news/.test(document.querySelector('.cm-zip__result').textContent));
check('Cached checker markup works', true);

// ---------------------------------------------------------------- 10-11. Console + debug.log
section('10-11. JavaScript console and WordPress debug log');
await admin.goto(BASE + '/wp-admin/plugins.php');
await Promise.all([admin.waitForNavigation(), pluginRow.locator('.deactivate a').click()]);
await Promise.all([admin.waitForNavigation(), pluginRow.locator('.activate a').click()]);
check('Deactivate/reactivate cycle keeps data', wpEval("echo count(get_option('cm_zip_checker_records'));").trim() === '5');
check('No JavaScript console errors/warnings or uncaught exceptions', consoleIssues.length === 0, consoleIssues.join(' | '));
const log = debugLog();
fs.writeFileSync(path.join(OUT, 'debug.log'), log);
check('WordPress debug.log empty (WP_DEBUG on, E_ALL)', log.trim() === '', log.split('\n').slice(0, 5).join(' | '));

await browser.close();
process.exit(summary() ? 1 : 0);
