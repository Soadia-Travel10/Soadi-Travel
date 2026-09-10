import React from 'react'

const partners = [
  { name: 'SoaTrans Plus', shortName: 'ST+', color: 'bg-sky-950', text: 'text-white' },
  { name: 'Orange Madagascar', shortName: 'orange', color: 'bg-orange-500', text: 'text-white' },
  { name: 'Madagascar Travel', shortName: 'MADA', color: 'bg-emerald-700', text: 'text-white' },
  { name: 'Route Nationale', shortName: 'RN', color: 'bg-amber-400', text: 'text-sky-950' },
  { name: 'Voyage Madagascar', shortName: 'VM', color: 'bg-rose-600', text: 'text-white' },
]

export default function Partners() {
  return (
    <section id="partners" className="py-16 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Ils nous accompagnent</p>
        <h2 className="text-2xl md:text-3xl font-bold text-sky-950 mb-4">Nos partenaires</h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-10">
          Des partenaires de confiance qui contribuent à rendre chaque voyage plus simple et plus agréable.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {partners.map((partner) => (
            <div key={partner.name} className="bg-white border border-slate-200 rounded-xl p-5 min-h-[150px] flex flex-col items-center justify-center gap-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className={`h-16 w-16 rounded-full ${partner.color} ${partner.text} flex items-center justify-center text-sm font-black tracking-tight`}>
                {partner.shortName}
              </div>
              <span className="text-sm font-semibold text-sky-950">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
