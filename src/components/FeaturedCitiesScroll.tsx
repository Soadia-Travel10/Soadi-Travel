import React from 'react'
import type { FeaturedCity } from '../types'
import { resolveImage } from '../lib/images'

export default function FeaturedCitiesScroll({ cities }: { cities: FeaturedCity[] }) {
  const doubled = [...cities, ...cities]

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

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-x gap-4 w-max">
          {doubled.map((city, idx) => (
            <div
              key={`${city.id}-${idx}`}
              className="relative w-64 h-64 flex-shrink-0 rounded-lg overflow-hidden bg-cover bg-center group cursor-pointer transition-transform duration-500 hover:scale-105"
              style={{ backgroundImage: `url(${resolveImage(city.image_url)})` }}
            >
              <div className="flex items-center justify-center w-full h-full bg-gray-800/25 group-hover:bg-gray-800/40 transition-colors">
                <h3 className="text-2xl font-bold text-white text-center px-2">{city.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 40s linear infinite;
        }
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
