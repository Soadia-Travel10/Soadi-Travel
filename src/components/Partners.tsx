import React from 'react'
import type { Partenaire } from '../types'

export default function Partners({ partners }: { partners: Partenaire[] }) {
  if (partners.length === 0) return null

  const doubled = [...partners, ...partners]

  return (
    <section id="partners" className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Ils nous accompagnent</p>
        <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-4">Nos partenaires</h2>
        <p className="text-sm leading-relaxed text-gray-500 max-w-2xl mx-auto">
          Des partenaires de confiance qui contribuent à rendre chaque voyage plus simple et plus agréable.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
        <div className="flex animate-partners-scroll gap-5 w-max py-4 px-2">
          {doubled.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="group w-56 md:w-64 h-44 flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
            >
              <div className="h-20 w-36 flex items-center justify-center">
                {partner.image ? (
                  <img src={partner.image} alt={partner.nom} className="max-h-20 max-w-full object-contain transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <span className="h-16 w-16 rounded-full bg-sky-950 text-white flex items-center justify-center text-sm font-black tracking-tight">
                    {partner.nom.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold text-sky-950 text-center">{partner.nom}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partners-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-partners-scroll {
          animation: partners-scroll 34s linear infinite;
        }
        .animate-partners-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
