import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.webp'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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
  }, [location.pathname])

  const solid = scrolled || !isHome
  const navLinks = [
    { href: '/#about', label: 'Pourquoi Nous?' },
    { href: '/#vehicles', label: 'Véhicules' },
    { href: '/#location', label: 'Destinations' },
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
        solid ? 'bg-white/95 backdrop-blur border-b border-slate-100 py-3' : 'bg-gradient-to-b from-black/40 to-transparent shadow-none'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-[72px] w-[72px] shrink-0 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white p-0.5 shadow-md">
                <img src={logo} alt="" className="h-full w-full object-contain" />
              </span>
              <span className={`flex flex-col leading-none ${solid ? 'text-navy' : 'text-white'}`}>
                <span className="font-serif text-2xl font-bold tracking-wide">Soadia Travel</span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.5em] opacity-80">Madagascar</span>
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
                className={`text-[11px] font-semibold uppercase tracking-[0.18em] hover:text-primary transition-colors cursor-pointer ${
                  solid ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

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
              <span className="text-sm font-bold text-navy">Menu</span>
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
          </div>
        )}
      </div>
    </header>
  )
}
