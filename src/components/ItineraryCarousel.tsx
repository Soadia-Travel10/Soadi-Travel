import React, { useState } from 'react'
import type { Trajet } from '../types'
import { resolveImage } from '../lib/images'

function RouteCard({ route }: { route: Trajet }) {
  return (
    <div className="flex flex-col w-full h-full cursor-grab bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-col pt-2 items-center text-sky-950 font-bold justify-center w-full py-2">
        {route.titre}
      </div>
      <div className="w-full h-full p-3 sm:p-5">
        <div className="flex flex-col w-full h-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 relative w-full h-full gap-2">
            {[
              { img: route.image_1, label: route.titre_1, city: route.titre_1 },
              { img: route.image_2, label: route.titre_2, city: route.titre_2 },
              { img: route.image_3, label: route.titre_3, city: route.titre_3 },
            ].map((step, i) => (
              <div key={i} className="relative outline outline-4 sm:outline-6 outline-offset-2 outline-white rounded-xl overflow-hidden h-40 sm:h-48">
                <img src={resolveImage(step.img)} alt={step.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="flex flex-col justify-end absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white text-xs font-semibold">{step.label}</span>
                  <span className="text-white/80 text-[10px]">{step.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Départ <br />
          <span className="font-medium text-gray-700">{route.depart}</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">A partir de</div>
          <div className="text-lg font-bold text-primary">
            {route.prix.toLocaleString('fr-FR')} <span className="text-xs">{route.devise}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ItineraryCarousel({ routes }: { routes: Trajet[] }) {
  const [index, setIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const visibleRoutes = showAll ? routes : routes.slice(0, 4)
  const perPage = 1

  return (
    <section id="book" className="py-16 bg-c2 bg-slate-50">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-sky-950 mb-4">
          Découvrez nos itinéraires touristiques en bus à Madagascar
        </h2>
        <p className="text-sm font-semibold text-gray-700 mb-2">Facile, rapide et sans prise de tête.</p>
        <p className="text-sm text-gray-500 max-w-3xl mx-auto">
          Fini les longues files et les réservations compliquées ! Avec notre service ultra-rapide,
          réservez votre billet de bus en quelques clics. C'est simple, efficace et instantané.
          Choisissez votre trajet, payez en toute sécurité, et c'est parti ! Voyager n'a jamais été
          aussi facile.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {visibleRoutes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
        {routes.length > 4 && <button onClick={() => setShowAll(!showAll)} className="mx-auto mt-8 block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">{showAll ? 'Réduire' : 'Voir tous'}</button>}
      </div>
    </section>
  )
}
