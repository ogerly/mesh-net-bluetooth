# WP-2026-05-13-REV-Review-Refactor-Bug

## Session Goal
Review von MeshNet Connect — dokumentiert als Refactor und Bug Paper.

---

## Review: MeshNet Connect

### Stärken

**Architektur**: Modularisierung sauber — 5 JS-Module mit klarer Verantwortlichkeit, keine Überschneidungen. `meshnet.js` (State), `canvas.js` (Rendering), `routing.js` (Protokoll) folgt vernünftigem Prinzip.

**Resilience-by-Design**: Simulation als First-Class-Feature. App auf keinem Gerät kaputt — iOS-Nutzer sehen funktionierendes Erlebnis, keine Fehlermeldung.

**Lehrwert der Visualisierung**: Canvas macht abstrakte Mesh-Konzept sichtbar. Pakete zwischen Nodes, TTL-basiertes Flooding — pädagogisch stark.

**PWA + Service Worker**: Für Festival ohne stabiles Netz intelligentes Fundament. Cache-first richtige Strategie.

---

### Schwächen

**State als globales Objekt**: `state` ist Window-Global. Funktioniert, macht Testing und spätere Erweiterungen schwierig. Technische Schuld.

**BFS ist positionsbasiert, nicht topologisch**: `updateHops()` berechnet Hops nach Pixel-Distanz (`< 180px`), nicht nach echter Netzwerktopologie. Simulation ok, echte BT-Geräte = Hop-Modell stimmt nicht mit Realität überein.

**Flooding ohne Deduplizierung**: `floodMessage` filtert nach `msg.route.includes(n.id)`, clientseitig im Simulationskontext. Echte Multi-Device-Umgebung = keine Garantie dass Message-ID nicht mehrfach ankommt.

**`prompt()` für User Input**: `setNodeName()`, `sendFind()`, `sendWorkshopAnnouncement()` nutzen `window.prompt()`. Blockiert UI-Thread, sieht auf Mobile schlecht aus, nicht stylbar.

**localStorage ohne Fehlerbehandlung**: Teilweise `try/catch`, inkonsistent — manche Lese-Stellen ohne Guard.

---

### Sicherheit der Nutzer — Kritischster Punkt

**1. XSS über Bluetooth-Gerätenamen**
`device.name` ungefiltert in `toast()` geschrieben — `toast()` macht kein Escaping. Kleines XSS-Risiko über präparierte Bluetooth-Gerätenamen. `escapeHtml` nur in `ui.js` angewendet.

**2. Message-Inhalte**
`escapeHtml` in `addMessageToUI` gut. `msg.srcName` in `receiveMessage` kommt direkt vom Sender, kein Sanitizing bevor in State. Bei echte BT-Channels = Eingabequelle.

**3. Kein Rate-Limiting für Messages**
Simulierte Incoming-Messages alle 5 Sekunden. Angreifer/Bug könnte Chat-DOM mit Tausenden Messages fluten. `if (state.messages.length > 200) state.messages.shift()` + DOM-Begrenzung nötig.

**4. `meshnet://` Deep Links**
`handleJoinURL()` parsed fremde URLs, fügt Nodes in State. `name` und `type` aus URL in Node-Namen — `escapeHtml` beim Einlesen nötig, nicht nur beim Rendern.

**5. QR-Code via externem Dienst**
`qrserver.com` für QR-Generierung. Node-IDs und Namen verlassen Gerät. Konzeptueller Bruch für "kein Backend"-Projekt. Clientseitige QR-Library (`qrcode.js`) konsistenter.

**6. Kein Content Security Policy Header**
Als PWA auf eigenem Host sollte CSP-Header gesetzt werden — inline-Scripts einschränken, externe Script-Quellen begrenzen.

---

### Was noch zu bedenken ist

**Akkuverbrauch**: Web Bluetooth Scanning + Canvas-Loop (`requestAnimationFrame`) + zwei `setInterval` — auf Festival-Tag ohne Lademöglichkeit Problem. `document.visibilitychange` für Low-Power-Mode sinnvoll.

**Gleichzeitige reale BT-Verbindungen**: Aktuell genau ein BT-Gerät verbunden. Pairing-Modell für echtes Mesh (viele Geräte, GATT-Services) nicht implementiert — laut WH-001 kein Ziel, aber Besucher könnten erwarten.

**Offline-First nicht vollständig**: Service Worker cached Assets, QR-Generator-Call und zukünftige Requests nicht gecached. Erster Load ohne Netz = QR fehlt.

**Keine Cache-Versionierung**: `meshnet-v1` hardcoded. Deployment-Update invalidiert Cache nicht automatisch. Festivalbesucher könnten alte Version sehen.

**Deutsch/Englisch gemischt**: Code-Kommentare, Toasts, UI-Labels, Variablennamen wechseln DE/EN. Für Forschungsprojekt tolerierbar, Workshops mit internationalen Gästen = Entscheidung nötig.

---

## Refactor & Bug Fixes — Prioritätsliste

### 🔴 Hoch (Immediate)

#### BUG-001: XSS in toast()
**File**: `js/ui.js`
**Problem**: `toast()` schreibt `msg` direkt — kein Escaping
**Fix**:
```javascript
function toast(msg, type = 'info') {
    const container = document.getElementById('toasts');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = escapeHtml(msg);  // ← escapeHtml hinzufügen
    container.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}
```

#### BUG-002: QR-Code externer Dienst
**File**: `js/meshnet.js`
**Problem**: `qrserver.com` — Node-IDs verlassen Gerät
**Fix**: Clientseitige QR-Library einbinden oder SVG-basiertes QR
```javascript
// Option A: Inline QR SVG generator
function generateQRSVG(data) {
    // Simple QR code SVG generation
    // Or use lightweight library: https://github.com/davidshimjs/qrcodejs
}
```

#### BUG-003: Rate-Limiting Messages
**File**: `js/routing.js` + `js/ui.js`
**Problem**: DOM-Flood via Messages
**Fix**:
```javascript
// In routing.js — simulated messages:
setInterval(() => {
    if (state.simulation && state.nodes.length > 1 && Math.random() < 0.15) {
        if (state.messages.length < 200) {  // ← Rate limit
            // ... existing code
        }
    }
}, 5000);

// In ui.js — addMessageToUI:
function addMessageToUI(msg, own) {
    if (state.messages.length > 200) {
        state.messages.shift();  // Remove oldest
    }
    // ... existing code
}
```

### 🟡 Mittel (Next)

#### REFACTOR-001: prompt() → Custom Modal
**Files**: `js/meshnet.js`, `js/routing.js`
**Problem**: `window.prompt()` blockiert UI-Thread, nicht stylbar
**Fix**: Custom modal overlay
```javascript
function showPrompt(title, defaultVal) {
    return new Promise(resolve => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal">
                <p>${title}</p>
                <input type="text" value="${defaultVal || ''}" />
                <button class="btn btn-primary">OK</button>
                <button class="btn btn-secondary">Cancel</button>
            </div>
        `;
        // ... event handlers
    });
}
```

#### REFACTOR-002: Cache-Versionierung
**File**: `sw.js` + `manifest.json`
**Problem**: `meshnet-v1` hardcoded — keine automatische Invalidierung
**Fix**: Version aus manifest oder build-time injection
```javascript
// sw.js
const CACHE_NAME = 'meshnet-' + METADATA.version;  // Build-time injected

// manifest.json
"version": "1.0.0"
```

#### REFACTOR-003: State-Management
**File**: `js/meshnet.js`
**Problem**: `state` als Window-Global
**Fix**: Module pattern oder class
```javascript
const MeshNet = (() => {
    const state = { /* ... */ };
    return {
        getState: () => state,
        setState: (updates) => { /* ... */ },
        // ... methods
    };
})();
```

### 🟢 Nice-to-have (Later)

#### REFACTOR-004: Low-Power-Mode
**File**: `js/meshnet.js`
**Fix**: `document.visibilitychange` handler
```javascript
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause simulation, reduce canvas redraw
        if (state.simulation) {
            state.simulation = false;
            // ... resume on visible
        }
    }
});
```

#### REFACTOR-005: Language Consistency
**Files**: All JS + HTML
**Fix**: Decide DE or EN primary, create translation map
```javascript
const i18n = {
    de: { scan: 'Bluetooth Scan', sim: 'Simulation Starten' },
    en: { scan: 'Bluetooth Scan', sim: 'Start Simulation' }
};
```

---

## Open Questions

1. QR-Code: clientseitige Library oder SVG-basiert?
2. State-Management: module pattern oder class?
3. Language: DE primary oder EN primary?
4. Custom Modal: eigene Implementation oder lightweight library?
5. Cache-Versionierung: build-time oder runtime?
6. Low-Power-Mode: nur visibilitychange oder auch battery API?

## Status: ✅ COMPLETED — Saved

Review documented, bugs and refactors identified, priorities set. Next session will implement 🔴 fixes.

## Next Steps

1. 🔴 BUG-001: toast() escapen
2. 🔴 BUG-002: QR offline-fähig
3. 🔴 BUG-003: Rate-Limiting Messages
4. 🟡 REFACTOR-001: prompt() → Custom Modal
5. 🟡 REFACTOR-002: Cache-Versionierung
6. 🟢 REFACTOR-004: Low-Power-Mode
