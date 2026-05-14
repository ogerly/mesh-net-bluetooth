# WP-2026-05-13-SPEC-BT-Browser-Compatibility

## Session Goal
Evaluate Web Bluetooth API compatibility and define fallback strategies for festival use.

## Web Bluetooth API Status

### Supported Browsers
| Browser | Platform | Support | Notes |
|---------|----------|---------|-------|
| Chrome | Android | ✅ Full | No flags needed |
| Chrome | Desktop | ✅ Full | No flags needed (2024+) |
| Edge | Windows | ✅ Full | Chromium-based |
| Safari | iOS | ❌ None | Never implemented |
| Firefox | Desktop | ❌ None | Never implemented |
| Firefox | Android | ❌ None | Never implemented |
| Opera | Android | ✅ Partial | Chromium-based |
| Samsung Internet | Android | ✅ Partial | Chromium-based |

### Festival Device Reality
- **Android**: ~70% of festival devices → Chrome/Samsung Internet → WORKS
- **iOS**: ~25% of festival devices → Safari → NO BLUETOOTH
- **Desktop/Laptop**: ~5% → Chrome/Edge → WORKS

## Strategy

### Primary: Web Bluetooth API
- Android Chrome: native `navigator.bluetooth.requestDevice()`
- Desktop Chrome/Edge: native API
- Samsung Internet: native API (Chromium)

### Fallback 1: Simulation Mode
- **Always available** — funktioniert auf allen Geräten
- Canvas-Visualisierung mit simulated nodes
- Chatten, Mesh-topology verstehen
- Keine echte Bluetooth-Kommunikation

### Fallback 2: QR Code / URL Sharing
- Node-IDs via QR-Code teilen
- URL-Parameter für "joining"
- Workaround für iOS: Leute können trotzdem chatten

### Fallback 3: USB Bluetooth Dongles
- Für Desktop-Laptops am Workshop-Tisch
- Android-BT ist sufficient für mobile

## Implementation Plan

1. **Detection**: `if (!navigator.bluetooth) → simulation mode`
2. **Graceful degradation**: Bluetooth-features disabled but mesh still works
3. **Clear messaging**: "Bluetooth nicht verfügbar — Simulation aktiv"
4. **iOS users**: Can participate fully in simulation + chat
5. **Android users**: Real mesh over Bluetooth

## Code Pattern

```javascript
function initBluetooth() {
    if (!navigator.bluetooth) {
        toast('Bluetooth nicht verfügbar — Simulation aktiv', 'info');
        state.simulation = true;
        return false;
    }
    // ... proceed with real bluetooth
}
```

## Festival Strategy

- **iOS**: Simulation + chat + learning — full experience
- **Android**: Real Bluetooth mesh — full experience
- **Desktop**: USB Dongles or Chrome BT — full experience
- **Mixed**: iOS + Android = hybrid mesh (simulated + real nodes)

## Open Questions

1. Samsung Internet BT support reliability?
2. Wie viele Dongles für Desktop-Workshop?
3. iOS-Fallback: QR-Code Sharing oder nur simulation?

## Status: ✅ COMPLETED

Implementation: `bluetooth.js` — checkBluetooth(), scanBluetooth(), detection + simulation fallback. Info page content in `info/bluetooth-mesh.html` and `info/faq.html`.
