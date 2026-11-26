import React, { useState } from 'react'
import type { VehicleType } from '../types'
import { resolveImage } from '../lib/images'
import VehicleModal from './VehicleModal'

export default function VehicleTypes({ vehicles }: { vehicles: VehicleType[] }) {
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState<VehicleType | null>(null)
  const visibleVehicles = showAll ? vehicles : vehicles.slice(0, 3)

  return (
    <section id="vehicles" className="bg-navy py-20 text-white md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="eyebrow mb-3 !text-white/70">Notre flotte</p>
          <h2 className="section-title !text-white">Choisissez votre type de véhicule</h2>
          <div className="title-rule mb-8" />
          <p className="leading-relaxed text-white/80">
            Des véhicules confortables et entretenus pour voyager sereinement sur les routes de
            Madagascar.
          </p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8">
          {visibleVehicles.map((vehicle) => (
            <article
              key={vehicle.id}
              className="card-iv group w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
            >
              <div className="card-img relative">
                <img src={resolveImage(vehicle.image)} alt={vehicle.nom} loading="lazy" />
                <span className="absolute left-0 top-4 bg-brand-red px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {vehicle.type || 'Véhicule'}
                </span>
              </div>
              <div className="card-body !pb-8">
                <h3 className="card-title !text-2xl">{vehicle.nom}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Disponible pour vos réservations
                </p>
                <span className="link-more mt-6 w-fit">
                  Voir les détails <span>→</span>
                </span>
              </div>
              {/* Bouton étendu : toute la carte est cliquable, aussi au clavier */}
              <button
                type="button"
                onClick={() => setSelected(vehicle)}
                aria-haspopup="dialog"
                aria-label={`Voir les détails : ${vehicle.nom}`}
                className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-4 focus-visible:outline-brand-red"
              />
            </article>
          ))}
        </div>

        {vehicles.length > 3 && (
          <button onClick={() => setShowAll(!showAll)} className="btn-outline-light mx-auto mt-12 flex w-fit">
            {showAll ? 'Réduire' : 'Voir tous les véhicules'}
          </button>
        )}
        {vehicles.length === 0 && (
          <p className="text-center text-sm text-white/70">Aucun véhicule disponible pour le moment.</p>
        )}
      </div>
      {selected && <VehicleModal vehicle={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
