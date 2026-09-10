import React from 'react'
import type { VilleEmblematique } from '../types'
import { resolveImage } from '../lib/images'

export default function FeaturedCitiesScroll({ cities }: { cities: VilleEmblematique[] }) {
  if (cities.length === 0) return null

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-sky-950 mb-4">
          Les villes les plus emblématiques de Madagascar
        </h2>
        <p className="text-sm text-gray-500 max-w-3xl mx-auto">
          Découvrez la richesse culturelle et la beauté naturelle de Madagascar à travers ses villes
          incontournables. Partez à la découverte d'<b>Antananarivo</b>, la capitale perchée sur ses
          collines, <b>Mahajanga</b> et ses plages animées, ou encore <b>Antsirabe</b>, réputée pour
          ses sources thermales. Chaque ville offre une expérience unique, entre histoire, traditions
          et paysages à couper le souffle.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {cities.map((city) => (
            <div
              key={city.id}
              className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center group cursor-pointer shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              style={{ backgroundImage: `url(${resolveImage(city.image)})` }}
            >
              <div className="flex items-end w-full h-full p-5 bg-gradient-to-t from-sky-950/85 via-sky-950/20 to-transparent group-hover:from-sky-950/95 transition-colors">
                <h3 className="text-2xl font-bold text-white text-center px-2">{city.nom}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
