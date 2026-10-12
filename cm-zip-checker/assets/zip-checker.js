(() => {
  'use strict';
  const cfg = window.CMZipCheckerConfig || {};
  const GENERIC_ERROR = 'We could not check your ZIP code right now. Please try again or contact us.';
  let lastSelection = null;
  let previousFocus = null;
  // Errors whose message is safe and meaningful to show to visitors.
  class LookupError extends Error {}
  const escapeHTML = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const quoteLink = (zip, city) => {
    const u = new URL(cfg.quoteUrl || '/quote/', window.location.href);
    u.searchParams.set('zip', zip);
    if (city) u.searchParams.set('city', city);
    return u.href;
  };
  // Theme classes for the result CTA (set by the shortcode); same token rule as sanitize_html_class().
  const ctaClass = root => {
    const extra = String(root.dataset.ctaClass || '').split(/\s+/).filter(c => /^[A-Za-z0-9_-]+$/.test(c)).join(' ');
    return extra ? 'cm-zip__cta cm-zip-themed ' + extra : 'cm-zip__cta';
  };
  const isLocalUrl = url => {
    try { return !!url && new URL(url, window.location.href).origin === window.location.origin; } catch (e) { return false; }
  };
  const storedSelection = () => {
    if (lastSelection) return {...lastSelection};
    try { return JSON.parse(sessionStorage.getItem('cm_zip_selection') || 'null'); } catch (e) { return null; }
  };
  const fire = (name, detail, toDataLayer = true) => {
    document.dispatchEvent(new CustomEvent('cmzip:' + name, {detail}));
    // GTM only. Do not additionally call gtag. ZIP and city are never pushed to the dataLayer.
    if (toDataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push({event:'cm_zip_' + name, component_variant:detail.variant || '', component_location:detail.location || '', coverage_status:detail.status || ''});
  };
  const lookup = async zip => {
    if (!/^\d{5}$/.test(zip)) throw new LookupError('Please enter a valid 5-digit ZIP code.');
    const data = new URLSearchParams({action:'cm_zip_lookup', zip});
    const ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), 15000) : 0;
    let res, json;
    try {
      res = await fetch(cfg.ajaxUrl, {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}, body:data.toString(), credentials:'same-origin', signal:ctrl ? ctrl.signal : undefined});
      json = await res.json();
    } catch (e) {
      // Network failure, timeout, or a non-JSON reply (WAF/CDN challenge page, PHP notice output).
      throw new LookupError(GENERIC_ERROR);
    } finally { clearTimeout(timer); }
    if (!res.ok || !json || !json.success) throw new LookupError(json?.data?.message || GENERIC_ERROR);
    return json.data;
  };
  function resultHTML(data, zip, ctaClasses) {
    const city = [data.city, data.state].filter(Boolean).join(', ');
    const statuses = {
      served: [`Great news! We serve ${city || 'your area'}.`, 'TV mounting services are available in your area. Contact us to confirm appointment availability.', 'Get a Free Quote'],
      conditional: ['Service may be available in your area.', 'Please contact our team to confirm coverage.', 'Request Availability'],
      unlisted: ["Let's check your location.", "Your ZIP code is not in our confirmed coverage list. Contact us and we'll check whether we can help.", 'Contact Us']
    };
    const [title, message, cta] = statuses[data.status] || statuses.unlisted;
    let html = `<strong>${escapeHTML(title)}</strong><p>${escapeHTML(message)}</p><a class="${escapeHTML(ctaClasses)}" href="${escapeHTML(quoteLink(zip, data.city))}">${escapeHTML(cta)}</a>`;
    if (data.status === 'served' && isLocalUrl(data.landing_page)) {
      html += ` <a class="cm-zip__local" href="${escapeHTML(data.landing_page)}">Explore TV installation in ${escapeHTML(data.city || 'your area')}</a>`;
    }
    return html;
  }
  async function submit(form) {
    const root = form.closest('[data-cm-zip]');
    if (!root) return;
    const input = form.querySelector('[name=zip]');
    const button = form.querySelector('button[type=submit]');
    const result = root.querySelector('.cm-zip__result');
    const zip = input.value.trim();
    result.hidden = false;
    if (!/^\d{5}$/.test(zip)) { result.textContent = 'Please enter a valid 5-digit ZIP code.'; input.focus(); return; }
    button.disabled = true;
    result.textContent = 'Checking service area…';
    try {
      const data = await lookup(zip);
      // Don't show a stale request result if input has changed; clear the "Checking…" text instead.
      if (input.value.trim() !== zip) { result.textContent = ''; result.hidden = true; return; }
      result.innerHTML = resultHTML(data, zip, ctaClass(root));
      root.dataset.status = data.status;
      lastSelection = {zip, status:data.status, city:data.city, state:data.state};
      try { sessionStorage.setItem('cm_zip_selection', JSON.stringify(lastSelection)); } catch (e) { /* Storage unavailable */ }
      const detail = {status:data.status, variant:root.dataset.variant, location:root.dataset.location};
      fire('check', detail);
      fire('check_' + data.status, detail);
      // Contains the ZIP: document event for first-party scripts only, not pushed to the dataLayer.
      fire('selection', {...lastSelection}, false);
    } catch (e) {
      result.textContent = e instanceof LookupError ? e.message : GENERIC_ERROR;
    } finally { button.disabled = false; }
  }
  document.addEventListener('submit', e => {
    const form = e.target.closest('.cm-zip__form');
    if (!form) return;
    e.preventDefault(); submit(form);
  });
  document.addEventListener('input', e => {
    if (!e.target.matches('.cm-zip__input')) return;
    const digits = e.target.value.replace(/\D/g, '').slice(0, 5);
    if (digits !== e.target.value) e.target.value = digits;
  });
  function closeModal() {
    const modal = document.getElementById('cm-zip-modal');
    if (modal) { modal.hidden = true; modal.setAttribute('aria-hidden','true'); }
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    previousFocus = null;
  }
  function openModal() {
    let modal = document.getElementById('cm-zip-modal');
    if (!modal) {
      // Reuse a shortcode-rendered popup variant if present; no separate checker implementation.
      const source = document.querySelector('[data-cm-zip][data-variant="popup"]');
      if (!source) return false;
      modal = document.createElement('div');
      modal.id='cm-zip-modal'; modal.className='cm-zip-modal'; modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); modal.setAttribute('aria-label','Check Service Area');
      modal.innerHTML = '<div class="cm-zip-modal__backdrop" data-cm-zip-close></div><div class="cm-zip-modal__panel"><button type="button" class="cm-zip-modal__close" aria-label="Close" data-cm-zip-close>×</button></div>';
      modal.querySelector('.cm-zip-modal__panel').appendChild(source);
      document.body.appendChild(modal);
    }
    previousFocus = document.activeElement;
    modal.hidden = false; modal.setAttribute('aria-hidden','false');
    modal.querySelector('input')?.focus();
    fire('popup_open', {variant:'popup', location:'trigger'});
    return true;
  }
  document.addEventListener('click', e => {
    // Only cancel the click when the modal opened, so a trigger that is a link still navigates as a fallback.
    if (e.target.closest('[data-cm-zip-open]') && openModal()) e.preventDefault();
    if (e.target.closest('[data-cm-zip-close]')) { e.preventDefault(); closeModal(); }
    const quote = e.target.closest('.cm-zip__cta');
    if (quote) { const root = quote.closest('[data-cm-zip]'); fire('quote_click', {variant:root?.dataset.variant, location:root?.dataset.location, status:root?.dataset.status}); }
  });
  document.addEventListener('keydown', e => {
    const modal = document.getElementById('cm-zip-modal');
    if (!modal || modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
      const focusables = Array.from(modal.querySelectorAll('button:not(:disabled),input:not(:disabled),a[href]')).filter(x => x.getClientRects().length);
      if (!focusables.length) return;
      const first=focusables[0], last=focusables[focusables.length-1];
      if (e.shiftKey && document.activeElement===first) {e.preventDefault();last.focus();}
      else if (!e.shiftKey && document.activeElement===last) {e.preventDefault();first.focus();}
    }
  });
  // Optional quote-form prefill (enabled only when the site supplies field selectors, see README).
  // Fills empty fields once; never overwrites what the visitor or browser autofill entered.
  function fillField(selector, value, events) {
    let fields = [];
    try { fields = document.querySelectorAll(selector); } catch (e) { return; }
    fields.forEach(el => {
      if (!('value' in el) || String(el.value).trim() !== '' || el.dataset.cmZipPrefilled) return;
      el.value = value;
      el.dataset.cmZipPrefilled = '1';
      if (events) { el.dispatchEvent(new Event('input', {bubbles:true})); el.dispatchEvent(new Event('change', {bubbles:true})); }
    });
  }
  function prefillQuote() {
    const p = cfg.prefill;
    if (!p || !p.zip) return;
    const params = new URLSearchParams(window.location.search);
    const stored = storedSelection();
    let zip = params.get('zip') || '';
    let city = params.get('city') || '';
    if (!/^\d{5}$/.test(zip)) { zip = stored?.zip || ''; city = stored?.city || ''; }
    else if (!city && stored?.zip === zip) { city = stored.city || ''; }
    if (!/^\d{5}$/.test(zip)) return;
    city = String(city).replace(/[^\p{L}\p{M} .'-]/gu, '').trim().slice(0, 60);
    fillField(p.zip, zip, p.events);
    if (p.city && city) fillField(p.city, city, p.events);
  }
  prefillQuote();
  // Second pass for forms that render late (e.g. builder/calculator scripts); filled or edited fields are skipped.
  window.addEventListener('load', prefillQuote, {once:true});
  window.CMZipChecker = {
    open: openModal,
    check: async zip => lookup(String(zip)),
    getSelection: storedSelection,
    clear: () => { lastSelection=null; try {sessionStorage.removeItem('cm_zip_selection');} catch(e) { /* Storage unavailable */ } }
  };
})();
