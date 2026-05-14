# WP-2026-05-14-IMPL-REAL-DEVICES-ONLY-REMOVE-SIMULATION

## Session Goal
Remove all simulation and mock data from the MeshNet client to create a pure real-device Web Bluetooth experience. Fix Bluetooth device duplication/scanning issues to show only actual nearby devices without flickering.

## Changes Implemented

### 1. Removed Simulation Fallbacks & Mock Data ✓
**Modified meshnet.js:**
- Changed initial `networkMode` to `'bluetooth'` (will fallback only if BT unavailable)
- Modified `initNetwork()` to start with ONLY the user's own node (no `addRandomNode()` calls)
- Kept but will not call: `genFestivalName()` and `genName()` functions (marked as unused)
- Added `knownDevices: new Map()` to state for tracking Bluetooth devices
- Removed references to `simulation: true` in initialization flow

**Modified routing.js:**
- ✅ Removed entire "Simulate incoming messages" setInterval block (lines 152-179)
- ✅ Removed "Random node failures / recoveries" setInterval block (lines 181-196)
- Preserved only real message sending/receiving functions (`sendMessage`, `sendPresence`, etc.)

### 2. Fixed Bluetooth Device Duplication Issues ✓
**Modified meshnet/js/bluetooth.js:**
- Added device tracking using `state.knownDevices` Map to prevent duplicates
- When scanning:
  * Check if device ID already exists in `knownDevices`
  * If yes: update existing device info instead of adding new node
  * If no: add as new device to both `knownDevices` and `state.nodes`
- Added `updateKnownDevices()` function to remove stale devices (30 second timeout)
- Added periodic cleanup via `setInterval` in `initBluetoothStatus()`
- Improved error messages (removed "Simulation aktiv" references)
- Maintained specific error handling for NotFoundError, NotAllowedError, NotSupportedError

### 3. Clean Initial State ✓
- App now starts with ONLY user's node visible (0 Nodes in UI)
- No automatic addition of mock/random nodes
- Network grows organically only through real Bluetooth connections
- Clean UI showing just "You" with 0 connections initially

### 4. Updated UI Elements ✓
**Modified meshnet/index.html:**
- Removed simulation toggle button (`btnSim`) and its `toggleSimulation()` handler
- Removed "Add Random Node" button and its `addRandomNode()` handler
- Kept essential controls: Bluetooth Scan, Set Name, Clear Network
- Status indicators now accurately reflect real Bluetooth state

## Verification Results (from user testing)
✅ **Clean startup**: App begins with only user's node visible
✅ **Stable device listing**: No more phantom/flickering devices during scan
✅ **Real device only**: Network grows exclusively through actual Bluetooth pairing
✅ **Proper deduplication**: Scanning same device multiple times shows single entry
✅ **Stale device removal**: Devices that disappear are removed after timeout
✅ **Organic growth**: Connections form only when real devices are paired
✅ **Clean shutdown**: When no devices present, only user node remains

## Files Modified
- `meshnet/js/meshnet.js` - Removed simulation, cleaned init, added device tracking
- `meshnet/js/routing.js` - Removed simulated messages/failures
- `meshnet/js/bluetooth.js` - Fixed scanning/deduplication, added stale device cleanup
- `meshnet/index.html` - Removed simulation toggle and add random node buttons

## Open Questions for Future Enhancement
1. Should we add visual indication when scanning for devices (progress indicator)?
2. Should we implement a manual "stop scanning" button to conserve battery?
3. Should we add more detailed device information (RSSI, etc.) to the device list?
4. Should we implement background Bluetooth scanning when app is in background? (Limited by browser APIs)

## Status
✅ COMPLETED - All specified implementation work finished:
- Simulation and mock data removed
- Real-device-only behavior implemented
- Bluetooth device duplication/flickering fixed
- Clean start state with organic network growth only
- Verified through user testing on Android Chrome