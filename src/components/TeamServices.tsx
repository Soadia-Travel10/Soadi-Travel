import React from 'react'
import { staticImages } from '../lib/images'

export default function TeamServices() {
  const items = [
    { img: staticImages.pachypodium, label: 'STAREX VIP', span: 'col-span-10 md:col-span-5' },
    { img: staticImages.busTouristique, label: 'BUS TOURISTIQUE', span: 'col-span-5 md:col-span-4' },
    { img: staticImages.busTouristiqueAlt, label: 'BUS TOURISTIQUE', span: 'col-span-5 md:col-span-4' },
    { img: staticImages.tanaStaff, label: 'Réception', span: 'col-span-10 md:col-span-5' },
  ]

  return (
    <section className="pt-16 bg-white text-gray-800">
      <div className="text-center mx-6 lg:mx-80 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-sky-950 mb-4">
          Notre équipe et nos services
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Capturer l'instant et voyager avec Soa Dia, c'est bien plus qu'un simple déplacement. Nous
          vous invitons à vivre chaque trajet comme une expérience unique, où confort, sécurité et
          découverte se conjuguent pour rendre vos voyages inoubliables.
        </p>
        <p className="text-gray-500">
          Notre équipe passionnée met tout en œuvre pour vous offrir un service personnalisé, adapté
          à vos besoins et à vos envies. Faites confiance à notre expertise pour transformer chaque
          trajet en un moment d'exception.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 sm:mx-6 lg:mx-40 min-h-[520px] sm:min-h-[420px] lg:min-h-[300px] pb-16">
        {items.map((item, i) => (
          <div key={i} className="relative h-60 sm:h-64 lg:h-72 overflow-hidden rounded-lg">
            <div
              className="h-full w-full bg-cover bg-center hover:scale-110 transition-all duration-500"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className="flex justify-center items-center absolute inset-0 bg-none hover:bg-gray-800/25 text-transparent text-xl md:text-4xl font-bold hover:text-white transition-all duration-500">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
