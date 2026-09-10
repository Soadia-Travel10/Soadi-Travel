import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabase'
import DataTable from '../../components/admin/DataTable'
import type { Partenaire } from '../../types'

type PartnerForm = Pick<Partenaire, 'nom' | 'image'>

const emptyForm: PartnerForm = { nom: '', image: '' }

export default function CitiesPage() {
  const [partners, setPartners] = useState<Partenaire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Partenaire | null>(null)
  const [form, setForm] = useState<PartnerForm>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    const { data, error: queryError } = await supabase
      .from('partenaires')
      .select('*')
      .order('created_at', { ascending: false })

    if (queryError) setError(queryError.message)
    else setPartners((data || []) as Partenaire[])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(emptyForm)
    setImageFile(null)
    setFormError('')
    setShowForm(true)
  }

  const openEdit = (partner: Partenaire) => {
    setEditing(partner)
    setForm({ nom: partner.nom, image: partner.image || '' })
    setImageFile(null)
    setFormError('')
    setShowForm(true)
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError('')
    setSaving(true)

    try {
      const payload = { nom: form.nom.trim(), image: form.image?.trim() || null }
      if (!payload.nom) {
        setFormError('Le nom du partenaire est obligatoire.')
        return
      }

      if (imageFile) {
        if (!imageFile.type.startsWith('image/')) throw new Error('Veuillez sélectionner un fichier image.')
        if (imageFile.size > 5 * 1024 * 1024) throw new Error("L'image ne doit pas dépasser 5 Mo.")

        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const filePath = `partenaires/${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage.from('soadia-image').upload(filePath, imageFile, {
          contentType: imageFile.type,
          upsert: false,
        })
        if (uploadError) throw uploadError
        payload.image = supabase.storage.from('soadia-image').getPublicUrl(filePath).data.publicUrl
      }

      const result = editing
        ? await supabase.from('partenaires').update(payload).eq('id', editing.id)
        : await supabase.from('partenaires').insert(payload)
      if (result.error) throw result.error

      setShowForm(false)
      await load()
    } catch (saveError) {
      setFormError(saveError instanceof Error ? saveError.message : "Erreur lors de l'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (partner: Partenaire) => {
    if (!confirm(`Supprimer « ${partner.nom} » ?`)) return
    const { error: deleteError } = await supabase.from('partenaires').delete().eq('id', partner.id)
    if (deleteError) setError(deleteError.message)
    else await load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-sky-950 to-blue-700 p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 mb-2">Table Supabase : partenaires</p>
            <h1 className="text-2xl md:text-3xl font-bold">Nos partenaires</h1>
            <p className="text-sm text-blue-100 mt-2">Gérez les noms et logos affichés sur le site public.</p>
          </div>
          <button onClick={openNew} className="self-start md:self-auto bg-white text-sky-950 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-50 transition">
            + Ajouter un partenaire
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}

      <DataTable
        rowKey={(row) => row.id}
        columns={[
          { key: 'image', label: 'Logo', render: (row) => row.image ? <img src={row.image} alt={row.nom} className="h-14 w-24 object-contain rounded-lg border border-slate-200 bg-white p-2" /> : <span className="text-xs text-gray-400">Aucun logo</span> },
          { key: 'nom', label: 'Nom du partenaire' },
          { key: 'created_at', label: 'Ajouté le', render: (row) => new Date(row.created_at).toLocaleDateString('fr-FR') },
        ]}
        rows={partners}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <div className="fixed inset-0 bg-slate-950/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 md:p-7 w-full max-w-lg shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Supabase / partenaires</p>
                <h2 className="text-xl font-bold text-sky-950">{editing ? 'Modifier le partenaire' : 'Ajouter un partenaire'}</h2>
              </div>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 text-xl" aria-label="Fermer">×</button>
            </div>
            {formError && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{formError}</div>}
            <div className="space-y-4">
              <input required placeholder="Nom du partenaire *" value={form.nom} onChange={(event) => setForm({ ...form, nom: event.target.value })} className="w-full border rounded-lg p-2.5 text-sm" />
              <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="w-full border rounded-lg p-2 text-sm" />
              {form.image && !imageFile && <img src={form.image} alt={form.nom} className="h-32 w-full object-contain rounded-lg border bg-slate-50 p-3" />}
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
