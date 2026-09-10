import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabase'
import DataTable from '../../components/admin/DataTable'
import type { VehicleType } from '../../types'

type VehicleForm = Pick<VehicleType, 'nom' | 'type' | 'image'>

const emptyForm: VehicleForm = { nom: '', type: '', image: '' }

export default function VehiclesPage() {
  const [items, setItems] = useState<VehicleType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<VehicleType | null>(null)
  const [form, setForm] = useState<VehicleForm>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    const { data, error: queryError } = await supabase
      .from('types_vehicules')
      .select('*')
      .order('created_at', { ascending: false })

    if (queryError) setError(queryError.message)
    else setItems((data || []) as VehicleType[])
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

  const openEdit = (vehicle: VehicleType) => {
    setEditing(vehicle)
    setForm({ nom: vehicle.nom, type: vehicle.type || '', image: vehicle.image || '' })
    setImageFile(null)
    setFormError('')
    setShowForm(true)
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError('')
    setSaving(true)

    try {
      const payload = {
        nom: form.nom.trim(),
        type: form.type?.trim() || null,
        image: form.image?.trim() || null,
      }

      if (!payload.nom) {
        setFormError('Le nom du véhicule est obligatoire.')
        return
      }

      if (imageFile) {
        if (!imageFile.type.startsWith('image/')) {
          setFormError('Veuillez sélectionner un fichier image.')
          return
        }
        if (imageFile.size > 5 * 1024 * 1024) {
          setFormError("L'image ne doit pas dépasser 5 Mo.")
          return
        }

        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const filePath = `${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage
          .from('soadia-image')
          .upload(filePath, imageFile, { contentType: imageFile.type, upsert: false })

        if (uploadError) throw uploadError
        payload.image = supabase.storage.from('soadia-image').getPublicUrl(filePath).data.publicUrl
      }

      const result = editing
        ? await supabase.from('types_vehicules').update(payload).eq('id', editing.id)
        : await supabase.from('types_vehicules').insert(payload)

      if (result.error) throw result.error

      setShowForm(false)
      await load()
    } catch (saveError) {
      setFormError(saveError instanceof Error ? saveError.message : 'Erreur lors de l’enregistrement.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (vehicle: VehicleType) => {
    if (!confirm(`Supprimer « ${vehicle.nom} » ?`)) return

    const { error: deleteError } = await supabase
      .from('types_vehicules')
      .delete()
      .eq('id', vehicle.id)

    if (deleteError) setError(deleteError.message)
    else await load()
  }

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-950">Types de véhicules</h1>
          <p className="text-sm text-gray-500 mt-1">Données synchronisées avec Supabase</p>
        </div>
        <button onClick={openNew} className="bg-primary text-white px-4 py-2 rounded font-semibold text-sm">
          + Nouveau véhicule
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded">{error}</div>}

      <DataTable
        rowKey={(row) => row.id}
        columns={[
          {
            key: 'image',
            label: 'Image',
            render: (row) => row.image ? <img src={row.image} alt={row.nom} className="h-12 w-20 object-cover rounded" /> : 'Aucune',
          },
          { key: 'nom', label: 'Nom' },
          { key: 'type', label: 'Type', render: (row) => row.type || '-' },
          { key: 'created_at', label: 'Créé le', render: (row) => new Date(row.created_at).toLocaleDateString('fr-FR') },
        ]}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSave} className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editing ? 'Modifier le véhicule' : 'Nouveau véhicule'}</h2>
            {formError && <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">{formError}</div>}
            <div className="space-y-3">
              <input
                placeholder="Nom *"
                required
                value={form.nom}
                onChange={(event) => setForm({ ...form, nom: event.target.value })}
                className="w-full border rounded p-2 text-sm"
              />
              <input
                placeholder="Type (SUV, Berline, Van...)"
                value={form.type || ''}
                onChange={(event) => setForm({ ...form, type: event.target.value })}
                className="w-full border rounded p-2 text-sm"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setImageFile(event.target.files?.[0] || null)}
                className="w-full border rounded p-2 text-sm"
              />
              {form.image && !imageFile && (
                <img src={form.image} alt={form.nom} className="h-24 w-full object-cover rounded" />
              )}
              {imageFile && (
                <p className="text-xs text-gray-500">Fichier sélectionné : {imageFile.name}</p>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded border text-sm">
                Annuler
              </button>
              <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-primary text-white text-sm font-semibold disabled:opacity-50">
                {saving ? 'Téléversement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
