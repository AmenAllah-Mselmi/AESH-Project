# 🌲 Forest Guardian Drone System (v2.0)

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**Forest Guardian** is a state-of-the-art, AI-powered surveillance and protection system designed to combat illegal logging, poaching, and forest fires using a fleet of autonomous drones and a multi-stakeholder monitoring platform.

---

## 🚀 Project Vision
The Forest Guardian project addresses the critical need for real-time, scalable, and transparent forest monitoring. By combining **Autonomous Drone Technology**, **Computer Vision (YOLOv8)**, and **Global Monitoring Dashboards**, we bridge the gap between environmental threats and rapid law enforcement response.

---

## 👥 Multi-Actor Ecosystem
The platform features **8 specialized dashboards**, each tailored to the unique needs of different stakeholders:

### 🛠️ Administrative & Technical
*   **Admin**: System orchestration, user account provisioning, and platform health monitoring.
*   **Technician**: Hardware maintenance, drone diagnostics, and system health tracking.

### 👮 Enforcement & Protection
*   **Police**: Real-time crime alerts, suspect tracking, and rapid unit dispatching.
*   **Forest Guard**: Tactical field operations, GPS-guided incident navigation, and live drone scanning.

### 🌍 Science & Advocacy
*   **Researchers**: Access to high-resolution datasets and historical correlation analysis.
*   **NGOs**: Transparency monitoring, carbon impact tracking, and reforestation management.
*   **Government**: Regional statistics, policy-making insights, and ecological status overviews.

### 🤝 Community
*   **Citizen**: Incident reporting (crowdsourcing) and local safety alerts.

---

## ✨ New in v2.0 (Latest Updates)

### 🗺️ Interactive Geospatial Map
*   **Satellite Imagery**: High-resolution forest mapping for precise tactical awareness.
*   **Real-time Tracking**: Live GPS positioning for drones and active alert markers.
*   **Tactical Overlay**: Advanced radar scanners and military-grade grid systems.

### 🔔 Global Notification System
*   **Real-time Toasts**: Instant high-priority notifications for critical detections (fire, trucks).
*   **Alert Center**: A dedicated vault for incident history with visual evidence (drone-captured photos).
*   **Live Badges**: Dynamic sidebar indicators for pending alerts.

### 📊 Connected Analytics
*   **Live Charts**: Recharts integration synchronized with the Supabase database.
*   **Automatic Stats**: Real-time counters for active alerts and drone fleet status.

---

## 🧠 Advanced AI Capabilities
*   **🤖 AI Vision Engine**: Real-time detection of illegal trucks, chainsaws, and smoke/fire.
*   **🚁 Drone Command Center**: Live telemetry and tactical controls (Radar, IR Scan).
*   **🔍 Object Recognition**: High-confidence identification of threats using optimized YOLOv8.

---

## 🛠️ Setup & Configuration

### 1. Prerequisites
*   **Node.js** (v20+)
*   **Supabase Account** (URL + API Keys)
*   **Git**

### 2. Database Setup (Supabase)
1.  **Schema**: Execute the content of [`schema.sql`](./schema.sql) in the Supabase SQL Editor.
2.  **Initial Data**: Execute [`seed.sql`](./seed.sql) to populate the map with demo drones and alerts.
3.  **User Seeding**: Run the following in your terminal (`apps/web` folder):
    ```bash
    npm run seed:users
    ```

### 3. Environment Variables
Create a `.env.local` file in `apps/web/`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (Required for seeding)
```

### 4. Running the Project
```bash
cd apps/web
npm install
npm run dev
```
Open `http://localhost:3000` to access the console.

---

## 🔑 Demo Accounts
All accounts use the password: `password123`

| Role | Email |
| :--- | :--- |
| **System Admin** | `admin@forest.com` |
| **Police Unit** | `police@forest.com` |
| **Forest Guard** | `garde@forest.com` |
| **Scientist** | `science@forest.com` |
| **NGO Partner** | `ngo@forest.com` |
| **Technician** | `tech@forest.com` |
| **Citizen** | `citizen@forest.com` |
| **Government** | `gov@forest.com` |

---

## 📁 Project Structure
```text
forest-guardian-drone/
├── apps/web/           # Next.js Application (Dashboard & UI)
├── services/ai/        # AI Detection Service (Python/YOLOv8)
├── schema.sql          # Database structure
├── seed.sql            # Initial map data (Drones, Alerts)
└── README.md           # Documentation
```

---

*Developed with ❤️ to protect our planet's green lungs.*
