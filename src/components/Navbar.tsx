import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || !isHome

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
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`text-xl font-mono font-bold ${solid ? 'text-blue-900' : 'text-white'}`}>
                Soa Dia Travel
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
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
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-semibold ${solid ? 'text-gray-700' : 'text-white'}`}>
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-medium px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition"
                >
                  Déconnexion
                </button>
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

          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Open menu"
              className={`inline-flex items-center justify-center h-10 w-10 rounded-md ${solid ? 'text-gray-700' : 'text-white'}`}
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
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                href={link.href}
                className="block text-sm font-bold text-gray-700 hover:text-blue-500"
              >
                {link.label}
              </a>
            ))}
            {user ? (
              <button onClick={logout} className="block text-sm font-bold text-red-500">
                Déconnexion
              </button>
            ) : (
              <Link to="/login" className="block text-sm font-bold text-blue-500">
                Connexion
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
