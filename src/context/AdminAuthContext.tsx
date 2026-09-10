import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { AdminUser } from '../types'

interface AdminAuthContextType {
  admin: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('admin_data')
    const token = localStorage.getItem('admin_token')
    if (stored && token) {
      try {
        setAdmin(JSON.parse(stored))
      } catch {}
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    if (email !== 'admin@soadia.mg' || password !== 'admin123') throw new Error('Identifiants invalides. Utilisez admin@soadia.mg / admin123')
    const currentAdmin = { id: 1, name: 'Administrateur Soa Dia', email }
    localStorage.setItem('admin_token', 'local-admin')
    localStorage.setItem('admin_data', JSON.stringify(currentAdmin))
    setAdmin(currentAdmin)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_data')
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
