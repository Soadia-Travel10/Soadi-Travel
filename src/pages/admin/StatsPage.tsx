import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import type { SiteStat } from '../../types'

export default function StatsPage() {
  const [items, setItems] = useState<SiteStat[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    api.get<SiteStat[]>('/stats').then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const updateStat = (id: number, field: 'label' | 'value' | 'suffix', value: string) => {
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: field === 'value' ? parseInt(value) || 0 : value } : s)))
  }

  const saveStat = async (stat: SiteStat) => {
    await api.put(`/stats/${stat.id}`, stat, 'admin')
    alert('Statistique mise à jour !')
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-sky-950">Statistiques du site</h1>
      <p className="text-sm text-gray-500">Ces chiffres apparaissent dans la section "Pourquoi choisir Soa Dia Travel"</p>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow p-6 space-y-3">
            <input value={stat.label} onChange={(e) => updateStat(stat.id, 'label', e.target.value)} className="w-full border rounded p-2 text-sm font-medium" />
            <div className="flex gap-2">
              <input type="number" value={stat.value} onChange={(e) => updateStat(stat.id, 'value', e.target.value)} className="border rounded p-2 text-sm w-24" />
              <input value={stat.suffix} onChange={(e) => updateStat(stat.id, 'suffix', e.target.value)} placeholder="Suffixe (+, /7...)" className="border rounded p-2 text-sm flex-1" />
              <button onClick={() => saveStat(stat)} className="bg-primary text-white px-4 py-2 rounded text-sm font-semibold">Enregistrer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
