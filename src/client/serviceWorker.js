// Inspired by https://github.com/mdn/pwa-examples/blob/master/js13kpwa/sw.js

// TODO add caching when it's clear why we need it.
//const cacheName = 'vizhub-v1';
//const contentToCache = ['/', '/build/client.js', '/build/styles.css'];

// Installing Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  // event.waitUntil(
  //   (async () => {
  //     console.log('[Service Worker] Caching all: app shell and content');
  //     const cache = await caches.open(cacheName);
  //     await cache.addAll(contentToCache);
  //   })()
  // );
});

// Fetching content using Service Worker
// TODO experiment with serving viz content files here
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url } = request;

  e.respondWith(
    (async () => {
      console.log(
        `[Service Worker] Opportunity to fetch resource: ${e.request.url}`
      );
      //const r = await caches.match(e.request);
      //console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      //if (r) return r;
      //const response = await fetch(e.request);
      //const cache = await caches.open(cacheName);
      //console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      //cache.put(e.request, response.clone());
      //return response;
    })()
  );
});
