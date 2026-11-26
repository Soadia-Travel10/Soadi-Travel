import React from 'react'
import type { Partenaire } from '../types'
import { resolveImage } from '../lib/images'

const SECONDS_PER_LOGO = 4 // plus la valeur est grande, plus le défilement est lent

export default function Partners({ partners }: { partners: Partenaire[] }) {
  if (partners.length === 0) return null

  // La bande est faite de deux moitiés identiques : en la décalant de 50 %, la boucle est invisible.
  // Chaque moitié répète la liste deux fois pour remplir aussi les très grands écrans.
  const half = [...partners, ...partners]
  const track = [...half, ...half]

  return (
    <section id="partners" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-3">Ils nous font confiance</p>
          <h2 className="section-title">Nos partenaires et clients</h2>
          <div className="title-rule mb-6" />
          <p className="leading-relaxed text-gray-600">
            Des partenaires de confiance qui contribuent à rendre chaque voyage plus simple et plus
            agréable.
          </p>
        </div>
      </div>

      <div className="partners-marquee overflow-hidden">
        <ul
          className="partners-track flex w-max items-center py-4"
          style={{ animationDuration: `${half.length * SECONDS_PER_LOGO}s` }}
        >
          {track.map((partner, i) => (
            <li
              key={`${partner.id}-${i}`}
              className="flex h-32 w-44 shrink-0 items-center justify-center px-5 md:w-52"
              // Les copies sont ignorées par les lecteurs d'écran
              aria-hidden={i >= partners.length}
            >
              <img src={resolveImage(partner.image)} alt={partner.nom} className="max-h-full max-w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
