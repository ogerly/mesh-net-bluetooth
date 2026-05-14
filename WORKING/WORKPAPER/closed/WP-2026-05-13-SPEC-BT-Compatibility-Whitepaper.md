# WP-2026-05-13-SPEC-BT-Compatibility-Whitepaper

## Session Goal
Create comprehensive Web Bluetooth browser compatibility whitepaper for project overview.

## Status: ✅ COMPLETED

Created: `WH-003-BT-Browser-Compatibility.md` — 30+ browser entries, festival coverage estimates, critical limitations, API endpoints used by MeshNet.

## Key Data Points
- **BT Supported**: ~74% (Chrome Android, Chrome Desktop, Edge, Opera, Samsung Internet)
- **Simulation Fallback**: ~26% (Safari iOS, Firefox, IE)
- **Critical**: HTTPS only, user gesture required, Linux requires flag
- **iOS**: No Web Bluetooth — Chrome/Edge on iOS inherit WebKit gap
- **Firefox**: Mozilla flagged as "harmful" standard — no plan to ship
- **MeshNet API usage**: Only `requestDevice()` — GATT features not used

## Source
https://www.testmuai.com/learning-hub/web-bluetooth-browser-support/
