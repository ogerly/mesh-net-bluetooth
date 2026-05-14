# WP-2026-05-13-EDU-Festival-Handout-Code-Walkthrough

## Session Goal
Festival handout + code walkthrough guide for workshop.

## Festival Handout

### Layout (A6 card, double-sided)
```
Front:
┌─────────────────────┐
│  MeshNet Connect    │
│  🔬 Forschungsprojekt │
│                     │
│  Quick Start:       │
│  1. Seite öffnen    │
│  2. Simulation ▶    │
│  3. Canvas observe  │
│  4. Nachricht senden│
│  5. BT Scan (Android)│
│  6. Menschen finden │
│                     │
│  meshnet.local      │
└─────────────────────┘

Back:
┌─────────────────────┐
│  Workshop Info      │
│                     │
│  Level 1: Experience│  15 min │
│  Level 2: Lernen    │  30 min │
│  Level 3: Bauen     │  60 min │
│  Level 4: Teilen    │  Offen  │
│                     │
│  Prefix Codes:      │
│  🟢 CAMP  🔵 WKS    │
│  🟡 DEV  🟠 ART     │
│  ⚪ GUEST            │
│                     │
│  Bluetooth Mesh     │
│  Dezentral · P2P    │
│  Kein Server        │
└─────────────────────┘
```

### Content

#### Front — Quick Start
```
MeshNet Connect
🔬 Dezentrales Bluetooth Mesh als Forschungsprojekt

Quick Start:
1. Öffne die Seite auf deinem Gerät
2. Klicke "Simulation Starten"
3. Beobachte die Mesh-Visualisierung
4. Sende eine Nachricht!
5. Klicke "Bluetooth Scan" (Android only)
6. Finde Menschen im Netzwerk

meshnet.local
```

#### Back — Workshop Info
```
Workshop — 4 Levels

Level 1: Experience (15 min)
  Simulation starten, Canvas beobachten, chatten

Level 2: Lernen (30 min)
  Relay vs Leaf, Managed Flooding, BFS hops

Level 3: Bauen (60 min)
  Code durchgehen, Nodes experimentieren

Level 4: Teilen (Offen)
  Netzwerk über Festival-Gelände aufbauen

Prefix Codes:
🟢 CAMP  🔵 WKS  🟡 DEV  🟠 ART  ⚪ GUEST

Bluetooth Mesh — Dezentral, P2P, Kein Server
```

## Code Walkthrough Guide

### Structure
```
meshnet/ — Code Guide

1. index.html — App entry point
   ├── Header (logo, status)
   ├── Left panel (controls, node list)
   ├── Canvas (mesh visualization)
   ├── Right panel (chat)
   └── Script imports

2. js/meshnet.js — Core
   ├── state object
   ├── Node class
   ├── initNetwork()
   ├── addRandomNode()
   ├── updateHops() (BFS)
   ├── node naming

3. js/canvas.js — Visualization
   ├── resize()
   ├── draw() — connections, packets, nodes
   ├── loop() — animation
   ├── click handler

4. js/bluetooth.js — Bluetooth
   ├── scanBluetooth()
   ├── checkBluetooth()
   ├── fallback detection

5. js/routing.js — Routing
   ├── sendMessage()
   ├── floodMessage()
   ├── continueFloodFrom()
   ├── receiveMessage()
   ├── simulated messages

6. js/ui.js — UI
   ├── addMessageToUI()
   ├── updateUI()
   ├── toast()
   ├── escapeHtml()

7. css/main.css — Shared
   ├── CSS variables
   ├── Base styles

8. css/mesh.css — Canvas/UI
   ├── Layout grid
   ├── Buttons
   ├── Nodes
   ├── Chat
   ├── Overlays
   ├── Responsive

9. css/info.css — Info pages
   ├── Sidebar
   ├── Content
   ├── Cards
   ├── Responsive
```

### Festival Use
- Print code guide as A4 booklet
- Available at Deep-Dive station
- For participants who want to understand the code

## Open Questions

1. Handout format: A6 card or A5?
2. Printing: who handles it?
3. Code walkthrough: A4 booklet or digital?
4. Language: DE only or DE/EN?
5. QR code on handout → meshnet.local?

## Next Steps

1. Handout design (A6 double-sided)
2. Code walkthrough print version
3. QR code on handout
4. Printing plan
5. Digital version (PDF)
