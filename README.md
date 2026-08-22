# 🔍 CampusFind AI — Smart Campus Lost & Found System

An AI-powered web application for university campuses to streamline lost and found item recovery using computer vision matching, sequence route estimation, and campus-wide notifications.

---

## ✨ Features

- **🤖 AI-Powered Image Matching**: Computer vision simulation that extracts key features (color, brand, serial numbers, shape, texture) and matches against reported items.
- **🗺️ Campus Route Builder**: Track where students were before losing an item (`Classroom → Canteen → Library → Auditorium`) using quick-tap campus chips.
- **📍 AI Location Probability Estimation**: Analyzes route sequence, last remembered spot, and timestamps to output top 3 predicted locations (e.g. 📚 Library 82%, 🍔 Canteen 76%, 🏫 Classroom 64%).
- **⭐ Smart Prioritized Matching**: Automatically highlights items found near high-probability loss locations with `⭐ AI Top Match` badges.
- **📊 Real-time Campus Stats**: Live counters for items reported, items recovered, AI accuracy, and campus coverage.
- **🔍 Filterable Search Database**: Real-time keyword search paired with category filter pills (Electronics, Bags, Keys, Accessories, etc.).
- **🎨 Modern Design**: Custom CSS design system with Outfit & Inter typography, yellow/gold glowing gradients (`#FFC700`), glassmorphic header, and cybernetic AI scanner animations.

---

## 🚀 Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/gowtham-2007-svg/AI-finder.git
   cd AI-finder
   ```

2. Run locally using any local web server:
   ```bash
   # Python
   python -m http.server 3000

   # or Node / npx
   npx serve ./
   ```

3. Open your browser and navigate to `http://localhost:3000`.

---

## 🛠️ Tech Stack

- **HTML5 & CSS3** (Vanilla Custom Design System)
- **JavaScript (ES6+)** (Dynamic Route Tracking & AI Matching Simulation)
- **Google Fonts** (Outfit & Inter)
