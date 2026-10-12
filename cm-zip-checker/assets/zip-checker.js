(() => {
  'use strict';
  const cfg = window.CMZipCheckerConfig || {};
  let lastSelection = null;
  const escapeHTML = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const quoteLink = zip => {
    const u = new URL(cfg.quoteUrl || '/quote/', window.location.href);
    u.searchParams.set('zip', zip);
    return u.href;
  };
  const fire = (name, detail) => {
    document.dispatchEvent(new CustomEvent('cmzip:' + name, {detail}));
    // GTM only. Do not additionally call gtag.
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({event:'cm_zip_' + name, component_variant:detail.variant || '', component_location:detail.location || '', coverage_status:detail.status || ''});
  };
  const lookup = async zip => {
    if (!/^\d{5}$/.test(zip)) throw new Error('Please enter a valid 5-digit ZIP code.');
    const data = new URLSearchParams({action:'cm_zip_lookup', nonce:cfg.nonce, zip});
    const res = await fetch(cfg.ajaxUrl, {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}, body:data.toString(), credentials:'same-origin'});
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json?.data?.message || 'Could not check the service area.');
    return json.data;
  };
  function resultHTML(data, zip) {
    const city = [data.city, data.state].filter(Boolean).join(', ');
    const statuses = {
      served: [`Great news! We serve ${city || 'your area'}.`, 'TV mounting services are available in your area. Contact us to confirm appointment availability.', 'Get a Free Quote'],
      conditional: ['Service may be available in your area.', 'Please contact our team to confirm coverage.', 'Request Availability'],
      unlisted: ["Let's check your location.", "Your ZIP code is not in our confirmed coverage list. Contact us and we'll check whether we can help.", 'Contact Us']
    };
    const [title, message, cta] = statuses[data.status] || statuses.unlisted;
    let html = `<strong>${escapeHTML(title)}</strong><p>${escapeHTML(message)}</p><a class="cm-zip__cta" href="${escapeHTML(quoteLink(zip))}">${escapeHTML(cta)}</a>`;
    if (data.status === 'served' && data.landing_page && new URL(data.landing_page, window.location.href).origin === window.location.origin) {
      html += ` <a class="cm-zip__local" href="${escapeHTML(data.landing_page)}">Explore TV installation in ${escapeHTML(data.city)}</a>`;
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
      // Don't show a stale request result if input has changed.
      if (input.value.trim() !== zip) return;
      result.innerHTML = resultHTML(data, zip);
      lastSelection = {zip, status:data.status, city:data.city, state:data.state};
      try { sessionStorage.setItem('cm_zip_selection', JSON.stringify(lastSelection)); } catch (e) { /* Storage unavailable */ }
      const detail = {status:data.status, variant:root.dataset.variant, location:root.dataset.location};
      fire('check', detail);
      fire('check_' + data.status, detail);
      fire('selection', {...lastSelection});
    } catch (e) {
      result.textContent = e.message || 'Unable to check. Please try again.';
    } finally { button.disabled = false; }
  }
  document.addEventListener('submit', e => {
    const form = e.target.closest('.cm-zip__form');
    if (!form) return;
    e.preventDefault(); submit(form);
  });
  document.addEventListener('input', e => {
    if (!e.target.matches('.cm-zip__input')) return;
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
  });
  function closeModal() {
    const modal = document.getElementById('cm-zip-modal');
    if (modal) { modal.hidden = true; modal.setAttribute('aria-hidden','true'); }
    if (window.cmZipPreviousFocus) window.cmZipPreviousFocus.focus();
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
    window.cmZipPreviousFocus = document.activeElement;
    modal.hidden = false; modal.setAttribute('aria-hidden','false');
    modal.querySelector('input')?.focus();
    fire('popup_open', {variant:'popup', location:'trigger'});
    return true;
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-cm-zip-open]')) { e.preventDefault(); openModal(); }
    if (e.target.closest('[data-cm-zip-close]')) { e.preventDefault(); closeModal(); }
    const quote = e.target.closest('.cm-zip__cta');
    if (quote) { const root = quote.closest('[data-cm-zip]'); fire('quote_click', {variant:root?.dataset.variant, location:root?.dataset.location, status:lastSelection?.status}); }
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
  window.CMZipChecker = {
    open: openModal,
    check: async zip => lookup(String(zip)),
    getSelection: () => { if(lastSelection) return {...lastSelection}; try {return JSON.parse(sessionStorage.getItem('cm_zip_selection') || 'null');} catch (e) {return null;} },
    clear: () => { lastSelection=null; try {sessionStorage.removeItem('cm_zip_selection');} catch(e) {} }
  };
})();
