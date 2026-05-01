// Version-based cache name
const CACHE_NAME = 'lo-shu-v1';

// List of assets to cache for offline availability
const ASSETS = [
  'index.html',
  'languages/it.json',
  'languages/en.json',
  'documentation/theory_it.html',
  'documentation/theory_en.html',
  'manifest.json',
  'icons/favicon.ico',
  'icons/logo192.png',
  'icons/logo512.png'
];

// Install event: cache the application shell
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell');
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch event: respond with cached assets if available
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});