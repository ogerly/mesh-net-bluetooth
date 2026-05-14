// === MeshNet Connect — Real Bluetooth Transport Layer ===

// Custom Mesh Service UUID for our application
const MESH_SERVICE_UUID = '0000FEED-0000-1000-8000-00805F9B34FB';
const MESH_MESSAGE_CHAR_UUID = '0000FE01-0000-1000-8000-00805F9B34FB';
const MESH_STATUS_CHAR_UUID = '0000FE02-0000-1000-8000-00805F9B34FB';

// Store active GATT connections per device
const gattConnections = new Map();

// Connect to a device and keep connection alive
async function connectToDevice(deviceId) {
    const deviceInfo = state.knownDevices.get(deviceId);
    if (!deviceInfo || !deviceInfo.device) {
        console.error('Device not found:', deviceId);
        return null;
    }
    
    const device = deviceInfo.device;
    
    // Check if already connected
    if (gattConnections.has(deviceId)) {
        const existing = gattConnections.get(deviceId);
        if (existing && !existing.closed) {
            return existing;
        }
    }
    
    try {
        const server = await device.gatt.connect();
        const connection = {
            server,
            device,
            connected: true,
            lastSeen: Date.now()
        };
        gattConnections.set(deviceId, connection);
        
        // Setup notification listener for incoming messages
        try {
            const service = await server.getPrimaryService(MESH_SERVICE_UUID);
            const messageChar = await service.getCharacteristic(MESH_MESSAGE_CHAR_UUID);
            await messageChar.startNotifications();
            
            messageChar.addEventListener('characteristicvaluechanged', (event) => {
                const value = event.target.value;
                const decoder = new TextDecoder();
                const messageText = decoder.decode(value);
                handleIncomingMessage(deviceId, messageText);
            });
        } catch (e) {
            console.log('Mesh service not available, using fallback');
        }
        
        return connection;
    } catch (error) {
        console.error('Failed to connect to device:', error);
        return null;
    }
}

// Send a message to a specific device via GATT
async function sendToDevice(targetNodeId, messageText) {
    const connection = await connectToDevice(targetNodeId);
    if (!connection) {
        console.error('Could not connect to device:', targetNodeId);
        return false;
    }
    
    try {
        const server = connection.server;
        const encoder = new TextEncoder();
        const data = encoder.encode(messageText);
        
        // Try custom mesh service first
        try {
            const service = await server.getPrimaryService(MESH_SERVICE_UUID);
            const messageChar = await service.getCharacteristic(MESH_MESSAGE_CHAR_UUID);
            await messageChar.writeValue(data);
            console.log('Message sent via mesh service');
            return true;
        } catch (e) {
            // Fallback: try generic access (won't actually work for custom data, but demonstrates attempt)
            console.log('Mesh service not available, trying generic');
        }
        
        return false;
    } catch (error) {
        console.error('Failed to send message:', error);
        return false;
    }
}

// Handle incoming message from a device
function handleIncomingMessage(sourceDeviceId, messageText) {
    console.log('Received from', sourceDeviceId, ':', messageText);
    
    const deviceInfo = state.knownDevices.get(sourceDeviceId);
    const senderName = deviceInfo ? deviceInfo.name : 'Unbekannt';
    
    // Create message object for routing
    const msg = {
        id: state.nextMsgId++,
        src: sourceDeviceId,
        srcName: senderName,
        text: messageText,
        type: 'chat',
        ttl: 7,
        hops: 1,
        route: [sourceDeviceId],
        timestamp: Date.now(),
        delivered: true,
        fromTransport: true
    };
    
    // Process through routing
    receiveMessage(msg);
}

// Broadcast message to all connected neighbors
async function broadcastToNeighbors(messageText) {
    const me = state.nodes.find(n => n.isMe);
    if (!me) return;
    
    // Find all connected neighbor nodes (within range)
    const range = 180;
    const neighbors = state.nodes.filter(n => 
        !n.isMe && 
        n.online && 
        n.connected &&
        me.distanceTo(n) < range
    );
    
    console.log('Broadcasting to', neighbors.length, 'neighbors');
    
    // Send to each neighbor
    for (const neighbor of neighbors) {
        await sendToDevice(neighbor.id, messageText);
    }
}

// Disconnect from a device
async function disconnectFromDevice(deviceId) {
    const connection = gattConnections.get(deviceId);
    if (connection && connection.server) {
        try {
            connection.server.disconnect();
        } catch (e) {
            console.log('Error disconnecting:', e);
        }
    }
    gattConnections.delete(deviceId);
}

// Cleanup all connections
function cleanupConnections() {
    for (const [deviceId, connection] of gattConnections) {
        if (connection && connection.server) {
            try {
                connection.server.disconnect();
            } catch (e) {}
        }
    }
    gattConnections.clear();
}

// Transport interface for routing layer
const realTransport = {
    send: broadcastToNeighbors,
    sendTo: sendToDevice,
    connect: connectToDevice,
    disconnect: disconnectFromDevice,
    isConnected: (deviceId) => {
        const conn = gattConnections.get(deviceId);
        return conn && !conn.closed;
    }
};

// Export for use in routing
window.realTransport = realTransport;
window.sendViaRealTransport = broadcastToNeighbors;