// === MeshNet Connect — UI Helpers ===

function escapeHtml(t) {
    return t.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]));
}

const typeIcons = {
    chat: '',
    presence: '📍',
    find: '🔍',
    wks: '📢',
    event: '📅',
    ping: '🏓',
};

function addMessageToUI(msg, own) {
    const div = document.createElement('div');
    div.className = `msg ${own ? 'msg-own' : 'msg-peer'}`;
    const time = new Date(msg.timestamp).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'});
    const icon = typeIcons[msg.type] || '';
    div.innerHTML = `
        <div>${icon ? icon + ' ' : ''}${escapeHtml(msg.text)}</div>
        <div class="msg-meta">
            <span>${msg.srcName}</span>
            <span>${time}</span>
            ${!own ? `<span class="msg-route">${msg.hops} hops</span>` : ''}
            <span class="msg-type">${msg.type}</span>
        </div>
    `;
    const container = document.getElementById('messages');
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function updateUI() {
    const list = document.getElementById('nodeList');
    list.innerHTML = '';
    state.nodes.forEach(node => {
        const el = document.createElement('div');
        el.className = `node-item ${node.isMe ? 'active' : ''} ${!node.online ? 'offline' : ''}`;
        const signal = Math.max(0, Math.min(4, Math.floor((node.rssi + 90) / 10)));
        el.innerHTML = `
            <div class="node-header">
                <span class="node-name">${escapeHtml(node.name)}</span>
                <span class="node-badge ${node.isRelay ? 'badge-relay' : 'badge-leaf'}">${node.isRelay ? 'Relay' : 'Leaf'}</span>
            </div>
            <div class="node-meta">
                <span style="font-family:monospace">${node.id}</span>
                <span class="node-signal">
                    ${[1,2,3,4].map(i => `<div class="signal-bar ${i<=signal?'on':''}" style="height:${4+i*3}px"></div>`).join('')}
                </span>
                <span>${node.hops === Infinity ? '∞' : node.hops} hops</span>
            </div>
        `;
        el.onclick = () => { state.selectedNode = node; updateUI(); };
        list.appendChild(el);
    });

    const relays = state.nodes.filter(n => n.isRelay && n.online).length;
    const maxHops = state.nodes.reduce((m, n) => Math.max(m, n.hops === Infinity ? 0 : n.hops), 0);
    document.getElementById('statNodes').textContent = state.nodes.length;
    document.getElementById('statHops').textContent = maxHops;
    document.getElementById('statMsgs').textContent = state.messages.length;
    document.getElementById('statRelays').textContent = relays;
    document.getElementById('nodeCount').textContent = state.nodes.length + ' Nodes';
    document.getElementById('myId').textContent = state.myId;
}

function toast(msg, type = 'info') {
    const container = document.getElementById('toasts');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}

// Enter key handler
document.getElementById('msgInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});
