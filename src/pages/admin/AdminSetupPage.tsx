import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminSetupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [setupKey, setSetupKey] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (setupKey !== 'soadia-setup-2026') throw new Error('Clé de configuration invalide')
      localStorage.setItem('admin_data', JSON.stringify({ id: 1, name, email }))
      localStorage.setItem('admin_token', 'local-admin')
      setSuccess(true)
      setTimeout(() => navigate('/admin/login'), 2000)
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la configuration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0036] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-sky-950 mb-1">Configuration initiale</h1>
          <p className="text-sm text-gray-500">Créez le premier compte administrateur</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">{error}</div>}
        {success && (
          <div className="bg-green-50 text-green-600 text-sm p-3 rounded mb-4">
            Compte créé avec succès ! Redirection...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Nom complet</label>
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Mot de passe</label>
            <input
              type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Clé de configuration</label>
            <input
              type="text" required value={setupKey} onChange={(e) => setSetupKey(e.target.value)}
              placeholder="soadia-setup-2026"
              className="w-full border rounded p-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Clé par défaut : soadia-setup-2026</p>
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? 'Création...' : 'Créer le compte administrateur'}
          </button>
        </form>
      </div>
    </div>
  )
}
