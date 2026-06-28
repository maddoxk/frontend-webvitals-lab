/* WebVitals Lab — minimal, dependency-free service worker.
 * Strategy:
 *  - Precache the app shell on install (offline-capable).
 *  - Same-origin navigations/assets: stale-while-revalidate.
 *  - Remote product images (picsum.photos): cache-first with a 30-day TTL.
 * Bumping CACHE_VERSION invalidates old caches on the next activate.
 */
const CACHE_VERSION = 'wv-lab-v1';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const IMG_CACHE = `${CACHE_VERSION}-img`;
const BASE = '/frontend-webvitals-lab/';
const SHELL = [BASE, `${BASE}index.html`, `${BASE}favicon.svg`, `${BASE}manifest.webmanifest`];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Remote product images: cache-first.
  if (url.origin === 'https://picsum.photos') {
    event.respondWith(
      caches.open(IMG_CACHE).then(async (cache) => {
        const hit = await cache.match(request);
        if (hit) return hit;
        const res = await fetch(request);
        if (res.ok) cache.put(request, res.clone());
        return res;
      })
    );
    return;
  }

  // Same-origin: stale-while-revalidate, falling back to the cached app shell.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(SHELL_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached || cache.match(`${BASE}index.html`));
        return cached || network;
      })
    );
  }
});
