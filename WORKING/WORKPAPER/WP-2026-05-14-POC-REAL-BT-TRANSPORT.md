# WP-2026-05-14-POC-REAL-BT-TRANSPORT

## Session Goal
Build a real Bluetooth transport layer for the MeshNet POC that works with actual Android/Chromium devices without simulation. Must prove multi-hop message forwarding with real data transfer.

## Auftrag: Echter Android/Chromium Bluetooth-Mesh-POC

### Zielplattform
- Android Chrome ✅
- Samsung Internet Android ✅
- Desktop Chrome/Edge mit Bluetooth ✅
- iOS ist ausgeschlossen ❌

### Nicht-Ziel
- keine iOS-Unterstützung
- keine reine Simulation als POC-Ergebnis
- keine bloße Visualisierung ohne echte Datenübertragung

---

## Aufgabe 1: Ist-Zustand Prüfen

### Prüfung bluetooth.js (aktueller Stand)

**Scan & Connect:**
- ✅ `navigator.bluetooth.requestDevice()` wird aufgerufen
- ✅ `device.gatt.connect()` wird versucht
- ✅ Device-Name wird aus GATT gelesen (wenn verfügbar)
- ✅ `server.disconnect()` nach dem Auslesen

**Problem:**
- ❌ Keine echte Datenverbindung aufrechterhalten
- ❌ Keine `writeValue()` Aufrufe zum Senden
- ❌ Keine `startNotifications()` Aufrufe zum Empfangen
- ❌ Keine benutzerdefinierte Mesh-Service UUID definiert
- ❌ Nach dem Connect wird sofort getrennt - keine aktive Verbindung

### Prüfung routing.js

**Aktueller Stand:**
- ✅ Message-Format mit TTL, hops, route vorhanden
- ✅ Flood-Algorithmus implementiert
- ✅ Deduplizierung über Message-ID
- ❌ Keine echte Datenübertragung - nur Simulation entfernt

### Ergebnis Dokumentation

| Komponente | Status | Problem |
|------------|--------|---------|
| Device Scan | ✅ Funktioniert | Nur Pairing, keine echte Verbindung |
| GATT Connect | ✅ Wird versucht | Wird sofort wieder getrennt |
| Nachricht senden | ❌ Nicht implementiert | Kein writeValue() |
| Nachricht empfangen | ❌ Nicht implementiert | Kein startNotifications() |
| Mesh Service UUID | ❌ Nicht definiert | Nutzt nur Standard-Services |

---

## Aufgabe 2: Minimaler Real-Transport

### Benötigte Änderungen

1. **Eigene Mesh Service UUID definieren**
   - z.B. `0000FEED-0000-1000-8000-00805F9B34FB` (Mesh Proxy/Relay)

2. **Transport-Layer hinzufügen**
   - `bluetooth-transport.js` mit:
     - `connect(nodeId)` - bleibt verbunden
     - `sendMessage(nodeId, data)` - writeValue()
     - `onMessageReceived(callback)` - startNotifications()

3. **Routing-Core trennen**
   - Transport-Abstraktion für Simulation vs. Real

### Implementierungsplan

```
meshnet/
├── js/
│   ├── bluetooth-transport.js  (NEU - echter BT Transport)
│   ├── simulation-transport.js (NEU - bleibt für Demo)
│   ├── transport-bridge.js     (NEU - wählt Transport aus)
```

---

## Aufgabe 3: Multi-Hop Nachweis

### Voraussetzungen

1. Gerät A → Gerät B → Gerät C Nachrichtenkette
2. TTL muss reduziert werden bei jedem Hop
3. Message-ID verhindert Dopplung
4. Empfänger zeigt empfangene Nachricht

### Routing Logik (existiert bereits)

Die Logik in routing.js unterstützt bereits:
- TTL-Reduzierung: `msg.ttl--` bei jedem Hop
- Deduplizierung: `msg.route.includes(n.id)` Check
- Flood-Weiterleitung: `continueFloodFrom()`

**Fehlt:** Nur der echte Transport zum Senden/Empfangen.

---

## Aufgabe 4: Transport Trennen

### Ziel-Architektur

```
┌─────────────────────────────────────┐
│         Routing Core               │
│  (floodMessage, TTL, Dedupe)       │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌──────────────┐  ┌──────────────┐
│ Simulation  │  │ Real BT     │
│ Transport  │  │ Transport   │
│ (zustand)  │  │ (GATT)      │
└──────────────┘  └──────────────┘
```

### Neue Dateien

- `meshnet/js/transport-simulation.js` - Simulierte Nachrichten (für Demo)
- `meshnet/js/transport-real.js` - Echter Bluetooth Transport
- `meshnet/js/transport-bridge.js` - Abstraktionsschicht

---

## Aufgabe 5: Harte POC-Kriterien

Der POC ist erfolgreich wenn:

| Kriterium | Methode |
|-----------|----------|
| 3 echte Geräte | 3x Android Chrome testen |
| 1 Zwischenknoten | B leitet Nachricht von A an C weiter |
| TTL sichtbar reduziert | Im UI anzeigen (Hops) |
| Deduplizierung sichtbar | Doppelte Nachrichten nicht anzeigen |
| Real Message Transfer | Text "Test" erscheint auf Empfänger-Gerät |

---

## Aufgabe 6: Fallback-Entscheidung

### Wenn Web Bluetooth nicht ausreicht:

**Dokumentation:**
- Chrome beschränkt auf 1 GATT-Verbindung gleichzeitig
- Keine echte Mesh-Unterstützung in BLE
- Android Chrome hat beste Unterstützung, aber Limitierungen

**Optionen für echtes Mesh:**

1. **Native Android App** (empfohlen)
   - Volle Kontrolle über BLE Stack
   - Kann Multiple Connections gleichzeitig
   - Custom Mesh Protocol implementierbar

2. **ESP32 BLE Relay**
   - Hardware-Lösung als Brücke
   - Kann als Mesh-Relay fungieren

3. **WLAN/WebSocket Fallback**
   - Nur als zweite Transport-Variante
   - Nicht für Mesh-Kern, nur für Internet-Bridge

---

## Nächste Schritte (Immediate)

1. [ ] Mesh Service UUID definieren und in bluetooth.js eintragen
2. [ ] Real Bluetooth Transport Layer implementieren (connect, send, receive)
3. [ ] Transport Bridge erstellen (Simulation vs Real)
4. [ ] Routing mit Transport verbinden
5. [ ] Minimal-Test durchführen: A → B Nachricht
6. [ ] Multi-Hop Test: A → B → C Nachricht
7. [ ] POC-Kriterien dokumentieren

## Status
🟡 IN PROGRESS - Analyse abgeschlossen, Implementierung beginnt