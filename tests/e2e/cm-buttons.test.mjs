// v0.2.2: the checker's buttons must look and behave like chicagomounting.com's "btn btn-primary btn-md" out of the box.
// Reference = <a class="btn btn-primary btn-md"> styled by the real theme CSS (verbatim excerpt), on the same page.
// Usage: SITE_DIR=... node e2e/cm-buttons.test.mjs
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import { BASE, OUT, launch, watch, check, section, summary, setFlag, clearFlags, wpEval, debugLog, clearDebugLog } from './lib.mjs';

const KEYS = ['display', 'alignItems', 'justifyContent', 'boxSizing', 'backgroundColor', 'color', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderBottomWidth', 'borderBottomColor', 'borderTopLeftRadius', 'borderBottomRightRadius', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'textTransform', 'textDecorationLine', 'whiteSpace', 'minHeight', 'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'cursor', 'boxShadow', 'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'transform', 'opacity'];
const STATE = ['backgroundColor', 'borderTopColor', 'color', 'transform'];
const VIEWPORTS = [['desktop-1280', { width: 1280, height: 900 }, false], ['tablet-768', { width: 768, height: 1024 }, true], ['mobile-375', { width: 375, height: 812 }, true]];
const inst = loc => `[data-cm-zip][data-location="${loc}"]`;
const BUTTONS = { full: `${inst('m_full')} .cm-zip__button`, compact: `${inst('m_compact')} .cm-zip__button`, minimal: `${inst('m_minimal')} .cm-zip__button`, trigger: '.cm-zip-trigger' };

const browser = await launch();
const issues = [];
clearFlags();
clearDebugLog();
wpEval("require_once ABSPATH.'wp-admin/includes/plugin.php'; activate_plugin('cm-zip-checker/cm-zip-checker.php');");
wpEval("update_option('cm_zip_checker_records', ['60601'=>['zip'=>'60601','city'=>'Chicago','state'=>'IL','status'=>'served','landing_page'=>'/tv-installation-in-chicago/','note'=>''],'60025'=>['zip'=>'60025','city'=>'Glenview','state'=>'IL','status'=>'conditional','landing_page'=>'','note'=>'']], false);");
fs.rmSync(path.join(process.env.SITE_DIR, 'wp-content/uploads/cm-zip-checker/custom.css'), { force: true });

async function open(viewport, mobile) {
  const page = await (await browser.newContext({ viewport, isMobile: mobile, hasTouch: mobile })).newPage();
  watch(page, issues);
  await page.goto(BASE + '/cm-match/');
  return page;
}
const css = (page, sel) => page.locator(sel).first().evaluate((el, keys) => { const s = getComputedStyle(el); return Object.fromEntries(keys.map(k => [k, s[k]])); }, KEYS);
// A button inside the flex form is blockified (inline-flex computes as flex): same rendering, so treat them as equal.
const norm = (k, v) => (k === 'display' && v === 'flex' ? 'inline-flex' : v);
const diff = (a, b, keys = KEYS) => keys.filter(k => norm(k, a[k]) !== norm(k, b[k])).map(k => `${k}: ${a[k]} ≠ ${b[k]}`);
const rest = async page => { await page.mouse.move(1, 1); await page.evaluate(() => document.activeElement && document.activeElement.blur()); await page.waitForTimeout(400); };
async function hover(page, sel) { await page.locator(sel).first().hover(); await page.waitForTimeout(400); const s = await css(page, sel); await rest(page); return s; }
async function keyFocus(page, sel) {
  await rest(page);
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    if (await page.locator(sel).first().evaluate(el => el === document.activeElement)) {
      await page.waitForTimeout(400);
      const s = await page.locator(sel).first().evaluate((el, keys) => { const c = getComputedStyle(el); return { ...Object.fromEntries(keys.map(k => [k, c[k]])), outline: `${c.outlineStyle} ${c.outlineWidth}` }; }, KEYS);
      await rest(page);
      return s;
    }
  }
  throw new Error('Tab never reached ' + sel);
}
async function runCheck(page, loc, zip) {
  await page.locator(`${inst(loc)} .cm-zip__input`).fill(zip);
  await page.locator(`${inst(loc)} .cm-zip__button`).click();
  await page.waitForFunction(sel => { const r = document.querySelector(sel); return r && r.textContent.trim() && !/Checking/.test(r.textContent); }, `${inst(loc)} .cm-zip__result`);
  await rest(page);
}
// Pixel comparison of two elements with the same label: same size (±1px), and < 1% of pixels differing by more than
// 48/255. The two elements sit at different sub-pixel offsets on the page, so the best of ±1px shifts is used.
async function pixels(page, selA, selB, name) {
  await rest(page);
  const a = PNG.sync.read(await page.locator(selA).first().screenshot({ animations: 'disabled' }));
  const b = PNG.sync.read(await page.locator(selB).first().screenshot({ animations: 'disabled' }));
  fs.writeFileSync(path.join(OUT, `${name}-site.png`), PNG.sync.write(a));
  fs.writeFileSync(path.join(OUT, `${name}-plugin.png`), PNG.sync.write(b));
  if (Math.abs(a.width - b.width) > 1 || Math.abs(a.height - b.height) > 1) return { ok: false, info: `size ${a.width}x${a.height} vs ${b.width}x${b.height}` };
  const w = Math.min(a.width, b.width) - 2, h = Math.min(a.height, b.height) - 2;
  let best = Infinity;
  for (const dx of [-1, 0, 1]) for (const dy of [-1, 0, 1]) {
    let bad = 0;
    for (let y = 1; y < h; y++) for (let x = 1; x < w; x++) {
      const i = (y * a.width + x) * 4, j = ((y + dy) * b.width + x + dx) * 4;
      if (Math.max(Math.abs(a.data[i] - b.data[j]), Math.abs(a.data[i + 1] - b.data[j + 1]), Math.abs(a.data[i + 2] - b.data[j + 2])) > 48) bad++;
    }
    best = Math.min(best, 100 * bad / (w * h));
  }
  return { ok: best < 1, info: `${a.width}x${a.height} vs ${b.width}x${b.height}, ${best.toFixed(2)}% pixels differ` };
}

const snapshots = {};
for (const [scenario, flags] of [['CM theme', ['theme-css']], ['CM theme + Elementor kit button/field globals', ['theme-css', 'kit-globals']], ['no theme CSS (other site)', []]]) {
  clearFlags();
  flags.forEach(f => setFlag(f));
  for (const [vpName, vp, mobile] of VIEWPORTS) {
    section(`${scenario} — ${vpName}`);
    const page = await open(vp, mobile);
    const key = `${scenario}|${vpName}`;
    const ref = scenario.startsWith('no theme') ? snapshots[`CM theme|${vpName}`].ref : await css(page, '#ref');
    const refHover = scenario.startsWith('no theme') ? snapshots[`CM theme|${vpName}`].refHover : await hover(page, '#ref');
    snapshots[key] = { ref, refHover, buttons: {} };
    if (flags.includes('kit-globals')) check('Kit fixture is active (plain <button> restyled by Elementor globals)', (await css(page, '#kit-probe')).backgroundColor === 'rgb(30, 58, 138)');
    for (const [name, sel] of Object.entries(BUTTONS)) {
      const s = await css(page, sel);
      snapshots[key].buttons[name] = s;
      const d = diff(ref, s); // width is not compared: full width on phones is layout
      check(`${name} button computes like the site's btn btn-primary btn-md`, d.length === 0, d.join('; '));
      const h = await hover(page, sel);
      const dh = diff(refHover, h, STATE);
      check(`${name} button hover = site hover (#3F8104 + 2px lift)`, dh.length === 0, dh.join('; '));
    }
    // Popup variant: open the modal and compare its Check button.
    await page.click('.cm-zip-trigger');
    await page.waitForTimeout(400);
    const pop = await css(page, '#cm-zip-modal .cm-zip__button');
    const dp = diff(ref, pop);
    check('popup (modal) button computes like the site button', dp.length === 0, dp.join('; '));
    const closeBtn = await css(page, '#cm-zip-modal .cm-zip-modal__close');
    check('Modal close (×) stays a plain icon button', closeBtn.backgroundColor === 'rgba(0, 0, 0, 0)' && closeBtn.borderTopStyle === 'none' && closeBtn.boxShadow === 'none', `${closeBtn.backgroundColor} ${closeBtn.borderTopStyle} ${closeBtn.boxShadow}`);
    await page.keyboard.press('Escape');
    await rest(page);
    // Result CTA (link) after a served lookup.
    await runCheck(page, 'm_full', '60601');
    const cta = await css(page, `${inst('m_full')} .cm-zip__cta`);
    const dc = diff(ref, cta);
    check('Result CTA computes like the site button', dc.length === 0, dc.join('; '));
    const ch = await hover(page, `${inst('m_full')} .cm-zip__cta`);
    check('Result CTA hover = site hover', diff(refHover, ch, STATE).length === 0, diff(refHover, ch, STATE).join('; '));
    // Keyboard focus: same look as the site's hover/focus state, plus a visible ring (the theme removes outlines on links).
    const kf = await keyFocus(page, BUTTONS.full);
    check('Keyboard focus: hover look + visible 2px ring', diff(refHover, kf, STATE).length === 0 && kf.outline === 'solid 2px', `${diff(refHover, kf, STATE).join('; ')} outline=${kf.outline}`);
    // Mouse click must not leave the button in the hover/lift state.
    await page.locator(BUTTONS.compact).click();
    await page.mouse.move(1, 1);
    await page.waitForTimeout(400);
    const afterClick = await css(page, BUTTONS.compact);
    check('After a mouse click the button returns to normal (no stuck hover)', diff(ref, afterClick, STATE).length === 0, diff(ref, afterClick, STATE).join('; '));
    // Disabled while checking.
    await page.route('**/admin-ajax.php', async r => { await new Promise(s => setTimeout(s, 800)); await r.continue().catch(() => {}); });
    await page.locator(`${inst('m_compact')} .cm-zip__input`).fill('60025');
    await page.locator(BUTTONS.compact).click();
    await page.mouse.move(1, 1);
    await page.waitForTimeout(350);
    const dis = await css(page, BUTTONS.compact);
    check('Disabled while checking: dimmed, no lift, wait cursor', dis.opacity === '0.65' && dis.transform === 'none' && dis.cursor === 'wait', `${dis.opacity} ${dis.transform} ${dis.cursor}`);
    await page.unroute('**/admin-ajax.php');
    await page.waitForTimeout(900);
    // ZIP field lines up with the button.
    const fieldRow = await page.evaluate(sel => { const box = s => document.querySelector(sel + ' ' + s).getBoundingClientRect(); const i = box('.cm-zip__input'), b = box('.cm-zip__button'); return { ih: Math.round(i.height), bh: Math.round(b.height), stacked: b.top >= i.bottom - 1, bw: Math.round(b.width), iw: Math.round(i.width), overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }; }, inst('m_full'));
    check('ZIP field height = button height, no horizontal overflow', fieldRow.ih === fieldRow.bh && fieldRow.overflow <= 0, JSON.stringify(fieldRow));
    if (vpName === 'mobile-375') check('Phone: form stacked, Check button full width', fieldRow.stacked && Math.abs(fieldRow.bw - fieldRow.iw) <= 2);
    else check('Wider screens: field and button side by side', !fieldRow.stacked);
    const inp = await page.locator(`${inst('m_full')} .cm-zip__input`).evaluate(el => { const s = getComputedStyle(el); return `${s.borderTopStyle} ${s.borderTopWidth} ${s.borderTopColor} ${s.backgroundColor} ${s.fontSize}`; });
    snapshots[key].input = inp;
    // Pixel comparison against the real site button with the same label.
    if (scenario === 'CM theme') {
      if (vpName !== 'mobile-375') { const p = await pixels(page, '#ref', BUTTONS.full, `${vpName}-check`); check('Pixel match: Check button vs site button "Check Service Area"', p.ok, p.info); }
      const p2 = await pixels(page, '#ref-cta', `${inst('m_full')} .cm-zip__cta`, `${vpName}-cta`);
      check('Pixel match: result CTA vs site button "Get a Free Quote"', p2.ok, p2.info);
      await page.screenshot({ path: path.join(OUT, `cm-match-${vpName}.png`), fullPage: true });
    }
    await page.context().close();
  }
}

section('Elementor kit globals do not leak into the checker');
for (const [vpName] of VIEWPORTS) {
  const a = snapshots[`CM theme|${vpName}`], b = snapshots[`CM theme + Elementor kit button/field globals|${vpName}`];
  const bad = Object.keys(a.buttons).map(n => [n, diff(a.buttons[n], b.buttons[n])]).filter(([, d]) => d.length);
  check(`${vpName}: buttons identical with and without kit globals`, bad.length === 0, bad.map(([n, d]) => `${n}: ${d.join(',')}`).join(' | '));
  check(`${vpName}: ZIP field identical with and without kit globals`, a.input === b.input, `${a.input} vs ${b.input}`);
  const c = snapshots[`no theme CSS (other site)|${vpName}`];
  const badC = Object.keys(a.buttons).map(n => [n, diff(a.buttons[n], c.buttons[n])]).filter(([, d]) => d.length);
  check(`${vpName}: same look without the theme CSS (self-contained plugin)`, badC.length === 0, badC.map(([n, d]) => `${n}: ${d.join(',')}`).join(' | '));
}

section('Brand colour follows the Elementor global accent');
clearFlags(); setFlag('theme-css');
{
  const page = await open({ width: 1280, height: 900 }, false);
  await page.addStyleTag({ content: 'body{--e-global-color-accent:#123456}' });
  await page.waitForTimeout(400);
  const btn = await css(page, BUTTONS.full), ref = await css(page, '#ref');
  check('Accent set on <body> (as Elementor does) reaches site and plugin buttons alike', btn.backgroundColor === 'rgb(18, 52, 86)' && ref.backgroundColor === btn.backgroundColor && btn.borderTopColor === ref.borderTopColor, `${btn.backgroundColor} / ${ref.backgroundColor}`);
  await page.context().close();
}

section('Console and debug.log');
check('No console errors/warnings', issues.length === 0, issues.join(' | '));
check('debug.log empty', debugLog().trim() === '', debugLog().slice(0, 300));
clearFlags();
await browser.close();
process.exit(summary() ? 1 : 0);
