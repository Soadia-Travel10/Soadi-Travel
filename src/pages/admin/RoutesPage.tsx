import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import DataTable from '../../components/admin/DataTable'
import type { TouristicRoute } from '../../types'

const emptyForm = {
  path: '', start_name: '', mid_name: '', end_name: '',
  location_start: '', location_mid: '', location_end: '',
  img_start: '', img_mid: '', img_end: '', frequency: '', price: 0,
}

export default function RoutesPage() {
  const [items, setItems] = useState<TouristicRoute[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<TouristicRoute | null>(null)
  const [form, setForm] = useState(emptyForm)

  const load = () => {
    setLoading(true)
    api.get<TouristicRoute[]>('/touristic-routes').then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openNew = () => { setEditing(null); setForm(emptyForm); setShowForm(true) }
  const openEdit = (r: TouristicRoute) => { setEditing(r); setForm({ ...r }); setShowForm(true) }

  const handleSave = async () => {
    if (editing) await api.put(`/touristic-routes/${editing.id}`, form, 'admin')
    else await api.post('/touristic-routes', form, 'admin')
    setShowForm(false)
    load()
  }

  const handleDelete = async (row: TouristicRoute) => {
    if (!confirm(`Supprimer l'itinéraire "${row.path}" ?`)) return
    await api.delete(`/touristic-routes/${row.id}`, 'admin')
    load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-950">Itinéraires touristiques</h1>
        <button onClick={openNew} className="bg-primary text-white px-4 py-2 rounded font-semibold text-sm">+ Nouvel itinéraire</button>
      </div>
      <DataTable
        rowKey={(r) => r.id}
        columns={[
          { key: 'path', label: 'Itinéraire' },
          { key: 'frequency', label: 'Fréquence' },
          { key: 'price', label: 'Prix', render: (r) => `${r.price.toLocaleString('fr-FR')} AR` },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl my-8">
            <h2 className="text-lg font-bold mb-4">{editing ? 'Modifier' : 'Nouvel itinéraire'}</h2>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Nom complet (ex: A - B - C)" value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })} className="col-span-2 border rounded p-2 text-sm" />
              <input placeholder="Ville départ" value={form.start_name} onChange={(e) => setForm({ ...form, start_name: e.target.value })} className="border rounded p-2 text-sm" />
              <input placeholder="Ville intermédiaire" value={form.mid_name} onChange={(e) => setForm({ ...form, mid_name: e.target.value })} className="border rounded p-2 text-sm" />
              <input placeholder="Ville arrivée" value={form.end_name} onChange={(e) => setForm({ ...form, end_name: e.target.value })} className="border rounded p-2 text-sm col-span-2" />
              <input placeholder="Lieu départ (description)" value={form.location_start} onChange={(e) => setForm({ ...form, location_start: e.target.value })} className="border rounded p-2 text-sm col-span-2" />
              <input placeholder="Lieu intermédiaire" value={form.location_mid} onChange={(e) => setForm({ ...form, location_mid: e.target.value })} className="border rounded p-2 text-sm col-span-2" />
              <input placeholder="Lieu arrivée" value={form.location_end} onChange={(e) => setForm({ ...form, location_end: e.target.value })} className="border rounded p-2 text-sm col-span-2" />
              <input placeholder="Image départ (fichier)" value={form.img_start} onChange={(e) => setForm({ ...form, img_start: e.target.value })} className="border rounded p-2 text-sm" />
              <input placeholder="Image intermédiaire" value={form.img_mid} onChange={(e) => setForm({ ...form, img_mid: e.target.value })} className="border rounded p-2 text-sm" />
              <input placeholder="Image arrivée" value={form.img_end} onChange={(e) => setForm({ ...form, img_end: e.target.value })} className="border rounded p-2 text-sm" />
              <input placeholder="Fréquence" value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} className="border rounded p-2 text-sm" />
              <input type="number" placeholder="Prix (AR)" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} className="border rounded p-2 text-sm col-span-2" />
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
