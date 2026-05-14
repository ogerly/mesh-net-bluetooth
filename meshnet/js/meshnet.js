// === MeshNet Connect — Core Mesh Logic ===

const state = {
    nodes: [],
    myId: generateId(),
    myName: 'Me (' + navigator.platform.slice(0, 7) + ')',
    selectedNode: null,
    simulation: false,
    messages: [],
    packets: [],
    bluetoothDevice: null,
    nextMsgId: 1,
    bluetoothAvailable: false,
    networkMode: 'bluetooth',
    nodePrefix: '',
    msgType: 'chat',
    knownDevices: new Map(), // Track known Bluetooth devices to prevent duplicates
};

// Load persisted node name
try {
    const savedName = localStorage.getItem('meshnet_name');
    const savedPrefix = localStorage.getItem('meshnet_prefix');
    if (savedName) state.myName = savedName;
    if (savedPrefix) state.nodePrefix = savedPrefix;
} catch(e) {}

function saveNodeName(name, prefix) {
    state.myName = name;
    state.nodePrefix = prefix;
    try {
        localStorage.setItem('meshnet_name', name);
        localStorage.setItem('meshnet_prefix', prefix);
    } catch(e) {}
    const me = state.nodes.find(n => n.isMe);
    if (me) me.name = name;
    updateUI();
    draw();
    toast(`Name gesetzt: ${name}`, 'success');
}

function setNodeName() {
    const name = prompt('Dein Name für das Mesh:');
    if (name) {
        saveNodeName(name, state.nodePrefix);
    }
}

function setNodePrefix(prefix) {
    state.nodePrefix = prefix;
    try {
        localStorage.setItem('meshnet_prefix', prefix);
    } catch(e) {}
    const me = state.nodes.find(n => n.isMe);
    if (me) me.name = prefix ? prefix + '-' + me.name.replace(prefix + '-', '') : me.name.replace(prefix + '-', '');
    updateUI();
    draw();
    toast(`Prefix: ${prefix || 'Kein Prefix'}`, 'info');
}

function genName() {
    // This function is kept for potential future use but will not be called in normal operation
    // We could remove it entirely, but keeping it avoids breaking other code that might reference it
    const names = ['Alpha','Bravo','Charlie','Delta','Echo','Foxtrot','Golf','Hotel','India','Juliet','Kilo','Lima'];
    return names[Math.floor(Math.random()*names.length)] + '-' + Math.floor(Math.random()*99);
}

function handleJoinURL(url) {
    try {
        const parsed = new URL(url);
        if (parsed.protocol === 'meshnet:') {
            const nodeId = parsed.searchParams.get('node');
            const name = parsed.searchParams.get('name');
            const type = parsed.searchParams.get('type');
            
            if (nodeId && name) {
                const x = W/2 + (Math.random()-0.5)*200;
                const y = H/2 + (Math.random()-0.5)*200;
                const newNode = new Node(x, y, name, true, false);
                newNode.id = nodeId;
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

function generateJoinURL(node) {
    const type = state.nodePrefix || '';
    const name = node.name.replace(type + '-', '');
    return `meshnet://join?node=${node.id}&name=${name}&type=${type}`;
}

function showJoinQR(node) {
    const url = generateJoinURL(node);
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.cssText = 'top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:auto;z-index:100;';
    overlay.innerHTML = `
        <div style="text-align:center">
            <div id="qrCode" style="width:200px;height:200px;margin:0 auto 12px auto;"></div>
            <p style="color:var(--accent);font-weight:600;margin-bottom:8px">MeshNet Join</p>
            <p style="font-family:monospace;font-size:0.75rem;color:var(--text2);word-break:break-all">${url}</p>
            <button class="btn btn-secondary" style="margin-top:12px;font-size:0.75rem;padding:6px 12px" onclick="this.parentElement.remove()">Schließen</button>
        </div>
    `;
    document.querySelector('.main-area').appendChild(overlay);
    
    // Generate QR code using client-side library
    new QRCode(document.getElementById("qrCode"), {
        text: url,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function generateId() {
    return '0x' + Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();
}

function genName() {
    const names = ['Alpha','Bravo','Charlie','Delta','Echo','Foxtrot','Golf','Hotel','India','Juliet','Kilo','Lima'];
    return names[Math.floor(Math.random()*names.length)] + '-' + Math.floor(Math.random()*99);
}

class Node {
    constructor(x, y, name, isRelay = true, isMe = false) {
        this.id = generateId();
        this.name = name || genName();
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.isRelay = isRelay;
        this.isMe = isMe;
        this.online = true;
        this.rssi = -40 - Math.floor(Math.random() * 50);
        this.hops = isMe ? 0 : Infinity;
        this.lastSeen = Date.now();
        this.radius = isRelay ? 22 : 16;
        this.pulse = 0;
        this.color = isMe ? '#22c55e' : (isRelay ? '#00d4aa' : '#3b82f6');
    }

    update() {
        if (!state.simulation) return;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.radius) { this.x = this.radius; this.vx *= -1; }
        if (this.x > W - this.radius) { this.x = W - this.radius; this.vx *= -1; }
        if (this.y < this.radius) { this.y = this.radius; this.vy *= -1; }
        if (this.y > H - this.radius) { this.y = H - this.radius; this.vy *= -1; }
        this.pulse += 0.05;
    }

    distanceTo(other) {
        const dx = this.x - other.x, dy = this.y - other.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}

function initNetwork() {
    const me = new Node(W/2, H/2, state.myName, true, true);
    me.id = state.myId;
    state.nodes = [me];
    // No longer adding random nodes - start with only the user's own node
    updateHops();
    updateUI();
    draw();
}

function addRandomNode() {
    const isRelay = Math.random() > 0.3;
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * (Math.min(W,H)/2 - 100);
    const x = W/2 + Math.cos(angle) * dist;
    const y = H/2 + Math.sin(angle) * dist;
    const node = new Node(x, y, null, isRelay);
    state.nodes.push(node);
    toast(`Node ${node.name} beigetreten`, 'info');
    updateHops();
    updateUI();
    return node;
}

function clearNetwork() {
    const me = state.nodes.find(n => n.isMe);
    state.nodes = me ? [me] : [];
    state.messages = [];
    state.packets = [];
    document.getElementById('messages').innerHTML = '';
    updateUI();
    toast('Netzwerk zurückgesetzt', 'warn');
}

function updateHops() {
    const me = state.nodes.find(n => n.isMe);
    if (!me) return;
    const range = 180;
    state.nodes.forEach(n => n.hops = Infinity);
    me.hops = 0;
    const queue = [me];
    while (queue.length) {
        const cur = queue.shift();
        for (const n of state.nodes) {
            if (n.hops === Infinity && n.online && cur.distanceTo(n) < range && (cur.isRelay || n === me)) {
                n.hops = cur.hops + 1;
                queue.push(n);
            }
        }
    }
}

function toggleSimulation() {
    state.simulation = !state.simulation;
    const btn = document.getElementById('btnSim');
    btn.textContent = state.simulation ? '⏸️ Simulation Pausieren' : '▶️ Simulation Starten';
    if (state.simulation) {
        document.getElementById('netStatus').textContent = 'Mesh Active';
        document.getElementById('statusDot').className = 'status-dot relay';
        loop();
    } else {
        document.getElementById('netStatus').textContent = 'Standby';
        document.getElementById('statusDot').className = 'status-dot';
    }
}
