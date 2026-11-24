import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import VehicleTypes from '../components/VehicleTypes'
import CtaBanner from '../components/CtaBanner'
import Implantations from '../components/Implantations'
import Contact from '../components/Contact'
import Partners from '../components/Partners'
import { implementations, partners, vehicles } from '../data/content'

export default function HomePage() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.slice(1)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [])

  return (
    <main className="overflow-visible">
      <Hero />
      <About />
      <VehicleTypes vehicles={vehicles} />
      <Implantations cities={implementations} />
      <CtaBanner />
      <Contact />
      <Partners partners={partners} />
    </main>
  )
}
