import React from 'react'
import avenueBaobab from '../assets/images/avenue-baobab.webp'

const WAVE_HEIGHT = 120

// Courbe du bord bas de l'image (viewBox 1440 x 120) : la partie au-dessus du tracé reste visible.
const FRONT_WAVE = 'M0 0H1440V52C1330 92 1170 98 1040 96C880 92 760 92 640 84C540 70 470 56 380 56C250 58 130 82 0 104Z'
const BACK_WAVE = 'M0 0H1440V70C1380 90 1300 112 1180 116C1000 120 800 118 700 108C600 96 520 70 380 68C250 68 120 92 0 112Z'

// Masque : image visible partout, sauf sous la courbe SVG placée en bas du bloc.
function waveMask(path: string): React.CSSProperties {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 ${WAVE_HEIGHT}' preserveAspectRatio='none'><path d='${path}' fill='black'/></svg>`
  const image = `linear-gradient(#000,#000), url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  const size = `100% calc(100% - ${WAVE_HEIGHT - 1}px), 100% ${WAVE_HEIGHT}px`
  return {
    maskImage: image,
    WebkitMaskImage: image,
    maskSize: size,
    WebkitMaskSize: size,
    maskPosition: 'top, bottom',
    WebkitMaskPosition: 'top, bottom',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  }
}

export default function Hero() {
  const image = `url("${avenueBaobab}")`

  return (
    <section id="hero" className="relative flex min-h-[560px] items-center bg-c1 pb-40 pt-32 md:min-h-[800px]">
      {/* Couche translucide derrière la vague */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: image, ...waveMask(BACK_WAVE) }}
      />
      {/* Image principale, bord bas en vague SVG */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: image, ...waveMask(FRONT_WAVE) }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-blue-900/25 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <h1 className="animate-fade-in-up font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
          Soadia Travel
          <span className="mt-3 block text-2xl font-semibold md:text-3xl">
            Service de  location de véhicules à Madagascar
          </span>
        </h1>
        <p className="animate-fade-in-up mt-3 max-w-2xl font-serif text-lg font-semibold text-white md:text-xl" style={{ animationDelay: '0.15s' }}>
          Explorez Madagascar en autocar : réservez vos trajets, découvrez de nouveaux itinéraires et
          voyagez avec confort et sécurité.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#location" className="group btn-outline-light">
            Trouvez vos destinations
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a href="#contact" className="group btn-solid">
            Réservez
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
