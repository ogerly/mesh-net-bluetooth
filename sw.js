// Version will be injected by build process or manually updated
const CACHE_NAME = 'meshnet-v1';
const ASSETS = [
    './index.html',
    './css/main.css',
    './css/mesh.css',
    './css/info.css',
    './js/meshnet.js',
    './js/canvas.js',
    './js/bluetooth.js',
    './js/routing.js',
    './js/ui.js',
    './info/about.html',
    './info/how-it-works.html',
    './info/bluetooth-mesh.html',
    './info/news.html',
    './info/docs.html',
    './info/workshop.html',
    './info/faq.html',
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )));
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});
