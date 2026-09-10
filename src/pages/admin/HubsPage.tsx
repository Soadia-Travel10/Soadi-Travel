import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import DataTable from '../../components/admin/DataTable'
import type { Hub, Destination } from '../../types'

export default function HubsPage() {
  const [hubs, setHubs] = useState<Hub[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [newHub, setNewHub] = useState('')
  const [newDest, setNewDest] = useState({ name: '', hub_id: '' })

  const load = () => {
    setLoading(true)
    Promise.all([api.get<Hub[]>('/hubs'), api.get<Destination[]>('/destinations')])
      .then(([h, d]) => { setHubs(h); setDestinations(d) })
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const addHub = async () => {
    if (!newHub) return
    await api.post('/hubs', { name: newHub }, 'admin')
    setNewHub('')
    load()
  }

  const deleteHub = async (row: Hub) => {
    if (!confirm(`Supprimer "${row.name}" et ses destinations ?`)) return
    await api.delete(`/hubs/${row.id}`, 'admin')
    load()
  }

  const addDest = async () => {
    if (!newDest.name || !newDest.hub_id) return
    await api.post('/destinations', { name: newDest.name, hub_id: parseInt(newDest.hub_id) }, 'admin')
    setNewDest({ name: '', hub_id: '' })
    load()
  }

  const deleteDest = async (row: Destination) => {
    if (!confirm(`Supprimer "${row.name}" ?`)) return
    await api.delete(`/destinations/${row.id}`, 'admin')
    load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-sky-950">Villes & destinations</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-bold mb-4">Villes de départ (hubs)</h2>
        <div className="flex gap-2 mb-4">
          <input placeholder="Nouvelle ville de départ" value={newHub} onChange={(e) => setNewHub(e.target.value)} className="border rounded p-2 text-sm flex-1" />
          <button onClick={addHub} className="bg-primary text-white px-4 py-2 rounded text-sm font-semibold">Ajouter</button>
        </div>
        <DataTable rowKey={(r) => r.id} columns={[{ key: 'name', label: 'Nom' }]} rows={hubs} onDelete={deleteHub} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-bold mb-4">Destinations</h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          <select value={newDest.hub_id} onChange={(e) => setNewDest({ ...newDest, hub_id: e.target.value })} className="border rounded p-2 text-sm">
            <option value="">Ville de départ</option>
            {hubs.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
          <input placeholder="Nom de la destination" value={newDest.name} onChange={(e) => setNewDest({ ...newDest, name: e.target.value })} className="border rounded p-2 text-sm flex-1" />
          <button onClick={addDest} className="bg-primary text-white px-4 py-2 rounded text-sm font-semibold">Ajouter</button>
        </div>
        <DataTable rowKey={(r) => r.id} columns={[{ key: 'name', label: 'Destination' }, { key: 'hub_name', label: 'Depuis' }]} rows={destinations} onDelete={deleteDest} />
      </div>
    </div>
  )
}
