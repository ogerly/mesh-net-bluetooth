// === MeshNet Connect — Simulation Transport Layer ===

// Simulation transport for testing without real Bluetooth
// This is used when no real devices are available or for demo purposes

// Send message to all neighbors (simulated)
function sendViaSimulationTransport(messageText) {
    const me = state.nodes.find(n => n.isMe);
    if (!me) return false;
    
    const range = 180;
    const neighbors = state.nodes.filter(n => 
        !n.isMe && 
        n.online &&
        me.distanceTo(n) < range
    );
    
    // Create a simulation message
    const msg = {
        id: state.nextMsgId++,
        src: state.myId,
        srcName: state.myName,
        text: messageText,
        type: 'chat',
        ttl: 7,
        hops: 0,
        route: [state.myId],
        timestamp: Date.now(),
        delivered: true,
        fromSimulation: true
    };
    
    // Process the message locally
    setTimeout(() => {
        // Simulate network delay and message delivery
        neighbors.forEach(neighbor => {
            // Create neighbor's view of the message
            const neighborMsg = {...msg};
            neighborMsg.hops = neighbor.hops || 1;
            neighborMsg.route = [...msg.route, neighbor.id];
            
            // Add small delay to simulate transmission
            setTimeout(() => {
                receiveMessage(neighborMsg);
            }, 100 + Math.random() * 200);
        });
    }, 50);
    
    return true;
}

// Send to specific node (simulated)
function sendToNodeViaSimulation(targetNodeId, messageText) {
    const targetNode = state.nodes.find(n => n.id === targetNodeId);
    if (!targetNode) return false;
    
    const msg = {
        id: state.nextMsgId++,
        src: state.myId,
        srcName: state.myName,
        text: messageText,
        type: 'chat',
        ttl: 7,
        hops: targetNode.hops || 1,
        route: [state.myId, targetNodeId],
        timestamp: Date.now(),
        delivered: true,
        fromSimulation: true
    };
    
    // Simulate delivery after delay
    setTimeout(() => {
        receiveMessage(msg);
    }, 100 + Math.random() * 200);
    
    return true;
}

// Simulation transport interface
const simulationTransport = {
    send: sendViaSimulationTransport,
    sendTo: sendToNodeViaSimulation,
    connect: () => {}, // No-op for simulation
    disconnect: () => {}, // No-op for simulation
    isConnected: () => true
};

// Export for use in routing
window.simulationTransport = simulationTransport;
window.sendViaSimulation = sendViaSimulationTransport;