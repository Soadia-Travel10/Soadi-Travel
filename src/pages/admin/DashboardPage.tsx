import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'

interface DashboardData {
  counts: {
    reservations: number
    plans: number
    vehicles: number
    testimonials: number
    subscribers: number
    hubs: number
  }
  recentReservations: any[]
  revenueByStatus: { status: string; count: number; total: number }[]
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<DashboardData>('/admin/dashboard', 'admin')
      .then(setData)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
  }

  const cards = [
    { label: 'Réservations', value: data?.counts.reservations || 0, link: '/admin/reservations', color: 'bg-blue-500' },
    { label: 'Plans tarifaires', value: data?.counts.plans || 0, link: '/admin/plans', color: 'bg-green-500' },
    { label: 'Véhicules', value: data?.counts.vehicles || 0, link: '/admin/vehicles', color: 'bg-purple-500' },
    { label: 'Témoignages', value: data?.counts.testimonials || 0, link: '/admin/testimonials', color: 'bg-pink-500' },
    { label: 'Abonnés newsletter', value: data?.counts.subscribers || 0, link: '/admin/subscribers', color: 'bg-orange-500' },
    { label: 'Villes de départ', value: data?.counts.hubs || 0, link: '/admin/hubs', color: 'bg-teal-500' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-sky-950 mb-1">Tableau de bord</h1>
        <p className="text-sm text-gray-500">Vue d'ensemble de l'activité Soa Dia Travel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex items-center justify-between"
          >
            <div>
              <div className="text-sm text-gray-500 mb-1">{card.label}</div>
              <div className="text-3xl font-bold text-sky-950">{card.value}</div>
            </div>
            <div className={`w-12 h-12 rounded-full ${card.color} opacity-20`}></div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-sky-950 mb-4">Réservations par statut</h2>
          <div className="space-y-3">
            {data?.revenueByStatus.map((r) => (
              <div key={r.status} className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[r.status] || 'bg-gray-100'}`}>
                  {statusLabels[r.status] || r.status}
                </span>
                <div className="text-sm">
                  <span className="font-semibold">{r.count}</span> réservation(s) —{' '}
                  <span className="text-gray-500">{(r.total || 0).toLocaleString('fr-FR')} MGA</span>
                </div>
              </div>
            ))}
            {(!data?.revenueByStatus || data.revenueByStatus.length === 0) && (
              <p className="text-sm text-gray-400">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-sky-950 mb-4">Dernières réservations</h2>
          <div className="space-y-3">
            {data?.recentReservations.map((r) => (
              <div key={r.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-0">
                <div>
                  <div className="font-medium">{r.customer_name || 'Client'}</div>
                  <div className="text-xs text-gray-400">{r.reservation_date} {r.reservation_time}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[r.status] || 'bg-gray-100'}`}>
                  {statusLabels[r.status] || r.status}
                </span>
              </div>
            ))}
            {(!data?.recentReservations || data.recentReservations.length === 0) && (
              <p className="text-sm text-gray-400">Aucune réservation récente</p>
            )}
          </div>
          <Link to="/admin/reservations" className="text-sm text-primary font-semibold hover:underline block mt-4">
            Voir toutes les réservations →
          </Link>
        </div>
      </div>
    </div>
  )
}
