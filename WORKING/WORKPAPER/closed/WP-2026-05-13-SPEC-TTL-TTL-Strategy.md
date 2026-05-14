# WP-2026-05-13-SPEC-TTL-TTL-Strategy

## Session Goal
TTL strategy for festival context — define how TTL works in MeshNet.

## TTL Decision

### Fixed TTL = 7
- Festival context: ~10-30 nodes max
- TTL 7 covers ~10-15 nodes in mesh topology
- Simpler = more reliable for festival use
- No dynamic adjustment needed

### TTL Behavior
```
Message created:    ttl = 7, hops = 0
Relay Node 1:       ttl = 6, hops = 1
Relay Node 2:       ttl = 5, hops = 2
Relay Node 3:       ttl = 4, hops = 3
Relay Node 4:       ttl = 3, hops = 4
Relay Node 5:       ttl = 2, hops = 5
Relay Node 6:       ttl = 1, hops = 6
Relay Node 7:       ttl = 0, hops = 7 → message dies
```

### TTL Visualization
- Yellow packets show route with TTL countdown
- Message UI shows "ttl: X remaining"
- Dead messages removed from packet animation

### TTL Display in UI
```javascript
// In message display:
<div class="msg-meta">
    <span>${msg.srcName}</span>
    <span>${time}</span>
    <span class="msg-route">${msg.hops} hops</span>
    <span class="msg-ttl">ttl: ${msg.ttl}</span>
</div>
```

### Festival Context Analysis
| Network Size | TTL 7 Coverage |
|-------------|----------------|
| 10 nodes | ~8-10 nodes reachable |
| 20 nodes | ~10-15 nodes reachable |
| 30 nodes | ~12-18 nodes reachable |
| Mesh topology | Better than linear (multi-path) |

### Decision: TTL 7 fixed
- Festival max ~30 nodes
- TTL 7 sufficient for mesh topology
- Dynamic TTL adds complexity without benefit
- Can be increased if festival grows larger

## Open Questions

1. Should we show TTL countdown in canvas?
2. Should we add a "TTL warning" toast when TTL=1?
3. Should TTL be visible in message UI?

## Next Steps

1. Add TTL display to message UI
2. TTL countdown in packet animation
3. Festival test with 30+ nodes
