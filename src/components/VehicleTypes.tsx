import React, { useState } from 'react'
import type { VehicleType } from '../types'
import { resolveImage, staticImages } from '../lib/images'

interface Props {
  vehicles: VehicleType[]
}

export default function VehicleTypes({ vehicles }: Props) {
  const [showAll, setShowAll] = useState(false)
  const visibleVehicles = showAll ? vehicles : vehicles.slice(0, 3)

  return (
    <section id="vehicles" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Notre flotte</p>
          <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-4">Choisissez votre type de véhicule</h2>
          <p className="text-gray-600 leading-relaxed">
            Des véhicules confortables et entretenus pour voyager sereinement sur les routes de Madagascar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {visibleVehicles.map((vehicle, index) => (
            <article
              key={vehicle.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="relative h-44 md:h-48 bg-gradient-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100/50 transition-transform duration-700 group-hover:scale-150" />
                <img
                  src={vehicle.image ? resolveImage(vehicle.image) : staticImages.busTouristique}
                  alt={vehicle.nom}
                  className="relative z-10 w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Soa Dia Travel</p>
                    <h3 className="text-lg font-bold text-sky-950">{vehicle.nom}</h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 text-primary px-2 py-1 text-[11px] font-bold">
                    {vehicle.type || 'Véhicule'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {vehicle.type
                    ? `Véhicule de type ${vehicle.type} pour vos trajets et vos découvertes.`
                    : 'Un véhicule confortable pour vos trajets et vos découvertes.'}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-950">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                  Disponible pour vos réservations
                </div>
              </div>
            </article>
          ))}
        </div>
        {vehicles.length > 0 && (
          <p className="mt-6 text-center text-xs text-slate-500">
            {showAll ? `${vehicles.length} véhicules affichés` : `${Math.min(vehicles.length, 3)} véhicules affichés`}
          </p>
        )}
        {vehicles.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
            className="mx-auto mt-3 block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
          >
            {showAll ? 'Réduire' : `Voir tous les véhicules (${vehicles.length})`}
          </button>
        )}
        {vehicles.length === 0 && (
          <p className="mt-8 text-center text-sm text-slate-500">Aucun véhicule disponible pour le moment.</p>
        )}
      </div>
    </section>
  )
}
