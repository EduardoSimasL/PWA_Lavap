const cacheName = 'login-app-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  'service-worker.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
