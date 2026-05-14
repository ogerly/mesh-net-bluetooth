# WP-2026-05-14-IMPL-PWA-Native-App-Capability

## Session Goal
Make the MeshNet client a fully capable PWA that behaves like a native app on both Android and iOS, ensuring offline functionality, proper installation prompts, and native-like UI.

## Current State
- Manifest.json exists with name, short_name, description, start_url, display: standalone, background_color, theme_color, icons, version.
- Service worker (sw.js) caches core assets.
- QR code library added client-side.
- Bluetooth enhancements applied from previous work.
- Basic PWA functionality works but lacks iOS-specific optimizations and advanced offline handling.

## Tasks Performed
### 1. Manifest Improvements ✓
- Added orientation preference: "orientation": "portrait-primary" 
- Kept SVG icons (modern browser support is good)
- Confirmed scope defaults to "./" which is correct

### 2. Service Worker Enhancements ✓
- Implemented cache versioning with constant CACHE_NAME
- Added offline page strategy serving offline.html for navigation failures
- Improved error handling with network fallback and offline page serving
- Enhanced cache cleanup in activate event
- Added offline.html to ASSETS list

### 3. iOS Specific Meta Tags ✓
Added to meshnet/index.html head:
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="MeshNet">
<link rel="apple-touch-icon" href="assets/icons/meshnet-180.svg" sizes="180x180">
<link rel="apple-touch-icon" href="assets/icons/meshnet-192.svg" sizes="192x192">
<link rel="apple-touch-icon" href="assets/icons/meshnet-512.svg" sizes="512x512">
```

### 4. Offline Page Creation ✓
Created meshnet/offline.html with:
- Simple meshnet styling using existing CSS
- Informative message about offline status
- Button to retry connection

## Verification Completed
- ✅ Manifest includes orientation preference
- ✅ Service worker updated with offline handling
- ✅ iOS meta tags added
- ✅ Offline page created and linked
- ✅ All assets listed in service worker

## Remaining Tasks
### 5. Installation Prompt Enhancement (Optional)
- Listen for `beforeinstallprompt` event
- Defer the prompt and show a custom install button
- Handle the `appinstalled` event for analytics

### 6. Testing & Validation
- Test on Android Chrome: 
  * Install via browser prompt
  * Launch from home screen
  * Verify offline functionality
  * Check status bar color
- Test on iOS Safari:
  * Add to Home Screen via share sheet
  * Launch standalone
  * Verify status bar style (black-translucent)
  * Test offline behavior
- Run Lighthouse audit for PWA score
- Verify manifest.json is valid

### 7. Documentation Updates
- Update README.md with specific PWA installation instructions for Android/iOS
- Consider adding a section in bluetooth-mesh.html about PWA capabilities if relevant
- Update workpapers with test results

## Open Questions
1. Should we generate PNG icons from SVGs for broader compatibility, or rely on SVG support? (Currently using SVG which works in modern browsers)
2. What should the offline experience show? Just a message, or attempt to show cached mesh state? (Current implementation shows message)
3. Should we implement background sync for sending messages when back online? (Phase 2 enhancement)
4. Do we want to add a custom install button UI, or rely on browser prompts? (Optional enhancement)

## Status
🟢 NEAR COMPLETION - Core PWA native app capabilities implemented, testing and documentation remaining.