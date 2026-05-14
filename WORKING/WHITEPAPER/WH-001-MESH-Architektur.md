# WH-001-MESH-Architektur

## Stable Architecture Decisions

### Architecture Principle
**Pure client-side, no backend.** All mesh logic runs in-browser. The network is the people — not a server.

### Layer Structure
```
┌─────────────────────────────────────┐
│  index.html — Startseite (App)      │
│  [Canvas | Bluetooth | Chat]        │
├─────────────────────────────────────┤
│  /info/* — Info & Documentation     │
│  [about | how-it-works | bluetooth │
│   | news | docs | workshop | FAQ]   │
├─────────────────────────────────────┤
│  js/ — Modular JavaScript           │
│  [meshnet.js | canvas.js | bt.js   │
│   | routing.js | ui.js]             │
├─────────────────────────────────────┤
│  css/ — Styles                      │
│  [main.css | mesh.css | info.css]   │
└─────────────────────────────────────┘
```

### Mesh Protocol (Managed Flooding)
- Nodes discover via Web Bluetooth API
- Relay nodes forward messages (TTL-based)
- Leaf nodes receive/send only
- BFS computes hop distance from me
- Canvas visualizes the invisible network

### Browser Strategy
- **Android**: Real Web Bluetooth mesh
- **iOS Safari**: Full simulation experience (no BT, not broken)
- **Desktop**: Chrome/Edge native or USB Dongles
- **Graceful degradation**: BT unavailable → simulation mode

### Education Concept
- **Forschungskonzept**: not a product, a living experiment
- 4 learning levels: 体验 (Experience) →  Lernen (Learn) → Bauen (Build) → Teilen (Share)
- Learn by doing, not by lectures
- Canvas as teaching tool

### Festival Goal
- Functioning mesh network across festival grounds
- 5-10 people who continue the idea
- Documented experiences
- Inspired follow-up projects
