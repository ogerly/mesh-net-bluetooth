# LTM Index — web-bluetooth.mesh

## Session Index

### 2026-05
- **2026-05-13** | WP: WP-2026-05-13-BOOT-INIT-Project-Scan.md (closed) | WH: WH-001-MESH-Architektur | Workspace bootstrap, project scan (closed)
- **2026-05-13** | WP: WP-2026-05-13-FLD-FEST-Workshop-Design.md (closed) | WH: — | Festival workshop: 4 learning levels (体验→Lernen→Bauen→Teilen) (closed)
- **2026-05-13** | WP: WP-2026-05-13-ARCH-FRONT-Startseite-Design.md (closed) | WH: — | Frontend: start page with canvas + info sub-pages (closed)
- **2026-05-13** | WP: WP-2026-05-13-SPEC-BT-Browser-Compatibility.md (closed) | WH: — | BT: Android=real, iOS=simulation, Desktop=Dongles (closed)
- **2026-05-13** | WP: WP-2026-05-13-SPEC-MESH-Protokoll-Spez.md (closed) | WH: — | Mesh protocol: managed flooding, BFS hops, relay/leaf (closed)
- **2026-05-13** | WP: WP-2026-05-13-EDU-BILD-Bildungsmaterial.md (closed) | WH: — | Education: 4 learning phases, guides, handouts (closed)
- **2026-05-13** | WP: WP-2026-05-13-RES-Roadmap-10-Wochen.md (closed) | WH: — | 10-week roadmap, must-have/should-have/nice-to-have (closed)
- **2026-05-13** | BUILD: meshnet/ frontend core — index.html, 5 JS modules, 3 CSS files, 7 info pages
- **2026-05-13** | WP: WP-2026-05-13-SPEC-NODE-Naming (closed) | WH: WH-002-BUILD-Frontend | Festival node naming system (closed)
- **2026-05-13** | WP: WP-2026-05-13-SPEC-TTL-TTL-Strategy (closed) | WH: WH-002-BUILD-Frontend | TTL strategy for festival (closed)
- **2026-05-13** | WP: WP-2026-05-13-SPEC-MSG-MessageTypes (closed) | WH: WH-002-BUILD-Frontend | Message types beyond plain text (closed)
- **2026-05-13** | WP: WP-2026-05-13-PWA-Offline-Fahigkeit (closed) | WH: WH-002-BUILD-Frontend | PWA/Offline capability (closed)
- **2026-05-13** | BUILD: node naming + prefix, presence/find/wks buttons, TTL display, localStorage persistence
- **2026-05-13** | BUILD: PWA — manifest.json, sw.js, SVG icon, offline cache
- **2026-05-13** | WP: WP-2026-05-13-FLD-UI-Polish-Festival-Ready (closed) | WH: WH-002-BUILD-Frontend | UI polish (closed)
- **2026-05-13** | BUILD: UI polish — hover states, transitions, festival badge, workshop link
- **2026-05-13** | WP: WP-2026-05-13-RES-Festival-Hardware-Node-Registration | WH: WH-002-BUILD-Frontend | Festival hardware + node registration
- **2026-05-13** | WP: WP-2026-05-13-SPEC-QR-QR-Code-Joining (closed) | WH: WH-002-BUILD-Frontend | QR code joining system (closed)
- **2026-05-13** | WP: WP-2026-05-13-EDU-Festival-Handout-Code-Walkthrough (closed) | WH: WH-002-BUILD-Frontend | Festival handout + code walkthrough (closed)
- **2026-05-13** | CLOSED: 15 workpapers total
- **2026-05-13** | BUILD: meshnet/ complete — 18 files (index.html, 5 JS, 3 CSS, 7 info, PWA, SVG icon)
- **2026-05-13** | BUILD: QR code join — URL scheme handler, QR display, festival joining
- **2026-05-13** | BUILD: Festival handout (A6 double-sided), Code walkthrough (A4)
- **2026-05-13** | WH: WH-003-BT-Browser-Compatibility | — | Complete Web Bluetooth browser compatibility matrix (closed)
- **2026-05-13** | UPDATE: iOS BT solutions added — Bluefy/WebBLE, WKWebView developer option

## Project State
- **Project**: Web Bluetooth Mesh Network
- **Core artifact**: meshnet_client.html (919 lines, self-contained example)
- **Frontend**: meshnet/ — modularized (index.html, 5 JS modules, 3 CSS files, 7 info pages)
- **Features**: node naming + prefix, presence/find/wks message types, TTL display, localStorage persistence
- **Status**: Workshop concept defined, architecture documented, frontend core built, festival features + PWA + UI polish
- **Goal**: Festival workshop in 10 weeks — MeshNet as research/learning experience
- **Key decisions**: 
  - Start page = app (canvas visualization visible immediately)
  - Info pages as sub-pages (/info)
  - Android = real BT mesh, iOS = full simulation fallback
  - 4 learning levels: 体验→Lernen→Bauen→Teilen
  - 10-week roadmap: must-have (W1-4) → should-have (W5-7) → nice-to-have (W8-9)
  - TTL = 7 fixed for festival
  - Node naming: prefix + free-form
  - Message types: chat, presence, find, wks
  - PWA: offline-first, cache-first strategy, SVG icon
  - UI polish: hover states, transitions, festival badge, workshop link
  - Festival hardware: 5-7 Dongles, 3-4 laptops, QR codes, badges
  - Node registration: QR code + URL sharing + prefix codes
  - QR joining: meshnet://join URL scheme, QR display overlay, festival flow
  - Education: Festival handout (A6 double-sided), Code walkthrough guide (A4)
  - BT compatibility: 30+ browser entries, festival coverage ~74% BT + ~26% sim, critical limitations documented
  - REVIEW: WP-2026-05-13-REV-Review-Refactor-Bug (closed) — 3 critical bugs (XSS, external QR, rate-limiting), 5 refactors (modal, cache versioning, state mgmt, low-power, i18n)

## Architecture Notes
- Pure client-side, no backend
- Web Bluetooth API (Chrome/Edge only)
- Managed flooding routing with TTL
- BFS hop computation
- Canvas visualization
