This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Comptes de Test (Acteurs)

Voici des exemples de comptes pour tester les différents tableaux de bord :

| Acteur | Email | Mot de passe | Description |
| :--- | :--- | :--- | :--- |
| **Administrateur** | `admin@forest.gov` | `admin123` | Contrôle total du système |
| **Police** | `police@agency.gov` | `police123` | Intervention et rapports légaux |
| **Garde Forestier** | `guard@forest.gov` | `guard123` | Surveillance terrain et drones |
| **Technicien** | `tech@drones.com` | `tech123` | Maintenance des drones et capteurs |
| **Scientifique** | `science@nature.edu` | `science123` | Analyse des données et biodiversité |
| **ONG** | `ngo@saveforest.org` | `ngo123` | Consultation et alertes publiques |
| **Citoyen** | `citizen@test.com` | `citizen123` | Signalement d'activités suspectes |

> [!TIP]
> **Validation des rôles :**
> - **Auto-validés :** NGO, Scientist, Citizen.
> - **Nécessitent une validation Admin :** Forest Guard.
> - **Système :** Admin, Police, Technician (créés manuellement).

> [!NOTE]
> Ces comptes sont à but illustratif. Assurez-vous de les créer dans votre instance Supabase Auth pour qu'ils soient fonctionnels.
