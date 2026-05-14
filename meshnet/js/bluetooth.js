// === MeshNet Connect — Web Bluetooth API ===

async function scanBluetooth() {
    if (!navigator.bluetooth) {
        toast('Bluetooth nicht verfügbar', 'error');
        state.bluetoothAvailable = false;
        state.networkMode = 'simulation';
        document.getElementById('netStatus').textContent = 'Simulation';
        document.getElementById('statusDot').className = 'status-dot';
        updateBluetoothStatus(); 
        return;
    }

    state.bluetoothAvailable = true;
    state.networkMode = 'bluetooth';
    document.getElementById('netStatus').textContent = 'Scannen...';
    document.getElementById('statusDot').className = 'status-dot relay';
    updateBluetoothStatus(); 

    try {
        toast('Suche nach Bluetooth Mesh Nodes...', 'info');
        
        // Request device with specific services to enable data transfer
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['generic_access', 'battery_service', 'heart_rate', '18f0f000-5a6e-4c7e-9f8e-123456789abc']
        });

        // Visual feedback: show we're connecting
        document.getElementById('netStatus').textContent = 'Verbinde...';
        
        // Try to connect to get more info (for better identification)
        try {
            const server = await device.gatt.connect();
            state.bluetoothDevice = device;
            
            // Try to get device name from GATT
            let deviceName = device.name;
            try {
                const service = await server.getPrimaryService('device_information');
                const char = await service.getCharacteristic('device_name');
                const value = await char.readValue();
                if (value) {
                    deviceName = new TextDecoder().decode(value);
                }
            } catch (e) {
                // Device doesn't have device information service
            }
            
            // Update connection status with visual feedback
            document.getElementById('netStatus').textContent = 'Verbunden';
            document.getElementById('statusDot').className = 'status-dot active'; // Green with active ring
            
            // Check if we've seen this device before (by ID)
            if (state.knownDevices.has(device.id)) {
                const existingNode = state.knownDevices.get(device.id);
                existingNode.name = deviceName || 'BT-Device';
                const nodeInState = state.nodes.find(n => n.id === device.id);
                if (nodeInState) {
                    nodeInState.name = deviceName || 'BT-Device';
                    nodeInState.connected = true;
                }
                toast(`Erneut verbunden: ${deviceName || 'Unbekannt'}`, 'success');
            } else {
                state.knownDevices.set(device.id, { 
                    name: deviceName || 'BT-Device', 
                    device,
                    connected: true,
                    lastSeen: Date.now()
                });
                
                const node = new Node(W/2 + (Math.random()-0.5)*200, H/2 + (Math.random()-0.5)*200, deviceName || 'BT-Device', true);
                node.id = device.id;
                node.online = true;
                node.connected = true;
                state.nodes.push(node);
                toast(`✓ Verbunden mit ${deviceName || 'Unbekannt'}`, 'success');
            }
            
            server.disconnect();
        } catch (gattError) {
            // Even without GATT connection, we can still add the device
            document.getElementById('netStatus').textContent = 'Gekoppelt';
            
            if (state.knownDevices.has(device.id)) {
                toast(`Gerät wieder hinzugefügt: ${device.name || 'Unbekannt'}`, 'info');
            } else {
                state.knownDevices.set(device.id, { 
                    name: device.name || 'BT-Device', 
                    device,
                    connected: true,
                    lastSeen: Date.now()
                });
                
                const node = new Node(W/2 + (Math.random()-0.5)*200, H/2 + (Math.random()-0.5)*200, device.name || 'BT-Device', true);
                node.id = device.id;
                node.online = true;
                node.connected = true;
                state.nodes.push(node);
                toast(`✓ Gekoppelt: ${device.name || 'Unbekannt'}`, 'success');
            }
        }

        updateHops();
        updateUI();
        draw();
        
    } catch (e) {
        // Reset status on error
        document.getElementById('netStatus').textContent = 'Bluetooth';
        
        if (e.name === 'NotFoundError') {
            toast('Keine Bluetooth-Geräte gefunden. Stelle sicher, dass Bluetooth eingeschaltet ist.', 'warn');
        } else if (e.name === 'NotAllowedError') {
            toast('Bluetooth-Zugriff verweigert. Bitte erlaube den Zugriff auf Bluetooth-Geräte.', 'error');
            updateBluetoothStatus(false);
        } else if (e.name === 'NotSupportedError') {
            toast('Bluetooth wird auf diesem Gerät/Browser nicht unterstützt.', 'error');
            state.bluetoothAvailable = false;
            updateBluetoothStatus(false);
        } else {
            toast('Bluetooth Scan abgebrochen: ' + e.message, 'warn');
        }
    }
}

// Update known devices and remove stale ones
function updateKnownDevices() {
    const now = Date.now();
    const STALE_TIME = 30000; // 30 seconds
    
    for (const [deviceId, deviceInfo] of state.knownDevices.entries()) {
        if (deviceInfo.lastSeen && (now - deviceInfo.lastSeen > STALE_TIME)) {
            // Remove stale device
            state.knownDevices.delete(deviceId);
            // Also remove from nodes array if present
            const nodeIndex = state.nodes.findIndex(node => node.id === deviceId);
            if (nodeIndex !== -1) {
                state.nodes[nodeIndex].online = false;
                state.nodes[nodeIndex].connected = false;
                toast(`Gerät ${deviceInfo.name} getrennt (timeout)`, 'warn');
                updateHops();
                updateUI();
                draw();
            }
        }
    }
}

function checkBluetooth() {
    if (!navigator.bluetooth) {
        state.bluetoothAvailable = false;
        state.networkMode = 'simulation';
        document.getElementById('btnScan').disabled = true;
        document.getElementById('btnScan').textContent = '🔵 Bluetooth nicht verfügbar';
        document.getElementById('netStatus').textContent = 'Simulation';
        document.getElementById('statusDot').className = 'status-dot';
        toast('MeshNet — Simulation Mode (Bluetooth nicht verfügbar)', 'info');
        updateBluetoothStatus(false); // No Bluetooth support
        return false;
    }
    state.bluetoothAvailable = true;
    state.networkMode = 'bluetooth';
    document.getElementById('netStatus').textContent = 'Bluetooth';
    document.getElementById('statusDot').className = 'status-dot relay';
    updateBluetoothStatus(true); // Bluetooth API available
    return true;
}

// Enhanced Bluetooth status checking
function updateBluetoothStatus(bluetoothAvailable = null) {
    const statusDot = document.getElementById('statusDot');
    const netStatus = document.getElementById('netStatus');
    const btnScan = document.getElementById('btnScan');
    
    // If not explicitly provided, use current state
    if (bluetoothAvailable === null) {
        bluetoothAvailable = state.bluetoothAvailable;
    }
    
    if (!bluetoothAvailable) {
        // No Bluetooth API support
        netStatus.textContent = 'Kein BT';
        statusDot.className = 'status-dot'; // Grey/dot
        btnScan.disabled = true;
        btnScan.textContent = '🔵 BT nicht verfügbar';
        btnScan.title = 'Web Bluetooth API nicht unterstützt. Siehe Info für Details.';
    } else {
        // Bluetooth API available, check if enabled
        // Note: There's no direct way to check if Bluetooth is enabled without trying to scan
        // We'll update the UI optimistically and let scanBluetooth() handle errors
        netStatus.textContent = 'Bluetooth';
        statusDot.className = 'status-dot relay'; // Green/dot
        btnScan.disabled = false;
        btnScan.textContent = '🔵 Bluetooth Scan';
        btnScan.title = 'Bluetooth-Geräte scannen';
    }
}

// Initialize Bluetooth status on load
function initBluetoothStatus() {
    if (!navigator.bluetooth) {
        toast('Web Bluetooth API nicht verfügbar', 'info');
        updateBluetoothStatus(false);
    } else {
        updateBluetoothStatus(true);
        // Periodic cleanup of stale devices
        setInterval(() => {
            updateKnownDevices();
        }, 5000);
    }
}
