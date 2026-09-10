import React, { useState } from 'react'
import type { TouristicRoute } from '../types'
import { resolveImage } from '../lib/images'

function RouteCard({ route }: { route: TouristicRoute }) {
  return (
    <div className="flex flex-col w-full h-full cursor-grab bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-col pt-2 items-center text-sky-950 font-bold justify-center w-full py-2">
        {route.path}
      </div>
      <div className="w-full h-full p-5 overflow-x-auto">
        <div className="flex flex-col w-[750px] md:w-full h-full">
          <div className="flex relative flex-row w-full h-full space-x-2 md:space-x-0">
            {[
              { img: route.img_start, label: route.location_start, city: route.start_name },
              { img: route.img_mid, label: route.location_mid, city: route.mid_name },
              { img: route.img_end, label: route.location_end, city: route.end_name },
            ].map((step, i) => (
              <div key={i} className="relative outline outline-6 outline-offset-2 outline-white rounded-xl overflow-hidden grow h-40">
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
          <span className="font-medium text-gray-700">{route.frequency}</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">A partir de</div>
          <div className="text-lg font-bold text-primary">
            {route.price.toLocaleString('fr-FR')} <span className="text-xs">AR</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ItineraryCarousel({ routes }: { routes: TouristicRoute[] }) {
  const [index, setIndex] = useState(0)
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
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    </section>
  )
}
