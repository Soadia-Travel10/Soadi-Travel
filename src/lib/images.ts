// Import de toutes les images statiques (Vite les transforme en assets avec hash)
import avenueBaobab from '../assets/images/avenue-baobab.jpg'
import baobabSunset from '../assets/images/baobab-sunset.webp'
import antananarivo from '../assets/images/Antananarivo-imp.jpg'
import fianarantsoa from '../assets/images/Fianarantsoa-imp.jpg'
import antsirabe from '../assets/images/Antsirabe-imp.jpg'
import morondava from '../assets/images/Morondava-imp.jpg'
import ambatolampy from '../assets/images/Ambatolampy-imp.jpg'
import farafangana from '../assets/images/Farafangana-imp.jpg'
import ambositra from '../assets/images/Ambositra-imp.webp'
import manakara from '../assets/images/Manakara-imp.jpg'
import tsiribihina from '../assets/images/Tsiribihina.jpeg'
import ranomafana from '../assets/images/Ranomafana.jpg'
import vignesAndrigitra from '../assets/images/Vignes-Andrigitra.webp'
import pachypodium from '../assets/images/Pachypodium-in-isalo.jpg'
import parcIsalo from '../assets/images/Parc-national-isalo.jpg'
import tulear from '../assets/images/Tulear.jpg'
import busTouristique3 from '../assets/images/bustouristique3.jpg'
import busSvg from '../assets/images/Bus.svg'
import busTouristique from '../assets/images/BusTouristique.jpg'
import busTouristiqueAlt from '../assets/images/bustouristique_.jpg'
import tanaStaff from '../assets/images/tana-staff.jpg'
import orangeIcon from '../assets/images/orange.webp'

const imageMap: Record<string, string> = {
  'avenue-baobab.jpg': avenueBaobab,
  'baobab-sunset.webp': baobabSunset,
  'Antananarivo-imp.jpg': antananarivo,
  'Fianarantsoa-imp.jpg': fianarantsoa,
  'Antsirabe-imp.jpg': antsirabe,
  'Morondava-imp.jpg': morondava,
  'Ambatolampy-imp.jpg': ambatolampy,
  'Farafangana-imp.jpg': farafangana,
  'Ambositra-imp.webp': ambositra,
  'Manakara-imp.jpg': manakara,
  'Tsiribihina.jpeg': tsiribihina,
  'Ranomafana.jpg': ranomafana,
  'Vignes-Andrigitra.webp': vignesAndrigitra,
  'Pachypodium-in-isalo.jpg': pachypodium,
  'Parc-national-isalo.jpg': parcIsalo,
  'Tulear.jpg': tulear,
  'bustouristique3.jpg': busTouristique3,
  'Bus.svg': busSvg,
  'BusTouristique.jpg': busTouristique,
  'bustouristique_.jpg': busTouristiqueAlt,
  'tana-staff.jpg': tanaStaff,
  'orange.webp': orangeIcon,
}

export function resolveImage(filename: string | null | undefined): string {
  if (!filename) return avenueBaobab
  // Si c'est déjà une URL complète (http/data), la retourner directement
  if (filename.startsWith('http') || filename.startsWith('data:') || filename.startsWith('/')) {
    const base = filename.split('/').pop() || filename
    return imageMap[base] || filename
  }
  return imageMap[filename] || avenueBaobab
}

export const staticImages = {
  avenueBaobab,
  baobabSunset,
  busTouristique3,
  busSvg,
  busTouristique,
  busTouristiqueAlt,
  tanaStaff,
  orangeIcon,
  pachypodium,
}
