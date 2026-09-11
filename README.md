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
mixmymh@gmail.com (supabase)
mencekeli@gmail.com(contact)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_EMAILJS_SERVICE_ID=service_9w8cejk
VITE_EMAILJS_TEMPLATE_ID=template_8x5axm8
VITE_EMAILJS_PUBLIC_KEY=zY1h4GnDvtdTns6ZM