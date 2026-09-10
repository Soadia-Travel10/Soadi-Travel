import React from 'react'
import avenueBaobab from '../assets/images/avenue-baobab.jpg'

export default function Hero() {
  const title = 'Explorez Madagascar avec  Soa Dia Travel'

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url("${avenueBaobab}")` }}
    >
      <div className="absolute inset-0 bg-blue-900/40"></div>
      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white flex flex-wrap justify-center md:justify-start">
          {title.split(' ').map((word, i) => (
            <span key={i} className="mr-2 inline-block animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              {word}
            </span>
          ))}
        </h1>
        <div className="text-lg font-pacifico md:text-xl mb-8 max-w-xl text-gray-200">
          Réservez vos trajets en bus facilement ou louez les vôtres, découvrez de nouveaux
          itinéraires et profitez du voyage avec confort et sécurité.
        </div>
        <div className="flex justify-center md:justify-start gap-4 flex-wrap">
          <a href="#book">
            <button className="group border border-white inline-flex items-center gap-2 hover:bg-secondary hover:text-blue-500 text-white px-6 py-3 rounded font-semibold shadow transition cursor-pointer">
              Trouvez vos destinations
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &gt;
              </span>
            </button>
          </a>
          <a href="#contact">
            <button className="group border border-white inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded font-semibold shadow transition cursor-pointer hover:bg-primary/90">
              Réservez
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &gt;
              </span>
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
