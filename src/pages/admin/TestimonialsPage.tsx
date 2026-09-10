import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import DataTable from '../../components/admin/DataTable'
import type { Testimonial } from '../../types'

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState({ name: '', rating: 5, role: '', comment: '', color: 'bg-blue-50 border-blue-200' })

  const load = () => {
    setLoading(true)
    api.get<Testimonial[]>('/testimonials').then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openNew = () => { setEditing(null); setForm({ name: '', rating: 5, role: '', comment: '', color: 'bg-blue-50 border-blue-200' }); setShowForm(true) }
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ name: t.name, rating: t.rating, role: t.role, comment: t.comment, color: t.color || '' }); setShowForm(true) }

  const handleSave = async () => {
    if (editing) await api.put(`/testimonials/${editing.id}`, form, 'admin')
    else await api.post('/testimonials', form, 'admin')
    setShowForm(false)
    load()
  }

  const handleDelete = async (row: Testimonial) => {
    if (!confirm(`Supprimer le témoignage de "${row.name}" ?`)) return
    await api.delete(`/testimonials/${row.id}`, 'admin')
    load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-950">Témoignages</h1>
        <button onClick={openNew} className="bg-primary text-white px-4 py-2 rounded font-semibold text-sm">+ Nouveau témoignage</button>
      </div>
      <DataTable
        rowKey={(r) => r.id}
        columns={[
          { key: 'name', label: 'Nom' },
          { key: 'role', label: 'Rôle' },
          { key: 'rating', label: 'Note', render: (r) => '⭐'.repeat(r.rating) },
          { key: 'comment', label: 'Commentaire', render: (r) => r.comment.slice(0, 60) + '...' },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? 'Modifier' : 'Nouveau témoignage'}</h2>
            <div className="space-y-3">
              <input placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <input placeholder="Rôle" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <input type="number" min={1} max={5} placeholder="Note (1-5)" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} className="w-full border rounded p-2 text-sm" />
              <textarea placeholder="Commentaire" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={4} className="w-full border rounded p-2 text-sm" />
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
