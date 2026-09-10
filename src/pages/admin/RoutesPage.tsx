import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabase'
import DataTable from '../../components/admin/DataTable'
import type { Trajet } from '../../types'

type TrajetForm = Pick<Trajet, 'titre' | 'depart' | 'prix' | 'devise' | 'image_1' | 'titre_1' | 'image_2' | 'titre_2' | 'image_3' | 'titre_3'>

const emptyForm: TrajetForm = {
  titre: '', depart: 'Tous les jours', prix: 0, devise: 'AR',
  image_1: '', titre_1: '', image_2: '', titre_2: '', image_3: '', titre_3: '',
}

export default function RoutesPage() {
  const [items, setItems] = useState<Trajet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Trajet | null>(null)
  const [form, setForm] = useState<TrajetForm>(emptyForm)
  const [imageFiles, setImageFiles] = useState<Record<1 | 2 | 3, File | null>>({ 1: null, 2: null, 3: null })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    const { data, error: queryError } = await supabase.from('trajets').select('*').order('created_at', { ascending: false })
    if (queryError) setError(queryError.message)
    else setItems((data || []) as Trajet[])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(emptyForm)
    setImageFiles({ 1: null, 2: null, 3: null })
    setFormError('')
    setShowForm(true)
  }

  const openEdit = (route: Trajet) => {
    setEditing(route)
    setForm({
      titre: route.titre, depart: route.depart, prix: route.prix, devise: route.devise,
      image_1: route.image_1 || '', titre_1: route.titre_1 || '', image_2: route.image_2 || '', titre_2: route.titre_2 || '', image_3: route.image_3 || '', titre_3: route.titre_3 || '',
    })
    setImageFiles({ 1: null, 2: null, 3: null })
    setFormError('')
    setShowForm(true)
  }

  const uploadImage = async (file: File, index: 1 | 2 | 3) => {
    if (!file.type.startsWith('image/')) throw new Error(`L'image ${index} est invalide.`)
    if (file.size > 5 * 1024 * 1024) throw new Error("Chaque image ne doit pas dépasser 5 Mo.")
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
    const filePath = `trajets/${crypto.randomUUID()}-${safeName}`
    const { error: uploadError } = await supabase.storage.from('soadia-image').upload(filePath, file, { contentType: file.type, upsert: false })
    if (uploadError) throw uploadError
    return supabase.storage.from('soadia-image').getPublicUrl(filePath).data.publicUrl
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      const prix = Number(form.prix)
      if (!form.titre.trim()) throw new Error("Le titre du trajet est obligatoire.")
      if (!Number.isFinite(prix) || prix < 0) throw new Error('Le prix doit être un nombre positif.')

      const payload: Record<string, string | number | null> = {
        titre: form.titre.trim(), depart: form.depart.trim() || 'Tous les jours', prix, devise: form.devise.trim() || 'AR',
        image_1: form.image_1?.trim() || null, titre_1: form.titre_1?.trim() || null,
        image_2: form.image_2?.trim() || null, titre_2: form.titre_2?.trim() || null,
        image_3: form.image_3?.trim() || null, titre_3: form.titre_3?.trim() || null,
      }

      for (const index of [1, 2, 3] as const) {
        if (imageFiles[index]) payload[`image_${index}`] = await uploadImage(imageFiles[index]!, index)
      }

      const result = editing
        ? await supabase.from('trajets').update(payload).eq('id', editing.id)
        : await supabase.from('trajets').insert(payload)
      if (result.error) throw result.error
      setShowForm(false)
      await load()
    } catch (saveError) {
      setFormError(saveError instanceof Error ? saveError.message : "Erreur lors de l'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (route: Trajet) => {
    if (!confirm(`Supprimer « ${route.titre} » ?`)) return
    const { error: deleteError } = await supabase.from('trajets').delete().eq('id', route.id)
    if (deleteError) setError(deleteError.message)
    else await load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-sky-950 to-blue-700 p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 mb-2">Table Supabase : trajets</p>
            <h1 className="text-2xl md:text-3xl font-bold">Trajets touristiques</h1>
            <p className="text-sm text-blue-100 mt-2 max-w-xl">Gérez chaque carte de trajet avec ses trois étapes et ses images.</p>
          </div>
          <button onClick={openNew} className="self-start md:self-auto bg-white text-sky-950 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-50">+ Ajouter un trajet</button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
      <DataTable
        rowKey={(row) => row.id}
        columns={[
          { key: 'titre', label: 'Trajet' },
          { key: 'depart', label: 'Départ' },
          { key: 'prix', label: 'Prix', render: (row) => `${row.prix.toLocaleString('fr-FR')} ${row.devise}` },
          { key: 'titre_1', label: 'Étapes', render: (row) => [row.titre_1, row.titre_2, row.titre_3].filter(Boolean).join(' → ') || '-' },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <div className="fixed inset-0 bg-slate-950/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 md:p-7 w-full max-w-3xl shadow-2xl my-8">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div><p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Supabase / trajets</p><h2 className="text-xl font-bold text-sky-950">{editing ? 'Modifier le trajet' : 'Ajouter un trajet'}</h2></div>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 text-xl" aria-label="Fermer">×</button>
            </div>
            {formError && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{formError}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required placeholder="Titre du trajet *" value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} className="md:col-span-2 border rounded-lg p-2.5 text-sm" />
              <input placeholder="Départ (ex: Tous les jours)" value={form.depart} onChange={(e) => setForm({ ...form, depart: e.target.value })} className="border rounded-lg p-2.5 text-sm" />
              <input type="number" min="0" step="0.01" required placeholder="Prix" value={form.prix} onChange={(e) => setForm({ ...form, prix: Number(e.target.value) })} className="border rounded-lg p-2.5 text-sm" />
              <input placeholder="Devise (AR)" value={form.devise} onChange={(e) => setForm({ ...form, devise: e.target.value })} className="border rounded-lg p-2.5 text-sm" />
              {[1, 2, 3].map((index) => {
                const imageKey = `image_${index}` as keyof TrajetForm
                const titleKey = `titre_${index}` as keyof TrajetForm
                return <div key={index} className="md:col-span-2 rounded-xl border border-slate-200 p-4 space-y-3">
                  <p className="text-sm font-bold text-sky-950">Étape {index}</p>
                  <input placeholder={`Titre de l'étape ${index}`} value={String(form[titleKey] || '')} onChange={(e) => setForm({ ...form, [titleKey]: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm" />
                  <input type="file" accept="image/*" onChange={(e) => setImageFiles({ ...imageFiles, [index]: e.target.files?.[0] || null })} className="w-full border rounded-lg p-2 text-sm" />
                  {form[imageKey] && !imageFiles[index as 1 | 2 | 3] && <img src={String(form[imageKey])} alt={String(form[titleKey] || '')} className="h-28 w-full object-cover rounded-lg" />}
                  {imageFiles[index as 1 | 2 | 3] && <p className="text-xs text-gray-500">Fichier sélectionné : {imageFiles[index as 1 | 2 | 3]?.name}</p>}
                </div>
              })}
            </div>
            <div className="flex justify-end gap-3 mt-7"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border text-sm">Annuler</button><button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-50">{saving ? 'Téléversement...' : 'Enregistrer'}</button></div>
          </form>
        </div>
      )}
    </div>
  )
}
