# WP-2026-05-13-SPEC-MSG-MessageTypes

## Session Goal
Message types beyond plain text — define message formats for festival use.

## Message Type System

### Type Field in Messages
```json
{
    "id": 1,
    "src": "0xABCD",
    "srcName": "Alpha-42",
    "type": "chat",        // message type
    "text": "Hello Mesh!",
    "ttl": 7,
    "hops": 0,
    "route": ["0xABCD"],
    "timestamp": 1715600000000
}
```

### Message Types

| Type | Purpose | Format | Festival Use |
|------|---------|--------|-------------|
| **chat** | Plain text chat | `text: "..."` | Everyone |
| **presence** | "I'm here" signal | `text: "📍 [location]"` | Network awareness |
| **find** | "Looking for X" | `text: "Looking for: [person]"` | Finding people |
| **wks** | Workshop announcement | `text: "[announcement]"` | Workshop coordination |
| **event** | Event coordination | `text: "[event details]"` | Event planning |
| **ping** | Node ping (heartbeat) | `text: "ping"` | Network health |

### Festival Priority Types
1. **chat** — basic messaging (already implemented)
2. **presence** — "I'm here" for network awareness
3. **find** — "Looking for X" to find people
4. **wks** — Workshop announcements

### UI for Message Types

#### Chat (default)
```
[Input field] → "Nachricht senden" button
```

#### Presence
```
[Button] "📍 Presence senden" → broadcasts location
```

#### Find
```
[Input field] → "Looking for: [name]" → send as find type
```

#### Workshop
```
[Button] "WKS Announcement" → broadcast to all relays
```

### Implementation Plan

#### Type Selector (simple)
```javascript
function sendMessage(type = 'chat') {
    const text = document.getElementById('msgInput').value.trim();
    if (!text) return;
    
    const msg = {
        id: state.nextMsgId++,
        src: state.myId,
        srcName: state.myName,
        type: type,
        text: text,
        ttl: 7,
        hops: 0,
        route: [state.myId],
        timestamp: Date.now(),
        delivered: false,
    };
    // ... flood + display
}
```

#### Type-based Display
```javascript
function addMessageToUI(msg, own) {
    const typeIcon = {
        chat: '',
        presence: '📍',
        find: '🔍',
        wks: '📢',
        event: '📅',
        ping: '🏓'
    }[msg.type] || '';
    
    // Display with type icon
}
```

### Festival Flow

```
Festival Day:
1. Open MeshNet → simulation or BT
2. Send "📍 Presence" → network sees you
3. Chat with nearby nodes
4. "🔍 Looking for Maria" → find people
5. "📢 Workshop in 30 min" → announcement
6. Build network across festival grounds
```

## Open Questions

1. Should we add a type selector UI or keep it simple?
2. Should presence include GPS/location data?
3. Should find messages be broadcast or targeted?
4. Should workshop announcements be relay-only?
5. Should we add "goodbye" type when leaving festival?

## Next Steps

1. Implement type field in message format
2. Add presence button to index.html
3. Add find input to index.html
4. Type-based UI display
5. Festival flow test
