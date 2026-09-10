# Soa Dia Travel Madagascar

Application frontend React + TypeScript + TailwindCSS pour Soa Dia Travel Madagascar.

## Fonctionnalités

- Site public avec accueil, itinéraires, villes, tarifs et réservation.
- Authentification client locale depuis `/login` et `/register`.
- Panneau d'administration local depuis `/admin/login`.
- Gestion des plans, véhicules, villes, itinéraires, témoignages, statistiques, abonnés et réservations.
- Les données sont stockées dans le `localStorage` du navigateur : aucune API, aucun serveur backend et aucune base de données ne sont nécessaires.

## Identifiants de démonstration

- Admin : `admin@soadia.mg`
- Mot de passe : `admin123`
- Configuration alternative : `/admin/setup` avec la clé `soadia-setup-2026`

## Développement

```bash
npm install
npm run dev
```

## Vérification de production

```bash
npm run build
npm run preview
```

Les images sont intégrées comme assets Vite dans `src/assets/images/`.
