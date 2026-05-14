// Enhanced service worker with version from manifest and offline support
const CACHE_NAME = 'meshnet-v1';
const OFFLINE_URL = '/offline.html';

// Enhanced ASSETS array with all required files
const ASSETS = [
  './',
  './index.html',
  './offline.html',
  './css/main.css',
  './css/mesh.css',
  './css/ieff.css',
  './js/meshnet.js',
  './js/canvas.js',
  './js/bluetooth.js',
  './js/routing.js',
  './js/ui.js',
  './js/qrcode.min.js',
  './info/about.html',
  './info/how-it-works.html',
  './info/bluetooth-mesh.html',
  './info/news.html',
  './info/docs.html',
  './info/workshop.html',
  './info/faq.html',
  './manifest.json',
  './assets/icons/meshnet-192.svg',
  './assets/icons/meshnet-512.svg'
];

// Install event - cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('meshnet-') && cacheName !== CACHE_NAME;
        }).map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network, then offline
self.addEventListener('fetch', event => {
  // Skip cross-origin requests (like to external APIs)
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return cached response if found
          if (response) {
            return response;
          }
          
          // Otherwise fetch from network
          return fetch(event.request)
            .then(response => {
              // Check if response is valid
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone response as it's consumed once
              const responseToCache = response.clone();
              
              // Cache the fetched response for future use
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
              
              return response;
            })
            .catch(() => {
              // If network fails, try to return offline page for navigation requests
              if (event.request.mode === 'navigate') {
                return caches.match(OFFLINE_URL);
              }
              // For non-navigation requests, just return the error
              return new Error('Network error');
            });
        })
    );
  } else {
    // For cross-origin requests, just fetch from network
    event.respondWith(fetch(event.request));
  }
});

// Add a handler for background sync if needed in future
self.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});