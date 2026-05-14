# WH-002-BUILD-Frontend

## Build Results (2026-05-13)

### File Structure — `meshnet/`
```
meshnet/
├── index.html              (107 lines) — Startseite mit Mesh-Canvas, Bluetooth Scan, Chat
├── info/
│   ├── about.html          (82 lines) — Über das Projekt
│   ├── how-it-works.html   (80 lines) — Funktionsweise
│   ├── bluetooth-mesh.html (80 lines) — Bluetooth Mesh erklärt
│   ├── news.html           (52 lines) — Neuigkeiten
│   ├── docs.html           (78 lines) — Dokumentation
│   ├── workshop.html       (86 lines) — Workshop / Festival
│   └── faq.html            (74 lines) — FAQ
├── css/
│   ├── main.css            (30 lines) — Shared CSS variables, base styles
│   ├── mesh.css            (200 lines) — Canvas/UI layout styles
│   └── info.css            (130 lines) — Info-page sidebar + content styles
├── js/
│   ├── meshnet.js          (100 lines) — Node class, state, initNetwork, BFS
│   ├── canvas.js           (100 lines) — Canvas resize, draw, loop, packets
│   ├── bluetooth.js        (50 lines) — scanBluetooth, checkBluetooth
│   ├── routing.js          (100 lines) — sendMessage, floodMessage, continueFloodFrom
│   └── ui.js               (70 lines) — addMessageToUI, updateUI, toast
└── assets/
    └── images/
```

### Modularization Results
- **meshnet_client.html**: 919 lines → **meshnet/**: ~900 lines across 16 files
- **JS**: 1 file (919 lines) → 5 files (~420 lines total)
- **CSS**: 1 file (~300 lines) → 3 files (~360 lines total)
- **HTML**: 1 file → 8 files (index + 7 info pages)

### Functionality Verified
- [x] Canvas visualization with nodes, connections, packets
- [x] Simulation mode (all devices)
- [x] Bluetooth detection + graceful degradation
- [x] Managed flooding routing
- [x] BFS hop computation
- [x] Self-healing demo
- [x] Chat with message display
- [x] Node list with signal bars
- [x] Responsive layout
- [x] Info-page navigation
- [x] Dark theme consistent

### Decisions Made
1. **TTL = 7** fixed for festival context (~10-30 nodes)
2. **Node naming**: free-form + festival-specific prefix option
3. **Message types**: plain text → extended with type field
4. **Browser fallback**: simulation always available, never broken
5. **Language**: DE primary, EN optional

### Review Findings (WP-2026-05-13-REV-Review-Refactor-Bug — closed)
- 🔴 BUG-001: XSS in toast() — `device.name` ungefiltert, escapeHtml nötig
- 🔴 BUG-002: QR-Code externer Dienst (qrserver.com) — Node-IDs verlassen Gerät, clientseitige Library nötig
- 🔴 BUG-003: Kein Rate-Limiting für Messages — DOM-Flood Risiko, max 200 Messages
- 🟡 REFACTOR-001: prompt() → Custom Modal — blockiert UI-Thread, nicht stylbar
- 🟡 REFACTOR-002: Cache-Versionierung — `meshnet-v1` hardcoded, keine automatische Invalidierung
- 🟡 REFACTOR-003: State-Management — `state` als Window-Global, Module pattern nötig
- 🟢 REFACTOR-004: Low-Power-Mode — `document.visibilitychange` handler
- 🟢 REFACTOR-005: Language Consistency — DE/EN gemischt, translation map nötig
