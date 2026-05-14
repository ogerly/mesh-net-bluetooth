# WP-2026-05-13-RES-Festival-Hardware-Node-Registration

## Session Goal
Festival hardware planning + node registration system for workshop station.

## Hardware Planning

### Bluetooth Dongles
| Quantity | Purpose |
|----------|---------|
| 3-5 | Desktop laptops at workshop table |
| 2 | Backup |
| **Total: 5-7** | |

### Dongle Type
- USB 3.0 Bluetooth 5.0 adapter
- Compatible with Chrome/Edge on Linux/Windows
- Recommended: CSR-based or Intel-based

### Laptops
| Quantity | Purpose |
|----------|---------|
| 2-3 | Workshop demonstration |
| 1 | Backup |
| **Total: 3-4** | |

### Additional Hardware
- Extension cables (USB extension for display setup)
- Power strip
- HDMI cable (Demo-Station display)
- QR code prints (node registration)

## Node Registration System

### Festival Registration Flow
```
Workshop Station:
1. Open MeshNet on laptop
2. Scan Bluetooth → add real nodes
3. Print QR code with node ID
4. Give QR code to participant
5. Participant scans → joins network
```

### QR Code Content
```
meshnet://join?node=0xABCD&name=Camp-Maria&type=CAMP
```

### QR Code Generation
```javascript
function generateQRCode(node) {
    const url = `meshnet://join?node=${node.id}&name=${node.name}&type=${node.prefix || ''}`;
    // Use QR code library or static QR
    return url;
}
```

### QR Code Implementation Options
1. **Static QR codes** — pre-printed at workshop station
2. **Dynamic QR codes** — generated on laptop at festival
3. **URL sharing** — simple URL copy (no QR needed)

### Decision: QR Codes + URL Sharing
- QR codes for easy joining
- URL sharing as fallback
- Pre-print prefix codes for workshop participants

## Festival Badge System

### Pre-Printed Prefix Codes
| Badge | Prefix |
|-------|--------|
| 🟢 Camp | CAMP |
| 🔵 Workshop | WKS |
| 🟡 Developer | DEV |
| 🟠 Artist | ART |
| ⚪ Guest | GUEST |

### Physical Badge → Digital Prefix
1. Participant gets physical badge
2. Enters prefix code in MeshNet
3. Node name = prefix + free name

## Open Questions

1. How many Dongles to order?
2. Dongle compatibility (Linux/Windows)?
3. QR code generator — online tool or custom?
4. Badge design — print or digital?
5. Festival dates confirmed?
6. Venue — local hosting or online?

## Next Steps

1. Dongle order (5-7 USB BT 5.0 adapters)
2. Festival dates confirmieren
3. QR code generation tool
4. Badge design
5. Venue setup plan
