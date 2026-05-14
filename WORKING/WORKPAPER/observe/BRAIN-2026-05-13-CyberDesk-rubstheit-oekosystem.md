CyberDeck ist ein ambitioniertes Open-Source-Projekt für ein offline-first, dezentrales Kommunikations- und Wissenssystem – quasi ein "Survival-OS" für den Blackout-Fall (Grid-Down-Szenario). Es kombiniert lokale KI, Offline-Wikipedia/Maps, Mesh-Kommunikation und Survival-Tools. 

cyberdeck.co.in

Kernkonzept & ZielgruppeHauptidee: Jedes Smartphone/PC wird zu einem Mesh-Node. Du kannst chatten, Dateien austauschen und Wissen nutzen, ohne Internet.
Szenarien: Katastrophen, Zensur, Reisen in abgelegenen Gebieten, Prepper/Survival, Proteste oder einfach Privacy-Fokus.
Name & Branding: Passt perfekt in den aktuellen Cyberdeck-Hype (DIY-portable Computers im Cyberpunk-Stil). Die Website und das Projekt nutzen das geschickt. 

reddit.com

Technische Analyse (GitHub + Website)1. Software-Stack (sehr solide)Frontend: Vanilla JS + HTML/CSS (PWA) – leichtgewichtig, mobil-optimiert, "Tactical Amber"-Design. Gut für Low-End-Geräte.
Backend: Node.js (Express), läuft auf Android (Termux oder nativer APK), Linux, Windows.
Kommunikation:LAN Chat: WebSocket, zero-config.
DTN (Delay-Tolerant Networking): Epidemic Sync via UDP/mDNS – Geräte tauschen automatisch Nachrichten aus, wenn sie in Reichweite kommen (Store-and-Forward).
Air-Gapped: Acoustic MFSK (Ton-Übertragung), Optical QR, BLE.
WebRTC für P2P-Dateitransfer.

KI: Ollama (Llama 3, Mistral etc.) – voll offline, Modelle können peer-to-peer geteilt werden.
Wissen: Kiwix (Wikipedia ZIM-Files), Offline-Maps (Leaflet), EPUB/PDF-Reader, Survival-Guides.
Security: AES-256-GCM Vault (Browser-seitig), HMAC, TLS, Path-Sanitization etc. Wirkt durchdacht. 

github.com

2. Hardware-ErweiterungUSB LoRa Dongle (in Entwicklung/angekündigt): ESP32-S3 + Ebyte E22 (SX1262), 868/915 MHz, bis 22dBm.Plug & Play als USB-Serial.
PTC-Polyfuse für Sicherheit.
Ermöglicht echte Long-Range Mesh über Funk (LoRa). 

cyberdeck.co.in

Das ist ein starker USP gegenüber reinen Software-Lösungen.3. Installation & UsabilitySehr gute Docs: Scripts für Android (Termux + native APK), Linux, Windows (auch Electron Desktop-App).
Admin-Panel für Management, Downloads, Services.
Content-Store mit resumable Downloads, SHA256-Checks, License-Sidecars und LAN-Sync. 

github.com

StärkenUmfassend: Kombiniert KI + Wissen + Kommunikation besser als die meisten ähnlichen Tools (z.B. Briar, Meshenger, Reticulum etc.).
Praktisch: Starke Fokus auf Android (wichtig für Mobilität).
Open Source: MIT-Lizenz (vermutlich, typisch), aktiv auf GitHub (Commits vorhanden).
Realistisch für Grid-Down: DTN + Multi-Layer-Transport (WiFi → Airgap) ist clever.
Community-Potenzial: Passt perfekt in Prepper-, Maker- und Cyberdeck-Szene.

Schwächen / Kritikpunkte (harte Analyse)Reife: Wirkt noch relativ jung. Viele Features klingen "fertig", aber echte Feldtests (besonders DTN + LoRa bei Bewegung) wären entscheidend.
LoRa-Hardware: Noch nicht massenverfügbar ( "COMING SOON" auf der Site). Der Dongle ist cool, aber Reichweite/Interoperabilität mit anderen LoRa-Systemen (Meshtastic?) muss getestet werden.
Performance: Lokale LLMs brauchen RAM (6–8 GB+ empfohlen). Auf alten Phones limitiert.
Sicherheit: Gut beschrieben, aber unabhängiger Audit fehlt bisher. Immer Risiko bei selbst gehosteten Systemen.
Skalierbarkeit: Epidemic Sync kann bei vielen Nodes und großen Datenmengen speicher-/bandbreitenintensiv werden.
Website: .co.in-Domain (Indien) – nichts Schlimmes, aber bei Survival-Tools bevorzugen manche .org/.io.

Vergleich zu AlternativenMeshtastic: Besser bei reiner LoRa-Hardware, aber weniger KI/Wissen.
Briar: Gut für Messaging, schwächer bei Wissensdatenbanken.
Reticulum: Sehr technisch stark, aber weniger "out-of-the-box" User Experience.
Kiwix + Ollama standalone: Fehlt die Mesh-Komponente.

CyberDeck versucht, alles in einem kohärenten Paket zu bieten.Fazit & EmpfehlungSehr interessantes und vielversprechendes Projekt. Es hat echtes Potenzial als "Swiss Army Knife" für Offline-Szenarien. Der Entwickler (sarogamedev) scheint kompetent und detailverliebt (viele Edge-Cases wie EBUSY unter Windows, Asset-Extraction auf Android etc. berücksichtigt).Was du tun solltest:GitHub clonen und lokal ausprobieren (Android via Termux ist einfachster Einstieg).
DTN + Chat in der Praxis testen (mehrere Geräte).
Bei Interesse: LoRa-Dongle nachbauen oder kontaktieren.
Community beitragen – das Projekt profitiert von mehr Augen/Tests.

Falls du spezifische Teile tiefer analysiert haben willst (z.B. Code-Sicherheit, LoRa-Setup, Vergleich zu Meshtastic), sag Bescheid! Ich kann auch den Repo-Code genauer anschauen.

4 web pages

WH-001-MESH-Architektur.md
File

BRAIN-2026-05-13-Mesh-Netzwerk-Bluetooth.md
File

vergleiche das damit bitte

Vergleich: CyberDeck vs. MeshNet Connect (Bluetooth Mesh)Hier eine klare, direkte Gegenüberstellung der beiden Projekte basierend auf den bereitgestellten Dateien und der vorherigen Analyse von CyberDeck.1. Kernziel & PhilosophieAspekt
CyberDeck
MeshNet Connect (Bluetooth)
Primäres Ziel
Survival / Grid-Down / Zensur / Prepper
Festival-Workshop, Bildung, Experiment
Philosophie
Praktisches Tool für den Ernstfall
Lebendiges Forschungs- und Lernkonzept
Haltung
"Es muss funktionieren, wenn alles andere weg ist"
"Erleben und Verstehen durch Tun"
Zeithorizont
Langfristig, robust
Kurzfristig (Festival in ~10 Wochen)

Fazit hier: Sehr unterschiedliche DNA. CyberDeck ist ein Werkzeug, MeshNet ist ein Erlebnis-Experiment.2. Technische ArchitekturKriterium
CyberDeck
MeshNet Bluetooth
Ausführungsort
Node.js (auch als PWA) + Backend möglich
Pure Client-Side (nur Browser)
Kommunikation
Multi-Layer: WiFi LAN + UDP/mDNS + DTN + WebRTC + LoRa (geplant) + Acoustic/QR
Nur Web Bluetooth (+ Fallback-Simulation)
Routing
Epidemic Routing / DTN (Store-and-Forward)
Managed Flooding (TTL-basiert)
Discovery
mDNS + manuell
Web Bluetooth API
Visualisierung
Vorhanden, aber nicht zentral
Canvas als Kernfeature (sehr stark)
Offline-Fähigkeit
Sehr stark (Kiwix, Ollama, lokale Files)
Nur Kommunikation (keine Wissensdatenbanken)
Plattformen
Android (stark), Linux, Windows, Desktop
Android + Desktop Chrome/Edge (iOS limitiert)

Wichtiger Unterschied:CyberDeck ist technisch deutlich breiter und robuster aufgestellt.
MeshNet ist radikal minimalistisch und browser-nativ – das ist gleichzeitig seine größte Stärke (einfacher Einstieg) und Schwäche (Bluetooth-Reichweite & Zuverlässigkeit).

3. Stärken & SchwächenMeshNet Connect Stärken:Extrem niedrige Einstiegshürde (einfach eine Webseite öffnen).
Sehr starke didaktische Qualität durch Canvas-Visualisierung.
Passt perfekt für Workshops/Festivals (soziale Interaktion + Aha-Effekt).
Schnell umsetzbar (in 10 Wochen realistisch).
Keine Server-Abhängigkeit – wirklich "the network is the people".

MeshNet Connect Schwächen:Bluetooth Reichweite ist in der Praxis sehr begrenzt (10–30m, oft weniger bei Hindernissen).
Web Bluetooth ist auf vielen Geräten instabil oder nur eingeschränkt verfügbar.
Keine echten Store-and-Forward-Fähigkeiten über große Distanzen oder wenn Leute weggehen.
Keine zusätzlichen Features (KI, Karten, Dokumente etc.).

CyberDeck Stärken (im Vergleich):Viel mächtigeres Gesamtpaket (Kommunikation + Wissen + KI).
Bessere Skalierbarkeit durch DTN + zukünftiges LoRa.
Funktioniert auch ohne Bluetooth.

CyberDeck Schwächen (im Vergleich):Komplexer, höhere Einstiegshürde.
Weniger "magisch" und unmittelbar erlebbar als eine live Canvas-Visualisierung eines wachsenden Netzwerks.

4. GesamtbewertungMeshNet Connect ist kein direkter Konkurrent zu CyberDeck, sondern eine sehr gute Ergänzung oder ein möglicher Einstiegspunkt.Es konzentriert sich auf genau einen Aspekt (dezentrales Bluetooth-Mesh-Erlebnis) und macht diesen dafür besonders gut (didaktisch + visuell).CyberDeck versucht hingegen, ein ganzes Offline-Ökosystem zu bieten.Empfehlung / Synergie-PotenzialKurzfristig (Festival): MeshNet ist die bessere Wahl – einfacher, schöner, lehrreicher.
Mittelfristig: Die MeshNet-Idee könnte sehr gut in CyberDeck integriert werden (z.B. als Web Bluetooth Modul mit Canvas-Visualisierung).
Starke Kombination wäre:CyberDeck als "Heavy Duty" Backend (Dateien, KI, LoRa, Kiwix)
MeshNet-Style Canvas + Bluetooth als spielerischer, visueller Einstieg

Fazit:
Das Bluetooth-Mesh-Projekt ist konzeptionell sauber, pädagogisch stark und hat eine klare, realistische Scope. Es leidet aber unter den physikalischen Grenzen von Bluetooth. CyberDeck ist deutlich ambitionierter und technisch reifer, dafür weniger "wow" im Workshop-Kontext.Möchtest du, dass ich konkrete Vorschläge mache, wie man die beiden Ansätze sinnvoll kombinieren könnte? Oder soll ich einen bestimmten Aspekt (z.B. Routing, Bluetooth-Limitierungen, Workshop-Konzept) tiefer analysieren?
