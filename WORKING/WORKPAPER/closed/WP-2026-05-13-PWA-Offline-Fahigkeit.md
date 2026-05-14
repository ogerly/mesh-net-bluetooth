# WP-2026-05-13-PWA-Offline-Fahigkeit

## Session Goal
PWA/Offline capability — MeshNet works without internet at festival.

## PWA Implementation

### Required Files
1. `manifest.json` — PWA manifest
2. `sw.js` — Service Worker
3. `favicon.ico` — App icon

### manifest.json
```json
{
    "name": "MeshNet Connect",
    "short_name": "MeshNet",
    "description": "Dezentrales Bluetooth Mesh Netzwerk als Forschungsprojekt",
    "start_url": "./index.html",
    "display": "standalone",
    "background_color": "#0a0e17",
    "theme_color": "#00d4aa",
    "icons": [
        {
            "src": "assets/icons/meshnet-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "assets/icons/meshnet-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

### Service Worker (Cache Strategy: Cache-First)
```javascript
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
```

### Registration in index.html
```html
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => toast('Offline-Modus aktiv', 'info'))
        .catch(() => {});
}
</script>
```

### Icon (SVG → PNG)
- Simple MeshNet logo: circle with cross (from index.html SVG)
- 192x192 and 512x512 PNG

## Festival Relevance

| Scenario | Without PWA | With PWA |
|----------|------------|----------|
| No internet | ❌ broken | ✅ works |
| Weak wifi | ❌ slow | ✅ cached |
| Offline mode | ❌ broken | ✅ works |
| Installed app | ❌ no | ✅ home screen |

## Decision: Implement PWA
- Festival likely has unreliable internet
- PWA = offline-first
- Simple implementation, high impact

## Open Questions

1. Icon design — simple SVG-based?
2. Should we add "install" prompt?
3. Cache strategy: cache-first or network-first?
4. Should we cache info pages too?

## Next Steps

1. Create manifest.json
2. Create sw.js
3. Create icon assets
4. Register SW in index.html
5. Test offline capability
