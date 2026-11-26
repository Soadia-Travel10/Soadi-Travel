import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { VehicleType } from '../types'
import { resolveImage } from '../lib/images'

interface Props {
  vehicle: VehicleType
  onClose: () => void
}

const arrowClass =
  'absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow transition-colors hover:bg-primary hover:text-white'

export default function VehicleModal({ vehicle, onClose }: Props) {
  const photos = vehicle.photos?.length ? vehicle.photos : [vehicle.image ?? '']
  const [current, setCurrent] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const showPrevious = () => setCurrent((i) => (i - 1 + photos.length) % photos.length)
  const showNext = () => setCurrent((i) => (i + 1) % photos.length)

  // À l'ouverture : bloque le défilement de la page et place le focus dans la fenêtre
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.documentElement.style.overflow = previousOverflow
      opener?.focus({ preventScroll: true })
    }
  }, [])

  // Clavier : Échap pour fermer, flèches pour les photos, Tab reste dans la fenêtre
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
      if (event.key === 'ArrowLeft') setCurrent((i) => (i - 1 + photos.length) % photos.length)
      if (event.key === 'ArrowRight') setCurrent((i) => (i + 1) % photos.length)
      if (event.key === 'Tab') {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
        if (!items?.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [photos.length])

  const goToContact = (event: React.MouseEvent) => {
    event.preventDefault()
    onClose()
    // On attend la fermeture pour que la page puisse de nouveau défiler
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/80 p-3 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="animate-fade-in-up relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-white text-gray-700 shadow-2xl md:grid-cols-[1.5fr_1fr]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl leading-none text-navy shadow-md transition-colors hover:bg-brand-red hover:text-white"
        >
          ×
        </button>

        {/* Gauche : bibliothèque de photos */}
        <div className="flex min-w-0 flex-col bg-slate-100 p-3 sm:p-4">
          <div className="relative aspect-[4/3] bg-navy">
            <img
              src={resolveImage(photos[current])}
              alt={`${vehicle.nom}, photo ${current + 1} sur ${photos.length}`}
              className="absolute inset-0 h-full w-full object-contain"
            />
            {photos.length > 1 && (
              <>
                <button type="button" onClick={showPrevious} aria-label="Photo précédente" className={`${arrowClass} left-3`}>
                  ←
                </button>
                <button type="button" onClick={showNext} aria-label="Photo suivante" className={`${arrowClass} right-3`}>
                  →
                </button>
                <span className="absolute bottom-3 right-3 bg-navy/80 px-3 py-1 text-xs text-white">
                  {current + 1} / {photos.length}
                </span>
              </>
            )}
          </div>

          {photos.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {photos.map((photo, i) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Voir la photo ${i + 1}`}
                  aria-current={i === current}
                  className={`aspect-[4/3] overflow-hidden border-2 transition ${
                    i === current ? 'border-brand-red' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={resolveImage(photo)} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Droite : informations */}
        <div className="flex flex-col p-6 md:p-8">
          <p className="eyebrow mb-3">{vehicle.type || 'Véhicule'}</p>
          <h3 id="vehicle-modal-title" className="pr-10 font-serif text-3xl font-semibold text-navy">
            {vehicle.nom}
          </h3>
          <div className="mt-4 h-0.5 w-12 bg-brand-red" />

          <p className="mt-5 flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Disponible pour vos réservations
          </p>

          {vehicle.description && <p className="mt-5 leading-relaxed text-gray-600">{vehicle.description}</p>}

          {vehicle.capacity && (
            <p className="mt-5 flex justify-between border-y border-slate-200 py-3 text-sm">
              <span className="text-gray-500">Capacité</span>
              <span className="font-semibold text-navy">{vehicle.capacity}</span>
            </p>
          )}

          {vehicle.features && (
            <ul className="mt-6 space-y-3">
              {vehicle.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <a href="#contact" onClick={goToContact} className="btn-solid">
              Réserver ce véhicule
            </a>
            <a href="tel:+261373737001" className="text-center text-sm text-gray-500 transition-colors hover:text-primary">
              ou appelez le <span className="font-semibold text-navy">+261 37 37 370 01</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
