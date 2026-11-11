# GTmetrix homepage versus TV Installation — read-only comparison (2026-11-11)

Evidence source: two existing authenticated GTmetrix report tabs, not a fresh test:
- Homepage: https://gtmetrix.com/reports/chicagomounting.com/mPHTT3Dj/
- TV Installation: https://gtmetrix.com/reports/chicagomounting.com/QOWKg0er/
Both Seattle/Chrome154/Lighthouse12.6.1; tests about 10 minutes apart. Single-run laboratory results, not field CWV.

| Metric | Homepage | /tv-installation-and-mounting/ |
|---|---:|---:|
| Performance | 40% | 85% |
| Structure | 95% | 98% |
| TTFB | 1.8s | 362ms |
| FCP | 2.3s | 1.0s |
| LCP | 4.920s | 1.530s |
| TBT | 292ms | 219ms |
| CLS | 0.22 | 0 |
| DOM nodes | 1,622 | 1,552 |

### Evidence
- Homepage LCP is image attachment14104 (`main_hero_worker-7…`, image 1000×667); report's rendered image includes `fetchpriority=high` and `data-lazy-src`/lazyload class. Its LCP breakdown: TTFB 1.8s (37%), load delay 957ms (19%), load time 230ms (5%), render delay 1.9s (39%). This establishes the image as LCP, not whether WP Rocket lazyload is the specific root cause.
- Service-page LCP is H1 “TV MOUNTING SERVICES IN CHICAGO”; breakdown: TTFB 361ms (24%), render delay ~1.2s (76%). The different LCP element limits a direct causal comparison.
- Homepage layout shift audit: three shifts; Hero `.e-con-inner` 0.19; pricing section ID `3af87ac` 0.02 plus <0.01. Trustindex Poppins font loads are listed as possible contributor to Hero shift, not established sole cause.
- Homepage origin/edge diagnostic from the user's GTmetrix headers: `cf-cache-status: DYNAMIC`, `server-timing: cfEdge;dur=25,cfOrigin;dur=1621`, `cache-control: public,max-age=0`. Shows one slow origin interaction; does NOT establish Hostinger/PHP/cache root cause nor imply WP Rocket is off.
- Both reports include GTM, Trustindex and Elementor assets; many shared warnings (JS, DOM, cache TTL). One site-wide hosting defect is not proven.

### Pending tests; no production changes authorized
1. Repeat homepage and service tests multiple times under same configuration to quantify variance/cold-warm behavior; inspect anonymous HTML origin caching without assuming `DYNAMIC` = no WP Rocket caching.
2. Inspect exact homepage Hero markup and image request timing/priority; determine if above-fold Hero is lazily deferred; compare with the other page's text LCP. Preserve responsive images and visual design.
3. Reproduce and identify the actual moving element(s) causing Hero CLS and their font/load/size triggers; use GTmetrix video/trace.
4. Only after diagnosis propose minimal targeted changes, validate desktop/mobile, booking/quote/GA4, measure before/after. No caching, Elementor, CDN, tracking or site configuration was changed during this investigation.

Status: partial evidence-based diagnosis, no verified complete root cause.