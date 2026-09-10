# Soa Dia Travel Madagascar

Application frontend React + TypeScript + TailwindCSS pour Soa Dia Travel Madagascar.

## Fonctionnalités

- Site public avec accueil, itinéraires, villes, tarifs et réservation.
- Authentification client et administrateur avec Supabase depuis `/login`, `/register` et `/admin/login`.
- Gestion des plans, véhicules, villes, itinéraires, témoignages, statistiques, abonnés et réservations.
- La configuration Supabase est fournie par les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` dans `.env`.

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
