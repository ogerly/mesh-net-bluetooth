# WP-2026-05-13-SPEC-NODE-Naming

## Session Goal
Festival node naming system — meaningful names for people at the festival.

## Festival Naming System

### Node Name Format
```
{Prefix}-{FreeName}
```

### Prefixes (Festival context)
| Prefix | Meaning |
|--------|---------|
| CAMP | Camp member |
| WKS | Workshop participant |
| DEV | Developer/tech person |
| ART | Artist/creative person |
| GUEST | Festival guest |
| — | No prefix (free-form) |

### Examples
- `CAMP-Maria` — Maria from camp
- `WKS-MeshNet` — Workshop participant interested in MeshNet
- `DEV-Blues` — Developer with tech interest
- `ART-Sound` — Artist working with sound
- `GUEST-Hello` — Festival guest
- `Freya` — Free-form, no prefix

### Implementation

#### User Input
```javascript
function setNodeName() {
    const name = prompt('Dein Name für das Mesh:');
    if (name) {
        state.myName = name;
        const me = state.nodes.find(n => n.isMe);
        if (me) me.name = name;
        updateUI();
        draw();
    }
}
```

#### Simulation Names
```javascript
function genFestivalName() {
    const prefixes = ['CAMP','WKS','DEV','ART','GUEST',''];
    const prefix = prefixes[Math.floor(Math.random()*prefixes.length)];
    const names = ['Alpha','Bravo','Charlie','Delta','Echo','Foxtrot','Golf','Hotel'];
    const name = names[Math.floor(Math.random()*names.length)] + '-' + Math.floor(Math.random()*99);
    return prefix ? prefix + '-' + name : name;
}
```

### Festival-Node-Registration (Optional)
- **Simple**: user enters own name
- **Advanced**: QR-code based registration at workshop station
- **Festival badge**: pre-printed prefix codes for workshop participants

## Open Questions

1. Should we add a "prefix picker" UI?
2. Should simulation nodes show prefixes?
3. Should we persist node name (localStorage)?
4. Festival badge system — physical or digital?

## Next Steps

1. Implement node name input in index.html
2. Add prefix picker UI
3. Festival registration flow for workshop station
4. localStorage persistence
