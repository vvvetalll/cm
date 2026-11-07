(() => {
'use strict';
if (!document.body.classList.contains('page-id-15716')) return;
// Draft-only editorial mapping. No first-term or alphabetical primary inference.
const locationLabels = {'Winnetka':'Winnetka, IL'};
const typeLabels = {'Frame TV Installation':'Frame TV','Outdoor TV Installation':'Outdoor TV','TV Wall Mounting':'TV Wall Mounting'};
const editorial = {
'/samsung-frame-tv-installation-on-tile-in-winnetka/': {
primary:'Frame TV Installation',
excerpt:'Watch the installation video for a closer look at this tile-surface TV mounting project.'
}};
function resolvePrimary(terms, explicit) {
const unique = [...new Set(terms)];
return explicit && unique.includes(explicit) ? explicit : unique.length === 1 ? unique[0] : null;
}
const media = window.matchMedia('(min-width:1025px)');
const originals = new Map();
function render() {
document.querySelectorAll('#video .e-loop-item').forEach(card => {
if (!originals.has(card)) {
const meta=card.querySelector('.cm-case-meta');
const excerpt=card.querySelector('[data-id="158ecb5"]');
if(!meta || !excerpt) return;
originals.set(card,{meta,excerpt,metaHtml:meta.innerHTML,excerptHtml:excerpt.innerHTML});
}
const saved=originals.get(card);
saved.meta.innerHTML=saved.metaHtml;
saved.excerpt.innerHTML=saved.excerptHtml;
if(!media.matches) return;
const url=card.querySelector('[data-id="6ba5141c"] a')?.href;
const config=url ? editorial[new URL(url).pathname] : undefined;
const locations=saved.meta.querySelectorAll('.elementor-repeater-item-c7a91e3 .elementor-post-info__terms-list-item');
locations.forEach(term=>{const raw=term.textContent.trim();term.textContent=locationLabels[raw] || raw;});
const typeRow=saved.meta.querySelector('.elementor-repeater-item-c7a91e4');
const terms=[...typeRow.querySelectorAll('.elementor-post-info__terms-list-item')];
const primary=resolvePrimary(terms.map(t=>t.textContent.trim()),config?.primary);
let shown=false;
terms.forEach(term=>{
const raw=term.textContent.trim();
const keep=raw===primary && !shown;
term.hidden=!keep;
if(keep){term.textContent=typeLabels[raw] || raw;shown=true;}
});
typeRow.querySelectorAll('.elementor-post-info__terms-list').forEach(list=>[...list.childNodes].filter(n=>n.nodeType===3).forEach(n=>n.textContent=''));
typeRow.dataset.cmPrimaryReady='true';
typeRow.hidden=!shown;
if(config?.excerpt) saved.excerpt.textContent=config.excerpt;
});
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render,{once:true}); else render();
media.addEventListener('change',render);
})();