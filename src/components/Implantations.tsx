import React, { useRef } from 'react'
import type { NosImplementation } from '../types'
import { resolveImage } from '../lib/images'

export default function Implantations({ cities }: { cities: NosImplementation[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="location" className="mt-16 py-8">
      <div className="container mx-auto px-4 mb-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-sky-950 mb-4">Nos Destinations</h2>
          <p className="text-sm text-gray-500 mb-2">
            Trouvez facilement l'agence la plus proche de chez vous et bénéficiez de notre expertise
            locale, où que vous soyez.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {cities.map((city) => (
            <div key={city.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-4 snap-start">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300">
                <div className="relative h-48 md:h-64">
                  <img src={resolveImage(city.image)} alt={city.nom} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                    {city.categorie || 'Implantation'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{city.nom}</h3>
                  <p className="text-gray-600 text-sm">{city.description || 'Découvrez notre implantation avec Soa Dia Travel.'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
