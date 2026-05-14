# Web Bluetooth Mesh Network

A decentralized Bluetooth Mesh network simulator and Web Bluetooth API client for educational and festival use.

## Project Overview

This project implements a Bluetooth Mesh network simulation that runs entirely in the browser, with optional real Web Bluetooth connectivity. It serves as an educational tool to demonstrate mesh networking concepts, message routing, and decentralized communication.

### Features

- **Mesh Network Simulation**: Visualize nodes, connections, and message routing
- **Web Bluetooth Integration**: Connect to real Bluetooth Low Energy devices (where supported)
- **Progressive Web App (PWA)**: Installable offline experience with caching
- **Visual Message Routing**: See managed flooding algorithm in action
- **Festival-Ready**: Includes QR code joining, workshop modes, and educational materials
- **Educational Focus**: Clear visualization of mesh networking concepts

## Files Structure

```
.
├── meshnet/                  # Main application
│   ├── index.html            # Entry point
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker
│   ├── qrcode.min.js         # QR code generation library
│   ├── js/
│   │   ├── meshnet.js        # Core mesh logic
│   │   ├── bluetooth.js      # Bluetooth API handling
│   │   ├── canvas.js         # Rendering
│   │   ├── routing.js        # Message routing
│   │   └── ui.js             # User interface helpers
│   ├── css/
│   │   ├── main.css          # Shared styles
│   │   ├── mesh.css          # Main app styling
│   │   └── info.css          # Information pages styling
│   ├── info/                 # Educational pages
│   │   ├── about.html
│   │   ├── how-it-works.html
│   │   ├── bluetooth-mesh.html
│   │   ├── workshop.html
│   │   ├── FAQ.html
│   │   └── ...
│   └── assets/               # Icons and images
└── WORKING/                  # Project documentation (AAMS/2.0)
    ├── WHITEPAPER/           # Architecture specifications
    ├── WORKPAPER/            # Session documents
    ├── MEMORY/               # Long-term context
    ├── DIARY/                # Temporal logs
    └── GUIDELINES/           # Development guidelines
```

## Getting Started

### Live Demo

The application is live at: **https://ogerly.github.io/mesh-net-bluetooth/**

### Local Development

1. Clone the repository
2. Open `meshnet/index.html` in a modern browser (Chrome/Edge recommended for Web Bluetooth)
3. For best experience, serve via a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Then visit: http://localhost:8000/meshnet/
   ```

### Features to Try

1. **Simulation Mode**: Click "Simulation Starten" to see the mesh network in action
2. **Bluetooth Scan**: Click "Bluetooth Scan" to discover nearby BLE devices (requires browser support)
3. **Messaging**: Send messages between nodes to see routing visualization
4. **QR Code Sharing**: Click on a node to generate a QR code for others to join your mesh
5. **Network Control**: Add/remove nodes, clear network, set node names

## Deployment

### GitHub Pages

The application is deployed via GitHub Pages from the `gh-pages` branch, which contains the contents of the `/meshnet` directory:

1. The site is automatically built and deployed from the `gh-pages` branch
2. Access the live site at: `https://ogerly.github.io/mesh-net-bluetooth/`
3. To update the site, push changes to the `main` branch and run `git subtree push --prefix meshnet origin gh-pages` (or use GitHub Actions for automation)

### PWA Features

- Installable via browser "Add to Home Screen" or custom install button
- Offline caching of core assets with fallback offline page
- Background sync (where supported)
- Responsive design for mobile and desktop
- iOS-optimized with proper status bar styling
- Orientation locked to portrait for better mobile experience
- Install prompts with deferred timing for better user experience

## Browser Support

- **Best**: Chrome, Edge (Android/Desktop) - Full Web Bluetooth support
- **Limited**: Firefox, Safari - Simulation mode only (no Web Bluetooth)
- **Requirements**: HTTPS or localhost for Web Bluetooth API

## Educational Use

This project is designed for workshop and educational settings:

- Visualizes abstract mesh networking concepts
- Demonstrates Bluetooth Low Energy mesh principles
- Includes workshop materials in `/meshnet/info/workshop.html`
- Supports festival scenarios with QR code joining and node registration

## Development

### Project Organization

Following AAMS/2.0 conventions:
- `WORKING/WHITEPAPER/` - Architecture specifications
- `WORKING/WORKPAPER/` - Session documents and work in progress
- `WORKING/MEMORY/` - Long-term context storage
- `WORKING/DIARY/` - Daily progress logs
- `WORKING/GUIDELINES/` - Coding and process guidelines

### Prerequisites

- Modern browser with ES6 support
- For Web Bluetooth testing: Android device or computer with Bluetooth 4.0+

## License

This project is part of the web-bluetooth.mesh research initiative.

## Acknowledgments

- QR code generation via [qrcodejs](https://github.com/davidshimjs/qrcodejs)
- Icons and visual design optimized for educational clarity