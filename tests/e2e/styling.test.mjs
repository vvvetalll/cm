// Styling: theme classes, site-wide defaults, the site stylesheet layer, and the proposed theme patch.
// (Default look vs. the real site buttons: cm-buttons.test.mjs.)
// Usage: SITE_DIR=... node e2e/styling.test.mjs   (needs a site built by env/bootstrap.sh)
import fs from 'node:fs';
import path from 'node:path';
import { BASE, SITE, HERE, OUT, launch, watch, check, section, summary, setFlag, clearFlags, wpEval, debugLog, clearDebugLog } from './lib.mjs';

const CUSTOM = path.join(SITE, 'wp-content/uploads/cm-zip-checker/custom.css');
const GREEN = 'rgb(99, 182, 0)', HOVER_THEME = 'rgb(63, 129, 4)', WHITE = 'rgb(255, 255, 255)', DARK = 'rgb(41, 43, 38)';
const LIFT = 'matrix(1, 0, 0, 1, 0, -2)';
const PROPS = ['display', 'backgroundColor', 'color', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderTopLeftRadius', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'textTransform', 'textDecorationLine', 'whiteSpace', 'minHeight', 'height', 'paddingTop', 'paddingLeft', 'marginTop', 'marginLeft', 'boxShadow', 'transform', 'opacity', 'cursor', 'outlineStyle', 'outlineWidth', 'outlineColor'];

const SITE_CSS = '.cm-zip,.cm-zip-trigger,.cm-zip-modal{--cmz-primary:#123456;--cmz-primary-hover:#0a1f33}.cm-zip .cm-zip__button{border-radius:0}.cm-zip .cm-zip__heading{color:rgb(1, 2, 3)}';
const browser = await launch();
const issues = [];
clearFlags();
clearDebugLog();
const useCustom = content => { if (content === null) { fs.rmSync(CUSTOM, { force: true }); } else { fs.mkdirSync(path.dirname(CUSTOM), { recursive: true }); fs.writeFileSync(CUSTOM, content); } };
useCustom(null);
wpEval("require_once ABSPATH.'wp-admin/includes/plugin.php'; activate_plugin('cm-zip-checker/cm-zip-checker.php');");
wpEval("update_option('cm_zip_checker_records', ['60601'=>['zip'=>'60601','city'=>'Chicago','state'=>'IL','status'=>'served','landing_page'=>'/tv-installation-in-chicago/','note'=>''],'60025'=>['zip'=>'60025','city'=>'Glenview','state'=>'IL','status'=>'conditional','landing_page'=>'','note'=>'']], false);");

async function open(url, viewport = { width: 1280, height: 900 }, mobile = false) {
  const ctx = await browser.newContext({ viewport, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  watch(page, issues);
  await page.goto(BASE + url);
  return page;
}
const css = (page, sel) => page.locator(sel).first().evaluate((el, props) => { const s = getComputedStyle(el); return Object.fromEntries(props.map(p => [p, s[p]])); }, PROPS);
const cls = (page, sel) => page.locator(sel).first().getAttribute('class');
const inst = loc => `[data-cm-zip][data-location="${loc}"]`;
async function runCheck(page, loc, zip) {
  await page.locator(`${inst(loc)} .cm-zip__input`).fill(zip);
  await page.locator(`${inst(loc)} .cm-zip__button`).click();
  await page.waitForFunction(sel => { const r = document.querySelector(sel); return r && r.textContent.trim() && !/Checking/.test(r.textContent); }, `${inst(loc)} .cm-zip__result`);
}
async function hovered(page, sel) { await page.locator(sel).first().hover(); await page.waitForTimeout(400); const s = await css(page, sel); await page.mouse.move(1, 1); await page.waitForTimeout(400); return s; }
async function tabTo(page, sel) {
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  for (let i = 0; i < 60; i++) { await page.keyboard.press('Tab'); if (await page.locator(sel).first().evaluate(el => el === document.activeElement)) return css(page, sel); }
  throw new Error('could not reach ' + sel + ' with Tab');
}
const same = (a, b, keys = PROPS) => keys.filter(k => a[k] !== b[k]).map(k => `${k}: ${a[k]} → ${b[k]}`);

// ------------------------------------------------------------------------------------------------
section('1. Default markup (no theme classes, no site stylesheet)');
{
  const page = await open('/styling/');
  await runCheck(page, 'plain', '60601');
  const html1 = await page.content();
  check('Default markup: functional classes only', html1.includes('class="cm-zip__button" type="submit"') && html1.includes('class="cm-zip__input" type="text"') && /class="cm-zip__cta" href/.test(html1));
  check('No site stylesheet → only base layer printed', (html1.match(/zip-checker\.css/g) || []).length === 1 && !html1.includes('cm-zip-checker-custom-css'));
  await page.context().close();
}

// ------------------------------------------------------------------------------------------------
section('2. Theme class attributes (escaping, sanitising, functional classes kept)');
let page = await open('/styling/');
let html = await page.content();
check('button_class appended after plugin class + marker', await cls(page, `${inst('themed')} .cm-zip__button`) === 'cm-zip__button cm-zip-themed btn btn-primary btn-md');
check('input_class appended', await cls(page, `${inst('themed')} .cm-zip__input`) === 'cm-zip__input cm-zip-themed cm-test-input');
check('cta_class passed to the instance', await page.locator(inst('themed')).getAttribute('data-cta-class') === 'btn btn-outline btn-md');
check('Attribute injection neutralised (no onclick, no alert)', await page.locator('[onclick]').count() === 0 && !html.includes('alert(1)') && await cls(page, `${inst('evil')} .cm-zip__button`) === 'cm-zip__button');
check('Invalid tokens (markup, "hover:", quotes) dropped, duplicates removed', await page.locator(inst('evil')).getAttribute('data-cta-class') === 'btn');
check('Empty input_class = no theme class', await cls(page, `${inst('evil')} .cm-zip__input`) === 'cm-zip__input');
check('Popup button_class on trigger', await cls(page, '[data-cm-zip-open]') === 'cm-zip-trigger cm-zip-themed btn btn-primary btn-sm');
check('Without theme CSS, themed controls drop the plugin look (no fight)', (await css(page, `${inst('themed')} .cm-zip__button`)).backgroundColor !== GREEN && (await css(page, `${inst('themed')} .cm-zip__input`)).height !== '46px');
await page.evaluate(() => { window.dataLayer = []; });
await runCheck(page, 'themed', '60601');
check('Served CTA gets cta_class', await cls(page, `${inst('themed')} .cm-zip__cta`) === 'cm-zip__cta cm-zip-themed btn btn-outline btn-md');
await runCheck(page, 'themed', '60025');
check('Conditional CTA gets cta_class', await cls(page, `${inst('themed')} .cm-zip__cta`) === 'cm-zip__cta cm-zip-themed btn btn-outline btn-md');
await runCheck(page, 'themed', '99999');
check('Unlisted CTA gets cta_class', await cls(page, `${inst('themed')} .cm-zip__cta`) === 'cm-zip__cta cm-zip-themed btn btn-outline btn-md');
await runCheck(page, 'evil', '60601');
check('Sanitised cta_class on CTA', await cls(page, `${inst('evil')} .cm-zip__cta`) === 'cm-zip__cta cm-zip-themed btn');
await page.locator(`${inst('themed')} .cm-zip__cta`).evaluate(a => a.addEventListener('click', e => e.preventDefault(), { once: true }));
await page.locator(`${inst('themed')} .cm-zip__cta`).click();
const dl = await page.evaluate(() => window.dataLayer.map(e => `${e.event}:${e.coverage_status || ''}:${e.component_location || ''}`));
check('Lookup, events and quote_click unaffected', dl.includes('cm_zip_check_served:served:themed') && dl.includes('cm_zip_quote_click:unlisted:themed'), dl.join(','));
await page.click('[data-cm-zip-open]');
check('Themed trigger still opens the popup', await page.locator('#cm-zip-modal').isVisible());
await page.context().close();

section('3. Site-wide defaults (cm_zip_checker_default_classes)');
setFlag('default-classes.json', JSON.stringify({ button: 'btn btn-primary btn-md', cta: 'btn btn-primary btn-md', input: 'cm-default-input', trigger: 'btn btn-outline btn-sm' }));
page = await open('/styling/');
check('Defaults applied to an instance without attributes', await cls(page, `${inst('plain')} .cm-zip__button`) === 'cm-zip__button cm-zip-themed btn btn-primary btn-md' && await cls(page, `${inst('plain')} .cm-zip__input`) === 'cm-zip__input cm-zip-themed cm-default-input' && await page.locator(inst('plain')).getAttribute('data-cta-class') === 'btn btn-primary btn-md');
check('Shortcode attributes override defaults', await cls(page, `${inst('themed')} .cm-zip__button`) === 'cm-zip__button cm-zip-themed btn btn-primary btn-md' && await page.locator(inst('themed')).getAttribute('data-cta-class') === 'btn btn-outline btn-md' && await cls(page, `${inst('themed')} .cm-zip__input`) === 'cm-zip__input cm-zip-themed cm-test-input');
check('Empty attribute opts an instance out of a default', await cls(page, `${inst('optout')} .cm-zip__button`) === 'cm-zip__button' && await page.locator(inst('optout')).getAttribute('data-cta-class') === null && await cls(page, `${inst('optout')} .cm-zip__input`) === 'cm-zip__input cm-zip-themed cm-default-input');
await page.context().close();
page = await open('/trigger-only/');
check('Trigger and footer popup source use defaults', await cls(page, '[data-cm-zip-open]') === 'cm-zip-trigger cm-zip-themed btn btn-outline btn-sm' && await cls(page, '[data-variant=popup] .cm-zip__button') === 'cm-zip__button cm-zip-themed btn btn-primary btn-md');
await page.click('[data-cm-zip-open]');
check('Popup opens and checks with default classes', await page.locator('#cm-zip-modal').isVisible());
await page.context().close();
fs.unlinkSync(path.join(SITE, 'wp-content/mu-plugins/flags/default-classes.json'));

// ------------------------------------------------------------------------------------------------
section('4. Proposed theme patch (button.btn) — regression');
const REG = ['#r-link-primary', '#r-link-outline', '#r-link-light', '#r-link-readmore', '#r-el-primary', '#r-el-plain', '#r-el-submit', '#r-plain', '#r-submit', '#r-woo', '#r-woo-btn', '#r-btn-primary', '#r-btn-outline', '#r-btn-disabled'];
const UNRELATED = REG.filter(id => !id.startsWith('#r-btn-'));
async function regSnapshot(url, viewport, mobile) {
  const p = await open(url, viewport, mobile);
  const out = {};
  for (const id of REG) out[id] = await css(p, id);
  await p.context().close();
  return out;
}
setFlag('theme-css');
for (const [label, vp, mobile] of [['desktop', { width: 1280, height: 900 }, false], ['mobile-375', { width: 375, height: 812 }, true]]) {
  const before = await regSnapshot('/theme-regression/', vp, mobile);
  setFlag('theme-patch');
  const after = await regSnapshot('/theme-regression/', vp, mobile);
  fs.unlinkSync(path.join(SITE, 'wp-content/mu-plugins/flags/theme-patch'));
  for (const id of UNRELATED) { const d = same(before[id], after[id]); check(`${label}: patch leaves ${id} unchanged`, d.length === 0, d.join('; ')); }
  check(`${label}: without patch <button class="btn btn-primary"> is not styled`, before['#r-btn-primary'].backgroundColor !== GREEN);
  const KEYS = ['display', 'backgroundColor', 'color', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderTopLeftRadius', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'textTransform', 'whiteSpace', 'minHeight', 'height', 'paddingTop', 'paddingLeft'];
  const d1 = same(after['#r-link-primary'], after['#r-btn-primary'], KEYS);
  check(`${label}: button.btn.btn-primary.btn-md matches a.btn.btn-primary.btn-md`, d1.length === 0, d1.join('; '));
  const d2 = same(after['#r-link-outline'], after['#r-btn-outline'], KEYS);
  check(`${label}: button.btn.btn-outline.btn-sm matches a.btn.btn-outline.btn-sm`, d2.length === 0, d2.join('; '));
  check(`${label}: disabled button dimmed`, after['#r-btn-disabled'].opacity === '0.65');
}
setFlag('theme-patch');
page = await open('/theme-regression/');
const lh = await hovered(page, '#r-link-primary'), bh = await hovered(page, '#r-btn-primary');
check('Hover: button matches link (#3F8104, lifted)', bh.backgroundColor === HOVER_THEME && lh.backgroundColor === HOVER_THEME && bh.transform === LIFT && lh.transform === LIFT);
const dh = await hovered(page, '#r-btn-disabled');
check('Hover on disabled button: no lift', dh.transform === 'none');
const bf = await tabTo(page, '#r-btn-primary');
check('Keyboard focus on button.btn: visible 2px ring', bf.outlineStyle === 'solid' && bf.outlineWidth === '2px', `${bf.outlineStyle} ${bf.outlineWidth} ${bf.outlineColor}`);
await page.context().close();
page = await open('/theme-regression/');
await page.locator('#r-btn-primary').click();
await page.mouse.move(1, 1); await page.waitForTimeout(400);
check('Mouse click does not leave the button lifted', (await css(page, '#r-btn-primary')).transform === 'none');
await page.context().close();

section('5. Plugin CSS does not change theme / Elementor buttons');
useCustom(SITE_CSS);
for (const [label, vp, mobile] of [['desktop', { width: 1280, height: 900 }, false], ['mobile-375', { width: 375, height: 812 }, true]]) {
  const without = await regSnapshot('/theme-regression/', vp, mobile);
  const withPlugin = await regSnapshot('/theme-regression-plugin/', vp, mobile);
  const bad = REG.map(id => [id, same(without[id], withPlugin[id])]).filter(([, d]) => d.length);
  check(`${label}: theme, Elementor and WooCommerce controls identical with checker + site stylesheet on the page`, bad.length === 0, bad.map(([id, d]) => `${id} ${d.join(',')}`).join(' | '));
}

section('6. Theme classes with Chicago Mounting theme CSS + patch');
useCustom(null);
page = await open('/styling/');
let b = await css(page, `${inst('themed')} .cm-zip__button`);
check('Check button takes theme btn-primary btn-md (accent, 52px, uppercase 14px/600, 8px)', b.backgroundColor === GREEN && b.minHeight === '52px' && b.textTransform === 'uppercase' && b.fontSize === '14px' && b.fontWeight === '600' && b.borderTopLeftRadius === '8px' && b.borderTopWidth === '2px', JSON.stringify(b));
const bhov = await hovered(page, `${inst('themed')} .cm-zip__button`);
check('Theme hover on check button', bhov.backgroundColor === HOVER_THEME && bhov.transform === LIFT);
await runCheck(page, 'themed', '60601');
const c = await css(page, `${inst('themed')} .cm-zip__cta`);
check('CTA takes theme btn-outline btn-md', c.backgroundColor === 'rgba(0, 0, 0, 0)' && c.color === GREEN && c.borderTopWidth === '2px' && c.minHeight === '52px' && c.textTransform === 'uppercase', JSON.stringify(c));
const cf = await tabTo(page, `${inst('themed')} .cm-zip__cta`);
check('Keyboard focus visible on themed CTA although theme sets a.btn:focus{outline:none}', cf.outlineStyle === 'solid' && cf.outlineWidth === '2px');
await page.route('**/admin-ajax.php', async r => { await new Promise(s => setTimeout(s, 700)); await r.continue().catch(() => {}); });
await page.locator(`${inst('themed')} .cm-zip__input`).fill('60025');
await page.locator(`${inst('themed')} .cm-zip__button`).click();
await page.waitForTimeout(150);
const bd = await css(page, `${inst('themed')} .cm-zip__button`);
check('Disabled state while checking', bd.opacity === '0.65', bd.opacity);
await page.unroute('**/admin-ajax.php');
await page.context().close();
page = await open('/styling/', { width: 375, height: 812 }, true);
const m = await page.evaluate(sel => { const r = s => document.querySelector(s).getBoundingClientRect(); return { b: r(sel + ' .cm-zip__button').width, i: r(sel + ' .cm-zip__input').width, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, minH: getComputedStyle(document.querySelector(sel + ' .cm-zip__button')).minHeight, radius: getComputedStyle(document.querySelector(sel + ' .cm-zip__button')).borderTopLeftRadius }; }, inst('themed'));
check('Mobile: themed button full width, theme mobile size (42px, 4px), no overflow', Math.abs(m.b - m.i) <= 2 && m.overflow <= 0 && m.minH === '42px' && m.radius === '4px', JSON.stringify(m));
await page.screenshot({ path: path.join(OUT, 'themed-375.png'), fullPage: true });
await page.context().close();

section('7. Elementor Text Editor link rule vs. CTA');
page = await open('/text-editor/');
await runCheck(page, 'in_text_editor', '60601');
const te = await css(page, `${inst('in_text_editor')} .cm-zip__cta`);
check('Default CTA inside Text Editor stays readable (white, no underline) despite theme !important link rule', te.color === WHITE && te.textDecorationLine === 'none', `${te.color} ${te.textDecorationLine}`);
await runCheck(page, 'in_shortcode_widget', '60601');
const sw = await css(page, `${inst('in_shortcode_widget')} .cm-zip__cta`);
check('Themed CTA in Shortcode widget uses theme button colours', sw.color === WHITE && sw.backgroundColor === GREEN);
await page.context().close();
clearFlags();

// ------------------------------------------------------------------------------------------------
section('8. Site stylesheet layer (other sites / own tweaks)');
useCustom(SITE_CSS);
page = await open('/styling/');
html = await page.content();
const mtime = Math.floor(fs.statSync(CUSTOM).mtimeMs / 1000);
check('Site stylesheet loaded after base, cache-busted by file time', html.indexOf('cm-zip-checker-base-css') > -1 && html.indexOf('cm-zip-checker-base-css') < html.indexOf('cm-zip-checker-custom-css') && html.includes(`custom.css?ver=${mtime}`));
b = await css(page, `${inst('plain')} .cm-zip__button`);
check('Tokens and same-selector rules override the base without !important', b.backgroundColor === 'rgb(18, 52, 86)' && b.borderTopLeftRadius === '0px' && (await css(page, `${inst('plain')} .cm-zip__heading`)).color === 'rgb(1, 2, 3)', JSON.stringify(b));
const sh = await hovered(page, `${inst('plain')} .cm-zip__button`);
check('Overridden hover colour', sh.backgroundColor === 'rgb(10, 31, 51)');
check('Themed controls are not restyled by the site stylesheet', (await css(page, `${inst('themed')} .cm-zip__button`)).backgroundColor !== 'rgb(18, 52, 86)');
const btf = await tabTo(page, `${inst('plain')} .cm-zip__button`);
check('Keyboard focus ring kept', btf.outlineStyle === 'solid' && btf.outlineWidth === '2px');
await page.context().close();
const plain = await (await fetch(BASE + '/theme-regression/')).text();
check('Not loaded on pages without the checker', !plain.includes('zip-checker.css') && !plain.includes('custom.css'));
const sim = await (await fetch(BASE + '/elementor-cache-sim/')).text();
check('Elementor cache hit (enqueue by handle) loads base + site layers', sim.includes('cm-zip-checker-base-css') && sim.includes('cm-zip-checker-custom-css'));
useCustom(null);
page = await open('/styling/');
check('Missing site stylesheet: base only, checker works', !(await page.content()).includes('cm-zip-checker-custom-css') && (await runCheck(page, 'plain', '60601'), (await page.locator(`${inst('plain')} .cm-zip__result strong`).innerText()).startsWith('Great news')));
await page.context().close();

section('9. Console and debug.log');
check('No console errors/warnings', issues.length === 0, issues.join(' | '));
check('debug.log empty', debugLog().trim() === '', debugLog().slice(0, 300));
clearFlags();
await browser.close();
process.exit(summary() ? 1 : 0);
