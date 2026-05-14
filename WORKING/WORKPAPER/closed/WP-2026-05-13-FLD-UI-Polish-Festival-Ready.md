# WP-2026-05-13-FLD-UI-Polish-Festival-Ready

## Session Goal
UI polish — clean, festival-ready appearance.

## Polish Checklist

### Visual Polish
- [ ] Smooth transitions on all interactive elements
- [ ] Consistent spacing and alignment
- [ ] Hover states on all buttons
- [ ] Loading/empty states
- [ ] Toast animation refinement

### Festival-Specific UI
- [ ] "Forschungsprojekt" badge visible on start page
- [ ] Clear status indicator (Simulation vs Bluetooth)
- [ ] Empty state messaging (no nodes, no messages)
- [ ] Festival context hints in UI

### Code Quality
- [ ] Remove debug comments
- [ ] Consistent naming conventions
- [ ] Error handling completeness
- [ ] Performance optimization

### Specific Changes

#### Status Indicator
```
Status: Simulation → "MeshNet — Simulation Mode"
Status: Bluetooth → "MeshNet — Bluetooth Mesh Active"
Status: Offline → "MeshNet — Offline Ready (PWA)"
```

#### Empty State Messaging
- No nodes: "Klicke 'Simulation Starten' um das Netzwerk zu aktivieren"
- No messages: "Sende eine Nachricht um das Mesh zu erleben"
- Bluetooth unavailable: "Bluetooth nicht verfügbar — Simulation aktiv"

#### Festival Context
- "MeshNet — dezentrales Bluetooth Mesh als Forschungsprojekt" persistent
- Subtle hint: "Workshop / Festival →" link on start page

## Open Questions

1. Should we add a "festival mode" toggle?
2. Should we add a "beginner mode" (simplified UI)?
3. Color scheme — keep dark or add light option?
4. Animation speed — faster or slower for festival?

## Next Steps

1. Implement empty state messaging
2. Add festival context hints
3. Smooth transitions
4. Performance check
