# 🌲 Forest Guardian Drone System (v2.0)

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**Forest Guardian** est une plateforme de surveillance forestière de pointe, combinant l'Intelligence Artificielle, le monitoring par drones et une interface tactique multi-acteurs pour protéger nos écosystèmes en temps réel.

---

## 🚀 Fonctionnalités Clés (Mise à jour v2.0)

### 🗺️ Interface Géo-Spatiale Interactive
*   **Fond Satellite Réel** : Cartographie précise basée sur des images satellites haute résolution.
*   **Tracking Temps Réel** : Visualisation en direct des drones et des alertes sur la carte avec coordonnées GPS exactes.
*   **Radar Tactique** : Effets de balayage scanner et grille militaire pour une immersion totale.

### 🔔 Système de Notifications Intelligent
*   **Toasts Alertes** : Notifications prioritaires apparaissant instantanément lors de toute détection critique.
*   **Centre d'Alertes** : Un onglet dédié listant l'historique complet des incidents avec preuves visuelles.
*   **Badge Dynamique** : Indicateur visuel dans la barre latérale pour les alertes non traitées.

### 🤖 Assistant IA & Messagerie
*   **Chatbot Contextuel** : Un assistant IA capable de répondre à des requêtes opérationnelles (météo, état de la flotte, analyse d'incidents).
*   **Messagerie d'Équipe** : Système de chat sécurisé entre les différents acteurs (Police, Gardes, Admin).

### 📊 Analytics Connectés
*   **Live Charts** : Graphiques Recharts synchronisés en temps réel avec la base de données Supabase.
*   **Statistiques Dynamiques** : Monitoring automatique des alertes actives et de l'état des drones.

---

## 🛠️ Configuration & Installation

### 1. Prérequis
*   **Node.js** (v20+)
*   **Supabase Project** (URL + Clés API)
*   **Git**

### 2. Configuration de la Base de Données (Supabase)
Avant de lancer l'application, configurez votre instance Supabase :
1.  **Schéma** : Exécutez le contenu de [`schema.sql`](./schema.sql) dans le SQL Editor de Supabase pour créer les tables.
2.  **Données Initiales** : Exécutez [`seed.sql`](./seed.sql) pour peupler la base avec des drones et des alertes de démonstration.
3.  **Utilisateurs de Test** : Dans votre terminal (dossier `apps/web`), lancez :
    ```bash
    npm run seed:users
    ```

### 3. Variables d'Environnement
Créez un fichier `.env.local` dans `apps/web/` :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role (nécessaire pour le seeding)
```

### 4. Lancement de l'Application
```bash
cd apps/web
npm install
npm run dev
```
L'application sera disponible sur `http://localhost:3000`.

---

## 👥 Comptes de Démonstration

Pour tester les différents tableaux de bord, utilisez les comptes pré-configurés (tous avec le mot de passe : `password123`) :

| Rôle | Email |
| :--- | :--- |
| **Administrateur** | `admin@forest.com` |
| **Police** | `police@forest.com` |
| **Garde Forestier** | `garde@forest.com` |
| **Scientifique** | `science@forest.com` |
| **ONG** | `ngo@forest.com` |
| **Technicien** | `tech@forest.com` |
| **Citoyen** | `citizen@forest.com` |
| **Gouvernement** | `gov@forest.com` |

---

## 📁 Structure du Projet

```text
forest-guardian-drone/
├── apps/web/           # Application Next.js (Dashboard & UI)
├── services/ai/        # Service de Détection YOLOv8 (Python)
├── schema.sql          # Structure de la base de données
├── seed.sql            # Données de test (Drones, Alertes)
└── README.md           # Documentation
```

---

*Développé avec ❤️ pour la protection de nos forêts.*
