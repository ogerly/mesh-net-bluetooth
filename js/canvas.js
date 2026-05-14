// === MeshNet Connect — Canvas Rendering ===

const canvas = document.getElementById('meshCanvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    draw();
}
window.addEventListener('resize', resize);

function draw() {
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, W, H);

    // Connections
    const range = 180;
    ctx.strokeStyle = 'rgba(0,212,170,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < state.nodes.length; i++) {
        for (let j = i+1; j < state.nodes.length; j++) {
            const a = state.nodes[i], b = state.nodes[j];
            const d = a.distanceTo(b);
            if (d < range && a.online && b.online) {
                const alpha = 1 - d/range;
                ctx.strokeStyle = `rgba(0,212,170,${alpha * 0.25})`;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }

    // Packets
    state.packets.forEach(p => {
        const x = p.from.x + (p.to.x - p.from.x) * p.progress;
        const y = p.from.y + (p.to.y - p.from.y) * p.progress;
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // Nodes
    state.nodes.forEach(node => {
        if (!node.online) ctx.globalAlpha = 0.3;

        // Pulse ring
        if (node.isRelay && node.online) {
            ctx.strokeStyle = node.color;
            ctx.globalAlpha = 0.15 * (0.5 + 0.5 * Math.sin(node.pulse));
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 10 + 5*Math.sin(node.pulse), 0, Math.PI*2);
            ctx.stroke();
            ctx.globalAlpha = node.online ? 1 : 0.3;
        }

        // Body
        const grad = ctx.createRadialGradient(node.x-5, node.y-5, 2, node.x, node.y, node.radius);
        grad.addColorStop(0, node.color);
        grad.addColorStop(1, node.color + '88');
        ctx.fillStyle = grad;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.isMe ? 20 : 12;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner dot
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI*2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.radius + 16);
        ctx.fillText(node.id, node.x, node.y + node.radius + 30);

        ctx.globalAlpha = 1;
    });

    // Selected highlight
    if (state.selectedNode) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(state.selectedNode.x, state.selectedNode.y, state.selectedNode.radius + 18, 0, Math.PI*2);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

function loop() {
    if (!state.simulation) return;
    state.nodes.forEach(n => n.update());
    state.packets = state.packets.filter(p => {
        p.progress += p.speed;
        return p.progress < 1;
    });
    updateHops();
    draw();
    requestAnimationFrame(loop);
}

// Canvas click interaction
canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (const node of state.nodes) {
        if (node.distanceTo({x,y}) < node.radius + 10) {
            state.selectedNode = node;
            toast(`Node ${node.name} ausgewählt — ${node.isRelay ? 'Relay' : 'Leaf'}`, 'info');
            draw();
            return;
        }
    }
    state.selectedNode = null;
    draw();
});
