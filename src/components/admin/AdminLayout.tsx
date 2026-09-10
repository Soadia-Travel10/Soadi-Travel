import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

const menuItems = [
  { path: '/admin', label: 'Tableau de bord', icon: 'dashboard' },
  { path: '/admin/emblematic-cities', label: 'Villes emblématiques', icon: 'city' },
  { path: '/admin/vehicles', label: 'Types de Véhicules', icon: 'bus' },
  { path: '/admin/hubs', label: 'Nos destinations', icon: 'map' },
  { path: '/admin/routes', label: 'Itinéraires touristiques', icon: 'route' },
  { path: '/admin/cities', label: 'Partenaires', icon: 'city' },
]

function Icon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    ticket: 'M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4z',
    tag: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
    bus: 'M8 6v6m8-6v6M2 12h20M4 18h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1zM7 21v-3M17 21v-3',
    map: 'M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7',
    route: 'M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7',
    city: 'M3 21h18M6 21V9l6-4 6 4v12M9 9v6M15 9v6',
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
    chart: 'M3 3v18h18M18 8l-5 5-4-4-4 4',
    mail: 'M4 4h16v16H4zM22 6l-10 7L2 6',
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name] || icons.dashboard}></path>
    </svg>
  )
}

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0d0036] text-white transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <span className="text-lg font-bold">Soa Dia Travel</span>
          <div className="text-xs text-gray-400 mt-1">Panneau d'administration</div>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="text-xs text-gray-400 mb-2">{admin?.email}</div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-red-400 hover:text-red-300 flex items-center gap-2"
          >
            <Icon name="mail" /> Déconnexion
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:justify-end">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
          <Link to="/" className="text-sm text-primary font-semibold hover:underline">
            ← Voir le site public
          </Link>
        </header>
        <main className="min-w-0 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
