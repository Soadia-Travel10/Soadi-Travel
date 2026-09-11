import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const { admin } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const solid = scrolled || !isHome
  const initials = user?.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleLogout = async () => {
    setProfileOpen(false)
    setMobileOpen(false)
    await logout()
  }

  const navLinks = [
    { href: '/#hero', label: "Page d'Accueil" },
    { href: '/#about', label: 'Pourquoi Nous?' },
    { href: '/#book', label: 'Réserver un Voyage' },
    { href: '/#vehicles', label: 'Véhicules' },
    { href: '/#contact', label: 'Contact' },
  ]

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (isHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/')
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-700 py-[20px] ${
        solid ? 'bg-white shadow-md py-3' : 'bg-none shadow-none'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`truncate text-lg sm:text-xl font-mono font-bold ${solid ? 'text-blue-900' : 'text-white'}`}>
                Soa Dia Travel
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                href={link.href}
                className={`text-sm font-bold hover:text-blue-400 transition-colors cursor-pointer ${
                  solid ? 'text-gray-700' : 'text-blue-50'
                }`}
              >
                {link.label}
              </a>
            ))}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 rounded-full p-1 pr-3 transition ${solid ? 'bg-slate-100 hover:bg-slate-200' : 'bg-white/15 hover:bg-white/25'}`}
                  aria-expanded={profileOpen}
                  aria-label="Ouvrir le profil"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {initials}
                  </span>
                  <span className={`max-w-[120px] truncate text-sm font-semibold ${solid ? 'text-sky-950' : 'text-white'}`}>
                    {user.name}
                  </span>
                  <span className={solid ? 'text-slate-500' : 'text-white/80'}>⌄</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-14 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-2 pb-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{initials}</span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-sky-950">{user.name}</p>
                        <p className="truncate text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    {admin && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="mt-3 block rounded-lg bg-primary/10 px-2 py-2 text-sm font-semibold text-primary hover:bg-primary/20"
                      >
                        Accéder à l'administration
                      </Link>
                    )}
                    <button onClick={handleLogout} className="mt-2 w-full rounded-lg px-2 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50">
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-primary text-white hover:bg-primary/90"
              >
                Connexion
              </Link>
            )}
          </nav>

          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className={`inline-flex items-center justify-center h-10 w-10 rounded-lg ${solid ? 'text-gray-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl bg-white p-4 shadow-xl ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-sky-950">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="rounded-md px-2 py-1 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Fermer le menu">
                ×
              </button>
            </div>
            <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                href={link.href}
                className="block rounded-lg px-3 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-500"
              >
                {link.label}
              </a>
            ))}
            </div>
            {user ? (
              <div className="mt-3 rounded-xl bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{initials}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-sky-950">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                {admin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 block rounded-lg bg-primary/10 px-3 py-2 text-sm font-bold text-primary hover:bg-primary/20"
                  >
                    Accéder à l'administration
                  </Link>
                )}
                <button onClick={handleLogout} className="mt-3 w-full rounded-lg bg-red-50 px-3 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-100">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link to="/login" className="mt-3 block rounded-lg bg-primary px-3 py-3 text-sm font-bold text-white" onClick={() => setMobileOpen(false)}>
                Connexion
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
