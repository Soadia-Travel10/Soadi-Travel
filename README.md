# Soadia Travel Madagascar

Application frontend React + TypeScript + TailwindCSS pour Soadia Travel Madagascar.

## Fonctionnalités

- Site public statique : accueil, villes, itinéraires, véhicules et contact (le formulaire ouvre le client mail).

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

`npm run build` génère aussi le HTML de la page d'accueil à l'avance (pré-rendu, voir `scripts/prerender.mjs`).
Les fichiers SEO (`robots.txt`, `sitemap.xml`, image de partage) sont dans `public/`.

Les images sont intégrées comme assets Vite dans `src/assets/images/`.


Location de voiture à Madagascar