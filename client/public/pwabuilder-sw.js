importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const CACHE = 'main-page-cache';

workbox.routing.registerRoute(
  ({ url }) => url.pathname === '/',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  }),
);
