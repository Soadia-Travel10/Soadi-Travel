// Import de toutes les images statiques (Vite les transforme en assets avec hash)
import avenueBaobab from '../assets/images/avenue-baobab.jpg'
import baobabSunset from '../assets/images/baobab-sunset.webp'
import antananarivo from '../assets/images/Antananarivo-imp.jpg'
import fianarantsoa from '../assets/images/Fianarantsoa-imp.jpg'
import antsirabe from '../assets/images/Antsirabe-imp.png'
import morondava from '../assets/images/Morondava-imp.jpeg'
import ambatolampy from '../assets/images/Ambatolampy-imp.png'
import tulearPhoto from '../assets/images/Tulear.jpeg'
import ambositra from '../assets/images/Ambositra-imp.png'
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
import vehicle1 from '../assets/images/1.jpeg'
import vehicle3 from '../assets/images/3.jpeg'
import vehicle2 from '../assets/images/2.jpeg'
import vehicle4 from '../assets/images/4.jpeg'
import vehicle5 from '../assets/images/5.jpeg'
import vehicle6 from '../assets/images/6.jpeg'
import vehicle7 from '../assets/images/7.jpeg'
import vehicle8 from '../assets/images/8.jpeg'
import vehicle24 from '../assets/images/24.jpeg'
import vehicle25 from '../assets/images/25.jpeg'
import vehicle26 from '../assets/images/26.jpeg'
import vehicle27 from '../assets/images/27.jpeg'
import vehicle28 from '../assets/images/28.jpeg'
import vehicle29 from '../assets/images/29.jpeg'
import partnerOrange from '../assets/images/16.jpg'
import partnerAria from '../assets/images/17.jpeg'
import partner18 from '../assets/images/18.png'
import partner19 from '../assets/images/19.png'
import partner20 from '../assets/images/20.png'
import partner21 from '../assets/images/21.png'
import partner22 from '../assets/images/22.png'

const imageMap: Record<string, string> = {
  'avenue-baobab.jpg': avenueBaobab,
  'baobab-sunset.webp': baobabSunset,
  'Antananarivo-imp.jpg': antananarivo,
  'Fianarantsoa-imp.jpg': fianarantsoa,
  'Antsirabe-imp.png': antsirabe,
  'Morondava-imp.jpeg': morondava,
  'Ambatolampy-imp.png': ambatolampy,
  'Tulear.jpeg': tulearPhoto,
  'Ambositra-imp.png': ambositra,
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
  '1.jpeg': vehicle1,
  '3.jpeg': vehicle3,
  '2.jpeg': vehicle2,
  '4.jpeg': vehicle4,
  '5.jpeg': vehicle5,
  '6.jpeg': vehicle6,
  '7.jpeg': vehicle7,
  '8.jpeg': vehicle8,
  '24.jpeg': vehicle24,
  '25.jpeg': vehicle25,
  '26.jpeg': vehicle26,
  '27.jpeg': vehicle27,
  '28.jpeg': vehicle28,
  '29.jpeg': vehicle29,
  '16.jpg': partnerOrange,
  '17.jpeg': partnerAria,
  '18.png': partner18,
  '19.png': partner19,
  '20.png': partner20,
  '21.png': partner21,
  '22.png': partner22,
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
  pachypodium,
}
