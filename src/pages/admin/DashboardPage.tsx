import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface DashboardCount {
  label: string
  value: number
  link: string
  color: string
  description: string
}

const resources = [
  { label: 'Villes emblématiques', table: 'villes_emblematiques', link: '/admin/emblematic-cities', color: 'bg-blue-500', description: 'Galerie publique' },
  { label: 'Types de véhicules', table: 'types_vehicules', link: '/admin/vehicles', color: 'bg-violet-500', description: 'Flotte disponible' },
  { label: 'Nos destinations', table: 'nos_implementations', link: '/admin/hubs', color: 'bg-teal-500', description: 'Implantations' },
  { label: 'Trajets touristiques', table: 'trajets', link: '/admin/routes', color: 'bg-amber-500', description: 'Cartes de trajets' },
  { label: 'Partenaires', table: 'partenaires', link: '/admin/cities', color: 'bg-rose-500', description: 'Logos partenaires' },
  { label: 'Villes', table: 'villes', link: '/admin/hubs', color: 'bg-emerald-500', description: 'Catalogue destinations' },
] as const

const chartColors = ['#2563eb', '#7c3aed', '#0d9488', '#f59e0b', '#e11d48', '#10b981']

export default function DashboardPage() {
  const [counts, setCounts] = useState<DashboardCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCounts = async () => {
      const results = await Promise.all(
        resources.map(async (resource) => {
          const { count, error: queryError } = await supabase
            .from(resource.table)
            .select('*', { count: 'exact', head: true })

          if (queryError) throw queryError
          return { ...resource, value: count || 0 }
        }),
      )

      setCounts(results)
    }

    loadCounts()
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : 'Impossible de charger les statistiques.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />

  const chartData = counts.map((item) => ({
    name: item.label.replace('Villes emblématiques', 'Villes embl.').replace('Types de véhicules', 'Véhicules').replace('Nos destinations', 'Destinations').replace('Trajets touristiques', 'Trajets'),
    value: item.value,
  }))

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-sky-950 to-blue-700 p-6 md:p-8 text-white shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 mb-2">Administration</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-sm text-blue-100">Vue réelle des données enregistrées dans Supabase.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {counts.map((card) => (
          <Link
            key={card.table}
            to={card.link}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">{card.label}</p>
                <p className="text-4xl font-bold text-sky-950">{card.value}</p>
                <p className="text-xs text-gray-400 mt-2">{card.description}</p>
              </div>
              <span className={`h-12 w-12 rounded-2xl ${card.color} opacity-80 group-hover:scale-110 transition-transform`} />
            </div>
            <div className="mt-5 text-sm font-semibold text-primary">Gérer →</div>
          </Link>
        ))}
      </div>

      {!error && counts.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-sky-950">Répartition des contenus</h2>
              <p className="text-sm text-gray-500">Part de chaque table dans le catalogue.</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="48%" innerRadius={62} outerRadius={105} paddingAngle={3}>
                    {chartData.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => [value, 'Éléments']} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-sky-950">Volume par ressource</h2>
              <p className="text-sm text-gray-500">Nombre d’enregistrements présents dans Supabase.</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                  <XAxis dataKey="name" angle={-18} textAnchor="end" height={58} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip formatter={(value: number) => [value, 'Éléments']} />
                  <Bar dataKey="value" name="Éléments" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {!error && counts.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-sky-950 mb-2">Données synchronisées</h2>
          <p className="text-sm text-gray-500">Les compteurs ci-dessus sont lus directement depuis les tables Supabase. Les anciennes données locales ont été retirées de ce tableau de bord.</p>
        </div>
      )}
    </div>
  )
}
