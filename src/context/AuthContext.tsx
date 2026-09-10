import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user_data')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {}
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    if (!email || password.length < 4) throw new Error('Email ou mot de passe invalide')
    const currentUser = { id: 1, name: email.split('@')[0], email }
    localStorage.setItem('user_token', 'local-user')
    localStorage.setItem('user_data', JSON.stringify(currentUser))
    setUser(currentUser)
  }

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || password.length < 4) throw new Error('Veuillez remplir tous les champs')
    const currentUser = { id: Date.now(), name, email }
    localStorage.setItem('user_token', 'local-user')
    localStorage.setItem('user_data', JSON.stringify(currentUser))
    setUser(currentUser)
  }

  const logout = () => {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_data')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
