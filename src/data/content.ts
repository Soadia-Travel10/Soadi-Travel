import type { NosImplementation, Partenaire, VehicleType } from '../types'

// Contenu statique du site. Les images sont référencées par leur nom de fichier
// (voir src/lib/images.ts pour la correspondance avec src/assets/images).
const created_at = '2026-01-01T00:00:00Z'

export const implementations: NosImplementation[] = [
  { id: 'i1', nom: 'Antananarivo', image: 'Antananarivo-imp.jpg', categorie: 'Agence principale', description: 'Notre siège et point de départ de la plupart des trajets.', created_at },
  { id: 'i2', nom: 'Antsirabe', image: 'Antsirabe-imp.png', categorie: 'Agence', description: 'Départs quotidiens vers la capitale et le sud.', created_at },
  { id: 'i3', nom: 'Ambatolampy', image: 'Ambatolampy-imp.png', categorie: 'Agence', description: 'Étape sur la RN7 entre Antananarivo et Antsirabe.', created_at },
  { id: 'i4', nom: 'Ambositra', image: 'Ambositra-imp.png', categorie: 'Agence', description: 'Au cœur du pays zafimaniry et de la sculpture sur bois.', created_at },
  { id: 'i5', nom: 'Fianarantsoa', image: 'Fianarantsoa-imp.jpg', categorie: 'Agence', description: 'Départs vers la côte est et le parc de Ranomafana.', created_at },
  { id: 'i6', nom: 'Manakara', image: 'Manakara-imp.jpg', categorie: 'Agence', description: 'Sur la côte est, au bout de la ligne FCE.', created_at },
  { id: 'i7', nom: 'Tulear', image: 'Tulear.jpeg', categorie: 'Agence', description: 'Destination du sud-est le long de la côte.', created_at },
  { id: 'i8', nom: 'Morondava', image: 'Morondava-imp.jpeg', categorie: 'Agence', description: "Départs pour l'allée des baobabs.", created_at },
]

export const vehicles: VehicleType[] = [
  {
    id: 'v1', nom: 'Bus touristique', type: 'Bus', image: '1.jpeg', created_at,
    photos: ['24.jpeg', '25.jpeg', '26.jpeg', '27.jpeg', '28.jpeg', '29.jpeg'],
    description: "Un autocar confortable et entretenu, pensé pour les voyages en groupe et les circuits à travers Madagascar.",
    features: ['Idéal pour les groupes', 'Grandes vitres panoramiques', 'Adapté aux longs trajets'],
    // capacity: '... places',
  },
  {
    id: 'v2', nom: 'Minivan', type: 'Minivan', image: '3.jpeg', created_at,
    photos: ['3.jpeg', '5.jpeg', '7.jpeg'],
    description: "Un minivan pratique pour les petits groupes, les transferts et les excursions.",
    features: ['Idéal pour les petits groupes', 'Porte latérale coulissante', 'Galerie de toit pour les bagages'],
    // capacity: '... places',
  },
  {
    id: 'v3', nom: 'SUV & PICKUP', type: 'SUV & PICKUP', image: '8.jpeg', created_at,
    photos: ['8.jpeg'],
    description: "Des 4x4 et pick-up pour vos déplacements privés et vos découvertes à travers le pays.",
    features: ['Idéal pour les déplacements privés', 'Adapté aux voyages en petit comité'],
    // capacity: '... places',
  },
]

export const partners: Partenaire[] = [
  { id: 'p1', nom: 'Orange', image: '16.jpg', created_at },
  { id: 'p2', nom: 'ARIA', image: '17.jpeg', created_at },
  { id: 'p3', nom: 'Tanalà Adventures Madagascar', image: '18.png', created_at },
  { id: 'p4', nom: 'Arcadia Travel', image: '19.png', created_at },
  { id: 'p5', nom: 'Mada Sky Tours', image: '20.png', created_at },
  { id: 'p6', nom: 'Madagas Tours', image: '21.png', created_at },
  { id: 'p7', nom: 'Madaverte Groupe', image: '22.png', created_at },
]
