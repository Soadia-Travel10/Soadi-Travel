import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import DataTable from '../../components/admin/DataTable'
import type { Reservation } from '../../types'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function ReservationsPage() {
  const [items, setItems] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    api.get<Reservation[]>('/reservations', 'admin').then(setItems).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: number, status: string) => {
    await api.put(`/reservations/${id}`, { status }, 'admin')
    load()
  }

  const handleDelete = async (row: Reservation) => {
    if (!confirm('Supprimer cette réservation ?')) return
    await api.delete(`/reservations/${row.id}`, 'admin')
    load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-sky-950">Réservations</h1>
      <DataTable
        rowKey={(r) => r.id}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'customer_name', label: 'Client' },
          { key: 'customer_phone', label: 'Téléphone' },
          { key: 'reservation_date', label: 'Date' },
          { key: 'reservation_time', label: 'Heure' },
          { key: 'total_price', label: 'Montant', render: (r) => `${(r.total_price || 0).toLocaleString('fr-FR')} MGA` },
          {
            key: 'status', label: 'Statut',
            render: (r) => (
              <select
                value={r.status}
                onChange={(e) => updateStatus(r.id, e.target.value)}
                className={`text-xs font-semibold px-2 py-1 rounded border-0 ${statusColors[r.status] || 'bg-gray-100'}`}
              >
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmée</option>
                <option value="cancelled">Annulée</option>
              </select>
            ),
          },
        ]}
        rows={items}
        onDelete={handleDelete}
      />
    </div>
  )
}
