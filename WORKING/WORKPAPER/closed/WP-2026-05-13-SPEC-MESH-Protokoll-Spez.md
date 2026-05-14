# WP-2026-05-13-SPEC-MESH-Protokoll-Spez

## Session Goal
Define mesh protocol specification based on existing meshnet_client.html implementation.

## Current Implementation Analysis (meshnet_client.html)

### Node Architecture
```
Node {
    id: '0xXXXX'          // 4-byte hex ID
    name: string          // Human-readable name
    x, y: number          // Canvas position
    vx, vy: number        // Velocity (simulation)
    isRelay: boolean      // Forwarding capability
    isMe: boolean         // Local device
    online: boolean       // Connectivity
    rssi: number          // Signal strength (-40 to -90)
    hops: number          // Distance from me (BFS)
    lastSeen: timestamp
    radius: number        // Visual size
}
```

### Network Topology
- **Relay Nodes**: Forward messages, larger visual representation
- **Leaf Nodes**: Receive/send only, smaller representation
- **Self**: Always relay, green indicator

### Communication Range
- **Bluetooth range**: ~180px in canvas (mapped to ~10m real-world)
- **Proximity-based**: Nodes within range can communicate directly
- **Multi-hop**: Messages relay through intermediate nodes

### Message Routing: Managed Flooding
```
sendMessage()
    │
    ├── Create message: {id, src, text, ttl, hops, route}
    │
    ├── floodMessage(fromId)
    │       ├── Find neighbors within range
    │       ├── For each neighbor:
    │       │       ├── Animate packet (canvas)
    │       │       └── If neighbor.isRelay && ttl > 0:
    │       │               ├── ttl--
    │       │               ├── hops++
    │       │               ├── route.push(neighbor.id)
    │       │               └── continueFloodFrom(neighbor, msg)
    │
    └── Message delivered when ttl reaches 0
```

### Hop Computation: BFS
```
updateHops()
    ├── BFS from me
    ├── range = 180px
    ├── Relay nodes can forward
    ├── Leaf nodes can only receive from relays
    └── hops = distance in hop-count (not physical distance)
```

## Protocol Specification

### Node Discovery
- **Bluetooth**: `navigator.bluetooth.requestDevice({acceptAllDevices: true})`
- **Simulation**: Random node generation within range
- **Registration**: Node name + ID (no central registry)

### Message Format
```json
{
    "id": 1,
    "src": "0xABCD",
    "srcName": "Alpha-42",
    "text": "Hello Mesh!",
    "ttl": 7,
    "hops": 0,
    "route": ["0xABCD"],
    "timestamp": 1715600000000
}
```

### TTL Configuration
- **Default TTL**: 7 hops
- **Festival context**: ~10-20 nodes max → TTL 7 sufficient
- **Scalability**: TTL should adapt to network size

### Relay Rules
- Only relay nodes forward messages
- Leaf nodes receive but don't forward
- Already-visited nodes excluded from route (loop prevention)

## Festival-Specific Adaptations

### Network Size
- Expected: 10-30 nodes during festival
- TTL 7 covers ~10-15 nodes in mesh topology
- Should we increase TTL for larger networks?

### Node Names
- Festival context: meaningful names (camp names, person names)
- Current: randomized (Alpha, Bravo, etc.)
- Need: user-defined names or festival-specific naming

### Message Types
- Current: text chat only
- Festival needs:
  - "I'm here" / location updates
  - "Looking for X" / finding people
  - Workshop announcements
  - Event coordination

## Open Questions

1. Message types beyond plain text — planned for Week 5
2. TTL value: 7 (fixed for festival) or adaptive?
3. Node naming: festival-specific or free-form?
4. Node "registration" for festival?
5. Message persistence (localStorage)?
6. Presence signal (heartbeat)?
7. Basic encryption?

## Status: ✅ COMPLETED

Protocol spec documented in whitepaper (WH-001). Implementation in code: meshnet.js, routing.js, canvas.js.
