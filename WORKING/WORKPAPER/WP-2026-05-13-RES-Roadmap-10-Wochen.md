# WP-2026-05-13-RES-Roadmap-10-Wochen

## Session Goal
10-week implementation roadmap from today to festival.

## Timeline

### Week 1 (Now — 2026-05-13 to 2026-05-19)
**Foundation**
- [x] Workspace bootstrap (AAMS)
- [x] Initial project scan
- [ ] BRAIN file: project idea dokumentieren
- [ ] Whitepaper: mesh architecture
- [ ] File structure finalisieren
- [ ] JS modularization planen

### Week 2 (2026-05-20 to 2026-05-26)
**Frontend Core**
- [ ] `index.html` — Startseite mit Mesh-Canvas
- [ ] `css/main.css` — Shared styles
- [ ] `js/meshnet.js` — Core logic extrahiert
- [ ] `js/canvas.js` — Canvas rendering
- [ ] Bluetooth detection + simulation fallback

### Week 3 (2026-05-27 to 2026-06-02)
**Info Pages**
- [ ] `info/about.html` — Über das Projekt
- [ ] `info/how-it-works.html` — Funktionsweise
- [ ] `info/bluetooth-mesh.html` — Bluetooth Mesh erklärt
- [ ] Navigation zwischen pages
- [ ] Responsive design

### Week 4 (2026-06-03 to 2026-06-09)
**Bluetooth Integration**
- [ ] `js/bluetooth.js` — Web Bluetooth API module
- [ ] Device scanning polished
- [ ] Real mesh communication
- [ ] iOS/Safari fallback testing
- [ ] Android device testing

### Week 5 (2026-06-10 to 2026-06-16)
**Routing & Messages**
- [ ] `js/routing.js` — Managed flooding module
- [ ] Message types (beyond plain text)
- [ ] Route visualization improvement
- [ ] TTL strategy
- [ ] Node naming for festival

### Week 6 (2026-06-17 to 2026-06-23)
**Workshop Features**
- [ ] `info/workshop.html` — Workshop info
- [ ] `info/news.html` — Neuigkeiten
- [ ] `info/docs.html` — Dokumentation
- [ ] Festival experience log
- [ ] Quick Start Guide

### Week 7 (2026-06-24 to 2026-06-30)
**Polish & Testing**
- [ ] UI polish (animations, transitions)
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Error handling
- [ ] Offline capability (PWA?)

### Week 8 (2026-07-01 to 2026-07-07)
**Education Content**
- [ ] Code walkthrough guide
- [ ] Festival handout
- [ ] Training materials
- [ ] FAQ content
- [ ] Video screenshots

### Week 9 (2026-07-08 to 2026-07-14)
**Final Prep**
- [ ] All content reviewed
- [ ] Festival hardware ready (Dongles, etc.)
- [ ] Deployment准备
- [ ] Backup plan
- [ ] Team rehearsal

### Week 10 (2026-07-15 to 2026-07-21)
**Festival Week**
- [ ] Setup at venue
- [ ] Workshop execution
- [ ] Experience documentation
- [ ] People connection
- [ ] Post-festival follow-up

## Priority Order

### Must-Have (Week 1-4)
1. **Startseite mit Mesh-Canvas** — die App muss funktionieren
2. **Simulation Mode** — fallback für alle Geräte
3. **Bluetooth auf Android** — real mesh capability
4. **Chat** — basic messaging works

### Should-Have (Week 5-7)
5. **Info Pages** — about, how-it-works
6. **Bluetooth auf Desktop** — Dongles
7. **UI Polish** — clean, festival-ready
8. **Cross-browser testing**

### Nice-to-Have (Week 8-9)
9. **Education materials** — guides, handouts
10. **PWA/Offline** — works without internet
11. **Message types** — beyond chat
12. **Node registration** — festival system

## Risk Assessment

### High Risk
- **iOS Safari**: No Web Bluetooth → simulation only
  - Mitigation: Full simulation experience, not "broken"
- **Bluetooth Dongles**: Hardware availability
  - Mitigation: Order early, have backup options

### Medium Risk
- **Festival Internet**: No/Wifi unreliable
  - Mitigation: PWA/offline capability, local hosting
- **Android BT reliability**: Different device implementations
  - Mitigation: Test on multiple devices early

### Low Risk
- **Code complexity**: meshnet_client.html already works
  - Mitigation: Modularization, not rewriting
- **Content quality**: writing materials
  - Mitigation: Start early, iterate

## Festival Day Checklist

- [ ] Laptops charged
- [ ] Bluetooth Dongles ready
- [ ] Android devices tested
- [ ] Start page deployed
- [ ] Info pages accessible
- [ ] Quick Start Guides printed
- [ ] Experience logs ready
- [ ] Backup plan documented
- [ ] Team knows workshop structure
- [ ] Mesh network tested with all devices

## Open Questions

1. Festival venue: local hosting or online?
2. Who runs the workshop? (team size?)
3. How many Bluetooth Dongles needed?
4. Festival timeline: exact dates?
5. Post-festival: what happens after?
6. Should we create a "post-festival" page?
7. How to track people who "carry the idea forward"?

## Next Steps

1. BRAIN file dokumentieren
2. Whitepaper: mesh architecture
3. Week 1 tasks starten
4. Hardware (Dongles) bestellen
5. Festival dates confirmieren
