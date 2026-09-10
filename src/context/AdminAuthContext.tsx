import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { AdminUser } from '../types'
import { supabase } from '../../utils/supabase'

interface AdminAuthContextType {
  admin: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

function toAdminUser(user: SupabaseUser): AdminUser {
  return {
    id: user.id,
    name: user.user_metadata.name || user.email?.split('@')[0] || 'Administrateur',
    email: user.email || '',
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (!mounted) return
      if (error || !user) {
        setAdmin(null)
      } else {
        setAdmin(toAdminUser(user))
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      const user = session?.user
      setAdmin(user ? toAdminUser(user) : null)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
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
