import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import DataTable from '../../components/admin/DataTable'
import type { FeaturedCity } from '../../types'

export default function CitiesPage() {
  const [items, setItems] = useState<FeaturedCity[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<FeaturedCity | null>(null)
  const [form, setForm] = useState({ title: '', description: '', image_url: '', plan_tags: '' })

  const load = () => {
    setLoading(true)
    api.get<FeaturedCity[]>('/featured-cities').then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openNew = () => { setEditing(null); setForm({ title: '', description: '', image_url: '', plan_tags: '' }); setShowForm(true) }
  const openEdit = (c: FeaturedCity) => { setEditing(c); setForm({ title: c.title, description: c.description, image_url: c.image_url, plan_tags: c.plan_tags }); setShowForm(true) }

  const handleSave = async () => {
    if (editing) await api.put(`/featured-cities/${editing.id}`, form, 'admin')
    else await api.post('/featured-cities', form, 'admin')
    setShowForm(false)
    load()
  }

  const handleDelete = async (row: FeaturedCity) => {
    if (!confirm(`Supprimer "${row.title}" ?`)) return
    await api.delete(`/featured-cities/${row.id}`, 'admin')
    load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-950">Villes emblématiques</h1>
        <button onClick={openNew} className="bg-primary text-white px-4 py-2 rounded font-semibold text-sm">+ Nouvelle ville</button>
      </div>
      <DataTable
        rowKey={(r) => r.id}
        columns={[
          { key: 'title', label: 'Titre' },
          { key: 'plan_tags', label: 'Plans' },
          { key: 'image_url', label: 'Image' },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? 'Modifier' : 'Nouvelle ville'}</h2>
            <div className="space-y-3">
              <input placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border rounded p-2 text-sm" />
              <input placeholder="Nom du fichier image (ex: Antananarivo-imp.jpg)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <input placeholder="Plans (ex: VIP, Premium)" value={form.plan_tags} onChange={(e) => setForm({ ...form, plan_tags: e.target.value })} className="w-full border rounded p-2 text-sm" />
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
