import React, { useState } from 'react'
import { staticImages } from '../lib/images'
import type { EquipeService } from '../types'

export default function TeamServices({ teams, services }: { teams: EquipeService[]; services: EquipeService[] }) {
  const items = [
    ...teams.map((item) => ({ ...item, category: 'Équipe' })),
    ...services.map((item) => ({ ...item, category: 'Service' })),
  ]
  const [showAll, setShowAll] = useState(false)
  const visibleItems = showAll ? items : items.slice(0, 4)

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 text-gray-800">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="relative mx-4 mb-12 text-center sm:mx-6 lg:mx-auto lg:max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">L'expérience Soa Dia</p>
        <h2 className="mb-5 text-3xl font-bold text-sky-950 md:text-4xl">
          Notre équipe et nos services
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">
          Capturer l'instant et voyager avec Soa Dia, c'est bien plus qu'un simple déplacement. Nous
          vous invitons à vivre chaque trajet comme une expérience unique, où confort, sécurité et
          découverte se conjuguent pour rendre vos voyages inoubliables.
        </p>
        <p className="text-sm leading-relaxed text-gray-500">
          Notre équipe passionnée met tout en œuvre pour vous offrir un service personnalisé, adapté
          à vos besoins et à vos envies. Faites confiance à notre expertise pour transformer chaque
          trajet en un moment d'exception.
        </p>
      </div>
      <div className="relative mx-4 grid grid-cols-1 gap-6 pb-4 sm:mx-6 sm:grid-cols-2 lg:mx-auto lg:max-w-6xl lg:grid-cols-4">
        {visibleItems.map((item) => (
          <article key={item.id} className="group relative h-72 overflow-hidden rounded-2xl bg-slate-200 shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.image || staticImages.busTouristique})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-sky-950/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="mb-2 inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold md:text-2xl">{item.nom}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
      {items.length > 4 && <button onClick={() => setShowAll(!showAll)} className="relative mx-auto mt-8 block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">{showAll ? 'Réduire' : 'Voir tous'}</button>}
      {items.length === 0 && <p className="relative text-center text-sm text-gray-500">Aucune équipe ou service disponible pour le moment.</p>}
    </section>
  )
}
