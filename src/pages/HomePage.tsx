import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { TouristicRoute, FeaturedCity, Vehicle } from '../types'
import Hero from '../components/Hero'
import About from '../components/About'
import FeaturedCitiesScroll from '../components/FeaturedCitiesScroll'
import TeamServices from '../components/TeamServices'
import CtaBanner from '../components/CtaBanner'
import Implantations from '../components/Implantations'
import ItineraryCarousel from '../components/ItineraryCarousel'
import VehicleTypes from '../components/VehicleTypes'
import Contact from '../components/Contact'
import Partners from '../components/Partners'

export default function HomePage() {
  const [routes, setRoutes] = useState<TouristicRoute[]>([])
  const [cities, setCities] = useState<FeaturedCity[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<TouristicRoute[]>('/touristic-routes'),
      api.get<FeaturedCity[]>('/featured-cities'),
      api.get<Vehicle[]>('/vehicles'),
    ])
      .then(([r, c, v]) => {
        setRoutes(r)
        setCities(c)
        setVehicles(v)
      })
      .catch((e) => console.error('Erreur de chargement des données:', e))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.slice(1)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className="overflow-visible">
      <Hero />
      <About />
      <FeaturedCitiesScroll cities={cities} />
      <TeamServices />
      <CtaBanner />
      <Implantations cities={cities} />
      <ItineraryCarousel routes={routes} />
      <VehicleTypes vehicles={vehicles} />
      <Contact />
      <Partners />
    </main>
  )
}
