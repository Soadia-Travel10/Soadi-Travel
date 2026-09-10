import React from 'react'
import avenueBaobab from '../assets/images/avenue-baobab.jpg'

export default function CtaBanner() {
  return (
    <section id="pricing" className="relative py-32 mt-16">
      <div className="absolute inset-0 z-0">
        <img src={avenueBaobab} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-white">MADAGASCAR VOUS ATTEND!</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Les plus beaux souvenirs se créent sur la route, là où chaque kilomètre parcouru devient
            une histoire, chaque arrêt un souvenir, et chaque détour une aventure inattendue.
          </p>
          <a href="#contact">
            <button className="bg-white text-primary px-8 py-4 rounded-md font-medium hover:bg-white/90 transition-colors">
              Contactez-nous
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
