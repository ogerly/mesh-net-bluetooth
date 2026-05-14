# WP-2026-05-13-SPEC-QR-QR-Code-Joining

## Session Goal
QR code joining system for festival — participants scan QR to join network.

## QR Code Joining System

### QR Code Content Format
```
meshnet://join?node=0xABCD&name=CAMP-Maria&type=CAMP
```

### URL Scheme Handler
```javascript
// Handle meshnet://join URLs
function handleJoinURL(url) {
    try {
        const parsed = new URL(url);
        if (parsed.protocol === 'meshnet:') {
            const node = parsed.searchParams.get('node');
            const name = parsed.searchParams.get('name');
            const type = parsed.searchParams.get('type');
            
            if (node && name) {
                // Add node to network
                const newNode = new Node(
                    W/2 + (Math.random()-0.5)*200,
                    H/2 + (Math.random()-0.5)*200,
                    name,
                    true,
                    false
                );
                newNode.id = node;
                if (type) newNode.name = type + '-' + name;
                state.nodes.push(newNode);
                updateHops();
                updateUI();
                draw();
                toast(`Node ${newNode.name} via QR beigetreten`, 'success');
            }
        }
    } catch(e) {}
}
```

### QR Code Display on Workshop Station
```javascript
function showQRCode(node) {
    const url = `meshnet://join?node=${node.id}&name=${node.name}&type=${state.nodePrefix || ''}`;
    // Generate QR image
    const qrDiv = document.createElement('div');
    qrDiv.innerHTML = `<img src="qr?url=${encodeURIComponent(url)}" />`;
    qrDiv.innerHTML += `<p>Scan to join MeshNet</p>`;
    qrDiv.innerHTML += `<p><code>${url}</code></p>`;
    // Display in overlay
}
```

### QR Code Generation
- Use online QR generator (qr-code-generator.com)
- Pre-print QR codes at workshop station
- QR codes show both image + URL text (fallback)

### Festival Flow
```
1. Workshop station laptop → MeshNet running
2. Bluetooth scan → real nodes added
3. QR code generated for each node
4. QR printed or displayed on screen
5. Festival participants scan QR
6. Their device opens URL → joins network
7. Node appears on Canvas
```

### QR Code Design
```
┌─────────────────────┐
│   [QR Code Image]   │
│                     │
│  MeshNet Join       │
│  node: 0xABCD       │
│  name: CAMP-Maria   │
│                     │
│  meshnet://join     │
│  ?node=0xABCD       │
│  &name=CAMP-Maria   │
└─────────────────────┘
```

## Open Questions

1. QR code library — online tool or embedded?
2. Should QR codes include TTL info?
3. Should QR codes include simulation toggle?
4. Festival printing — who handles it?
5. Should we add a "join" button on index.html?

## Next Steps

1. Add URL scheme handler to meshnet.js
2. Add QR code display to workshop station
3. Festival QR code generation
4. QR printing plan
5. Test URL scheme handling
