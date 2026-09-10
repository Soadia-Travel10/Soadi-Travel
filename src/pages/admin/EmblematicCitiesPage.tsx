import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabase'
import DataTable from '../../components/admin/DataTable'
import type { VilleEmblematique } from '../../types'

type CityForm = Pick<VilleEmblematique, 'nom' | 'image' | 'ordre'>

const emptyForm: CityForm = { nom: '', image: '', ordre: 0 }

export default function EmblematicCitiesPage() {
  const [items, setItems] = useState<VilleEmblematique[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<VilleEmblematique | null>(null)
  const [form, setForm] = useState<CityForm>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    const { data, error: queryError } = await supabase
      .from('villes_emblematiques')
      .select('*')
      .order('ordre', { ascending: true })

    if (queryError) setError(queryError.message)
    else setItems((data || []) as VilleEmblematique[])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditing(null)
    setForm({ ...emptyForm, ordre: items.length })
    setImageFile(null)
    setFormError('')
    setShowForm(true)
  }

  const openEdit = (city: VilleEmblematique) => {
    setEditing(city)
    setForm({ nom: city.nom, image: city.image || '', ordre: city.ordre })
    setImageFile(null)
    setFormError('')
    setShowForm(true)
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError('')
    setSaving(true)

    try {
      const ordre = Number(form.ordre)
      if (!form.nom.trim()) throw new Error('Le nom de la ville est obligatoire.')
      if (!Number.isInteger(ordre) || ordre < 0) throw new Error("L'ordre doit être un nombre entier positif.")

      const payload = {
        nom: form.nom.trim(),
        image: form.image?.trim() || null,
        ordre,
      }

      if (imageFile) {
        if (!imageFile.type.startsWith('image/')) throw new Error('Veuillez sélectionner un fichier image.')
        if (imageFile.size > 5 * 1024 * 1024) throw new Error("L'image ne doit pas dépasser 5 Mo.")

        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const filePath = `villes-emblematiques/${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage.from('soadia-image').upload(filePath, imageFile, {
          contentType: imageFile.type,
          upsert: false,
        })
        if (uploadError) throw uploadError
        payload.image = supabase.storage.from('soadia-image').getPublicUrl(filePath).data.publicUrl
      }

      const result = editing
        ? await supabase.from('villes_emblematiques').update(payload).eq('id', editing.id)
        : await supabase.from('villes_emblematiques').insert(payload)
      if (result.error) throw result.error

      setShowForm(false)
      await load()
    } catch (saveError) {
      setFormError(saveError instanceof Error ? saveError.message : "Erreur lors de l'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (city: VilleEmblematique) => {
    if (!confirm(`Supprimer « ${city.nom} » ?`)) return
    const { error: deleteError } = await supabase.from('villes_emblematiques').delete().eq('id', city.id)
    if (deleteError) setError(deleteError.message)
    else await load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-sky-950 to-blue-700 p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 mb-2">Table Supabase : villes_emblematiques</p>
            <h1 className="text-2xl md:text-3xl font-bold">Villes emblématiques</h1>
            <p className="text-sm text-blue-100 mt-2 max-w-xl">Gérez les villes affichées dans le carrousel public, dans l'ordre souhaité.</p>
          </div>
          <button onClick={openNew} className="self-start md:self-auto bg-white text-sky-950 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-50 transition">
            + Ajouter une ville
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}

      <DataTable
        rowKey={(row) => row.id}
        columns={[
          { key: 'ordre', label: 'Ordre', render: (row) => <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">{row.ordre}</span> },
          { key: 'image', label: 'Image', render: (row) => row.image ? <img src={row.image} alt={row.nom} className="h-14 w-20 object-cover rounded-lg" /> : <span className="text-xs text-gray-400">Aucune</span> },
          { key: 'nom', label: 'Ville' },
          { key: 'created_at', label: 'Ajoutée le', render: (row) => new Date(row.created_at).toLocaleDateString('fr-FR') },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <div className="fixed inset-0 bg-slate-950/70 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 md:p-7 w-full max-w-lg shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Supabase / villes_emblematiques</p>
                <h2 className="text-xl font-bold text-sky-950">{editing ? 'Modifier la ville' : 'Ajouter une ville'}</h2>
              </div>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 text-xl" aria-label="Fermer">×</button>
            </div>
            {formError && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{formError}</div>}
            <div className="space-y-4">
              <input required placeholder="Nom de la ville *" value={form.nom} onChange={(event) => setForm({ ...form, nom: event.target.value })} className="w-full border rounded-lg p-2.5 text-sm" />
              <input type="number" min="0" step="1" required placeholder="Ordre d'affichage" value={form.ordre} onChange={(event) => setForm({ ...form, ordre: Number(event.target.value) })} className="w-full border rounded-lg p-2.5 text-sm" />
              <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="w-full border rounded-lg p-2 text-sm" />
              {form.image && !imageFile && <img src={form.image} alt={form.nom} className="h-32 w-full object-cover rounded-lg" />}
              {imageFile && <p className="text-xs text-gray-500">Fichier sélectionné : {imageFile.name}</p>}
            </div>
            <div className="flex justify-end gap-3 mt-7">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border text-sm">Annuler</button>
              <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-50">{saving ? 'Téléversement...' : 'Enregistrer'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
