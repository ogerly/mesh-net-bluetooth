# WP-2026-05-13-EDU-BILD-Bildungsmaterial

## Session Goal
Educational content and training materials for festival workshop.

## Learning Concept

MeshNet als **forschendes Lernkonzept** — Menschen lernen durch Tun, nicht durch Vorlesungen.

### Lern-Phasen

#### Phase 1: Beobachten (15 min)
- Mesh-Visualisierung live beobachten
- Nodes kommen und gehen
- Messages werden geroutet
- "Was passiert da?"

#### Phase 2: Verstehen (30 min)
- Canvas als Lehrmittel:
  - Relay vs Leaf Nodes visualisiert
  - Connection lines = Bluetooth range
  - Yellow packets = message routing
  - Pulse rings = active relays
- Managed Flooding erklärt
- BFS hop computation erklärt
- Dezentralität verstehen

#### Phase 3: Experimentieren (60 min)
- Nodes hinzufügen/entfernen
- Simulation starten/pausieren
- Messages senden und route verfolgen
- Parameter ändern
- Code durchgehen

#### Phase 4: Erstellen (Offen)
- Eigene Modifikationen
- Eigenes Projekt starten
- Idee weitertragen

## Content für Info-Pages

### "Über das Projekt"
- MeshNet Connect = dezentrales Bluetooth Mesh Netzwerk
- Forschungsprojekt, keine kommerzielle App
- Web Bluetooth API als Grundlage
- Peer-to-peer, kein Server
- Selbstorganisierende Topologie

### "Wie es funktioniert"
- Nodes finden sich via Bluetooth
- Relay Nodes forwarding messages
- Managed Flooding routing algorithm
- Canvas visualizes the invisible
- Self-healing network

### "Bluetooth Mesh erklärt"
- Was ist Bluetooth Mesh?
- Difference zwischen Bluetooth Classic und BLE Mesh
- Web Bluetooth API limitations
- Real-world Bluetooth range (~10m)
- Multi-hop networking concept

### "Workshop / Festival"
- Workshop-Struktur (4 levels)
- Räumliches setup
- Was mitbringen (Android-Gerät empfohlen)
- Timeline der Camp Week
- Erfahrungen dokumentieren

### "FAQ"
- Brauche ich ein spezielles Gerät?
- Funktioniert auf iOS?
- Brauche ich Vorkenntnisse?
- Ist das sicher?
- Wer kann mitmachen?

## Training Materials

### Quick Start Guide (Festival Handout)
```
MeshNet Connect — Quick Start

1. Öffne die Seite auf deinem Gerät
2. Klicke "Simulation Starten"
3. Beobachte die Mesh-Visualisierung
4. Sende eine Nachricht!
5. Klicke "Bluetooth Scan" (Android only)
6. Finde Menschen im Netzwerk
```

### Code Walkthrough Guide
```
meshnet_client.html — Code Guide

├── Canvas & Visualization (Zeile 1-800)
│   ├── Node rendering
│   ├── Connection lines
│   ├── Packet animation
│   └── Pulse effects
│
├── Mesh Logic (Zeile 450-620)
│   ├── Node class
│   ├── BFS hop computation
│   ├── Managed flooding
│   └── Message routing
│
├── Bluetooth API (Zeile 805-828)
│   ├── Device scanning
│   ├── Connection handling
│   └── Error handling
│
└── UI & Chat (Zeile 620-650)
    ├── Message display
    ├── Node list
    └── Toast notifications
```

### Festival Documentation Template
```
Festival Experience Log

Datum: ___________
Gerät: ___________
Nodes im Netzwerk: ___________
Max Hops: ___________
Erfahrungen:
- Was hat funktioniert:
- Was war schwierig:
- Was war spannend:
- Menschen gefunden:
```

## Open Questions

1. Handout format: PDF or printed cards?
2. Should we add a "beginner mode" (simplified UI)?
3. How to collect festival experiences?
4. Should we create a "post-festival" follow-up?

## Status: ✅ COMPLETED

Content written into info pages: `info/workshop.html` (workshop structure), `info/docs.html` (code walkthrough), `info/faq.html` (FAQ), `info/how-it-works.html` (learning content). Quick Start Guide embedded in workshop.html.
