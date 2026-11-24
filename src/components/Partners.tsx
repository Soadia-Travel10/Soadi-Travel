import React, { useState } from 'react'
import type { Partenaire } from '../types'
import { resolveImage } from '../lib/images'

export default function Partners({ partners }: { partners: Partenaire[] }) {
  const [showAll, setShowAll] = useState(false)
  const visiblePartners = showAll ? partners : partners.slice(0, 8)

  if (partners.length === 0) return null

  return (
    <section id="partners" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-3">Ils nous accompagnent</p>
          <h2 className="section-title">Nos partenaires</h2>
          <div className="title-rule mb-6" />
          <p className="leading-relaxed text-gray-600">
            Des partenaires de confiance qui contribuent à rendre chaque voyage plus simple et plus
            agréable.
          </p>
        </div>

        <ul className="mx-auto flex max-w-5xl flex-wrap items-stretch justify-center border-y border-slate-200">
          {visiblePartners.map((partner) => (
            <li
              key={partner.id}
              className="group flex w-1/2 flex-col items-center justify-center gap-3 border-slate-200 px-6 py-10 sm:w-1/3 md:w-1/4 md:[&:not(:first-child)]:border-l"
            >
              <div className="flex h-16 w-full items-center justify-center">
                {partner.image ? (
                  <img
                    src={resolveImage(partner.image)}
                    alt={partner.nom}
                    className="max-h-16 max-w-[8rem] object-contain opacity-70 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {partner.nom.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 transition-colors group-hover:text-primary">
                {partner.nom}
              </span>
            </li>
          ))}
        </ul>

        {partners.length > 8 && (
          <button onClick={() => setShowAll(!showAll)} className="btn-solid mx-auto mt-10 flex w-fit">
            {showAll ? 'Réduire' : 'Voir tous'}
          </button>
        )}
      </div>
    </section>
  )
}
