const CACHE_NAME = 'detective-club-v2';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './scripts/script.js',
  './manifest.json',
  './audio/click.mp3',
  './ico/favicon.ico',
  './ico/icon_x48.png',
  './ico/icon_x72.png',
  './ico/icon_x96.png',
  './ico/icon_x128.png',
  './ico/icon_x192.png',
  './ico/icon_x384.png',
  './ico/icon_x512.png',
  './ico/icon_x1024.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          PRECACHE_ASSETS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => null)
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => {
        if (cached) {
          fetch(request)
            .then((networkRes) => {
              if (networkRes && networkRes.ok) {
                caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', networkRes.clone()));
              }
            })
            .catch(() => {});
          return cached;
        }
        return fetch(request)
          .then((networkRes) => {
            if (networkRes && networkRes.ok) {
              const copy = networkRes.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
            }
            return networkRes;
          })
          .catch(() => caches.match('./'));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request)
        .then((networkRes) => {
          if (networkRes && networkRes.ok && networkRes.type === 'basic') {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkRes;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
