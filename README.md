# AutoShine — Luxury Car Detailing & Automotive Care Platform

A modern, responsive, high-performance automotive care and luxury detailing web platform built with semantic HTML5, modern CSS3, and vanilla JavaScript.

![AutoShine Platform Banner](assets/images/hero-car.webp)

## 🌟 Key Features

- **Master Catalog & Service System**: Detailed service breakdown for multi-stage paint correction, 9H diamond ceramic coatings, interior sanitation, engine bay detailing, and maintenance washes.
- **Interactive Before & After Image Comparison**: Real-time draggable visual comparison sliders displaying clear-coat restorations and swirl removal.
- **Dynamic Cockpit Theme Engine HUD**: Interactive floating HUD pill supporting 4 themes (*Mint Green*, *Crimson Red*, *Liquid Amber/Gold*, *Cyan Glow*).
- **Client & Administrator Dashboards**:
  - **User Dashboard**: Vehicle service timeline, maintenance advisories, loyalty tier progress, and booking history.
  - **Admin Dashboard**: Live bay capacity tracking, staff work assignments, chemical inventory monitoring, and revenue telemetry.
- **100% Mobile Responsive & Drawer Navigation**: Fully optimized for mobile viewports (iPhone SE, Android, iPads, desktop) with zero horizontal overflow and slide-in off-canvas navigation.
- **Authentication Workflows**: Login and registration flows with quick-fill demo presets and active session management.
- **Bespoke 404 Page**: Custom track-themed error page with quick recovery navigation.

## 📁 Project Architecture

```
Car-Detailing-Automotive-Care/
├── assets/
│   ├── images/              # Optimized WebP/PNG assets (<100KB each)
│   └── icons/               # SVG iconography
├── css/
│   └── style.css            # Complete design system, themes & media queries
├── js/
│   └── script.js            # Interactive widgets, sliders, forms & dashboards
├── 404.html                 # Error page
├── about.html               # Studio heritage & facility story
├── admin-dashboard.html     # Administrative control center
├── before-after.html        # Interactive correction slider showcase
├── booking.html             # Multi-step service booking reservation
├── contact.html             # Studio locations, concierge line & inquiry form
├── gallery.html             # Transformation showcase gallery
├── index.html               # Main landing page
├── login.html               # Client & admin login portal
├── packages.html            # Tiered service packages & pricing
├── register.html            # New vehicle registration portal
├── service-details.html     # Deep dive into flagship 9H ceramic treatment
├── services.html            # Full treatments directory with filters
└── user-dashboard.html      # Vehicle owner portal & service records
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Sureshkappala/Car-Detailing-Automotive-Care.git
   ```
2. Open `index.html` in any modern web browser, or launch a live server:
   ```bash
   # Using VS Code Live Server extension or Python built-in server:
   python -m http.server 5500
   ```
3. Visit `http://localhost:5500` to explore the platform.

## 🛠 Tech Stack

- **Markup**: Pure HTML5 (Semantic, accessible, SEO optimized)
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Media Queries)
- **Scripting**: Vanilla JavaScript (ES6+, zero external framework dependencies)
- **Assets**: Optimized lightweight WebP images ($\le 100\text{KB}$) for ultra-fast loading

---
© 2026 AutoShine Detailing Studio. All rights reserved.
