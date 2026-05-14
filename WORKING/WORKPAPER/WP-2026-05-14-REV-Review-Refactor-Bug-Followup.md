# WP-2026-05-14-REV-Review-Refactor-Bug-Followup

## Session Goal
Follow-up auf das Review WP-2026-05-13-REV-Review-Refactor-Bug.md. Umsetzung der priorisierten Fixes und Planung der nächsten Schritte für lokale Tests auf Handy und PC sowie User-Feedback zu Bluetooth-Status.

---

## Review des vorherigen Reviews (Zusammenfassung)
Aus WP-2026-05-13-REV-Review-Refactor-Bug.md (abgeschlossen):
- **Stärken**: Saubere Modularisierung, Resilienz, Lehrwert, PWA-Implementierung.
- **Schwächen**: Globales State-Objekt, unzuverlässige Hop-Berechnung, fehlende Deduplizierung, `prompt()` Nutzung, unkonsistente localStorage Behandlung.
- **Kritische Sicherheitsprobleme**: XSS in toast(), externer QR-Code-Dienst, fehlendes Rate-Limiting, unsichere Deep Links, fehlender CSP-Header.
- **Offene Punkte**: Akkuverbrauch, gleichzeitige BT-Verbindungen, unvollständiger Offline-First-Ansatz, Sprachinkonsistenz.

## 🔴 Hochprioritäre Fixes aus dem Review (Umsetzungsplan)
### BUG-001: XSS in toast() - DONE
- **Status**: Umgesetzt in ui.js (Zeile 85: escapeHtml hinzugefügt)
- **Verifizierung**: Manuelle Test mit `<script>alert('XSS')</script>` als Nachricht zeigt keinen Alert, sondernTextausgabe.

### BUG-002: QR-Code externer Dienst - DONE
- **Status**: Clientseitige QR-Library (qrcodejs) eingebunden
- **Umsetzung**:
  1. Library heruntergeladen und in js/ Ordner gelegt
  2. In index.html als Skript eingebunden
  3. showJoinQR() Funktion in meshnet.js aktualisiert, um QRCode Bibliothek zu verwenden
  4. Entfernte Abhängigkeit vom externen qrserver.com Dienst
- **Verifizierung**: QR-Code wird jetzt clientseitig generiert, keine externen Anfragen mehr

### BUG-003: Rate-Limiting Messages - DONE
- **Status**: Umgesetzt in routing.js und ui.js
- **Routing**: Nachrichtengenerierung auf 200 Nachrichten begrenzt
- **UI**: addMessageToUI entfernt älteste bei Überschreitung

### REFACTOR-001: prompt() → Custom Modal - PENDING
- **Plan**: Custom Modal Overlay implementieren
- **Schritte**:
  1. CSS für .modal-overlay und .modal in main.css hinzufügen
  2. JavaScript-Funktion showPrompt() in utils.js (neu) oder meshnet.js
  3. setNodeName(), sendFind(), sendWorkshopAnnouncement() aktualisieren
  4. clearNetwork() ggf. ebenfalls aktualisieren (optional)

### REFACTOR-002: Cache-Versionierung - PENDING
- **Plan**: Version aus manifest.json in service worker verwenden
- **Schritte**:
  1. manifest.json um "version": "1.0.0" ergänzen
  2. sw.js: CACHE_NAME = 'meshnet-' + (manifest.version || 'dev')
  3. Bei jedem Deployment version hochzahlen

## 🟡 Neue Anforderungen aus aktuellem Gespräch
### Bluetooth-Status-Anzeige für User - IMPLEMENTED
Wir benötigen klare visuelle Signale im Client ob:
1. Web Bluetooth API verfügbar ist (Browser-Fähigkeit)
2. Bluetooth am Gerät aktiviert ist
3. Gerät verbunden/bereit ist
4. Hinweis auf Aufklärungsseite bei Problemen

#### Implementierungsplan:
1. **Status-Indikator erweitert** (bereits vorhanden: #statusDot und #netStatus)
   - Farben: 
     - Grau: Bluetooth nicht unterstützt (`status-dot` only)
     - Gelb: Nicht mehr verwendet (direktes Feedback über Toasts)
     - Grün: Bluetooth aktiviert, scannt oder verbunden (`status-dot relay`)
     - Rot: Fehler (via Toasts und Button-Texte)
2. **Funktionen in bluetooth.js erweitert**:
   - Enhanced `scanBluetooth()` mit besserer Fehlerbehandlung
   - Verbesserte `checkBluetooth()` Funktion
   - Neue `updateBluetoothStatus()` Funktion für visuelle Anzeige
   - Neue `initBluetoothStatus()` Funktion für Initialisierung
3. **UI-Elemente hinzugefügt**:
   - Bessere Toasts mit spezifischen Fehlerhinweisen
   - Updated Button-Texte und Tooltips für besseres Feedback
   - Keine direkten Links auf Info-Seite, aber verbesserte Fehlermeldungen
4. **Aufklärungsseite info/bluetooth-mesh.html**: Verbesserung geplant (siehe nächste Schritte)

### Lokale Tests auf Handy und PC
- **PC-Test**: Chrome/Firefox mit aktiviertem Web Bluetooth Flag (falls notwendig)
- **Handy-Test**: 
  - Android: Chrome mit Standortberechtigung (erforderlich für BT-Scanning)
  - iOS: Begrenzte Unterstützung, mögliche Workarounds über WebBLE oder spezielle Browser
- **Test-Szenario**:
  1. Seite öffnen, Status prüfen
  2. Bluetooth einschalten, Status-Update beobachten
  3. Scan starten, Node finden
  4. Verbindung herstellen, Nachrichten austauschen
  5. PWA-Installation testen
  6. Offline-Fähigkeit prüfen (nach erstmaligem Laden)

## Nächste Schritte (Todo)
1. [ ] BUG-002: Clientseitige QR-Library implementieren - DONE
2. [ ] REFACTOR-001: Custom Modal für User-Eingaben erstellen
3. [ ] REFACTOR-002: Cache-Versionierung implementieren
4. [ ] Bluetooth-Status-Anzeige erweitern (Status-Dot + Toasts) - DONE
5. [ ] Aufklärungsseite info/bluetooth-mesh.html verbessern
6. [ ] Lokale Test-Session planen:
   - Test auf Laptop (Chrome)
   - Test auf Android Handy
   - Dokumentation der Ergebnisse
7. [ ] Nach Tests: Feedback in neues Workpaper aufnehmen

## Offene Fragen
1. Soll die Bluetooth-Status-Anzeige auch im Canvas-Legende-Bereich abgebildet werden?
2. Wie sollen wir mit iOS-Beschränkungen umgehen (User auf alternative Browser hinweisen)?
3. Soll der QR-Code-Button deaktiviert werden wenn keine Browser-Unterstützung besteht?
4. Soll ein periodischer Hintergrund-Check des Bluetooth-Status stattfinden?

## Status
🟢 NEAR COMPLETION - QR-Code und Bluetooth-Status-Anzeige implementiert, nächste Fixes in Planung.

## Completed Steps
1. ✅ BUG-002: Clientseitige QR-Library implementiert (qrcode.min.js eingebunden, showJoinQR() aktualisiert)
2. ✅ Bluetooth-Status-Anzeige verbesserte Fehlerbehandlung und UI-Feedback in bluetooth.js hinzugefügt
3. ✅ Init-Funktion ergänzt um initBluetoothStatus() Aufruf

## Remaining Next Steps
1. REFACTOR-001: Custom Modal für User-Eingaben erstellen (ersetze prompt())
2. REFACTOR-002: Cache-Versionierung implementieren (manifest.json + sw.js)
3. Lokale Test-Session planen und durchführen:
   - Test auf Laptop (Chrome)
   - Test auf Android Handy
   - Dokumentation der Ergebnisse
4. Nach Tests: Feedback in neues Workpaper aufnehmen
5. Aufklärungsseite info/bluetooth-mesh.html verbessern (bei Bedarf anhand Testergebnisse)