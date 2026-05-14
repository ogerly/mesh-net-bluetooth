# WP-2026-05-14-IMPL-PWA-Native-App-Capability

## Session Goal
Make the MeshNet client a fully capable PWA that behaves like a native app on both Android and iOS, ensuring offline functionality, proper installation prompts, and native-like UI.

## Current State
- Manifest.json exists with name, short_name, description, start_url, display: standalone, background_color, theme_color, icons, version.
- Service worker (sw.js) caches core assets.
- QR code library added client-side.
- Bluetooth enhancements applied from previous work.
- Basic PWA functionality works but lacks iOS-specific optimizations and advanced offline handling.

## Tasks to Perform
### 1. Manifest Improvements
- Ensure scope is correct (default "./" is fine)
- Add orientation preference: "orientation": "portrait-primary" (better for mobile use)
- Verify icons: Keep SVG for modern browsers, consider adding PNG fallbacks for older platforms
- Add categories? Optional but could help in app stores
- Consider adding screenshots for store listing (not critical for direct installation)

### 2. Service Worker Enhancements
- Implement cache versioning: Fetch version from manifest.json or use a constant
- Add offline page strategy: Serve offline.html when network fails for navigation requests
- Improve error handling: Provide user-friendly fallback when fetch fails
- Consider runtime caching for any future API endpoints (though currently client-only)
- Add cache cleanup strategy in activate event

### 3. iOS Specific Meta Tags (Critical for iOS PWA experience)
Add to meshnet/index.html head:
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="MeshNet">
<link rel="apple-touch-icon" href="assets/icons/meshnet-180.png" sizes="180x180">
<link rel="apple-touch-icon" href="assets/icons/meshnet-192.png" sizes="192x192">
```

### 4. Installation Prompt Enhancement (Optional but Recommended)
- Listen for `beforeinstallprompt` event
- Defer the prompt and show a custom install button
- Handle the `appinstalled` event for analytics
- This improves UX over the browser's default prompt timing

### 5. Offline Page Creation
Create meshnet/offline.html:
- Simple meshnet styling
- Message: "Du bist offline. Einige Funktionen könnten nicht verfügbar sein."
- Button: "Erneut versuchen" that reloads the app
- Optionally show cached data if available

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
1. Should we generate PNG icons from SVGs for broader compatibility, or rely on SVG support?
2. What should the offline experience show? Just a message, or attempt to show cached mesh state?
3. Should we implement background sync for sending messages when back online? (Phase 2 enhancement)
4. Do we want to add a custom install button UI, or rely on browser prompts?

## Next Steps (Immediate)
1. [ ] Create PNG icons from existing SVGs (180x180, 192x192 for iOS; others for Android)
2. [ ] Add iOS meta tags and apple-touch-icon links to meshnet/index.html
3. [ ] Enhance manifest.json with orientation preference
4. [ ] Create meshnet/offline.html
5. [ ] Update sw.js with:
   - Version-based cache naming (fetch from manifest or constant)
   - Offline page routing strategy
   - Improved error handling in fetch event
6. [ ] Test implementation on devices
7. [ ] Update documentation with results

## Status
🟢 PLANNED - Workpaper created with detailed implementation roadmap for full PWA capability.
This addresses the gap between basic PWA functionality and true native-app-like experience on target platforms.