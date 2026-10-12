// Installs a plugin ZIP through Plugins → Add New → Upload, then upgrades it with "Replace current with uploaded".
// Usage: SITE_DIR=... node e2e/upgrade.test.mjs <old-v0.1.0.zip> <new.zip>
import { BASE, launch, watch, login, check, section, summary, wpEval, debugLog, clearDebugLog } from './lib.mjs';

const [oldZip, newZip] = process.argv.slice(2);
const browser = await launch();
const issues = [];
const page = await (await browser.newContext()).newPage();
watch(page, issues);
page.on('dialog', d => d.accept());
clearDebugLog();
await login(page);

async function upload(zip) {
  await page.goto(BASE + '/wp-admin/plugin-install.php?tab=upload');
  await page.setInputFiles('#pluginzip', zip);
  await Promise.all([page.waitForNavigation(), page.click('#install-plugin-submit')]);
  const overwrite = page.locator('a.update-from-upload-overwrite');
  if (await overwrite.count()) await Promise.all([page.waitForNavigation(), overwrite.click()]);
  return page.locator('.wrap').innerText();
}
const version = () => wpEval("require_once ABSPATH.'wp-admin/includes/plugin.php'; $p=get_plugin_data(WP_PLUGIN_DIR.'/cm-zip-checker/cm-zip-checker.php'); echo $p['Version'].'|'.(is_plugin_active('cm-zip-checker/cm-zip-checker.php')?'active':'inactive');").trim();

section('Package install and upgrade from v0.1.0');
wpEval("delete_option('cm_zip_checker_records');");
let out = await upload(oldZip);
check('v0.1.0 ZIP installs via Upload Plugin', /successfully/i.test(out), version());
if (version().endsWith('inactive')) { await page.goto(BASE + '/wp-admin/plugins.php'); await Promise.all([page.waitForNavigation(), page.locator('tr[data-plugin="cm-zip-checker/cm-zip-checker.php"] .activate a').click()]); }
check('v0.1.0 active', version() === '0.1.0|active', version());
// Data as v0.1.0 stores it: absolute landing-page URL.
await page.goto(BASE + '/wp-admin/admin.php?page=cm-zip-checker');
await page.fill('input[name=zip]', '60601');
await page.fill('input[name=city]', 'Chicago');
await page.selectOption('select[name=status]', 'served');
await page.fill('input[name=landing_page]', BASE + '/tv-installation-in-chicago/');
await Promise.all([page.waitForNavigation(), page.click('form:has(input[value=cm_zip_save]) [type=submit]')]);
check('v0.1.0 stored an absolute URL', wpEval("echo get_option('cm_zip_checker_records')['60601']['landing_page'];").trim() === BASE + '/tv-installation-in-chicago/');

out = await upload(newZip);
check('New ZIP replaces v0.1.0 ("Replace current with uploaded")', /successfully/i.test(out), out.split('\n').filter(Boolean).slice(-3).join(' | '));
check('Upgraded plugin version and still active', version() === '0.2.0|active', version());
check('Records preserved across upgrade', wpEval("echo count(get_option('cm_zip_checker_records'));").trim() === '1');

const front = await (await browser.newContext()).newPage();
watch(front, issues);
await front.goto(BASE + '/zip-test/');
await front.locator('.cm-zip__input').first().fill('60601');
await front.locator('.cm-zip__button').first().click();
await front.waitForFunction(() => /Great news/.test(document.querySelector('.cm-zip__result').textContent));
check('Legacy absolute landing URL still produces the local link', await front.locator('.cm-zip__local').first().getAttribute('href') === BASE + '/tv-installation-in-chicago/');

await page.goto(BASE + '/wp-admin/admin.php?page=cm-zip-checker');
await page.fill('input[name=zip]', '60601');
await page.fill('input[name=city]', 'Chicago');
await page.selectOption('select[name=status]', 'served');
await page.fill('input[name=landing_page]', BASE + '/tv-installation-in-chicago/');
await Promise.all([page.waitForNavigation(), page.click('form:has(input[value=cm_zip_save]) [type=submit]')]);
check('Re-saving a legacy record normalises it to a path', wpEval("echo get_option('cm_zip_checker_records')['60601']['landing_page'];").trim() === '/tv-installation-in-chicago/');

check('No console errors', issues.length === 0, issues.join(' | '));
check('debug.log empty', debugLog().trim() === '', debugLog().slice(0, 300));
await browser.close();
process.exit(summary() ? 1 : 0);
