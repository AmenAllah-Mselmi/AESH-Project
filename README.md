# 🌲 Forest Guardian Drone System (v2.0)

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![YOLOv8](https://img.shields.io/badge/AI-YOLOv8-FF2D20?style=for-the-badge&logo=google-cloud)](https://ultralytics.com/)

---

## 📝 Project Definition
**Forest Guardian** is a state-of-the-art, AI-powered surveillance and protection ecosystem designed to preserve the world's most vulnerable forests. By integrating **autonomous drone fleets**, **real-time computer vision**, and a **collaborative multi-actor platform**, the system provides a comprehensive solution for detecting, reporting, and responding to environmental crimes—such as illegal logging, poaching, and forest fires—before they cause irreversible damage.

---

## ✨ Core Features
-   **🤖 Real-Time AI Detection**: Continuous monitoring of forest zones using YOLOv8 models to identify smoke, vehicles, and illegal tools (chainsaws).
-   **🚁 Autonomous Fleet Management**: Orchestration of multiple drones with live telemetry, battery tracking, and tactical mission control.
-   **🤝 Multi-Stakeholder Collaboration**: Unified communication and specific dashboards for Police, Guards, NGOs, and Citizens.
-   **🗺️ Interactive Tactical Map**: High-resolution geospatial interface with real-time GPS tracking and incident visualization.
-   **🔔 Intelligent Alert System**: Instant multi-channel notifications (Toasts, SMS, Web) with visual evidence vault.
-   **📊 Data-Driven Insights**: Advanced analytics and live charts to correlate illegal activity with environmental changes.
-   **🔐 Legal Admissibility**: Cryptographically sealed incident reports and visual evidence ready for legal proceedings.

---

## 🚀 Project Vision
The Forest Guardian project addresses the critical need for real-time, scalable, and transparent forest monitoring. By combining **Autonomous Drone Technology**, **Computer Vision (YOLOv8)**, and **Global Monitoring Dashboards**, we bridge the gap between environmental threats and rapid law enforcement response.

---

## 👥 Multi-Actor Ecosystem
The platform features **8 specialized dashboards**, each tailored to the unique needs of different stakeholders:

### 🛠️ Administrative & Technical
*   **System Admin**: 
    *   Full platform orchestration & user account provisioning.
    *   Server health monitoring & system log analysis.
    *   Security protocol management.
*   **Technician**: 
    *   Hardware maintenance & drone diagnostics.
    *   Software update deployment & sensor calibration.
    *   Fleet health tracking.

### 👮 Enforcement & Protection
*   **Police Unit**: 
    *   Real-time crime alerts & suspect tracking.
    *   Rapid unit dispatching with GPS coordination.
    *   Blockchain-sealed evidence management.
*   **Forest Guard**: 
    *   Tactical field operations & GPS-guided incident navigation.
    *   Live drone 360° scanning & IR surveillance.
    *   Emergency SOS signaling.

### 🌍 Science & Advocacy
*   **Researchers**: 
    *   Access to high-resolution datasets & API-driven data extraction.
    *   Historical correlation analysis & environmental modeling.
*   **NGO Partners**: 
    *   Transparency monitoring & carbon impact tracking.
    *   Reforestation project management & fundraising tools.
*   **Government Officials**: 
    *   Regional statistics & high-level ecological status overviews.
    *   Policy-making insights based on AI-driven data.

### 🤝 Community
*   **Citizen**: 
    *   Incident reporting (crowdsourcing) via mobile.
    *   Local safety alerts & community reward programs.

---

## 🧠 Advanced AI Capabilities (YOLOv8 & Beyond)
Our proprietary AI engine is trained on diverse ecological datasets to provide 24/7 autonomous monitoring.

### 🔍 Vision Detection (Powered by YOLOv8)
- **Deforestation & Logging**: Real-time detection of tree felling and canopy loss.
- **Fire & Smoke**: Early-stage wildfire detection with multi-spectral analysis.
- **Vehicle Monitoring**: Identification of illegal trucks, motorcycles, and heavy machinery.
- **Human Activity**: Detection of unauthorized human presence in protected "No-Go" zones.
- **License Plate Recognition (LPR)**: Automated logging of vehicle plates using OpenCV OCR.

### 🛰️ Predictive & Satellite Intelligence
- **Risk Zone Prediction**: ML algorithms predicting fire/logging risks based on weather patterns.
- **Night Vision (Thermal/IR)**: Advanced thermal imaging for night monitoring.
- **Drone Swarm Automation**: Coordinated patrol logic for large-scale area coverage.

---

## ✨ v2.0 Tactical Features

### 🗺️ Interactive Geospatial Map
*   **Satellite Imagery Integration**: High-resolution forest mapping for precise awareness.
*   **Real-time GPS Tracking**: Live positioning for drones and active incident markers.
*   **Rich Metadata tooltips**: Hover over drones to see battery, altitude, and live coordinates.

### 🔔 Global Notification Center
*   **Real-time Toasts**: Instant high-priority alerts with sound signals for critical threats.
*   **Evidence Vault**: Click any alert to see the **exact image** captured by the drone AI.
*   **Live Badges**: Dynamic sidebar counters for unread system alerts.

### 🤖 AI Assistant Chatbot
*   **Context-Aware**: Assistant capable of processing operational queries like "Show me current alerts" or "Weather in Sector 7".
*   **Command Logic**: Improved keyword detection for rapid system interrogation.

---

## 🛠️ Setup & Configuration

### 1. Database Setup (Supabase)
1.  **Tables**: Execute [`schema.sql`](./schema.sql) in your Supabase SQL Editor.
2.  **Demo Data**: Execute [`seed.sql`](./seed.sql) to populate drones and alerts on the map.
3.  **User Profiles**: Run the seeding script in `apps/web`:
    ```bash
    npm run seed:users
    ```

### 2. Environment Variables
Create `.env.local` in `apps/web/`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role (for seeding)
```

### 3. Installation & Run
```bash
# Frontend
cd apps/web
npm install
npm run dev

# AI Service (Optional for local testing)
cd services/ai
pip install -r requirements.txt
python detection.py
```

---


*Developed with ❤️ to protect our planet's green lungs.*
