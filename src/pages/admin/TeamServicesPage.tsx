import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabase'
import DataTable from '../../components/admin/DataTable'
import type { EquipeService } from '../../types'

type Collection = 'nos_equipes' | 'nos_services'
type GalleryItem = EquipeService

const labels: Record<Collection, { title: string; singular: string; description: string }> = {
  nos_equipes: { title: 'Notre équipe', singular: 'membre', description: 'Les visuels et noms présentés dans la galerie équipe.' },
  nos_services: { title: 'Nos services', singular: 'service', description: 'Les services présentés dans la galerie publique.' },
}

function GalleryManager({ collection, items, onReload }: { collection: Collection; items: GalleryItem[]; onReload: () => Promise<void> }) {
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState({ nom: '', image: '', ordre: 0 })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const label = labels[collection]

  const openNew = () => {
    setEditing(null)
    setForm({ nom: '', image: '', ordre: items.length })
    setImageFile(null)
    setError('')
    setShowForm(true)
  }

  const openEdit = (item: GalleryItem) => {
    setEditing(item)
    setForm({ nom: item.nom, image: item.image || '', ordre: item.ordre })
    setImageFile(null)
    setError('')
    setShowForm(true)
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      const ordre = Number(form.ordre)
      if (!form.nom.trim()) throw new Error(`Le nom du ${label.singular} est obligatoire.`)
      if (!Number.isInteger(ordre) || ordre < 0) throw new Error("L'ordre doit être un entier positif.")

      const payload = { nom: form.nom.trim(), image: form.image.trim() || null, ordre }
      if (imageFile) {
        if (!imageFile.type.startsWith('image/')) throw new Error('Veuillez sélectionner une image.')
        if (imageFile.size > 5 * 1024 * 1024) throw new Error("L'image ne doit pas dépasser 5 Mo.")
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const path = `team-services/${collection}/${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage.from('soadia-image').upload(path, imageFile, { contentType: imageFile.type, upsert: false })
        if (uploadError) throw uploadError
        payload.image = supabase.storage.from('soadia-image').getPublicUrl(path).data.publicUrl
      }

      const result = editing
        ? await supabase.from(collection).update(payload).eq('id', editing.id)
        : await supabase.from(collection).insert(payload)
      if (result.error) throw result.error
      setShowForm(false)
      await onReload()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Erreur lors de l'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Supprimer « ${item.nom} » ?`)) return
    const { error: deleteError } = await supabase.from(collection).delete().eq('id', item.id)
    if (deleteError) setError(deleteError.message)
    else await onReload()
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-bold text-sky-950">{label.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{label.description}</p>
        </div>
        <button onClick={openNew} className="self-start bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90">
          + Ajouter
        </button>
      </div>
      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}
      <DataTable
        rowKey={(row) => row.id}
        columns={[
          { key: 'ordre', label: 'Ordre', render: (row) => <span className="font-bold text-primary">{row.ordre}</span> },
          { key: 'image', label: 'Image', render: (row) => row.image ? <img src={row.image} alt={row.nom} className="h-14 w-20 object-cover rounded-lg" /> : <span className="text-xs text-gray-400">Aucune</span> },
          { key: 'nom', label: 'Nom' },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4">
          <form onSubmit={handleSave} className="my-8 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-5">
              <div><p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Supabase / {collection}</p><h3 className="text-xl font-bold text-sky-950">{editing ? 'Modifier' : 'Ajouter'} {label.singular}</h3></div>
              <button type="button" onClick={() => setShowForm(false)} className="text-xl text-gray-400" aria-label="Fermer">×</button>
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}
            <div className="space-y-4">
              <input required placeholder={`Nom du ${label.singular} *`} value={form.nom} onChange={(event) => setForm({ ...form, nom: event.target.value })} className="w-full rounded-lg border p-2.5 text-sm" />
              <input type="number" min="0" step="1" required placeholder="Ordre d'affichage" value={form.ordre} onChange={(event) => setForm({ ...form, ordre: Number(event.target.value) })} className="w-full rounded-lg border p-2.5 text-sm" />
              <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="w-full rounded-lg border p-2 text-sm" />
              {form.image && !imageFile && <img src={form.image} alt={form.nom} className="h-32 w-full rounded-lg object-cover" />}
              {imageFile && <p className="text-xs text-gray-500">Fichier sélectionné : {imageFile.name}</p>}
            </div>
            <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2 text-sm">Annuler</button><button type="submit" disabled={saving} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">{saving ? 'Téléversement...' : 'Enregistrer'}</button></div>
          </form>
        </div>
      )}
    </section>
  )
}

export default function TeamServicesPage() {
  const [teams, setTeams] = useState<EquipeService[]>([])
  const [services, setServices] = useState<EquipeService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    const [teamResult, serviceResult] = await Promise.all([
      supabase.from('nos_equipes').select('*').order('ordre', { ascending: true }),
      supabase.from('nos_services').select('*').order('ordre', { ascending: true }),
    ])
    if (teamResult.error || serviceResult.error) setError(teamResult.error?.message || serviceResult.error?.message || 'Impossible de charger les données.')
    else { setTeams((teamResult.data || []) as EquipeService[]); setServices((serviceResult.data || []) as EquipeService[]) }
    setLoading(false)
  }

  useEffect(() => { load() }, [])
  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />

  return <div className="space-y-6"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Galerie publique</p><h1 className="text-2xl md:text-3xl font-bold text-sky-950">Équipe et services</h1><p className="mt-2 text-sm text-gray-500">Gérez les images affichées dans la section publique.</p></div>{error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}<GalleryManager collection="nos_equipes" items={teams} onReload={load} /><GalleryManager collection="nos_services" items={services} onReload={load} /></div>
}
