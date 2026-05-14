// === MeshNet Connect — Web Bluetooth API ===

async function scanBluetooth() {
    if (!navigator.bluetooth) {
        toast('Bluetooth nicht verfügbar — Simulation aktiv', 'error');
        state.bluetoothAvailable = false;
        state.networkMode = 'simulation';
        document.getElementById('netStatus').textContent = 'Simulation';
        document.getElementById('statusDot').className = 'status-dot';
        updateBluetoothStatus(); // Update visual status
        return;
    }

    state.bluetoothAvailable = true;
    state.networkMode = 'bluetooth';
    document.getElementById('netStatus').textContent = 'Bluetooth';
    document.getElementById('statusDot').className = 'status-dot relay';
    updateBluetoothStatus(); // Update visual status

    try {
        toast('Suche nach Bluetooth Mesh Nodes...', 'info');
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['generic_access', 'battery_service']
        });
        state.bluetoothDevice = device;
        toast(`Verbunden: ${device.name || 'Unbekannt'}`, 'success');

        const node = new Node(W/2 + (Math.random()-0.5)*200, H/2 + (Math.random()-0.5)*200, device.name || 'BT-Device', true);
        node.online = true;
        state.nodes.push(node);
        updateHops();
        updateUI();
        draw();
    } catch (e) {
        // Handle specific Bluetooth errors
        if (e.name === 'NotFoundError') {
            toast('Keine Bluetooth-Geräte gefunden. Stelle sicher, dass Bluetooth eingeschaltet ist und Geräte sichtbar sind.', 'warn');
        } else if (e.name === 'NotAllowedError') {
            toast('Bluetooth-Zugriff verweigert. Bitte erlaube den Zugriff auf Bluetooth-Geräte.', 'error');
            updateBluetoothStatus(false); // Bluetooth likely disabled/not authorized
        } else if (e.name === 'NotSupportedError') {
            toast('Bluetooth wird auf diesem Gerät/Browser nicht unterstützt.', 'error');
            state.bluetoothAvailable = false;
            updateBluetoothStatus(false);
        } else {
            toast('Bluetooth Scan abgebrochen: ' + e.message, 'warn');
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
        toast('Web Bluetooth API nicht verfügbar — Verwende Simulationsmodus', 'info');
        updateBluetoothStatus(false);
    } else {
        updateBluetoothStatus(true);
        // Optional: Add periodic checking
        setInterval(() => {
            // Re-check status periodically (optional enhancement)
        }, 5000);
    }
}
