# WP-2026-05-13-ARCH-FRONT-Startseite-Design

## Session Goal
Frontend architecture: clean start page representing the app, with background pages for info, docs, and explanations.

## Design Philosophy
- **Schlicht, übersichtlich** — keine over-engineered UI
- **App sichtbar** — die MeshNet-Visualisierung ist das Herzstück
- **Info zugänglich** — Dokumentation und Erklärungen im Hintergrund
- **Forschungskonzept** — vermittelt: "das ist ein Experiment, nicht ein Produkt"

## Page Structure

### Hauptseite (Index / Start)
```
┌──────────────────────────────────────────┐
│  MeshNet Connect                         │
│  [Status: Simulation / Bluetooth]        │
├──────────────────────────────────────────┤
│                                          │
│     [Mesh Canvas Visualization]          │
│     Nodes, Connections, Packets          │
│                                          │
├──────────────────────────────────────────┤
│  [Scan] [Simulation] [Chat]              │
│                                          │
│  "MeshNet — dezentrales Bluetooth Mesh   │
│   Netzwerk als Forschungsprojekt"        │
│                                          │
│  [Mehr erfahren →]                        │
└──────────────────────────────────────────┤
```

### Info-Seiten (/info)
```
┌──────────────────────────────────────────┐
│  ← Zurück                                │
├──────────────────────────────────────────┤
│  MeshNet Connect                         │
│                                          │
│  Navigation:                             │
│  ── Über das Projekt                    │
│  ── Wie es funktioniert                 │
│  ── Bluetooth Mesh erklärt              │
│  ── Neuigkeiten                         │
│  ── Dokumentation                       │
│  ── Workshop / Festival                 │
│  ── FAQ                                 │
│                                          │
│  [Content Area]                          │
└──────────────────────────────────────────┘
```

## File Structure

```
meshnet/
├── index.html              ← Startseite mit Mesh-Canvas
├── info/
│   ├── about.html          ← Über das Projekt
│   ├── how-it-works.html   ← Funktionsweise
│   ├── bluetooth-mesh.html ← Bluetooth Mesh erklärt
│   ├── news.html           ← Neuigkeiten
│   ├── docs.html           ← Dokumentation
│   └── workshop.html       ← Workshop / Festival
├── css/
│   ├── main.css            ← Shared styles
│   ├── mesh.css            ← Canvas/UI styles
│   └── info.css            ← Info-page styles
├── js/
│   ├── meshnet.js          ← Core mesh logic (extrahiert aus meshnet_client.html)
│   ├── canvas.js           ← Canvas rendering
│   ├── bluetooth.js        ← Web Bluetooth API
│   ├── routing.js          ← Managed flooding
│   └── ui.js               ← UI helpers
└── assets/
    └── images/
```

## Design Decisions

1. **Startseite = App** — Die Mesh-Visualisierung ist direkt sichtbar, kein "Intro" oder "Landing Page"
2. **Info-Pages als Sub-Pages** — Nicht als Modal/Overlay, sondern als echte Unterseiten
3. **Minimal CSS** — Shared styles, keine Frameworks
4. **Modular JS** — Extrahiert aus meshnet_client.html (919 Zeilen → mehrere kleine Dateien)
5. **Dark Theme** — Beibehalten von meshnet_client.html (var(--bg), var(--accent), etc.)

## Key Requirements

- [x] Canvas-Visualisierung auf Startseite
- [x] Bluetooth-Scan auf Startseite (bluetooth.js + detection)
- [x] Chat-Funktionalität auf Startseite (routing.js)
- [x] Info-Navigation (subtle, sidebar auf info pages)
- [x] Responsive (Festival: viele verschiedene Geräte)
- [ ] Offline-fähig (PWA?)
- [x] "Research concept" messaging (info/about.html)

## Open Questions

1. PWA vs simple HTML — brauchbar offline?
2. Language: DE only or bilingual?
3. Should we add QR-Code sharing for iOS users?

## Status: ✅ COMPLETED

Built: `meshnet/` — index.html, 5 JS modules, 3 CSS files, 7 info pages. All requirements met except PWA.
