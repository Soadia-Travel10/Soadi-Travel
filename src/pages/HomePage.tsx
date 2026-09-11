import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { supabase } from '../../utils/supabase'
import type { EquipeService, NosImplementation, Partenaire, Trajet, Ville, VilleEmblematique, VehicleType } from '../types'
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
  const [routes, setRoutes] = useState<Trajet[]>([])
  const [cities, setCities] = useState<Ville[]>([])
  const [vehicles, setVehicles] = useState<VehicleType[]>([])
  const [partners, setPartners] = useState<Partenaire[]>([])
  const [implementations, setImplementations] = useState<NosImplementation[]>([])
  const [emblematicCities, setEmblematicCities] = useState<VilleEmblematique[]>([])
  const [teams, setTeams] = useState<EquipeService[]>([])
  const [services, setServices] = useState<EquipeService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('trajets').select('*').order('created_at', { ascending: false }),
      supabase.from('villes').select('*').order('created_at', { ascending: false }),
      supabase.from('types_vehicules').select('*').order('created_at', { ascending: false }),
      supabase.from('partenaires').select('*').order('created_at', { ascending: false }),
      supabase.from('nos_implementations').select('*').order('created_at', { ascending: false }),
      supabase.from('villes_emblematiques').select('*').order('ordre', { ascending: true }),
      supabase.from('nos_equipes').select('*').order('ordre', { ascending: true }),
      supabase.from('nos_services').select('*').order('ordre', { ascending: true }),
    ])
      .then(([r, c, v, p, i, e, t, s]) => {
        setRoutes((r.data || []) as Trajet[])
        if (c.error) throw c.error
        setCities((c.data || []) as Ville[])
        if (v.error) throw v.error
        setVehicles((v.data || []) as VehicleType[])
        if (p.error) throw p.error
        setPartners((p.data || []) as Partenaire[])
        if (i.error) throw i.error
        setImplementations((i.data || []) as NosImplementation[])
        if (e.error) throw e.error
        setEmblematicCities((e.data || []) as VilleEmblematique[])
        if (t.error) throw t.error
        setTeams((t.data || []) as EquipeService[])
        if (s.error) throw s.error
        setServices((s.data || []) as EquipeService[])
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
      <FeaturedCitiesScroll cities={emblematicCities} />
      <TeamServices teams={teams} services={services} />
      <CtaBanner />
      <Implantations cities={implementations} />
      <ItineraryCarousel routes={routes} />
      <VehicleTypes vehicles={vehicles} />
      <Contact />
      <Partners partners={partners} />
    </main>
  )
}
