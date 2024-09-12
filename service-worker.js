const CACHE_NAME = 'pwa-lavap-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/agenda.html',
  '/agendamento.html',
  '/cadastro.html',
  '/maquina.html',
  '/css/style.css',
  '/js/agendamento.js',
  '/js/app.js',
  '/logo.html',
  '/manifest.json',
  '/icons/android/android-launchericon-192x192.png',
  '/icons/android/android-launchericon-512-512.png'
];

// Instala o service worker e faz o cache dos arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Arquivos adicionados ao cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Erro ao adicionar arquivos no cache:', error);
      })
  );
});

// Responde com arquivos do cache
self.addEventListener('fetch', (event) => {
  console.log('Buscando:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Resposta encontrada no cache:', response);
          return response;
        }
        console.log('Buscando na rede:', event.request.url);
        return fetch(event.request).catch((error) => {
          console.error('Erro na busca:', error);
          return caches.match('/index.html');
        });
      })
  );
});



// Atualiza o service worker e remove caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
