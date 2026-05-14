# WH-003-BT-Browser-Compatibility

## Web Bluetooth API — Complete Browser Compatibility Matrix

### Global Overview

| Category | Browsers | Support | Coverage |
|----------|----------|---------|----------|
| **Chromium-based** | Chrome, Edge, Opera, Samsung Internet | ✅ Full | ~76% global |
| **WebKit-based** | Safari (macOS/iOS/iPadOS), Firefox | ❌ None | ~24% global |
| **Legacy** | Internet Explorer, Android Browser 4.4 | ❌ None | <1% |

### Detailed Compatibility Matrix

#### Desktop Browsers

| Browser | Version | Platform | Support | Notes |
|---------|---------|----------|---------|-------|
| **Chrome** | 56+ | macOS | ✅ Full | Native support |
| **Chrome** | 70+ | Windows 10 (1703+) | ✅ Full | Requires Windows Creators Update |
| **Chrome** | 56+ | ChromeOS | ✅ Full | Native support |
| **Chrome** | 56+ (flag) | Linux | ⚠️ Experimental | Requires `chrome://flags/#enable-experimental-web-platform-features` + Linux Kernel 3.19+ + BlueZ 5.41+ |
| **Chrome** | 4-44 | All | ❌ None | API did not exist |
| **Edge** | 79+ | Windows 10 | ✅ Full | First Chromium-based Edge (Jan 2020) |
| **Edge** | 79+ | macOS | ✅ Full | Native support |
| **Edge** | 12-44 | Windows (EdgeHTML) | ❌ None | Pre-Chromium EdgeHTML never added API |
| **Edge** | (flag) | Linux | ⚠️ Experimental | Same flag rule as Chrome Linux |
| **Internet Explorer** | All | Windows | ❌ None | Trident engine never had BT plumbing |
| **Opera** | 43+ | Windows/macOS/Linux | ✅ Full | Tracks Chromium releases |
| **Opera** | 36-42 | All | ⚠️ Experimental | Requires experimental flag |
| **Opera Mini** | All | Mobile | ❌ None | No Web Bluetooth support |
| **Firefox** | All | Windows/macOS/Linux/Android | ❌ None | Mozilla flagged as "harmful" standard |
| **Firefox** | All | Android | ❌ None | No `about:config` toggle |

#### Mobile Browsers

| Browser | Version | Platform | Support | Notes |
|---------|---------|----------|---------|-------|
| **Chrome** | 56+ | Android 6.0+ | ✅ Full | Native support |
| **Chrome** | 4-44 | Android | ❌ None | API did not exist |
| **Samsung Internet** | 6.2+ | Android 6.0+ | ✅ Full | Uses same Chromium GATT pipeline as Chrome |
| **Samsung Internet** | 1.0-6.0 | Android | ❌ None | API not shipped |
| **Opera Mobile** | 80+ | Android | ✅ Full | Chromium-based |
| **Opera Mobile** | <80 | Android | ⚠️ Experimental | Requires flag |
| **Safari** | All | iOS/iPadOS | ❌ None | WebKit has no BT code |
| **Chrome on iOS** | All | iOS | ❌ None | Uses WebKit engine — inherits Safari gap |
| **Edge on iOS** | All | iOS | ❌ None | Uses WebKit engine — inherits Safari gap |
| **Bluefy** | All | iOS | ✅ Alternative | Third-party browser with separate BT stack. Requires HTTPS + Bluetooth 4.0+ |
| **WebBLE** | All | iOS | ✅ Alternative | Third-party browser with separate BT stack. Requires HTTPS + Bluetooth 4.0+ |
| **WKWebView** | Developer | iOS | ✅ Native | Custom iOS app with WKWebView — full BT access via native bridge |
| **Android Browser** | 4.4 (KitKat) | Android | ❌ None | Legacy stock browser never added API |

### iOS Bluetooth Solutions

| Solution | Type | Support | Notes |
|----------|------|---------|-------|
| **Bluefy** | Third-party browser (App Store) | ✅ Full | Separate BT stack — supports Web Bluetooth API |
| **WebBLE** | Third-party browser (App Store) | ✅ Full | Separate BT stack — supports Web Bluetooth API |
| **WKWebView** | Developer solution | ✅ Full | Custom iOS app — native BT access via bridge |

**iOS BT Requirements:**
- HTTPS only (secure context)
- Bluetooth 4.0+ hardware
- iOS native permission prompt
- User gesture required (same as Chromium)

### Festival iOS Strategy
- **Default**: Simulation mode (full experience, no BT)
- **Option 1**: Recommend Bluefy/WebBLE from App Store (QR code: `meshnet://join`)
- **Option 2**: Custom WKWebView app with BT integration for festival
- **Option 3**: Pre-built iOS helper app distributed at workshop

### Festival Device Coverage Estimate

| Device Type | % of Festival Devices | Support | Fallback |
|-------------|----------------------|---------|----------|
| Android (Chrome) | ~45% | ✅ Full | — |
| Android (Samsung Internet) | ~25% | ✅ Full | — |
| iOS (Safari) | ~20% | ❌ None | Simulation |
| iOS (Chrome/Edge) | ~5% | ❌ None | Simulation |
| Desktop (Chrome/Edge) | ~3% | ✅ Full | Dongle |
| Desktop (Firefox) | ~1% | ❌ None | Simulation |
| Desktop (Opera) | ~1% | ✅ Full | — |
| Other | ~1% | ? | Simulation |
| **Total BT Support** | **~74%** | ✅ | — |
| **Total Simulation** | **~26%** | ✅ | Full experience |

### Critical Limitations

#### Security Requirements
| Requirement | Detail |
|-------------|--------|
| **HTTPS only** | `navigator.bluetooth` throws `SecurityError` on HTTP and `file://` |
| **User gesture** | `requestDevice()` must be called from click/keypress — not from setTimeout, fetch, or page-load |
| **Top-level only** | API works on top-level pages; cross-origin iframes blocked by default |
| **Permissions-Policy** | Iframes need `bluetooth=self` header from parent |

#### Platform-Specific Requirements
| Platform | Requirement |
|----------|-------------|
| Chrome Linux | `chrome://flags/#enable-experimental-web-platform-features` + Kernel 3.19+ + BlueZ 5.41+ |
| Chrome Windows | Windows 10 version 1703 (Creators Update) or later |
| Chrome Android | Android 6.0 (Marshmallow) or later |
| Samsung Internet | Android 6.0 (Marshmallow) or later |
| Edge Windows | Windows 10 version 1703 or later |

#### Built-in Blocklist
Chrome blocks devices matching security-sensitive vendor/product IDs (including some FIDO/HID classes) before the chooser opens. Pages cannot bypass this list.

#### Background Scanning
`requestLEScan` and `watchAdvertisements` stay behind `chrome://flags/#enable-experimental-web-platform-features`. No background advertisement reading in production.

### API Endpoints Used by MeshNet

| Endpoint | MeshNet Use | Availability |
|----------|-------------|--------------|
| `navigator.bluetooth` | Detection check | ✅ Chromium |
| `navigator.bluetooth.requestDevice()` | Bluetooth scan | ✅ Chromium (user gesture) |
| `navigator.bluetooth.getDevices()` | Not used | ✅ Chromium |
| `BluetoothRemoteGATTServer.connect()` | Not used (scan only) | ✅ Chromium |
| `getPrimaryService()` | Not used | ✅ Chromium |
| `getCharacteristic()` | Not used | ✅ Chromium |
| `readValue()` | Not used | ✅ Chromium |
| `writeValue()` | Not used | ✅ Chromium |
| `startNotifications()` | Not used | ✅ Chromium |
| `gattserverdisconnected` | Not used | ✅ Chromium |

### MeshNet Fallback Strategy

| Browser | Primary | Fallback | Experience |
|---------|---------|----------|------------|
| Chrome Android | Real BT mesh | — | Full |
| Chrome Desktop | Real BT mesh | Dongle | Full |
| Edge Windows | Real BT mesh | Dongle | Full |
| Opera Desktop | Real BT mesh | — | Full |
| Samsung Internet | Real BT mesh | — | Full |
| Safari iOS | Simulation | Bluefy/WebBLE (external) or WKWebView | Full (sim) or Full (BT) |
| Firefox | Simulation | — | Full (sim) |
| IE | Simulation | — | Full (sim) |

### PWA Requirements
| Requirement | Detail |
|-------------|--------|
| **HTTPS** | Service Worker requires secure context |
| **manifest.json** | PWA install prompt |
| **sw.js** | Cache-first strategy for offline festival use |
| **Icons** | SVG icons (192x192, 512x512) |

### Sources
- [MDN Web Docs — Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [Web Bluetooth CG — Editor's Draft](https://webbluetoothcg.github.io/web-bluetooth/)
- [Chrome Developer — Bluetooth](https://developer.chrome.com/docs/capabilities/bluetooth)
- [Chrome Platform Status](https://chromestatus.com/feature/5264933985976320)
- [Mozilla Standards Positions](https://mozilla.github.io/standards-positions/)
- [WebKit Standards Positions](https://webkit.org/standards-positions/)
- [WebBluetoothCG Implementation Status](https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md)
- [TestMu AI — Web Bluetooth Browser Support](https://www.testmuai.com/learning-hub/web-bluetooth-browser-support/)
