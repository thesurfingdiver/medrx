const CACHE_NAME = 'medrx-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install the service worker and cache the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached version if found, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});