import React, { useRef, useState } from 'react'
import type { NosImplementation } from '../types'
import { resolveImage } from '../lib/images'

export default function Implantations({ cities }: { cities: NosImplementation[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="location" className="bg-c1 py-10">
      <div className="container mx-auto px-4 mb-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-3">Nos agences</p>
          <h2 className="section-title">Nos Destinations</h2>
          <div className="title-rule mb-6" />
          <p className="text-sm text-gray-500 mb-2">
            Trouvez facilement l'agence la plus proche de chez vous et bénéficiez de notre expertise
            locale, où que vous soyez.
          </p>
        </div>
      </div>
      <div className="relative">
        <div ref={scrollRef} className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, i) => (
            <article key={city.id} className={`card-iv ${!showAll && i >= 6 ? '!hidden' : ''}`}>
              <div className="card-img relative">
                <img src={resolveImage(city.image)} alt={`Agence Soadia Travel à ${city.nom}`} loading="lazy" />
                <span className="absolute left-0 top-0 bg-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {city.categorie || 'Implantation'}
                </span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{city.nom}</h3>
                <p className="card-desc">{city.description || 'Découvrez notre implantation avec Soadia Travel.'}</p>
                
              </div>
            </article>
          ))}
        </div>
        {cities.length > 6 && <button onClick={() => setShowAll(!showAll)} className="btn-solid mx-auto mt-8 flex w-fit">{showAll ? 'Réduire' : 'Voir tous'}</button>}
      </div>
    </section>
  )
}
