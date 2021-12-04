// Inspired by https://github.com/mdn/pwa-examples/blob/master/js13kpwa/sw.js

// TODO add caching when it's clear why we need it.
// const cacheName = 'vizhub-v1';
// const contentToCache = ['/', '/build/client.js', '/build/styles.css'];

// Installing Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  //event.waitUntil(
  //  (async () => {
  //    console.log('[Service Worker] Caching all: app shell and content');
  //    const cache = await caches.open(cacheName);
  //    await cache.addAll(contentToCache);
  //  })()
  //);
});

// Fetching content using Service Worker
// TODO experiment with serving viz content files here
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url } = request;

  event.respondWith(
    (async () => {
      // TODO cache things that need caching
      //console.log(
      //  `[Service Worker] Opportunity to fetch resource: ${request.url}`
      //);
      return await fetch(request);

      //  const cacheHit = await caches.match(request);
      //  console.log(`[Service Worker] Fetching resource: ${request.url}`);
      //  if (cacheHit) return cacheHit;

      //  const response = await fetch(request);
      //  const cache = await caches.open(cacheName);
      //  console.log(`[Service Worker] Caching new resource: ${request.url}`);
      //  cache.put(request, response.clone());
      //  return response;
    })()
  );
});
