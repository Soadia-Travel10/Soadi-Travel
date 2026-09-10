import React from 'react'
import type { Vehicle } from '../types'
import { resolveImage, staticImages } from '../lib/images'

interface Props {
  vehicles: Vehicle[]
}

export default function VehicleTypes({ vehicles }: Props) {
  return (
    <section id="vehicles" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Notre flotte</p>
          <h2 className="text-2xl md:text-3xl font-bold text-sky-950 mb-4">Choisissez votre type de véhicule</h2>
          <p className="text-gray-600">
            Des véhicules confortables et entretenus pour voyager sereinement sur les routes de Madagascar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {vehicles.map((vehicle, index) => (
            <article key={vehicle.id} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-slate-100 flex items-center justify-center p-6">
                <img
                  src={vehicle.image_url ? resolveImage(vehicle.image_url) : staticImages.busTouristique}
                  alt={vehicle.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-sky-950">{vehicle.name}</h3>
                  <span className="text-xs font-semibold rounded-full bg-primary/10 text-primary px-3 py-1">
                    Type {index + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {vehicle.description || 'Un bus confortable pour vos trajets et vos découvertes.'}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-sky-950">
                  <span className="text-primary">●</span>
                  {vehicle.seats.length} sièges disponibles
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
