import React from 'react'
import bannerImage from '../assets/images/2.webp'

export default function CtaBanner() {
  return (
    <section id="pricing" className="relative py-36">
      <div className="absolute inset-0 z-0">
        <img src={bannerImage} alt="Autocar devant la gare" loading="lazy" className="w-full h-full object-cover object-[center_85%]" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl font-medium mb-6 text-white">MADAGASCAR VOUS ATTEND!</h2>
          <div className="w-16 h-px bg-white mx-auto mb-8"></div>
          <p className="text-lg text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto">
            Les plus beaux souvenirs se créent sur la route, là où chaque kilomètre parcouru devient
            une histoire, chaque arrêt un souvenir, et chaque détour une aventure inattendue.
          </p>
          <a href="#contact">
            <button className="btn-outline-light">
              Contactez-nous
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
