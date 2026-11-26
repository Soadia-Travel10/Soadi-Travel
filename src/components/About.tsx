import React, { useEffect, useState } from 'react'
import aboutImage1 from '../assets/images/4.jpeg'
import aboutImage2 from '../assets/images/31.jpeg'

const slides = [aboutImage1, aboutImage2]
const DELAY = 4000 // durée d'affichage de chaque image en ms

const points = [
  'Réservation en ligne facile et disponibilité des sièges en temps réel',
  'Des autobus sûrs et bien entretenus',
  'Support client amical et confirmations instantanées',
]

export default function About() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    // Le temps repart à zéro à chaque changement, y compris après un clic sur un point
    const timer = setTimeout(() => setCurrent((current + 1) % slides.length), DELAY)
    return () => clearTimeout(timer)
  }, [current])

  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="container mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        {/* Carrousel d'images avec cadre décalé */}
        <div className="relative order-last md:order-first">
          <div className="absolute -bottom-4 -left-4 h-full w-full border-2 border-brand-red" aria-hidden="true" />
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 shadow-lg">
            {/* Les images sont superposées : seule l'image active est visible (fondu) */}
            {slides.map((slide, i) => (
              <img
                key={slide}
                src={slide}
                alt={`Voyage avec Soadia Travel, photo ${i + 1}`}
                aria-hidden={i !== current}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
                  i === current ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Afficher la photo ${i + 1}`}
                  className={`h-2 rounded-full shadow transition-all duration-500 ${
                    i === current ? 'w-8 bg-brand-red' : 'w-2 bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Texte */}
        <div>
          <p className="eyebrow mb-3">À propos</p>
          <h2 className="section-title">Pourquoi choisir Soadia Travel ?</h2>
          <div className="mb-6 mt-5 h-0.5 w-16 bg-brand-red" />
          <p className="mb-8 leading-relaxed text-gray-600">
            <b className="text-navy">Soadia Travel</b> vous offre une expérience de voyage fiable,
            confortable et accessible à travers Madagascar : un service client attentif, une
            réservation facile et une flotte moderne pour tous vos déplacements.
          </p>
          <ul className="mb-9 space-y-4">
            {points.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <a href="#location" className="link-more">
            Voir nos destinations <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
