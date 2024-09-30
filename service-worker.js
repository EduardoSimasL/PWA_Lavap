const CACHE_NAME = 'todo-list-pwa-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
  '/icons/windows11/SplashScreen.scale-100.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // Verifique se o método é GET antes de tentar fazer o cache
  if (request.method !== 'GET') {
      return;
  }

  event.respondWith(
      caches.open('my-cache').then(cache => {
          return cache.match(request).then(response => {
              return response || fetch(request).then(fetchResponse => {
                  cache.put(request, fetchResponse.clone());
                  return fetchResponse;
              });
          });
      })
  );
});
