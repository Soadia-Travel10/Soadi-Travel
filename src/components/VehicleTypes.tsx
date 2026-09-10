import React from 'react'
import type { VehicleType } from '../types'
import { resolveImage, staticImages } from '../lib/images'

interface Props {
  vehicles: VehicleType[]
}

export default function VehicleTypes({ vehicles }: Props) {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {vehicles.map((vehicle, index) => (
            <article
              key={vehicle.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="relative h-60 md:h-64 bg-gradient-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-100/50 transition-transform duration-700 group-hover:scale-150" />
                <img
                  src={vehicle.image ? resolveImage(vehicle.image) : staticImages.busTouristique}
                  alt={vehicle.nom}
                  className="relative z-10 w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Soa Dia Travel</p>
                    <h3 className="text-xl font-bold text-sky-950">{vehicle.nom}</h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-xs font-bold">
                    {vehicle.type || 'Véhicule'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {vehicle.type
                    ? `Véhicule de type ${vehicle.type} pour vos trajets et vos découvertes.`
                    : 'Un véhicule confortable pour vos trajets et vos découvertes.'}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-950">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  Disponible pour vos réservations
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
