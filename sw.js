const CACHE_NAME = 'kalkulator-zidane-v1';
const ASSETS = [
  '/Kalkulator-APK-/kalkulator.html',
  '/Kalkulator-APK-/manifest.json',
  '/Kalkulator-APK-/icon-192.png',
  '/Kalkulator-APK-/icon-512.png'
];

// Install — cache semua file
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — hapus cache lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve dari cache dulu, kalau ga ada baru ambil dari network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
