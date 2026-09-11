import React from 'react'
import baobabSunset from '../assets/images/baobab-sunset.webp'
import aboutImage from '../assets/images/2.jpg'

export default function About() {
  return (
    <section id="about" className="relative pt-5 bg-c1 text-gray-800">
      <div className="absolute inset-0 z-0">
        <img src={baobabSunset} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-500/80"></div>
      </div>
      <div className="relative grid md:grid-cols-2 gap-10 w-full">
        <div className="px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-sky-950">
            Pourquoi choisir Soa Dia Travel?
          </h2>
          <p className="text-sm mb-6 text-gray-600">
            <b>Soa Dia Travel</b> vous offre une expérience de voyage <b>fiable</b>, <b>confortable</b>{' '}
            et <b>accessible</b> à travers Madagascar. Profitez d'un <b>service client attentif</b>,
            d'une <b>réservation facile</b> et d'une <b>flotte moderne</b> pour tous vos déplacements.
            Chez <b>Soa Dia Travel</b>, nous rendons votre voyage aussi <b>confortable</b> et{' '}
            <b>fiable</b> que possible. Que vous voyagiez en ville ou à la campagne, nous avons tout
            ce qu'il vous faut.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              'Réservation en ligne facile et disponibilité des sièges en temps réel',
              'Des autobus sûrs et bien entretenus',
              'Support client amical et confirmations instantanées',
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-600 mr-2 mt-0.5">✓</span>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[520px] sm:h-[400px] md:h-auto grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-6">
          <img src={aboutImage} alt="Soa Dia Travel" className="w-full h-full object-cover rounded-lg shadow-lg" />
           <img src={aboutImage} alt="Soa Dia Travel" className="w-full h-full object-cover rounded-lg shadow-lg" />
          
        </div>
      </div>
    </section>
  )
}
