import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const BASE = process.env.BASE_URL || 'http://127.0.0.1:8899';
export const SITE = process.env.SITE_DIR;
export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const FIXTURES = path.resolve(HERE, '../fixtures');
export const OUT = process.env.OUT_DIR || '/tmp/cmzip-e2e';
fs.mkdirSync(OUT, { recursive: true });
if (!SITE) { console.error('Set SITE_DIR to the local WordPress root.'); process.exit(2); }
export const FLAGS = path.join(SITE, 'wp-content/mu-plugins/flags');
fs.mkdirSync(FLAGS, { recursive: true });

export function setFlag(name, content = '') { fs.writeFileSync(path.join(FLAGS, name), content); }
export function clearFlags() { for (const f of fs.readdirSync(FLAGS)) fs.unlinkSync(path.join(FLAGS, f)); }
export function wpEval(code) {
  return execFileSync('php', [path.resolve(HERE, '../env/wp-eval.php'), SITE, code], { encoding: 'utf8' });
}
export function debugLog() {
  const f = path.join(SITE, 'wp-content/debug.log');
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
}
export function clearDebugLog() { fs.writeFileSync(path.join(SITE, 'wp-content/debug.log'), ''); }

export async function launch() {
  return chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
}
// Collects console errors/warnings and uncaught exceptions; resources outside the local site are ignored
// (the test container has no internet access, so e.g. external fonts fail for unrelated reasons).
export function watch(page, bucket) {
  page.on('console', m => {
    if (page.cmIgnoreConsole || !['error', 'warning'].includes(m.type())) return;
    const url = m.location()?.url || '';
    if (url && !url.startsWith(BASE)) return;
    bucket.push(`[console.${m.type()}] ${m.text()} @ ${page.url()}`);
  });
  page.on('pageerror', e => page.cmIgnoreConsole || bucket.push(`[pageerror] ${e.message} @ ${page.url()}`));
}
export async function login(page, user = 'admin', pass = 'admin-pass-123') {
  await page.goto(BASE + '/wp-login.php');
  await page.fill('#user_login', user);
  await page.fill('#user_pass', pass);
  await Promise.all([page.waitForNavigation(), page.click('#wp-submit')]);
}

let passed = 0, failed = 0;
export const results = [];
export function check(name, cond, extra = '') {
  cond ? passed++ : failed++;
  const line = `${cond ? 'PASS' : 'FAIL'}  ${name}${extra !== '' ? '  — ' + extra : ''}`;
  results.push(line); console.log(line);
}
export function section(title) { const l = `\n## ${title}`; results.push(l); console.log(l); }
export function summary() {
  const l = `\n${passed} passed, ${failed} failed`;
  results.push(l); console.log(l);
  fs.writeFileSync(path.join(OUT, 'results.txt'), results.join('\n') + '\n');
  return failed;
}
