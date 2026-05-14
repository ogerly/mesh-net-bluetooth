// === MeshNet Connect — Managed Flooding Routing ===

function sendMessage(type) {
    const input = document.getElementById('msgInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    const msgType = type || state.msgType;

    const msg = {
        id: state.nextMsgId++,
        src: state.myId,
        srcName: state.myName,
        type: msgType,
        text: text,
        ttl: 7,
        hops: 0,
        route: [state.myId],
        timestamp: Date.now(),
        delivered: false,
    };

    state.messages.push(msg);
    addMessageToUI(msg, true);
    floodMessage(msg, state.myId);
    updateUI();
}

function sendPresence() {
    const msg = {
        id: state.nextMsgId++,
        src: state.myId,
        srcName: state.myName,
        type: 'presence',
        text: '📍 Ich bin hier',
        ttl: 7,
        hops: 0,
        route: [state.myId],
        timestamp: Date.now(),
        delivered: false,
    };
    state.messages.push(msg);
    addMessageToUI(msg, true);
    floodMessage(msg, state.myId);
    updateUI();
    toast('Presence gesendet', 'success');
}

function sendFind() {
    const name = prompt('Nach wem suchen?');
    if (name && name.trim()) {
        const msg = {
            id: state.nextMsgId++,
            src: state.myId,
            srcName: state.myName,
            type: 'find',
            text: '🔍 Looking for: ' + name.trim(),
            ttl: 7,
            hops: 0,
            route: [state.myId],
            timestamp: Date.now(),
            delivered: false,
        };
        state.messages.push(msg);
        addMessageToUI(msg, true);
        floodMessage(msg, state.myId);
        updateUI();
        toast('Suche gesendet', 'info');
    }
}

function sendWorkshopAnnouncement() {
    const text = prompt('Workshop Announcement:');
    if (text && text.trim()) {
        const msg = {
            id: state.nextMsgId++,
            src: state.myId,
            srcName: state.myName,
            type: 'wks',
            text: '📢 ' + text.trim(),
            ttl: 7,
            hops: 0,
            route: [state.myId],
            timestamp: Date.now(),
            delivered: false,
        };
        state.messages.push(msg);
        addMessageToUI(msg, true);
        floodMessage(msg, state.myId);
        updateUI();
        toast('Workshop Announcement gesendet', 'success');
    }
}

function floodMessage(msg, fromId) {
    const me = state.nodes.find(n => n.id === state.myId);
    if (!me) return;
    const range = 180;
    const neighbors = state.nodes.filter(n =>
        n.id !== fromId && n.online && n.id !== msg.src &&
        me.distanceTo(n) < range
    );

    neighbors.forEach(neighbor => {
        state.packets.push({
            from: me,
            to: neighbor,
            msgId: msg.id,
            progress: 0,
            speed: 0.03 + Math.random() * 0.02,
        });

        setTimeout(() => {
            if (neighbor.isRelay && msg.ttl > 0) {
                msg.ttl--;
                msg.hops++;
                msg.route.push(neighbor.id);
                continueFloodFrom(neighbor, msg);
            }
        }, 300);
    });

    msg.delivered = true;
}

function continueFloodFrom(node, msg) {
    const range = 180;
    const nextHops = state.nodes.filter(n =>
        n.id !== node.id && n.online && !msg.route.includes(n.id) &&
        node.distanceTo(n) < range && n.isRelay
    );

    nextHops.forEach(next => {
        state.packets.push({
            from: node,
            to: next,
            msgId: msg.id,
            progress: 0,
            speed: 0.03,
        });
    });
}

function receiveMessage(msg) {
    if (msg.src === state.myId) return;
    msg.delivered = true;
    state.messages.push(msg);
    addMessageToUI(msg, false);
    toast(`Nachricht von ${msg.srcName} empfangen (${msg.hops} Hops)`, 'info');
}

// Simulate incoming messages
setInterval(() => {
    if (state.simulation && state.nodes.length > 1 && Math.random() < 0.15) {
        const sender = state.nodes.find(n => !n.isMe && n.online);
        if (sender) {
            const texts = [
                'Hallo vom Mesh! 📡',
                'Offline-Modus aktiv.',
                'Neuer Node bei 3 Hops.',
                'Relay-Status: OK',
                'Packet forwarded.',
                'Mesh topology updated.'
            ];
            const msg = {
                id: state.nextMsgId++,
                src: sender.id,
                srcName: sender.name,
                text: texts[Math.floor(Math.random()*texts.length)],
                ttl: 5,
                hops: sender.hops,
                route: [sender.id],
                timestamp: Date.now(),
                delivered: true,
            };
            receiveMessage(msg);
        }
    }
}, 5000);

// Random node failures / recoveries
setInterval(() => {
    if (state.simulation && state.nodes.length > 3) {
        const victim = state.nodes[Math.floor(Math.random() * state.nodes.length)];
        if (!victim.isMe) {
            victim.online = !victim.online;
            if (victim.online) {
                toast(`${victim.name} ist wieder online`, 'success');
            } else {
                toast(`${victim.name} offline — Mesh rerouting...`, 'warn');
            }
            updateHops();
            updateUI();
        }
    }
}, 8000);
