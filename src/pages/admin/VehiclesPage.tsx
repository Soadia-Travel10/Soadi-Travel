import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import DataTable from '../../components/admin/DataTable'
import type { Vehicle } from '../../types'

export default function VehiclesPage() {
  const [items, setItems] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [form, setForm] = useState({ name: '', description: '', image_url: '' })

  const load = () => {
    setLoading(true)
    api.get<Vehicle[]>('/vehicles').then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openNew = () => { setEditing(null); setForm({ name: '', description: '', image_url: '' }); setShowForm(true) }
  const openEdit = (v: Vehicle) => { setEditing(v); setForm({ name: v.name, description: v.description || '', image_url: v.image_url || '' }); setShowForm(true) }

  const handleSave = async () => {
    if (editing) await api.put(`/vehicles/${editing.id}`, form, 'admin')
    else await api.post('/vehicles', form, 'admin')
    setShowForm(false)
    load()
  }

  const handleDelete = async (row: Vehicle) => {
    if (!confirm(`Supprimer "${row.name}" ?`)) return
    await api.delete(`/vehicles/${row.id}`, 'admin')
    load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-950">Véhicules</h1>
        <button onClick={openNew} className="bg-primary text-white px-4 py-2 rounded font-semibold text-sm">+ Nouveau véhicule</button>
      </div>
      <DataTable
        rowKey={(r) => r.id}
        columns={[
          { key: 'name', label: 'Nom' },
          { key: 'description', label: 'Description' },
          { key: 'seats', label: 'Nombre de sièges', render: (r) => r.seats.length },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? 'Modifier' : 'Nouveau véhicule'}</h2>
            <div className="space-y-3">
              <input placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <input placeholder="URL image" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full border rounded p-2 text-sm" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded border text-sm">Annuler</button>
              <button onClick={handleSave} className="px-4 py-2 rounded bg-primary text-white text-sm font-semibold">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
