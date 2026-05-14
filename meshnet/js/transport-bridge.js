// === MeshNet Connect — Transport Bridge ===

// Transport mode selection
let transportMode = 'auto'; // 'auto', 'simulation', 'real'

// Set transport mode
function setTransportMode(mode) {
    transportMode = mode;
    console.log('Transport mode set to:', mode);
    
    if (mode === 'real') {
        toast('Echter Bluetooth-Transport aktiv', 'info');
    } else if (mode === 'simulation') {
        toast('Simulations-Transport aktiv', 'info');
    } else {
        // Auto: use real if available
        toast('Auto-Modus: Verwende echtes Bluetooth wenn verfügbar', 'info');
    }
}

// Get the current transport interface
function getTransport() {
    // In auto mode, prefer real if we have connected devices
    if (transportMode === 'auto') {
        const hasConnectedDevices = state.nodes.some(n => n.connected && !n.isMe);
        if (hasConnectedDevices || state.bluetoothAvailable) {
            return window.realTransport;
        }
        return window.simulationTransport;
    }
    
    switch (transportMode) {
        case 'real':
            return window.realTransport;
        case 'simulation':
            return window.simulationTransport;
        default:
            return window.simulationTransport;
    }
}

// Wrapper function for sending messages (used by routing)
function sendViaTransport(messageText) {
    const transport = getTransport();
    if (transport && typeof transport.send === 'function') {
        return transport.send(messageText);
    }
    console.warn('No transport available');
    return false;
}

// Send to specific node via current transport
function sendToNodeViaTransport(targetNodeId, messageText) {
    const transport = getTransport();
    if (transport && typeof transport.sendTo === 'function') {
        return transport.sendTo(targetNodeId, messageText);
    }
    return false;
}

// Export
window.transportBridge = {
    setTransportMode,
    getTransport,
    send: sendViaTransport,
    sendTo: sendToNodeViaTransport
};