import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import DataTable from '../../components/admin/DataTable'
import type { Plan } from '../../types'

export default function PlansPage() {
  const [items, setItems] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Plan | null>(null)
  const [form, setForm] = useState({ name: '', price: '', period: 'par trajet', description: '', is_popular: false, featuresText: '' })
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    setLoading(true)
    api.get<Plan[]>('/plans').then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditing(null)
    setForm({ name: '', price: '', period: 'par trajet', description: '', is_popular: false, featuresText: '' })
    setShowForm(true)
  }

  const openEdit = (plan: Plan) => {
    setEditing(plan)
    setForm({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      description: plan.description || '',
      is_popular: !!plan.is_popular,
      featuresText: plan.features.map((f) => `${f.is_included ? '+' : '-'} ${f.name}`).join('\n'),
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    const features = form.featuresText.split('\n').filter(Boolean).map((line) => {
      const included = !line.trim().startsWith('-')
      const name = line.replace(/^[+-]\s*/, '').trim()
      return { name, is_included: included }
    })
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      period: form.period,
      description: form.description,
      is_popular: form.is_popular,
      features,
    }
    if (editing) {
      await api.put(`/plans/${editing.id}`, payload, 'admin')
    } else {
      await api.post('/plans', payload, 'admin')
    }
    setShowForm(false)
    load()
  }

  const handleDelete = async (row: Plan) => {
    if (!confirm(`Supprimer le plan "${row.name}" ?`)) return
    await api.delete(`/plans/${row.id}`, 'admin')
    load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold text-sky-950">Grille tarifaire</h1>
        <button onClick={openNew} className="bg-primary text-white px-4 py-2 rounded font-semibold text-sm hover:bg-primary/90">
          + Nouveau plan
        </button>
      </div>

      <DataTable
        rowKey={(r) => r.id}
        columns={[
          { key: 'name', label: 'Nom' },
          { key: 'price', label: 'Prix', render: (r) => `${parseFloat(r.price).toLocaleString('fr-FR')} MGA` },
          { key: 'description', label: 'Description' },
          { key: 'is_popular', label: 'Populaire', render: (r) => (r.is_popular ? '⭐ Oui' : 'Non') },
          { key: 'features', label: 'Caractéristiques', render: (r) => `${r.features.length} items` },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editing ? 'Modifier le plan' : 'Nouveau plan'}</h2>
            <div className="space-y-3">
              <input placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <input placeholder="Prix (MGA)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded p-2 text-sm" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_popular} onChange={(e) => setForm({ ...form, is_popular: e.target.checked })} />
                Marquer comme populaire
              </label>
              <textarea
                placeholder="Caractéristiques (une par ligne, + inclus / - non inclus)"
                value={form.featuresText}
                onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                rows={6}
                className="w-full border rounded p-2 text-sm font-mono"
              />
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
